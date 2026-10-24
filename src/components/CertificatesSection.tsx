import { motion } from 'framer-motion';
import { Award, FileText, ExternalLink, Trophy } from 'lucide-react';

type Certificate = {
  title: string;
  issuer: string;
  date: string; // display
  sort: string; // YYYY-MM-DD for ordering
  file: string; // path in the "certificate" storage bucket
  award?: boolean;
};

const CERTIFICATES: Certificate[] = [
  { title: 'Winner – Privacy & National Security Debate', issuer: 'Manarat Al Sharjah Private School', date: '2025 – 2026', sort: '2025-12-01', file: 'debate 2.pdf', award: true },
  { title: '2nd Place – 15th Annual Engineering Competition (Industrial Engineering)', issuer: 'Rochester Institute of Technology Dubai', date: 'Nov 11, 2025', sort: '2025-11-11', file: 'Second place winner - Mohanad Abubaker.pdf', award: true },
  { title: '1st Place – Smart Greenhouse Project', issuer: 'Manarat Al Sharjah Private School', date: '2024 – 2025', sort: '2025-03-01', file: 'First place.pdf', award: true },
  { title: '2nd Place – School Science Fair', issuer: 'Manarat Al Sharjah Private School', date: '2023 – 2024', sort: '2024-03-01', file: 'Second place.pdf', award: true },

  { title: 'Safe AI Cup 2026 – Participation', issuer: 'University of Dubai', date: 'Jun 3, 2026', sort: '2026-06-03', file: 'SAFE AI CUP.pdf' },
  { title: 'Introduction to Critical Infrastructure Protection (ICIP)', issuer: 'OPSWAT Academy', date: 'May 30, 2026', sort: '2026-05-30', file: 'introduction_to_cip.png' },
  { title: 'Oratory and Diction Course', issuer: 'M3aarf', date: 'May 29, 2026', sort: '2026-05-29', file: 'M3aarf_Certificate (1).pdf' },
  { title: 'Claude 101', issuer: 'Anthropic', date: 'May 23, 2026', sort: '2026-05-23', file: 'certificate-j479abaut3mr-1779539199.pdf' },
  { title: 'Claude Code 101', issuer: 'Anthropic', date: 'May 23, 2026', sort: '2026-05-22', file: 'certificate-r69dc8z7pwgz-1779540003.pdf' },
  { title: 'Claude Code in Action', issuer: 'Anthropic', date: 'May 18, 2026', sort: '2026-05-18', file: 'certificate-nkjdynax97en-1779097017 (1).pdf' },
  { title: 'AI Debate – "Is AI an Opportunity or a Threat to Humanity?"', issuer: 'Al Shola Private School, Ajman', date: 'Oct 2025', sort: '2025-10-31', file: 'AJ debate.pdf' },
  { title: 'HTML/CSS Coding Challenge – Medium Level', issuer: 'UAE Codes', date: 'Oct 30, 2025', sort: '2025-10-30', file: 'UAE_Codes_Certificate_Mohanad_Abubaker_medium.pdf' },
  { title: 'HTML/CSS Coding Challenge – Easy Level', issuer: 'UAE Codes', date: 'Oct 30, 2025', sort: '2025-10-29', file: 'UAE_Codes_Certificate_Mohanad_Abubaker_easy.pdf' },
  { title: 'Student Summer Course in Islamic Sciences', issuer: 'Islamic Affairs Department – Sharjah', date: 'Jul 2025', sort: '2025-07-24', file: 'Islamic affairs.pdf' },
  { title: 'University of Fujairah Sustainability Research Competitions', issuer: 'University of Fujairah', date: 'May 22, 2025', sort: '2025-05-22', file: 'UOF.pdf' },
  { title: '28th Al Shola Innovation Exhibition', issuer: 'Al Shola Education Foundation', date: '2024 – 2025', sort: '2025-05-01', file: 'SEED 2025.pdf' },
  { title: 'AI National Championship 2024–2025 – Appreciation', issuer: 'UAE Ministry of Education & ICT Fund', date: '2025', sort: '2025-04-01', file: 'AINC.pdf' },
  { title: '1 Million Prompters – Completion', issuer: 'Dubai Centre for Artificial Intelligence', date: '2025', sort: '2025-01-01', file: 'mohanad-abubaker-certificate.pdf' },
];

/** Awards first, then newest first. */
export const sortCertificates = (list: Certificate[]) =>
  [...list].sort((a, b) => Number(!!b.award) - Number(!!a.award) || b.sort.localeCompare(a.sort));

const ordered = sortCertificates(CERTIFICATES);

/** Files are served by a backend function that redirects to a short-lived link; the storage bucket stays private. */
const fileUrl = (file: string) =>
  `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/certificate-file?file=${encodeURIComponent(file)}`;

export const CertificatesSection = () => {
  return (
    <section id="certificates" className="py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="font-display text-4xl md:text-5xl text-center mb-4 text-foreground">Certificates</h2>
        <p className="text-center text-muted-foreground mb-12">Awards first, then the latest certificates.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ordered.map((c, i) => {
            const Icon = c.award ? Trophy : c.file.endsWith('.png') ? Award : FileText;
            const url = fileUrl(c.file);
            return (
              <motion.div
                key={c.file}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                className={`flex flex-col rounded-2xl border bg-background/70 p-6 transition-shadow hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] ${c.award ? 'border-primary' : 'border-primary/40'}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                  {c.award && <span className="text-xs uppercase tracking-widest text-primary">Award</span>}
                </div>
                <h3 className="font-display text-2xl leading-snug text-foreground mb-2 break-words">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.issuer}</p>
                <p className="text-sm text-muted-foreground/80 mb-5">{c.date}</p>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-auto inline-flex items-center justify-center gap-2 rounded-full border border-primary px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground`}
                >
                  View <ExternalLink className="w-4 h-4" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
