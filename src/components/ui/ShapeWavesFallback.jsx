import { useEffect, useRef } from 'react';

export default function ShapeWavesFallback() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      ctx.fillStyle = `hsl(${getComputedStyle(document.documentElement).getPropertyValue('--secondary')})`;
      for (let y = 7; y < height; y += 14) {
        for (let x = 7; x < width; x += 14) {
          const level = (Math.sin(x / 100 + Math.cos(y / 110)) + Math.cos(y / 90)) / 4 + 0.5;
          ctx.globalAlpha = 0.3 + level * 0.7;
          const radius = 2 + level * 2;
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
    };
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    draw();
    return () => observer.disconnect();
  }, []);
  return <canvas ref={ref} className="shape-waves__canvas shape-waves__fallback" aria-hidden="true" />;
}