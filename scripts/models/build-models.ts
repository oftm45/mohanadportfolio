// Builds the Agri-Shield prototype 3D model shown on its project page and exports them as .glb files.
// Run: bun scripts/models/build-models.ts  (writes to /tmp/models, then upload with lovable-assets)
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { mergeGeometries, mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { mkdirSync, writeFileSync } from 'node:fs';

// GLTFExporter reads blobs with FileReader, which Bun doesn't have.
class FileReaderShim {
  result: ArrayBuffer | string | null = null;
  onloadend: ((e: unknown) => void) | null = null;
  readAsArrayBuffer(blob: Blob) {
    blob.arrayBuffer().then((b) => {
      this.result = b;
      this.onloadend?.({ target: this });
    });
  }
  readAsDataURL(blob: Blob) {
    blob.arrayBuffer().then((b) => {
      this.result = `data:${blob.type || 'application/octet-stream'};base64,${Buffer.from(b).toString('base64')}`;
      this.onloadend?.({ target: this });
    });
  }
}
(globalThis as unknown as { FileReader: unknown }).FileReader = FileReaderShim;

type V3 = [number, number, number];
const mats = new Map<string, THREE.MeshStandardMaterial>();
const mat = (name: string, color: string, metalness = 0, roughness = 0.6, extra: THREE.MeshStandardMaterialParameters = {}) => {
  if (!mats.has(name)) mats.set(name, new THREE.MeshStandardMaterial({ name, color, metalness, roughness, ...extra }));
  return mats.get(name)!;
};
const add = (parent: THREE.Object3D, geo: THREE.BufferGeometry, m: THREE.Material, pos: V3 = [0, 0, 0], rot: V3 = [0, 0, 0]) => {
  const mesh = new THREE.Mesh(geo, m);
  mesh.position.set(...pos);
  mesh.rotation.set(...rot);
  parent.add(mesh);
  return mesh;
};
const group = (parent: THREE.Object3D, pos: V3 = [0, 0, 0], rot: V3 = [0, 0, 0], name?: string) => {
  const g = new THREE.Group();
  g.position.set(...pos);
  g.rotation.set(...rot);
  if (name) g.name = name;
  parent.add(g);
  return g;
};
const box = (w: number, h: number, d: number) => new THREE.BoxGeometry(w, h, d);
const cyl = (rt: number, rb: number, h: number, seg = 24) => new THREE.CylinderGeometry(rt, rb, h, seg);
const tube = (pts: V3[], r = 0.012) =>
  new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p))), 48, r, 6, false);
const polar = (r: number, theta: number, y: number): V3 => [r * Math.sin(theta), y, r * Math.cos(theta)];

// Merge every mesh into one mesh per material (fewer draw calls), keeping named moving parts separate.
function bake(root: THREE.Object3D, moving: string[]) {
  root.updateMatrixWorld(true);
  const isMoving = (o: THREE.Object3D) => moving.includes(o.name);
  const owner = (o: THREE.Object3D): THREE.Object3D => {
    let p = o.parent;
    while (p && p !== root) {
      if (isMoving(p)) return p;
      p = p.parent;
    }
    return root;
  };
  const buckets = new Map<THREE.Object3D, Map<THREE.Material, THREE.BufferGeometry[]>>();
  const meshes: THREE.Mesh[] = [];
  root.traverse((o) => {
    if ((o as THREE.Mesh).isMesh) meshes.push(o as THREE.Mesh);
  });
  for (const m of meshes) {
    const own = owner(m);
    const rel = new THREE.Matrix4().copy(own.matrixWorld).invert().multiply(m.matrixWorld);
    let g = m.geometry.clone().applyMatrix4(rel);
    if (!g.index) g = mergeVertices(g);
    for (const k of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(k)) g.deleteAttribute(k);
    const byMat = buckets.get(own) ?? new Map();
    buckets.set(own, byMat);
    const list = byMat.get(m.material as THREE.Material) ?? [];
    list.push(g);
    byMat.set(m.material as THREE.Material, list);
    m.removeFromParent();
  }
  // Drop now-empty helper groups (but keep the moving ones).
  const empties: THREE.Object3D[] = [];
  root.traverse((o) => {
    if (o !== root && !isMoving(o) && !(o as THREE.Mesh).isMesh && !o.children.some((c) => isMoving(c) || hasMoving(c)))
      empties.push(o);
  });
  function hasMoving(o: THREE.Object3D): boolean {
    let found = false;
    o.traverse((c) => {
      if (isMoving(c)) found = true;
    });
    return found;
  }
  empties.forEach((o) => o.removeFromParent());
  for (const [own, byMat] of buckets) {
    // Re-parent moving groups straight under the root, preserving their world transform.
    if (own !== root && own.parent !== root) root.attach(own);
    for (const [material, geos] of byMat) {
      const merged = mergeGeometries(geos, false);
      if (!merged) throw new Error('merge failed for ' + (material as THREE.MeshStandardMaterial).name);
      const mesh = new THREE.Mesh(merged, material);
      mesh.name = `${own === root ? root.name : own.name}_${(material as THREE.MeshStandardMaterial).name}`;
      own.add(mesh);
    }
  }
}

