import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import FolderFloat from '@/components/ui/FolderFloat';

type Group = 'awards' | 'tech' | 'activities';

type Certificate = {
  title: string;
  short: string; // label on the floating pill
  issuer: string;
  date: string; // display
  sort: string; // YYYY-MM-DD for ordering
  file: string; // path in the "certificate" storage bucket
  group: Group;
  award?: boolean;
};

const CERTIFICATES: Certificate[] = [
  { title: 'Winner – Privacy & National Security Debate', short: 'Debate Winner', issuer: 'Manarat Al Sharjah Private School', date: '2025 – 2026', sort: '2025-12-01', file: 'debate 2.pdf', group: 'awards', award: true },
  { title: '2nd Place – 15th Annual Engineering Competition (Industrial Engineering)', short: '2nd – RIT Dubai Engineering', issuer: 'Rochester Institute of Technology Dubai', date: 'Nov 11, 2025', sort: '2025-11-11', file: 'Second place winner - Mohanad Abubaker.pdf', group: 'awards', award: true },
  { title: '1st Place – Smart Greenhouse Project', short: '1st – Smart Greenhouse', issuer: 'Manarat Al Sharjah Private School', date: '2024 – 2025', sort: '2025-03-01', file: 'First place.pdf', group: 'awards', award: true },
  { title: '2nd Place – School Science Fair', short: '2nd – Science Fair', issuer: 'Manarat Al Sharjah Private School', date: '2023 – 2024', sort: '2024-03-01', file: 'Second place.pdf', group: 'awards', award: true },

  { title: 'UAE AI Summer Camp 8.0 – Attendance', short: 'AI Summer Camp 8.0', issuer: 'National Program for Coders & Coders HQ', date: 'Aug 17 – 29, 2026', sort: '2026-08-29', file: 'Certificate_AI_Summer_Camp.pdf', group: 'tech' },
  { title: 'Safe AI Cup 2026 – Participation', short: 'Safe AI Cup 2026', issuer: 'University of Dubai', date: 'Jun 3, 2026', sort: '2026-06-03', file: 'SAFE AI CUP.pdf', group: 'tech' },
  { title: 'Introduction to Critical Infrastructure Protection (ICIP)', short: 'OPSWAT ICIP', issuer: 'OPSWAT Academy', date: 'May 30, 2026', sort: '2026-05-30', file: 'introduction_to_cip.png', group: 'tech' },
  { title: 'Oratory and Diction Course', short: 'Oratory & Diction', issuer: 'M3aarf', date: 'May 29, 2026', sort: '2026-05-29', file: 'M3aarf_Certificate (1).pdf', group: 'activities' },
  { title: 'Claude 101', short: 'Claude 101', issuer: 'Anthropic', date: 'May 23, 2026', sort: '2026-05-23', file: 'certificate-j479abaut3mr-1779539199.pdf', group: 'tech' },
  { title: 'Claude Code 101', short: 'Claude Code 101', issuer: 'Anthropic', date: 'May 23, 2026', sort: '2026-05-22', file: 'certificate-r69dc8z7pwgz-1779540003.pdf', group: 'tech' },
  { title: 'Claude Code in Action', short: 'Claude Code in Action', issuer: 'Anthropic', date: 'May 18, 2026', sort: '2026-05-18', file: 'certificate-nkjdynax97en-1779097017 (1).pdf', group: 'tech' },
  { title: 'AI Debate – "Is AI an Opportunity or a Threat to Humanity?"', short: 'AI Debate – Ajman', issuer: 'Al Shola Private School, Ajman', date: 'Oct 2025', sort: '2025-10-31', file: 'AJ debate.pdf', group: 'activities' },
  { title: 'HTML/CSS Coding Challenge – Medium Level', short: 'UAE Codes – Medium', issuer: 'UAE Codes', date: 'Oct 30, 2025', sort: '2025-10-30', file: 'UAE_Codes_Certificate_Mohanad_Abubaker_medium.pdf', group: 'tech' },
  { title: 'HTML/CSS Coding Challenge – Easy Level', short: 'UAE Codes – Easy', issuer: 'UAE Codes', date: 'Oct 30, 2025', sort: '2025-10-29', file: 'UAE_Codes_Certificate_Mohanad_Abubaker_easy.pdf', group: 'tech' },
  { title: 'Student Summer Course in Islamic Sciences', short: 'Islamic Sciences Course', issuer: 'Islamic Affairs Department – Sharjah', date: 'Jul 2025', sort: '2025-07-24', file: 'Islamic affairs.pdf', group: 'activities' },
  { title: 'University of Fujairah Sustainability Research Competitions', short: 'UOF Sustainability', issuer: 'University of Fujairah', date: 'May 22, 2025', sort: '2025-05-22', file: 'UOF.pdf', group: 'activities' },
  { title: '28th Al Shola Innovation Exhibition', short: 'Al Shola Innovation Expo', issuer: 'Al Shola Education Foundation', date: '2024 – 2025', sort: '2025-05-01', file: 'SEED 2025.pdf', group: 'activities' },
  { title: 'AI National Championship 2024–2025 – Appreciation', short: 'AI National Championship', issuer: 'UAE Ministry of Education & ICT Fund', date: '2025', sort: '2025-04-01', file: 'AINC.pdf', group: 'tech' },
  { title: '1 Million Prompters – Completion', short: '1 Million Prompters', issuer: 'Dubai Centre for Artificial Intelligence', date: '2026', sort: '2025-01-01', file: 'mohanad-abubaker-certificate.pdf', group: 'tech' },
];

