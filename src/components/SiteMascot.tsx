// The waving character from the letter poster, travelling with the visitor:
// it travels to a new corner for each section (with a different move each time),
// grows or shrinks to fit that section, follows the pointer with its eyes and waves on arrival.
// Purely decorative: aria-hidden and pointer-transparent so it never blocks clicks.
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { animate, motion, useMotionValue, useTransform, type MotionValue } from 'framer-motion';
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

// Each trip uses one of these, never the same twice in a row.
type Move = 'hop' | 'glide' | 'leap' | 'float' | 'teleport' | 'twirl';
const MOVES: Move[] = ['glide', 'leap', 'float', 'twirl', 'hop', 'teleport'];

const BASE_W = 230;
const BASE_H = 300;
const WAVE_MS = 1500;
const SMOOTH = [0.65, 0, 0.35, 1] as const; // soft ease-in-out
const SOFT_SPRING = { type: 'spring', stiffness: 90, damping: 20 } as const;

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

function layout(key: string, vw: number, vh: number) {
  const spot = SPOTS[key] ?? SPOTS.default;
  const mobile = vw < 768;
  const h = mobile ? Math.min(118, Math.max(80, spot.size * 0.5)) : Math.min(spot.size, vh * 0.38);
  const s = h / BASE_H;
  const w = BASE_W * s;
  const margin = mobile ? 6 : 20;
  const x = spot.side === 'left' ? margin : vw - margin - w;
  const y = vh - spot.bottom * vh;
  return { spot, mobile, h, w, s, x, y };
}

const token = (name: string, fallback: string) => {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v ? `hsl(${v})` : fallback;
};

const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

type Bubble = { say: string; side: Side; w: number; h: number };

