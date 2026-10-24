// Builds the two 3D models shown on the project pages and exports them as .glb files.
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

// ---------------------------------------------------------------- Agri-Shield silo
function buildSilo() {
  const root = new THREE.Group();
  root.name = 'AgriShieldSilo';
  const steel = mat('GalvanizedSteel', '#c6cacf', 0.8, 0.34);
  const steelDark = mat('SteelBand', '#8d939a', 0.85, 0.4);
  const roofM = mat('RoofSteel', '#b3b8be', 0.8, 0.3);
  const concrete = mat('Concrete', '#55554f', 0, 0.95);
  const burgundy = mat('AgriShieldBurgundy', '#800020', 0.2, 0.45);
  const black = mat('BlackPlastic', '#1a1a1c', 0, 0.55);
  const darkGrey = mat('FanHousing', '#3a3d42', 0.4, 0.5);
  const white = mat('WhitePlastic', '#e9e9e6', 0, 0.5);
  const enclosure = mat('Enclosure', '#d4d6d8', 0.1, 0.45);
  const solar = mat('SolarCells', '#152747', 0.5, 0.18);
  const alu = mat('Aluminium', '#d0d3d6', 0.9, 0.28);
  const blue = mat('ControllerBlue', '#1f4fa8', 0.1, 0.45);
  const lamp = mat('FloodlightLens', '#fff3d1', 0, 0.2, { emissive: '#ffe9b0', emissiveIntensity: 1.6 });
  const ledGreen = mat('LedGreen', '#30ff70', 0, 0.3, { emissive: '#22ff66', emissiveIntensity: 2 });
  const ledRed = mat('LedRed', '#ff3040', 0, 0.3, { emissive: '#ff2030', emissiveIntensity: 2 });
  const pcb = mat('SensorBoard', '#1d5fbf', 0.2, 0.5);

  const Y0 = 0.15; // top of the concrete pad
  const H = 2.1; // height of the walls
  const R = 1;
  const top = Y0 + H;

  // Concrete pad
  add(root, box(4.8, 0.15, 3.8), concrete, [0, 0.075, 0.3]);

  // Corrugated walls
  const pts: THREE.Vector2[] = [new THREE.Vector2(0.001, Y0), new THREE.Vector2(R, Y0)];
  const N = 168;
  for (let i = 0; i <= N; i++) {
    const y = Y0 + (H * i) / N;
    pts.push(new THREE.Vector2(R + 0.012 * Math.sin(((y - Y0) / 0.1) * Math.PI * 2), y));
  }
  pts.push(new THREE.Vector2(0.001, top));
  add(root, new THREE.LatheGeometry(pts, 64), steel);

  // Stiffener bands and the burgundy brand stripe
  for (const y of [Y0 + 0.05, 0.75, 1.35]) add(root, new THREE.TorusGeometry(R + 0.016, 0.018, 8, 64), steelDark, [0, y, 0], [Math.PI / 2, 0, 0]);
  add(root, cyl(R + 0.022, R + 0.022, 0.2, 64), burgundy, [0, 1.95, 0]);

  // Roof, seams, eave ring and vent cap
  const roofH = 0.72;
  const roofR = R + 0.1;
  add(root, new THREE.ConeGeometry(roofR, roofH, 64), roofM, [0, top + roofH / 2, 0]);
  add(root, new THREE.TorusGeometry(roofR, 0.026, 8, 64), steelDark, [0, top + 0.01, 0], [Math.PI / 2, 0, 0]);
  const slope = Math.atan2(roofH, roofR);
  const ribLen = Math.hypot(roofR, roofH);
  for (let i = 0; i < 16; i++) {
    const g = group(root, [0, 0, 0], [0, (i / 16) * Math.PI * 2, 0]);
    add(g, box(ribLen, 0.02, 0.03), steelDark, [roofR / 2, top + roofH / 2 + 0.012, 0], [0, 0, -slope]);
  }
  add(root, cyl(0.13, 0.13, 0.16), darkGrey, [0, top + roofH + 0.02, 0]);
  add(root, new THREE.ConeGeometry(0.22, 0.12, 24), roofM, [0, top + roofH + 0.16, 0]);

  // Door
  const door = group(root, [0, 0, 0], [0, -0.45, 0]);
  add(door, box(0.5, 0.8, 0.04), steelDark, [0, Y0 + 0.5, R + 0.02]);
  add(door, box(0.42, 0.02, 0.045), steel, [0, Y0 + 0.62, R + 0.025]);
  add(door, box(0.04, 0.12, 0.05), black, [0.17, Y0 + 0.5, R + 0.05]);

  // Ladder with stand-offs
  const ladder = group(root, [0, 0, 0], [0, 0.95, 0]);
  const lz = R + 0.14;
  for (const x of [-0.16, 0.16]) {
    add(ladder, box(0.035, top - Y0 + 0.2, 0.035), steelDark, [x, (Y0 + top + 0.2) / 2, lz]);
    for (const y of [0.4, 1.2, 2.0]) add(ladder, box(0.025, 0.025, 0.14), steelDark, [x, y, R + 0.07]);
  }
  for (let y = Y0 + 0.25; y < top + 0.15; y += 0.24) add(ladder, cyl(0.013, 0.013, 0.32, 8), steel, [0, y, lz], [0, 0, Math.PI / 2]);

  // Ventilation fan (blades spin in the viewer)
  const fanTheta = -1.65;
  const fanY = 0.85;
  const fan = group(root, [0, 0, 0], [0, fanTheta, 0]);
  add(fan, cyl(0.28, 0.28, 0.16, 32), darkGrey, [0, fanY, R + 0.06], [Math.PI / 2, 0, 0]);
  add(fan, new THREE.TorusGeometry(0.27, 0.025, 8, 32), black, [0, fanY, R + 0.14]);
  const blades = group(fan, [0, fanY, R + 0.15], [0, 0, 0], 'FanBlades');
  add(blades, cyl(0.05, 0.05, 0.04, 16), black, [0, 0, 0], [Math.PI / 2, 0, 0]);
  for (let i = 0; i < 5; i++) {
    const b = group(blades, [0, 0, 0], [0, 0, (i / 5) * Math.PI * 2]);
    add(b, box(0.075, 0.2, 0.012), darkGrey, [0, 0.13, 0], [0, 0.45, 0]);
  }
  for (const r of [0.12, 0.2]) add(fan, new THREE.TorusGeometry(r, 0.006, 6, 32), steel, [0, fanY, R + 0.19]);
  for (let i = 0; i < 4; i++) add(fan, box(0.012, 0.54, 0.012), steel, [0, fanY, R + 0.19], [0, 0, (i / 4) * Math.PI]);

  // Sensors on the wall: DHT22, MQ-135 and PIR
  const sensors = group(root, [0, 0, 0], [0, 0.32, 0]);
  add(sensors, box(0.09, 0.12, 0.035), white, [0, 1.25, R + 0.03]);
  for (let i = 0; i < 4; i++) add(sensors, box(0.07, 0.008, 0.04), black, [0, 1.21 + i * 0.025, R + 0.031]);
  add(sensors, box(0.11, 0.08, 0.015), pcb, [0.18, 1.25, R + 0.02]);
  add(sensors, cyl(0.032, 0.032, 0.05, 16), steel, [0.18, 1.25, R + 0.05], [Math.PI / 2, 0, 0]);
  add(sensors, box(0.12, 0.08, 0.05), white, [-0.6, Y0 + 1.0, R + 0.04]);
  add(sensors, new THREE.SphereGeometry(0.045, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), white, [-0.6, Y0 + 1.0, R + 0.066], [Math.PI / 2, 0, 0]);

  // Floodlight on the eave
  const flood = group(root, [0, 0, 0], [0, 0.15, 0]);
  add(flood, box(0.05, 0.05, 0.2), black, [0, top + 0.05, R + 0.12]);
  const head = group(flood, [0, top + 0.02, R + 0.24], [0.5, 0, 0]);
  add(head, box(0.24, 0.15, 0.1), black);
  add(head, box(0.2, 0.11, 0.01), lamp, [0, 0, 0.051]);
  for (let i = 0; i < 5; i++) add(head, box(0.012, 0.13, 0.05), black, [-0.1 + i * 0.05, 0, -0.07]);

  // Control box (ESP32, relays) on a post
  const cb: V3 = [1.65, 0, 1.0];
  const ctrl = group(root, cb, [0, -0.5, 0]);
  add(ctrl, cyl(0.04, 0.04, 1.25, 12), steelDark, [0, 0.15 + 0.62, -0.12]);
  add(ctrl, box(0.48, 0.58, 0.2), enclosure, [0, 1.05, 0]);
  add(ctrl, box(0.5, 0.06, 0.22), burgundy, [0, 1.36, 0]);
  add(ctrl, box(0.005, 0.5, 0.005), black, [0, 1.03, 0.101]);
  add(ctrl, box(0.03, 0.08, 0.03), black, [0.2, 1.03, 0.11]);
  add(ctrl, box(0.03, 0.03, 0.01), ledGreen, [-0.15, 1.24, 0.102]);
  add(ctrl, box(0.03, 0.03, 0.01), ledRed, [-0.09, 1.24, 0.102]);
  add(ctrl, box(0.16, 0.08, 0.008), black, [-0.1, 1.12, 0.102]);
  for (let i = 0; i < 4; i++) add(ctrl, box(0.3, 0.01, 0.006), black, [0, 0.82 + i * 0.03, 0.101]);
  add(ctrl, box(0.18, 0.12, 0.08), blue, [0, 0.82 + 0.0, -0.18]);

  // Solar panel with charge controller
  const sp = group(root, [-1.85, 0.15, 0.85], [0, 0.5, 0]);
  add(sp, cyl(0.05, 0.06, 1.55, 12), steelDark, [0, 0.77, 0]);
  add(sp, box(0.2, 0.26, 0.06), blue, [0, 0.85, 0.06]);
  add(sp, box(0.2, 0.05, 0.065), black, [0, 0.72, 0.06]);
  add(sp, box(0.06, 0.06, 0.012), black, [0, 0.9, 0.095]);
  const panel = group(sp, [0, 1.58, 0], [-0.62, 0, 0]);
  add(panel, box(1.36, 0.045, 0.88), alu);
  add(panel, box(1.3, 0.05, 0.82), solar);
  for (let i = 1; i < 6; i++) add(panel, box(0.008, 0.052, 0.82), alu, [-0.65 + (i * 1.3) / 6, 0, 0]);
  for (let i = 1; i < 3; i++) add(panel, box(1.3, 0.052, 0.008), alu, [0, 0, -0.41 + (i * 0.82) / 3]);
  add(panel, box(0.1, 0.1, 0.1), steelDark, [0, -0.07, 0]);

  // Cables from the control box
  root.updateMatrixWorld(true);
  const ctrlPort = new THREE.Vector3(-0.15, 0.78, -0.05).applyMatrix4(ctrl.matrixWorld);
  const port = (dx: number): V3 => [ctrlPort.x + dx, ctrlPort.y, ctrlPort.z];
  const fanPt = polar(R + 0.1, fanTheta + 0.25, fanY - 0.22);
  const solarPt = new THREE.Vector3(0, 0.72, 0.1).applyMatrix4(sp.matrixWorld);
  const floodPt = polar(R + 0.06, 0.15, top - 0.05);
  const sensorPt = polar(R + 0.04, 0.32, 1.17);
  add(root, tube([port(0), [1.2, 0.2, 1.1], [0, 0.18, 1.12], polar(R + 0.05, -0.9, 0.2), [fanPt[0], 0.3, fanPt[2]], fanPt]), black);
  add(root, tube([port(0.04), [1.3, 0.19, 1.25], [0, 0.19, 1.45], [-1.2, 0.18, 1.2], [solarPt.x, 0.2, solarPt.z + 0.05], [solarPt.x, solarPt.y, solarPt.z]]), black);
  add(root, tube([port(-0.04), [1.25, 0.6, 0.7], polar(R + 0.05, 0.6, 1.0), polar(R + 0.05, 0.3, 1.7), floodPt]), black);
  add(root, tube([port(0.08), [1.2, 0.9, 0.85], [sensorPt[0] + 0.15, 1.1, sensorPt[2] + 0.1], sensorPt], 0.009), black);

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
