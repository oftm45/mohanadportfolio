# Final touch for the converted robot: wrap in an upright "Robot" node and tone down metal/white glare.
import json,struct,sys
src,dst=sys.argv[1],sys.argv[2]
d=open(src,'rb').read()
L=struct.unpack('<I',d[12:16])[0]; j=json.loads(d[20:20+L]); rest=d[20+L:]
s=j['scenes'][0]
j['nodes'].append({'name':'Robot','rotation':[0.7071068,0,0,0.7071068],'children':s['nodes']})
s['nodes']=[len(j['nodes'])-1]
for m in j['materials']:
    pb=m['pbrMetallicRoughness']; c=pb.get('baseColorFactor',[1,1,1,1])
    pb['metallicFactor']=min(pb.get('metallicFactor',0),0.35); pb['roughnessFactor']=0.55
    if c[3]>0.99 and min(c[:3])>0.97:  # pure white parts read as glare; soften slightly
        pb['baseColorFactor']=[0.86,0.86,0.86,1]
j['asset']['generator']='Team Sudan FGC robot — converted from SOLIDWORKS 3DXML'
js=json.dumps(j,separators=(',',':')).encode()
while len(js)%4: js+=b' '
out=struct.pack('<III',0x46546C67,2,12+8+len(js)+len(rest))+struct.pack('<II',len(js),0x4E4F534A)+js+rest
open(dst,'wb').write(out); print(len(out))
