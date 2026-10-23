import { useEffect, useRef } from 'react';

const CELL = 16;
const FRAME_MS = 1000 / 30;

/**
 * 2D-canvas fallback used when WebGPU is unavailable.
 * Animates gentle waves and reacts to the pointer with ripples.
 */
export default function ShapeWavesFallback({ speed = 0.7, interactive = true, glow = 0.15 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
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

    const readColors = () => {
      const styles = getComputedStyle(document.documentElement);
      color = `hsl(${styles.getPropertyValue('--secondary').trim()})`;
      hover = `hsl(${styles.getPropertyValue('--accent').trim()})`;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      readColors();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const t = time;
      ctx.shadowColor = hover;
      ctx.shadowBlur = glow > 0 ? 6 * glow * 4 : 0;
      for (let y = CELL / 2; y < height; y += CELL) {
        for (let x = CELL / 2; x < width; x += CELL) {
          let level =
            (Math.sin(x / 120 + t * 0.6 + Math.cos(y / 140 - t * 0.3)) + Math.cos(y / 100 - t * 0.45)) / 4 + 0.5;
          let splash = 0;
          for (const r of ripples) {
            const d = Math.hypot(x - r.x, y - r.y);
            const band = d - r.age * 220;
            if (band > -40 && band < 40) splash += Math.cos(band / 12) * Math.max(0, 1 - r.age / 1.6) * r.power;
          }
          level = Math.min(1, Math.max(0, level + splash * 0.35));
          ctx.fillStyle = splash > 0.15 ? hover : color;
          ctx.globalAlpha = 0.25 + level * 0.75;
          const radius = 1.5 + level * 3;
          ctx.beginPath();
          if (level < 0.33) {
            ctx.moveTo(x, y - radius);
            ctx.lineTo(x + radius, y + radius);
            ctx.lineTo(x - radius, y + radius);
            ctx.closePath();
          } else if (level < 0.66) {
            ctx.arc(x, y, radius, 0, Math.PI * 2);
          } else {
            ctx.rect(x - radius, y - radius, radius * 2, radius * 2);
          }
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = now => {
      frame = requestAnimationFrame(loop);
      if (document.hidden || now - last < FRAME_MS) return;
      const dt = Math.min(0.1, (now - (last || now)) / 1000);
      last = now;
      time += dt * speed;
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].age += dt;
        if (ripples[i].age > 1.6) ripples.splice(i, 1);
      }
      draw();
    };

    const handlePointerMove = event => {
      if (!interactive || reduceMotion.matches) return;
      const now = performance.now();
      if (now - lastRipple < 90) return;
      lastRipple = now;
      const bounds = canvas.getBoundingClientRect();
      ripples.push({ x: event.clientX - bounds.left, y: event.clientY - bounds.top, age: 0, power: 0.8 });
      if (ripples.length > 12) ripples.shift();
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

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [speed, interactive, glow]);

  return <canvas ref={ref} className="shape-waves__canvas shape-waves__fallback" aria-hidden="true" />;
}