/** Awards first, then newest first. */
export const sortCertificates = <T extends Pick<Certificate, 'award' | 'sort'>>(list: T[]) =>
  [...list].sort((a, b) => Number(!!b.award) - Number(!!a.award) || b.sort.localeCompare(a.sort));

const ordered = sortCertificates(CERTIFICATES);

const GROUPS: { id: Group; label: string }[] = [
  { id: 'awards', label: 'Awards' },
  { id: 'tech', label: 'AI & Tech' },
  { id: 'activities', label: 'Activities' },
];

/** Files are served by a backend function that redirects to a short-lived link; the storage bucket stays private. */
const fileUrl = (file: string) =>
  `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/certificate-file?file=${encodeURIComponent(file)}`;

const openCertificate = (file: string) => {
  window.open(fileUrl(file), '_blank', 'noopener,noreferrer');
};

/** Height the floating labels need above a folder, read from their resting positions. */
const measureCloud = (root: HTMLElement | null) => {
  if (!root) return 0;
  const pills = [...root.querySelectorAll<HTMLElement>('.folder-float__item')];
  const top = pills.reduce((m, el) => Math.max(m, -parseFloat(el.style.getPropertyValue('--y') || '0')), 0);
  const h = pills[0]?.offsetHeight ?? 40;
  return Math.ceil(top + h + 24);
};

const useViewportWidth = () => {
  const [w, setW] = useState(() => (typeof window === 'undefined' ? 1280 : window.innerWidth));
  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return w;
};

type FolderGroupProps = {
  label: string;
  items: Certificate[];
  index: number;
  compact: boolean;
  spread: number;
  sharedCloud: number;
  onCloud: (h: number) => void;
};

const FolderGroup = ({ label, items, index, compact, spread, sharedCloud, onCloud }: FolderGroupProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [cloud, setCloud] = useState(0);

  // Measure while closed so physics movement doesn't change the reserved space.
  useEffect(() => {
    if (open) return;
    const run = () => {
      const h = measureCloud(ref.current);
      if (h) {
        setCloud(h);
        onCloud(h);
      }
    };
    const t = setTimeout(run, 60);
    document.fonts?.ready.then(run);
    return () => clearTimeout(t);
  }, [open, spread, compact, onCloud]);

  // Phones: space opens only for the folder you tap. Larger screens: one shared row height.
  const padTop = compact ? (open ? cloud : 16) : sharedCloud || 350;
  const count = `${items.length} certificate${items.length === 1 ? '' : 's'}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      style={{ paddingTop: padTop }}
      className="certificate-folder flex items-end justify-center transition-[padding] duration-500 ease-out"
    >
      <FolderFloat
        items={items.map((c) => ({ label: c.short, value: c.file }))}
        label={label}
        sublabel={`${count} · ${open ? 'Tap to close' : 'Tap to open'}`}
        trigger="click"
        closeOnSelect={false}
        physics
        drift={compact ? 0.3 : 0.5}
        onSelect={(file) => openCertificate(file)}
        onOpenChange={setOpen}
        folderColor="hsl(var(--primary) / 0.65)"
        frontColor="hsl(var(--primary))"
        paperColor="hsl(var(--foreground))"
        itemColor="hsl(var(--foreground))"
        itemTextColor="hsl(var(--background))"
        labelColor="hsl(var(--primary-foreground))"
        width={compact ? 260 : 220}
        height={compact ? 140 : 150}
        spread={spread}
        tilt={compact ? 3 : 8}
        lift={compact ? 20 : 26}
      />
    </motion.div>
  );
};

export const CertificatesSection = () => {
  const vw = useViewportWidth();
  const compact = vw < 1024; // folders stack in one column below this width
  const spread = compact ? Math.max(130, Math.min(190, Math.floor((vw - 40) / 2))) : 160;
  const [clouds, setClouds] = useState<Record<string, number>>({});
  const sharedCloud = Math.max(0, ...Object.values(clouds));
  const onClouds = useMemo(
    () =>
      Object.fromEntries(
        GROUPS.map((g) => [g.id, (h: number) => setClouds((prev) => (prev[g.id] === h ? prev : { ...prev, [g.id]: h }))]),
      ) as Record<Group, (h: number) => void>,
    [],
  );

  return (
    <section id="certificates" className="py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="font-display text-4xl md:text-5xl text-center mb-4 text-foreground">Certificates</h2>
        <p className="text-center text-muted-foreground mb-4">
          Tap a folder to open it, then tap a certificate to view it. You can drag them around too.
        </p>
        <div className="grid gap-x-6 gap-y-10 lg:grid-cols-3">
          {GROUPS.map((g, gi) => (
            <FolderGroup
              key={g.id}
              label={g.label}
              items={ordered.filter((c) => c.group === g.id)}
              index={gi}
              compact={compact}
              spread={spread}
              sharedCloud={sharedCloud}
              onCloud={onClouds[g.id]}
            />
          ))}
        </div>

        {/* Plain list for screen readers and search engines */}
        <ul className="sr-only">
          {ordered.map((c) => (
            <li key={c.file}>
              <a href={fileUrl(c.file)} target="_blank" rel="noopener noreferrer">
                {c.title} – {c.issuer} – {c.date}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
