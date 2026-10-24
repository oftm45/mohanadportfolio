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

export const CertificatesSection = () => {
  return (
    <section id="certificates" className="py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="font-display text-4xl md:text-5xl text-center mb-4 text-foreground">Certificates</h2>
        <p className="text-center text-muted-foreground mb-4">
          Tap a folder to open it, then tap a certificate to view it.
        </p>
        <div className="grid gap-x-6 gap-y-4 lg:grid-cols-3">
          {GROUPS.map((g, gi) => {
            const items = ordered.filter((c) => c.group === g.id);
            return (
              <motion.div
                key={g.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: gi * 0.08 }}
                className="flex items-end justify-center pt-[300px]"
              >
                <FolderFloat
                  items={items.map((c) => ({ label: c.short, value: c.file }))}
                  label={g.label}
                  sublabel={`${items.length} certificate${items.length === 1 ? '' : 's'}`}
                  trigger="click"
                  closeOnSelect={false}
                  physics
                  drift={0.5}
                  onSelect={(file) => openCertificate(file)}
                  folderColor="hsl(var(--primary) / 0.65)"
                  frontColor="hsl(var(--primary))"
                  paperColor="hsl(var(--foreground))"
                  itemColor="hsl(var(--foreground))"
                  itemTextColor="hsl(var(--background))"
                  labelColor="hsl(var(--primary-foreground))"
                  width={220}
                  height={150}
                  spread={160}
                />
              </motion.div>
            );
          })}
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
