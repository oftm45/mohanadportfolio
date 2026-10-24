import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

type Project = { title: string; subtitle: string; desc: string; tags: string[]; link?: { label: string; url: string } };

const projects: Project[] = [
  {
    title: 'Agri-Shield 4.0',
    subtitle: 'Smart, solar-powered grain silo',
    desc: 'An ESP32 IoT system that turns traditional grain silos into smart, off-grid units. It watches temperature, humidity and fermentation gases, switches on ventilation automatically, sounds an alarm and floodlight on intrusion, and gives farmers remote monitoring — all running on solar power to cut post-harvest losses.',
    tags: ['ESP32', 'IoT', 'Solar Energy', 'DHT22', 'MQ-135', 'PIR', 'Food Security'],
    link: { label: 'Live Demo', url: 'https://agri-shield4.lovable.app/' },
  },
  {
    title: 'AFAQ',
    subtitle: 'AI learning platform for the UAE & Arab curriculum',
    desc: 'An AI education system built around the UAE and Arab school curriculum: a knowledge base of textbook content, a student assistant that explains lessons and spots weak points, a smart quiz generator, automatic lesson and exam scheduling, reminders, and dashboards for teachers and parents.',
    tags: ['Claude AI', 'Python', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Adaptive Learning'],
  },
  {
    title: 'NOVA City',
    subtitle: 'Hybrid energy, water & food hub',
    desc: 'A sustainable satellite-city concept, with Mohammed Taha, inspired by UAE projects such as Masdar and Hatta and adapted for Sudan. It combines solar, wind, pumped-hydro and geothermal power with green hydrogen, renewable desalination, smart greenhouses and silos, all managed by an AI platform for 24/7 clean supply.',
    tags: ['Renewable Energy', 'Green Hydrogen', 'Desalination', 'AI Optimization', 'Sustainability'],
  },
];

export const ProjectsSection = () => (
  <section id="projects" className="py-20">
    <div className="container mx-auto px-6 max-w-6xl">
      <h2 className="font-display text-4xl md:text-5xl text-center mb-12 text-foreground">Featured Projects</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col rounded-2xl border border-primary/50 bg-background/70 p-6 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-[0_0_35px_hsl(var(--primary)/0.5)]"
          >
            <h3 className="font-display text-3xl text-foreground">{p.title}</h3>
            <p className="text-sm text-primary mb-3">{p.subtitle}</p>
            <p className="text-muted-foreground mb-5 flex-1">{p.desc}</p>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="rounded-md bg-primary/20 border border-primary/50 px-2 py-0.5 text-xs text-foreground">{t}</span>
              ))}
            </div>
            {p.link && (
              <a
                href={p.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-primary px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {p.link.label} <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);
