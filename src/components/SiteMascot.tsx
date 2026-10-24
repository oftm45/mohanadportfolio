// The waving character from the letter poster, travelling with the visitor:
// it walks to a new corner for each section, grows or shrinks to fit that
// section, follows the pointer with its eyes and waves when it arrives.
// Purely decorative: aria-hidden and pointer-transparent so it never blocks clicks.
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Character } from '@/components/ui/waving-portfolio-landing';
import './SiteMascot.css';

type Side = 'left' | 'right';
type Spot = { side: Side; size: number; bottom: number; say: string };

// size = character height in px on large screens; bottom = gap from screen bottom (share of screen height)
const SPOTS: Record<string, Spot> = {
  hero: { side: 'left', size: 260, bottom: 0.05, say: "Hi, I'm Mohanad!" },
  about: { side: 'right', size: 210, bottom: 0.06, say: 'About me' },
  skills: { side: 'left', size: 165, bottom: 0.05, say: 'My skills' },
  projects: { side: 'right', size: 140, bottom: 0.04, say: 'Check these out!' },
  achievements: { side: 'left', size: 190, bottom: 0.06, say: 'Gold medal!' },
  certificates: { side: 'right', size: 125, bottom: 0.04, say: 'My certificates' },
  contact: { side: 'left', size: 220, bottom: 0.05, say: 'Say hi!' },
  footer: { side: 'right', size: 160, bottom: 0.03, say: 'Thanks for visiting!' },
  default: { side: 'right', size: 150, bottom: 0.03, say: 'Hi there!' },
};
const ORDER = ['hero', 'about', 'skills', 'projects', 'achievements', 'certificates', 'contact'];

const BASE_W = 230;
const BASE_H = 300;
const MOVE_MS = 1100;
const WAVE_MS = 1500;

const inBand = (el: Element | null, y: number) => {
  if (!el) return false;
  const r = el.getBoundingClientRect();
  return r.top < y && r.bottom > y;
};

function currentSpot(): string {
  const vh = window.innerHeight;
  const mid = vh * 0.55;
  if (inBand(document.querySelector('[data-mascot-hide]'), mid)) return 'hide';
  const footer = document.querySelector('footer');
  if (footer && footer.getBoundingClientRect().top < vh * 0.75) return 'footer';
  for (const id of ORDER) if (inBand(document.getElementById(id), mid)) return id;
  return 'default';
}

const token = (name: string, fallback: string) => {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v ? `hsl(${v})` : fallback;
};

export default function SiteMascot() {
  const { pathname } = useLocation();
  const rootRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const timers = useRef<number[]>([]);
  const nearRef = useRef(false);

  const [key, setKey] = useState('default');
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [moving, setMoving] = useState(false);
  const [waving, setWaving] = useState(false);
  const [talking, setTalking] = useState(false);
  const [near, setNear] = useState(false);
  const [colors] = useState(() => ({ ink: token('--foreground', '#F5F5F5'), paper: token('--background', '#000000') }));

  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));

  // Track which section is in the middle of the screen.
  const sync = useCallback(() => {
    setKey(currentSpot());
    setSize({ w: window.innerWidth, h: window.innerHeight });
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(sync);
    };
    sync();
    const t = window.setTimeout(sync, 900); // sections below the hero load a moment later
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sync, pathname]);

  // Walk, then wave and say something, every time the spot changes.
  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (key === 'hide') {
      setMoving(false);
      setWaving(false);
      setTalking(false);
      return;
    }
    setMoving(true);
    setWaving(false);
    setTalking(false);
    later(() => {
      setMoving(false);
      setWaving(true);
      setTalking(true);
    }, MOVE_MS);
    later(() => setWaving(false), MOVE_MS + WAVE_MS);
    later(() => setTalking(false), MOVE_MS + WAVE_MS + 1300);
  }, [key]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Eyes and head follow the mouse; fade out of the way when the mouse comes close.
  useEffect(() => {
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const { clientX: px, clientY: py } = e;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const root = rootRef.current;
        const box = boxRef.current?.getBoundingClientRect();
        if (!root || !box) return;
        const isNear = px > box.left - 24 && px < box.right + 24 && py > box.top - 24 && py < box.bottom + 24;
        if (isNear !== nearRef.current) {
          nearRef.current = isNear;
          setNear(isNear);
        }
        const h = headRef.current?.getBoundingClientRect();
        if (!h) return;
        const flip = root.dataset.side === 'right' ? -1 : 1;
        const k = (v: number, d: number) => Math.max(-1, Math.min(1, v / d));
        const dx = (px - (h.left + h.width / 2)) * flip;
        const dy = py - (h.top + h.height / 2);
        root.style.setProperty('--wpl-ex', (k(dx, 260) * 4.5).toFixed(2));
        root.style.setProperty('--wpl-ey', (k(dy, 260) * 3.5).toFixed(2));
        root.style.setProperty('--wpl-hr', (k(dx, 700) * 7).toFixed(2));
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  if (!size.w) return null;

  const hidden = key === 'hide';
  const spot = SPOTS[hidden ? 'default' : key] ?? SPOTS.default;
  const mobile = size.w < 768;
  const h = mobile ? Math.min(118, Math.max(80, spot.size * 0.5)) : Math.min(spot.size, size.h * 0.38);
  const s = h / BASE_H;
  const w = BASE_W * s;
  const margin = mobile ? 6 : 20;
  const x = spot.side === 'left' ? margin : size.w - margin - w;
  const y = size.h - spot.bottom * size.h;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      data-side={spot.side}
      className={
        'site-mascot' +
        (hidden ? ' is-hidden' : '') +
        (moving ? ' is-moving' : '') +
        (near ? ' is-near' : '') +
        (mobile ? ' is-mobile' : '')
      }
      style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
    >
      <div
        className={'site-mascot-bubble' + (talking && !hidden ? ' is-on' : '')}
        style={{
          left: spot.side === 'left' ? 0 : w,
          transform: `translate(${spot.side === 'left' ? '0' : '-100%'}, ${-(h + 10)}px)`,
        }}
      >
        {spot.say}
      </div>
      <div ref={boxRef} className="site-mascot-box" style={{ width: w, height: h }}>
        <div className="site-mascot-scale" style={{ transform: `scale(${s})` }}>
          <div className="site-mascot-pop">
            <div className="site-mascot-hop">
              <div className="site-mascot-float">
                <div className="site-mascot-flip">
                  <svg viewBox="0 0 460 600" width={BASE_W} height={BASE_H} overflow="hidden">
                    <g className={'wpl-char' + (waving ? ' is-waving' : '')}>
                      <Character ink={colors.ink} paper={colors.paper} shirtId="site-mascot-shirt" headRef={headRef} />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
