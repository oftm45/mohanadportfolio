import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { PROJECTS } from '@/data/projects';
import { RightsNotice } from '@/components/RightsNotice';

export const ProjectsSection = () => (
  <section id="projects" className="py-20">
    <div className="container mx-auto px-6 max-w-6xl">
      <h2 className="font-display text-4xl md:text-5xl text-center mb-12 text-foreground">Featured Projects</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {PROJECTS.map((p, i) => (
          <motion.article
            key={p.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col rounded-2xl border border-primary/50 bg-background/70 p-6 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-[0_0_35px_hsl(var(--primary)/0.5)]"
          >
            <h3 className="font-display text-3xl text-foreground">{p.title}</h3>
            <p className="text-sm text-accent mb-3">{p.subtitle}</p>
            <p className="text-muted-foreground mb-5 flex-1">{p.desc}</p>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="rounded-md bg-primary/20 border border-primary/50 px-2 py-0.5 text-xs text-foreground">{t}</span>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to={`/projects/${p.slug}`}
                aria-label={`Read more about ${p.title}`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-shadow hover:shadow-[0_0_25px_hsl(var(--primary)/0.6)]"
              >
                Read more <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              {p.link && (
                <a
                  href={p.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-primary px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {p.link.label} <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
      <RightsNotice owner="Mohanad Abubaker and project teams" className="mx-auto mt-8 max-w-3xl" />
    </div>
  </section>
);