export default function SiteMascot() {
  const { pathname } = useLocation();
  const rootRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const timers = useRef<number[]>([]);
  const nearRef = useRef(false);
  const placed = useRef(false);
  const prevKey = useRef('');
  const lastMove = useRef<Move | null>(null);

  const [key, setKey] = useState('default');
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [waving, setWaving] = useState(false);
  const [bubble, setBubble] = useState<Bubble | null>(null);
  const [talking, setTalking] = useState(false);
  const [near, setNear] = useState(false);
  const [colors] = useState(() => ({ ink: token('--foreground', '#F5F5F5'), paper: token('--background', '#000000') }));

  // Screen position (bottom-left corner of the character) and its size.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const lift = useMotionValue(0); // extra height for jumps and floating, in screen px
  const yAll = useTransform<number, number>([y, lift], ([a, b]) => a + b);
  const s = useMotionValue(1);
  // Body motion during the trip.
  const lean = useMotionValue(0);
  const spin = useMotionValue(0);
  const hop = useMotionValue(0);
  const sqx = useMotionValue(1);
  const sqy = useMotionValue(1);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));

  // Track which section is in the middle of the screen.
  const sync = useCallback(() => {
    setKey(currentSpot());
    setSize((prev) =>
      prev.w === window.innerWidth && prev.h === window.innerHeight ? prev : { w: window.innerWidth, h: window.innerHeight },
    );
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

  // Travel (or just settle after a resize) whenever the spot or screen size changes.
  useEffect(() => {
    if (!size.w) return;
    const keyChanged = prevKey.current !== key;
    prevKey.current = key;

    if (key === 'hide') {
      clearTimers();
      setWaving(false);
      setTalking(false);
      return; // stay put and duck out of view (CSS)
    }

    const t = layout(key, size.w, size.h);
    const arrive = (delayMs: number) => {
      later(() => {
        setBubble({ say: t.spot.say, side: t.spot.side, w: t.w, h: t.h });
        setWaving(true);
        setTalking(true);
      }, delayMs);
      later(() => setWaving(false), delayMs + WAVE_MS);
      later(() => setTalking(false), delayMs + WAVE_MS + 1300);
    };

    if (!placed.current || prefersReducedMotion()) {
      placed.current = true;
      [x, y, s].forEach((mv, i) => mv.set([t.x, t.y, t.s][i]));
      [lift, lean, spin, hop].forEach((mv) => mv.set(0));
      sqx.set(1);
      sqy.set(1);
      if (keyChanged) {
        clearTimers();
        arrive(300);
      }
      return;
    }

    if (!keyChanged) {
      // Only the screen size changed: glide softly to the corrected spot.
      animate(x, t.x, SOFT_SPRING);
      animate(y, t.y, SOFT_SPRING);
      animate(s, t.s, SOFT_SPRING);
      return;
    }

    clearTimers();
    setWaving(false);
    setTalking(false);

    const options = MOVES.filter((m) => m !== lastMove.current);
    const move = options[Math.floor(Math.random() * options.length)];
    lastMove.current = move;

    const dx = t.x - x.get();
    const dir = dx >= 0 ? 1 : -1;
    const dist = Math.hypot(dx, t.y - y.get());
    const k = t.mobile ? 0.55 : 1; // smaller jumps on phones
    const travel = (duration: number, delay = 0, ease: typeof SMOOTH | 'easeInOut' = SMOOTH) => {
      animate(x, t.x, { duration, delay, ease });
      animate(y, t.y, { duration, delay, ease });
      animate(s, t.s, { duration, delay, ease });
    };
    const settle = (mv: MotionValue<number>, to: number, duration = 0.4) => animate(mv, to, { duration, ease: 'easeOut' });
    // Soft squash when landing.
    const land = (atMs: number) =>
      later(() => {
        animate(sqy, [null, 0.88, 1.04, 1], { duration: 0.5, ease: 'easeOut' });
        animate(sqx, [null, 1.1, 0.98, 1], { duration: 0.5, ease: 'easeOut' });
      }, atMs);

    let total = 1600;
    switch (move) {
      case 'glide': {
        // Leans into the direction of travel and slides over.
        const d = 1.7;
        travel(d);
        animate(lean, [null, 12 * dir, 12 * dir, 0], { duration: d, times: [0, 0.25, 0.75, 1], ease: 'easeInOut' });
        animate(lift, [null, -24 * k, 0], { duration: d, ease: 'easeInOut' });
        settle(spin, 0);
        settle(hop, 0);
        land(d * 1000 - 80);
        total = d * 1000 + 250;
        break;
      }
      case 'hop': {
        // Three bouncy little jumps.
        const d = 1.6;
        travel(d, 0, 'easeInOut');
        animate(hop, [null, -70, 0, -70, 0, -70, 0], {
          duration: d,
          ease: ['easeOut', 'easeIn', 'easeOut', 'easeIn', 'easeOut', 'easeIn'],
        });
        animate(lean, [null, 6 * dir, 6 * dir, 0], { duration: d, times: [0, 0.15, 0.85, 1], ease: 'easeInOut' });
        settle(lift, 0);
        settle(spin, 0);
        land(d * 1000 - 40);
        total = d * 1000 + 250;
        break;
      }
      case 'leap': {
        // Crouches, leaps high with a somersault, lands with a squash.
        const d = 1.5;
        const height = Math.min(260, 140 + dist * 0.1) * k;
        animate(sqy, [null, 0.8, 1.1, 1], { duration: 0.45, times: [0, 0.45, 0.8, 1], ease: 'easeInOut' });
        animate(sqx, [null, 1.14, 0.94, 1], { duration: 0.45, times: [0, 0.45, 0.8, 1], ease: 'easeInOut' });
        travel(d - 0.25, 0.25);
        animate(lift, [null, -height, 0], { duration: d - 0.25, delay: 0.25, ease: ['easeOut', 'easeIn'] });
        spin.set(0);
        animate(spin, [0, 360 * dir], { duration: d - 0.55, delay: 0.4, ease: 'easeInOut' });
        settle(lean, 0);
        settle(hop, 0);
        later(() => spin.set(0), d * 1000 + 20);
        land(d * 1000 - 40);
        total = d * 1000 + 300;
        break;
      }
      case 'float': {
        // Drifts slowly like a balloon, swaying side to side.
        const d = 2.3;
        travel(d, 0, 'easeInOut');
        animate(lift, [null, -70 * k, -40 * k, -80 * k, 0], { duration: d, ease: 'easeInOut' });
        animate(lean, [null, -7, 6, -5, 0], { duration: d, ease: 'easeInOut' });
        animate(sqx, [null, 0.96, 1.03, 0.97, 1], { duration: d, ease: 'easeInOut' });
        animate(sqy, [null, 1.04, 0.97, 1.03, 1], { duration: d, ease: 'easeInOut' });
        settle(spin, 0);
        settle(hop, 0);
        total = d * 1000 + 150;
        break;
      }
      case 'twirl': {
        // Spins around on the spot while gliding over with a small lift.
        const d = 1.8;
        travel(d);
        animate(sqx, [null, -1, 1, -1, 1], { duration: d, ease: 'easeInOut' });
        animate(lift, [null, -50 * k, 0], { duration: d, ease: ['easeOut', 'easeIn'] });
        settle(lean, 0);
        settle(spin, 0);
        settle(hop, 0);
        later(() => animate(sqy, [null, 0.9, 1.03, 1], { duration: 0.45, ease: 'easeOut' }), d * 1000 - 60);
        total = d * 1000 + 250;
        break;
      }
      case 'teleport': {
        // Spins down to nothing, then pops up in the new corner.
        animate(sqx, 0, { duration: 0.4, ease: 'backIn' });
        animate(sqy, 0, { duration: 0.4, ease: 'backIn' });
        animate(spin, 220 * dir, { duration: 0.4, ease: 'easeIn' });
        settle(lean, 0, 0.3);
        settle(hop, 0, 0.3);
        settle(lift, 0, 0.3);
        later(() => {
          x.set(t.x);
          y.set(t.y);
          s.set(t.s);
          spin.set(-140 * dir);
          animate(spin, 0, { type: 'spring', stiffness: 170, damping: 15 });
          animate(sqx, 1, { type: 'spring', stiffness: 260, damping: 13 });
          animate(sqy, 1, { type: 'spring', stiffness: 260, damping: 13 });
        }, 460);
        total = 1250;
        break;
      }
    }
    arrive(total);
  }, [key, size.w, size.h]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => clearTimers(), []);

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
        const c = (v: number, d: number) => Math.max(-1, Math.min(1, v / d));
        const dx = (px - (h.left + h.width / 2)) * flip;
        const dy = py - (h.top + h.height / 2);
        root.style.setProperty('--wpl-ex', (c(dx, 260) * 4.5).toFixed(2));
        root.style.setProperty('--wpl-ey', (c(dy, 260) * 3.5).toFixed(2));
        root.style.setProperty('--wpl-hr', (c(dx, 700) * 7).toFixed(2));
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
  const side = (SPOTS[hidden ? prevSideKey(bubble) : key] ?? SPOTS.default).side;
  const mobile = size.w < 768;

  return (
    <motion.div
      ref={rootRef}
      aria-hidden="true"
      data-side={hidden && bubble ? bubble.side : side}
      className={'site-mascot' + (hidden ? ' is-hidden' : '') + (near ? ' is-near' : '') + (mobile ? ' is-mobile' : '')}
      style={{ x, y: yAll }}
    >
      {bubble && (
        <div
          className={'site-mascot-bubble' + (talking && !hidden ? ' is-on' : '')}
          style={{
            left: bubble.side === 'left' ? 0 : bubble.w,
            transform: `translate(${bubble.side === 'left' ? '0' : '-100%'}, ${-(bubble.h + 10)}px)`,
          }}
        >
          {bubble.say}
        </div>
      )}
      <motion.div ref={boxRef} className="site-mascot-box" style={{ scale: s, originX: 0, originY: 1 }}>
        <div className="site-mascot-pop">
          <motion.div className="site-mascot-lean" style={{ rotate: lean, y: hop, scaleX: sqx, scaleY: sqy, originY: 1 }}>
            <motion.div className="site-mascot-spin" style={{ rotate: spin }}>
              <div className="site-mascot-float">
                <div className="site-mascot-flip">
                  <svg viewBox="0 0 460 600" width={BASE_W} height={BASE_H} overflow="hidden">
                    <g className={'wpl-char' + (waving ? ' is-waving' : '')}>
                      <Character ink={colors.ink} paper={colors.paper} shirtId="site-mascot-shirt" headRef={headRef} />
                    </g>
                  </svg>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// While hidden, keep facing the way it last arrived.
const prevSideKey = (b: Bubble | null) => (b?.side === 'left' ? 'hero' : 'default');
