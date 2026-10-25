import { useEffect, useRef } from 'react';

const CELL = 18;
const FRAME_MS = 1000 / 24;
const LEVELS = 6;
const RIPPLE_LIFE = 1.6;
const RIPPLE_SPEED = 220;
const RIPPLE_BAND = 40;

/**
 * Lightweight 2D-canvas fallback used when WebGPU is unavailable.
 * Shapes are batched into a few paths per frame (no per-shape shadows) to stay cheap.
 */
export default function ShapeWavesFallback({ speed = 0.7, interactive = true }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !ctx) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const ripples = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let last = 0;
    let time = 0;
    let lastRipple = 0;
    let color = '';
    let hover = '';
    let visible = true;

    const readColors = () => {
      const styles = getComputedStyle(document.documentElement);
      color = `hsl(${styles.getPropertyValue('--secondary').trim()})`;
      hover = `hsl(${styles.getPropertyValue('--wave-hover').trim()})`;
    };

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.max(1, width);
      canvas.height = Math.max(1, height);
      readColors();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const t = time;
      const base = Array.from({ length: LEVELS }, () => new Path2D());
      const lit = Array.from({ length: LEVELS }, () => new Path2D());
      const active = ripples.map(r => ({ x: r.x, y: r.y, front: r.age * RIPPLE_SPEED, power: Math.max(0, 1 - r.age / RIPPLE_LIFE) * r.power }));

      for (let y = CELL / 2; y < height; y += CELL) {
        const rowWave = Math.cos(y / 100 - t * 0.45);
        const rowShift = y / 140 - t * 0.3;
        for (let x = CELL / 2; x < width; x += CELL) {
          let level = (Math.sin(x / 120 + t * 0.6 + Math.cos(rowShift)) + rowWave) / 4 + 0.5;
          let splash = 0;
          for (let i = 0; i < active.length; i++) {
            const r = active[i];
            const dx = x - r.x;
            const dy = y - r.y;
            const outer = r.front + RIPPLE_BAND;
            const distSq = dx * dx + dy * dy;
            if (distSq > outer * outer) continue;
            const band = Math.sqrt(distSq) - r.front;
            if (band > -RIPPLE_BAND) splash += Math.cos(band / 12) * r.power;
          }
          if (splash) level = Math.min(1, Math.max(0, level + splash * 0.35));
          const bucket = Math.min(LEVELS - 1, (level * LEVELS) | 0);
          const path = splash > 0.15 ? lit[bucket] : base[bucket];
          const radius = 1.5 + level * 3;
          if (level < 0.33) {
            path.moveTo(x, y - radius);
            path.lineTo(x + radius, y + radius);
            path.lineTo(x - radius, y + radius);
            path.closePath();
          } else if (level < 0.66) {
            path.moveTo(x + radius, y);
            path.arc(x, y, radius, 0, Math.PI * 2);
          } else {
            path.rect(x - radius, y - radius, radius * 2, radius * 2);
          }
        }
      }

      for (let i = 0; i < LEVELS; i++) {
        ctx.globalAlpha = 0.25 + ((i + 0.5) / LEVELS) * 0.75;
        ctx.fillStyle = color;
        ctx.fill(base[i]);
        ctx.fillStyle = hover;
        ctx.fill(lit[i]);
      }
      ctx.globalAlpha = 1;
    };

    const loop = now => {
      frame = requestAnimationFrame(loop);
      if (!visible || document.hidden || now - last < FRAME_MS) return;
      const dt = Math.min(0.1, (now - (last || now)) / 1000);
      last = now;
      time += dt * speed;
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].age += dt;
        if (ripples[i].age > RIPPLE_LIFE) ripples.splice(i, 1);
      }
      draw();
    };

    const handlePointerMove = event => {
      if (!interactive || reduceMotion.matches) return;
      const now = performance.now();
      if (now - lastRipple < 120) return;
      lastRipple = now;
      ripples.push({ x: event.clientX, y: event.clientY, age: 0, power: 0.8 });
      if (ripples.length > 6) ripples.shift();
    };

    const handleVisibility = () => {
      visible = !document.hidden;
    };

    const observer = new ResizeObserver(() => {
      resize();
      draw();
    });
    observer.observe(canvas);
    resize();
    draw();
    if (!reduceMotion.matches) frame = requestAnimationFrame(loop);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [speed, interactive]);

  return <canvas ref={ref} className="shape-waves__canvas shape-waves__fallback" aria-hidden="true" />;
}
