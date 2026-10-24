// Interactive 3D viewer for a project's .glb model: drag to rotate, scroll or pinch to zoom.
// Loaded on demand (three.js is heavy) and only renders while it is on screen.
import { Component, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Html, Lightformer, OrbitControls, useGLTF, useProgress } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { Download, Move3d, RotateCcw } from 'lucide-react';

export type ModelMotion = 'fan' | 'lift' | 'none';

type Props = {
  url: string;
  title: string;
  caption: string;
  downloadName: string;
  motion?: ModelMotion;
  camera?: [number, number, number];
  target?: [number, number, number];
};

const SIZE = 3; // the model is scaled so its largest side is this many units
const CAMERA: [number, number, number] = [4.2, 2.6, 4.6];
const TARGET: [number, number, number] = [0, 1.1, 0];

const token = (name: string, fallback: string) => {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v ? `hsl(${v.split(' ').join(', ')})` : fallback;
};

function Model({ url, motion }: { url: string; motion: ModelMotion }) {
  const { scene } = useGLTF(url);
  const { object, scale, offset } = useMemo(() => {
    const object = scene.clone(true);
    object.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        m.castShadow = true;
        m.receiveShadow = true;
      }
    });
    const bounds = new THREE.Box3().setFromObject(object);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const scale = SIZE / Math.max(size.x, size.y, size.z);
    return { object, scale, offset: new THREE.Vector3(-center.x, -bounds.min.y, -center.z) };
  }, [scene]);

  const fan = useMemo(() => object.getObjectByName('FanBlades'), [object]);
  const lift = useMemo(() => object.getObjectByName('Lift'), [object]);
  const liftBase = useRef(lift?.position.y ?? 0);

  useFrame(({ clock }, delta) => {
    const dt = Math.min(delta, 0.05);
    if (motion === 'fan' && fan) fan.rotation.z -= dt * 9;
    if (motion === 'lift' && lift) lift.position.y = liftBase.current + (Math.sin(clock.elapsedTime * 0.9) * 0.5 + 0.5) * 0.5;
  });

  return (
    <group scale={scale}>
      <primitive object={object} position={offset} />
    </group>
  );
}

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <span className="whitespace-nowrap rounded-full border border-primary/60 bg-background/80 px-3 py-1 text-xs text-foreground">
        Loading 3D model… {Math.round(progress)}%
      </span>
    </Html>
  );
}

class ViewerBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export default function ModelViewer({ url, title, caption, downloadName, motion = 'none', camera = CAMERA, target = TARGET }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const controls = useRef<OrbitControlsImpl>(null);
  const [visible, setVisible] = useState(false);
  const [seen, setSeen] = useState(false);
  const [auto, setAuto] = useState(true);
  const [accent] = useState(() => token('--primary', '#800020'));

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (e.isIntersecting) setSeen(true);
      },
      { rootMargin: '200px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const reset = () => {
    const c = controls.current;
    if (!c) return;
    c.object.position.set(...camera);
    c.target.set(...target);
    c.update();
    setAuto(true);
  };

  const fallback = (
    <div className="flex h-full items-center justify-center p-6 text-center text-sm text-muted-foreground">
      Your browser couldn&apos;t show the 3D model. You can still download it below.
    </div>
  );

  return (
    <figure className="mb-12">
      <div
        ref={wrapRef}
        role="img"
        aria-label={`${title} — interactive 3D model. Drag to rotate, scroll or pinch to zoom.`}
        className="relative h-[420px] overflow-hidden rounded-2xl border border-primary/50 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.22),hsl(var(--background))_70%)] sm:h-[520px]"
        style={{ touchAction: 'none' }}
      >
        {seen && (
          <ViewerBoundary fallback={fallback}>
            <Canvas
              shadows
              dpr={[1, 1.75]}
              frameloop={visible ? 'always' : 'never'}
              camera={{ position: camera, fov: 38, near: 0.1, far: 60 }}
              gl={{ antialias: true, alpha: true }}
            >
              <ambientLight intensity={0.45} />
              <hemisphereLight args={['#ffffff', '#2a0a12', 0.5]} />
              <directionalLight
                position={[5, 8, 4]}
                intensity={2}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-left={-4}
                shadow-camera-right={4}
                shadow-camera-top={4}
                shadow-camera-bottom={-4}
                shadow-bias={-0.0004}
              />
              <pointLight position={[-4, 2.5, -4]} intensity={30} color={accent} />
              <Environment resolution={128}>
                <Lightformer intensity={2} position={[0, 6, 0]} rotation-x={Math.PI / 2} scale={[10, 10, 1]} />
                <Lightformer intensity={1.2} position={[-6, 2, 0]} rotation-y={Math.PI / 2} scale={[12, 2, 1]} />
                <Lightformer intensity={1.2} position={[6, 2, 2]} rotation-y={-Math.PI / 2} scale={[12, 2, 1]} />
                <Lightformer intensity={1.5} color={accent} position={[0, 1, -6]} scale={[12, 3, 1]} />
              </Environment>
              <Suspense fallback={<Loader />}>
                <Model url={url} motion={motion} />
              </Suspense>
              <ContactShadows position={[0, 0.001, 0]} opacity={0.6} scale={8} blur={2.4} far={3} resolution={512} />
              <OrbitControls
                ref={controls}
                makeDefault
                target={target}
                enablePan={false}
                enableDamping
                minDistance={2.4}
                maxDistance={10}
                maxPolarAngle={Math.PI / 2 - 0.04}
                autoRotate={auto}
                autoRotateSpeed={0.9}
                onStart={() => setAuto(false)}
              />
            </Canvas>
          </ViewerBoundary>
        )}

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center gap-2 p-3 text-xs text-muted-foreground">
          <Move3d className="h-4 w-4 text-primary" aria-hidden="true" />
          <span>Drag to rotate · Scroll or pinch to zoom</span>
        </div>
        <div className="absolute bottom-3 end-3 flex gap-2">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-primary/60 bg-background/80 px-4 text-xs text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" /> Reset view
          </button>
          <a
            href={url}
            download={downloadName}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-xs font-medium text-primary-foreground transition-shadow hover:shadow-[0_0_24px_hsl(var(--primary)/0.6)]"
          >
            <Download className="h-4 w-4" aria-hidden="true" /> Download .glb
          </a>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-sm text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}
