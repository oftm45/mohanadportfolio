# Converts a SOLIDWORKS/CATIA .3DXML export (unzipped into D) into one raw .glb, merged by colour.
# Pipeline: unzip X.3DXML -d /tmp/robot -> python3 convert-3dxml.py -> npx gltfpack -i robot_raw.glb -o robot_s.glb -si 0.015 -sa -noq
# -> python3 finish-robot-glb.py robot_s.glb robot_fixed.glb (stands it upright, softens materials) -> lovable-assets create.
import os, sys, re, json, struct, numpy as np
from lxml import etree
D='/tmp/robot'
NS='{http://www.3ds.com/xsd/3DXML}'
XSI='{http://www.w3.org/2001/XMLSchema-instance}type'

def parse_rep(path):
    """Return list of (color tuple, positions Nx3, normals Nx3, indices Mx3)."""
    out=[]
    for ev, el in etree.iterparse(path, events=('end',), tag=NS+'Rep'):
        if el.get(XSI)!='PolygonalRepType':
            continue
        faces=el.find(NS+'Faces'); vb=el.find(NS+'VertexBuffer')
        if faces is None or vb is None:
            el.clear(); continue
        pos=np.array(vb.findtext(NS+'Positions').replace(',',' ').split(),dtype=np.float32).reshape(-1,3)
        nt=vb.findtext(NS+'Normals')
        nor=np.array(nt.replace(',',' ').split(),dtype=np.float32).reshape(-1,3) if nt else None
        for f in faces.findall(NS+'Face'):
            col=None
            c=f.find(NS+'SurfaceAttributes/'+NS+'Color')
            if c is not None: col=(float(c.get('red')),float(c.get('green')),float(c.get('blue')),float(c.get('alpha',1)))
            tris=[]
            t=f.get('triangles')
            if t: tris.append(np.array(t.split(),dtype=np.int64).reshape(-1,3))
            for kind in ('strips','fans'):
                s=f.get(kind)
                if not s: continue
                for g in s.split(','):
                    a=np.array(g.split(),dtype=np.int64)
                    if len(a)<3: continue
                    n=len(a)-2
                    if kind=='strips':
                        i=np.arange(n)
                        tri=np.stack([a[i],a[i+1],a[i+2]],1)
                        odd=(i%2==1); tri[odd]=tri[odd][:,[1,0,2]]
                    else:
                        i=np.arange(n)
                        tri=np.stack([np.full(n,a[0]),a[i+1],a[i+2]],1)
                    tris.append(tri)
            if tris:
                out.append((col,pos,nor,np.concatenate(tris)))
        el.clear()
    return out

tree=etree.parse(f'{D}/NameSetTree.3dxml').getroot()
ps=tree.find(NS+'ProductStructure')
root=ps.get('root')
refs={}; reprefs={}; inst={}; instrep={}; children={}
for e in ps:
    tag=e.tag.replace(NS,''); i=e.get('id')
    if tag=='Reference3D': refs[i]=e.get('name')
    elif tag=='ReferenceRep': reprefs[i]=e.get('associatedFile').split(':')[-1]
    elif tag=='Instance3D':
        m=np.array(e.findtext(NS+'RelativeMatrix').split(),dtype=np.float64)
        M=np.eye(4)
        M[:3,:3]=m[:9].reshape(3,3).T  # column-major rotation
        M[:3,3]=m[9:]
        p=e.findtext(NS+'IsAggregatedBy'); r=e.findtext(NS+'IsInstanceOf')
        inst[i]=(e.get('name'),p,r,M); children.setdefault(p,[]).append(i)
    elif tag=='InstanceRep':
        instrep.setdefault(e.findtext(NS+'IsAggregatedBy'),[]).append(e.findtext(NS+'IsInstanceOf'))

# color overrides from default view (occurrence = instance id)
over={}
for dv in tree.iter(NS+'DefaultViewProperty'):
    ids=[x.text.split('#')[-1] for x in dv.iter(NS+'id')]
    c=dv.find('.//'+NS+'Color')
    if c is not None and ids:
        over[ids[-1]]=(float(c.get('red')),float(c.get('green')),float(c.get('blue')),float(c.get('alpha',1)))

cache={}
def rep(f):
    if f not in cache: cache[f]=parse_rep(f'{D}/{f}')
    return cache[f]