// ---------------------------------------------------------------- Agri-Shield 4.0 prototype
// Laid out like the real prototype photo: white model silo, fan unit, solar panel, charge controller,
// relays, breadboards with the ESP32, buzzer/LDR box and PIR sensor, all wired on one board.
function buildSilo() {
  const root = new THREE.Group();
  root.name = 'AgriShieldPrototype';
  const card = mat('WhiteCard', '#efeee9', 0, 0.8);
  const cardShade = mat('WhiteCardSeam', '#d6d4cd', 0, 0.85);
  const boardM = mat('BaseBoard', '#bfbcb5', 0, 0.9);
  const trim = mat('AgriShieldBurgundy', '#800020', 0.2, 0.45);
  const black = mat('BlackPlastic', '#1a1a1c', 0, 0.55);
  const darkGrey = mat('FanBlade', '#3a3d42', 0.3, 0.5);
  const blue = mat('ControllerBlue', '#1f4fc2', 0.1, 0.4);
  const lcd = mat('ControllerLcd', '#7fc7ff', 0, 0.2, { emissive: '#3aa0ff', emissiveIntensity: 0.6 });
  const solar = mat('SolarCells', '#1d2434', 0.5, 0.2);
  const alu = mat('Aluminium', '#c9ccd0', 0.85, 0.3);
  const relayBlue = mat('RelayBlue', '#2251c9', 0.1, 0.4);
  const relayRed = mat('RelayRed', '#c4202b', 0.1, 0.45);
  const pcbBlack = mat('PcbBlack', '#202326', 0.2, 0.5);
  const breadboard = mat('Breadboard', '#f3f2ee', 0, 0.7);
  const holes = mat('BreadboardHoles', '#9a9a96', 0, 0.8);
  const pirDome = mat('PirDome', '#fbfbf8', 0, 0.35, { transparent: true, opacity: 0.92 });
  const wRed = mat('WireRed', '#b8232e', 0, 0.5);
  const wBlack = mat('WireBlack', '#141416', 0, 0.5);
  const wYellow = mat('WireYellow', '#d9c23c', 0, 0.5);
  const ledGreen = mat('LedGreen', '#30ff70', 0, 0.3, { emissive: '#22ff66', emissiveIntensity: 2 });

  const T = 0.06; // board top
  // Photo pixel (858 x 1060) -> board position
  const P = (px: number, py: number): [number, number] => [((px - 429) / 858) * 3.4, ((py - 530) / 1060) * 4.2];
  const at = (px: number, py: number, y = T): V3 => {
    const [x, z] = P(px, py);
    return [x, y, z];
  };

  // Base board with a burgundy edge
  add(root, box(3.7, T, 4.5), boardM, [0, T / 2, 0]);
  add(root, box(3.74, 0.02, 4.54), trim, [0, 0.01, 0]);

  // Model silo: smooth white cylinder with a folded dome lid
  const S = at(760, 380);
  const R = 0.52;
  const H = 1.1;
  const silo = group(root, S);
  add(silo, cyl(R, R, H, 64), card, [0, H / 2, 0]);
  add(silo, new THREE.SphereGeometry(R * 1.02, 48, 16, 0, Math.PI * 2, 0, Math.PI / 2.6).scale(1, 0.75, 1), card, [0, H - 0.03, 0]);
  add(silo, new THREE.TorusGeometry(R * 1.005, 0.008, 6, 64), cardShade, [0, H, 0], [Math.PI / 2, 0, 0]);
  add(silo, box(0.008, H, 0.01), cardShade, [0, H / 2, R + 0.001], [0, 0, 0]);
  for (let i = 0; i < 4; i++) {
    const g = group(silo, [0, H - 0.04, 0], [0, (i / 4) * Math.PI * 2 + 0.4, 0]);
    add(g, new THREE.TorusGeometry(R * 1.02, 0.005, 4, 32, Math.PI / 2.6).rotateX(Math.PI / 2).rotateZ(Math.PI / 2).scale(1, 0.75, 1), cardShade, [0, 0.01, 0]);
  }
  // DHT22 and MQ-135 on the silo wall facing the wiring
  const wallSensors = group(silo, [0, 0, 0], [0, Math.PI * 0.85, 0]);
  add(wallSensors, box(0.07, 0.1, 0.025), card, [0.05, 0.3, R + 0.012]);
  for (let i = 0; i < 4; i++) add(wallSensors, box(0.055, 0.006, 0.03), black, [0.05, 0.27 + i * 0.02, R + 0.013]);
  add(wallSensors, box(0.09, 0.07, 0.012), relayBlue, [-0.08, 0.3, R + 0.006]);
  add(wallSensors, cyl(0.026, 0.026, 0.04, 16), alu, [-0.08, 0.3, R + 0.03], [Math.PI / 2, 0, 0]);

  // Fan unit: white box with a front grille and spinning blades
  const fanUnit = group(root, at(105, 95), [0, 0.35, 0]);
  add(fanUnit, box(0.6, 0.36, 0.42), card, [0, T + 0.18, 0]);
  add(fanUnit, box(0.6, 0.02, 0.44), cardShade, [0, T + 0.36, 0]);
  add(fanUnit, cyl(0.14, 0.14, 0.02, 32), black, [0, T + 0.18, 0.21], [Math.PI / 2, 0, 0]);
  const blades = group(fanUnit, [0, T + 0.18, 0.225], [0, 0, 0], 'FanBlades');
  add(blades, cyl(0.03, 0.03, 0.02, 16), black, [0, 0, 0], [Math.PI / 2, 0, 0]);
  for (let i = 0; i < 5; i++) {
    const b = group(blades, [0, 0, 0], [0, 0, (i / 5) * Math.PI * 2]);
    add(b, box(0.045, 0.11, 0.006), darkGrey, [0, 0.07, 0], [0, 0.45, 0]);
  }
  for (const r of [0.06, 0.12]) add(fanUnit, new THREE.TorusGeometry(r, 0.004, 6, 32), alu, [0, T + 0.18, 0.24]);
  for (let i = 0; i < 4; i++) add(fanUnit, box(0.006, 0.26, 0.006), alu, [0, T + 0.18, 0.24], [0, 0, (i / 4) * Math.PI]);

  // Solar panel on a white mount
  const sp = group(root, at(740, 110), [0, -0.25, 0]);
  add(sp, box(0.28, 0.22, 0.2), card, [0.12, T + 0.11, -0.05]);
  const panel = group(sp, [-0.05, T + 0.2, 0.05], [-0.45, 0, 0]);
  add(panel, box(0.74, 0.03, 0.42), alu);
  add(panel, box(0.7, 0.034, 0.38), solar);
  for (let i = 1; i < 4; i++) add(panel, box(0.005, 0.036, 0.38), alu, [-0.35 + (i * 0.7) / 4, 0, 0]);

  // Solar charge controller (blue face, LCD, buttons, USB, black terminal strip)
  const cc = group(root, at(55, 465), [0, Math.PI / 2, 0]);
  add(cc, box(0.66, 0.06, 0.4), blue, [0, T + 0.03, 0]);
  add(cc, box(0.66, 0.07, 0.08), black, [0, T + 0.035, -0.22]);
  for (let i = 0; i < 6; i++) add(cc, cyl(0.014, 0.014, 0.02, 10), alu, [-0.25 + i * 0.1, T + 0.075, -0.22]);
  add(cc, box(0.18, 0.012, 0.14), lcd, [-0.06, T + 0.066, 0.05]);
  for (let i = 0; i < 3; i++) add(cc, cyl(0.02, 0.02, 0.014, 12), black, [0.12 + i * 0.07, T + 0.067, 0.04]);
  for (const x of [-0.24, -0.17]) add(cc, box(0.04, 0.018, 0.06), alu, [x, T + 0.067, 0.12]);
  add(cc, box(0.03, 0.01, 0.03), ledGreen, [0.27, T + 0.065, 0.13]);

  // Relay modules: 1-channel (black) and 2-channel (red)
  const relay1 = at(425, 680);
  add(root, box(0.14, 0.02, 0.24), pcbBlack, [relay1[0], T + 0.01, relay1[2]]);
  add(root, box(0.1, 0.08, 0.1), relayBlue, [relay1[0], T + 0.06, relay1[2] - 0.02]);
  const relay2 = at(480, 680);
  add(root, box(0.16, 0.02, 0.26), relayRed, [relay2[0], T + 0.01, relay2[2]]);
  for (const dz of [-0.06, 0.05]) add(root, box(0.11, 0.08, 0.09), relayBlue, [relay2[0], T + 0.06, relay2[2] + dz]);

  // Breadboards: a long one on the left, a tall one on the right with the ESP32
  const bb1 = at(165, 840);
  add(root, box(0.98, 0.04, 0.3), breadboard, [bb1[0], T + 0.02, bb1[2]]);
  add(root, box(0.94, 0.002, 0.012), holes, [bb1[0], T + 0.041, bb1[2]]);
  for (const dz of [-0.11, -0.06, 0.06, 0.11]) add(root, box(0.9, 0.002, 0.02), holes, [bb1[0], T + 0.041, bb1[2] + dz]);
  const bb2 = at(812, 890);
  add(root, box(0.36, 0.04, 1.0), breadboard, [bb2[0], T + 0.02, bb2[2]]);
  for (const dx of [-0.12, -0.06, 0.06, 0.12]) add(root, box(0.02, 0.002, 0.95), holes, [bb2[0] + dx, T + 0.041, bb2[2]]);
  add(root, box(0.2, 0.025, 0.36), pcbBlack, [bb2[0], T + 0.055, bb2[2] + 0.28]);
  add(root, box(0.11, 0.012, 0.13), alu, [bb2[0], T + 0.074, bb2[2] + 0.2]);
  add(root, box(0.02, 0.01, 0.02), ledGreen, [bb2[0] + 0.07, T + 0.072, bb2[2] + 0.4]);

  // Buzzer / LDR box with two round fittings, and the PIR sensor
  const bz = group(root, at(175, 1000));
  add(bz, box(0.34, 0.22, 0.24), card, [0, T + 0.11, 0]);
  for (const dx of [-0.08, 0.08]) {
    add(bz, cyl(0.03, 0.03, 0.04, 16), black, [dx, T + 0.09, 0.13], [Math.PI / 2, 0, 0]);
    add(bz, cyl(0.016, 0.016, 0.02, 12), alu, [dx, T + 0.09, 0.155], [Math.PI / 2, 0, 0]);
  }
  const pir = at(300, 1030);
  add(root, box(0.1, 0.015, 0.1), relayBlue, [pir[0], T + 0.03, pir[2]]);
  add(root, new THREE.SphereGeometry(0.045, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), pirDome, [pir[0], T + 0.037, pir[2]]);
  add(root, box(0.04, 0.02, 0.04), black, [pir[0], T + 0.012, pir[2] - 0.06]);

  // Wires (red / black / yellow), lifted slightly so they drape over the board
  const wire = (pts: [number, number, number?][], m: THREE.Material, r = 0.009) =>
    add(root, tube(pts.map(([px, py, h]) => at(px, py, T + (h ?? 0.02))), r), m);
  // fan unit -> junction -> relays
  wire([[185, 92, 0.12], [300, 110], [440, 150, 0.03], [465, 230], [455, 420], [430, 560], [425, 650, 0.05]], wRed);
  wire([[185, 100, 0.12], [300, 120], [450, 158, 0.03], [470, 240], [470, 430], [480, 560], [480, 650, 0.05]], wBlack);
  // solar panel -> junction
  wire([[700, 140, 0.1], [600, 175], [470, 155, 0.03]], wBlack);
  wire([[690, 150, 0.1], [600, 190], [480, 170, 0.03], [490, 260]], wRed);
  // charge controller loops -> silo and relays
  wire([[100, 420, 0.05], [140, 300, 0.06], [200, 230, 0.08], [330, 260, 0.06], [360, 360], [300, 420], [215, 415]], wBlack);
  wire([[100, 440, 0.05], [190, 420], [330, 450], [480, 470], [640, 510], [740, 520, 0.05]], wRed);
  wire([[100, 470, 0.05], [260, 470], [420, 520], [560, 550], [600, 380], [460, 250]], wBlack, 0.008);
  // silo -> right breadboard (yellow bundle)
  for (let i = 0; i < 3; i++) wire([[790 + i * 8, 500, 0.06], [785 + i * 6, 640], [780 + i * 8, 760], [790 + i * 10, 820, 0.05]], wYellow, 0.007);
  wire([[810, 500, 0.06], [805, 650], [815, 800, 0.05]], wRed, 0.007);
  // relays -> breadboards
  wire([[425, 710, 0.05], [380, 760], [360, 830], [500, 860], [720, 830, 0.05]], wYellow, 0.007);
  wire([[480, 710, 0.05], [520, 790], [640, 800], [760, 790, 0.05]], wRed, 0.007);
  wire([[430, 712, 0.05], [370, 790], [420, 840], [560, 880], [740, 900, 0.05]], wBlack, 0.007);
  // left breadboard -> right breadboard
  wire([[270, 840, 0.05], [420, 800], [600, 820], [760, 870, 0.05]], wYellow, 0.007);
  wire([[270, 860, 0.05], [420, 900], [600, 900], [760, 930, 0.05]], wYellow, 0.007);
  wire([[270, 880, 0.05], [400, 930], [560, 960], [760, 960, 0.05]], wBlack, 0.007);
  // buzzer box -> left breadboard
  wire([[150, 960, 0.15], [100, 900], [120, 860, 0.05]], wBlack);
  wire([[200, 960, 0.15], [230, 920], [220, 870, 0.05]], wRed);
  // PIR -> right breadboard
  wire([[320, 1030, 0.03], [450, 1010], [600, 1000], [760, 990, 0.05]], wYellow, 0.007);
  wire([[320, 1040, 0.03], [450, 1030], [600, 1025], [760, 1010, 0.05]], wRed, 0.007);
  wire([[320, 1050, 0.03], [450, 1050], [600, 1045], [760, 1030, 0.05]], wBlack, 0.007);

  bake(root, ['FanBlades']);
  return root;
}

async function exportGlb(obj: THREE.Object3D, file: string) {
  const scene = new THREE.Scene();
  scene.add(obj);
  const out = (await new GLTFExporter().parseAsync(scene, { binary: true })) as ArrayBuffer;
  writeFileSync(file, Buffer.from(out));
  let tris = 0;
  let meshes = 0;
  obj.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.isMesh) {
      meshes++;
      tris += (m.geometry.index ? m.geometry.index.count : m.geometry.attributes.position.count) / 3;
    }
  });
  console.log(file, `${(out.byteLength / 1024).toFixed(0)} KB`, `${meshes} meshes`, `${Math.round(tris)} triangles`);
}

mkdirSync('/tmp/models', { recursive: true });
await exportGlb(buildSilo(), '/tmp/models/agri-shield-silo.glb');