groups={}  # color -> lists
count={'inst':0,'tris':0}
def walk(ref, M, ocol, path):
    for rr in instrep.get(ref,[]):
        for col,pos,nor,idx in rep(reprefs[rr]):
            c=ocol or col or (0.75,0.75,0.75,1)
            c=tuple(round(x,3) for x in c)
            P=pos@M[:3,:3].T+M[:3,3]
            N=(nor@M[:3,:3].T) if nor is not None else None
            g=groups.setdefault(c,{'p':[],'n':[],'i':[],'off':0})
            g['p'].append(P.astype(np.float32)); g['n'].append(N.astype(np.float32) if N is not None else np.zeros_like(P,dtype=np.float32))
            g['i'].append(idx+g['off']); g['off']+=len(P)
            count['tris']+=len(idx)
    for ci in children.get(ref,[]):
        name,p,r,Mi=inst[ci]
        count['inst']+=1
        walk(r, M@Mi, over.get(ci,ocol), path+[name])

walk(root, np.eye(4), None, [])
print('instances',count['inst'],'tris',count['tris'],'colors',len(groups))
for c,g in sorted(groups.items(), key=lambda kv:-sum(len(i) for i in kv[1]['i'])):
    print(c, sum(len(i) for i in g['i']))

# Z-up -> Y-up, mm -> m
R=np.array([[1,0,0],[0,0,1],[0,-1,0]],dtype=np.float32)
bin_=bytearray(); bviews=[]; accs=[]; meshes=[]; mats=[]; nodes=[]
def addview(data, target):
    global bin_
    while len(bin_)%4: bin_.append(0)
    off=len(bin_); bin_+=data
    bviews.append({'buffer':0,'byteOffset':off,'byteLength':len(data),'target':target}); return len(bviews)-1
allmin=np.full(3,1e9); allmax=np.full(3,-1e9)
for k,(c,g) in enumerate(groups.items()):
    P=(np.concatenate(g['p'])@R.T)*0.001; N=np.concatenate(g['n'])@R.T
    ln=np.linalg.norm(N,axis=1,keepdims=True); ln[ln==0]=1; N=(N/ln).astype(np.float32)
    I=np.concatenate(g['i']).astype(np.uint32).reshape(-1)
    allmin=np.minimum(allmin,P.min(0)); allmax=np.maximum(allmax,P.max(0))
    pv=addview(P.astype(np.float32).tobytes(),34962); nv=addview(N.tobytes(),34962); iv=addview(I.tobytes(),34963)
    accs.append({'bufferView':pv,'componentType':5126,'count':len(P),'type':'VEC3','min':P.min(0).tolist(),'max':P.max(0).tolist()})
    accs.append({'bufferView':nv,'componentType':5126,'count':len(N),'type':'VEC3'})
    accs.append({'bufferView':iv,'componentType':5125,'count':len(I),'type':'SCALAR'})
    lum=0.3*c[0]+0.59*c[1]+0.11*c[2]
    mat={'name':f'mat_{k}','pbrMetallicRoughness':{'baseColorFactor':list(c),'metallicFactor':0.55 if (abs(c[0]-c[1])<0.05 and abs(c[1]-c[2])<0.05 and lum>0.5) else 0.15,'roughnessFactor':0.45},'doubleSided':True}
    if c[3]<0.99: mat['alphaMode']='BLEND'
    mats.append(mat)
    meshes.append({'name':f'part_{k}','primitives':[{'attributes':{'POSITION':len(accs)-3,'NORMAL':len(accs)-2},'indices':len(accs)-1,'material':k}]})
    nodes.append({'mesh':k,'name':f'part_{k}'})
print('bounds m',allmin,allmax)
gl={'asset':{'version':'2.0','generator':'3dxml->glb'},'scene':0,'scenes':[{'nodes':[len(nodes)]}],
    'nodes':nodes+[{'name':'Robot','children':list(range(len(nodes)))}],
    'meshes':meshes,'materials':mats,'accessors':accs,'bufferViews':bviews,'buffers':[{'byteLength':len(bin_)}]}
js=json.dumps(gl).encode();
while len(js)%4: js+=b' '
while len(bin_)%4: bin_.append(0)
with open('/tmp/robotconv/robot_raw.glb','wb') as f:
    f.write(struct.pack('<III',0x46546C67,2,12+8+len(js)+8+len(bin_)))
    f.write(struct.pack('<II',len(js),0x4E4F534A)); f.write(js)
    f.write(struct.pack('<II',len(bin_),0x004E4942)); f.write(bin_)
print('size MB',os.path.getsize('/tmp/robotconv/robot_raw.glb')/1e6)
