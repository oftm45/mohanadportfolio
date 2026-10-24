import { motion } from 'framer-motion';

const projects = [
  { title: 'FGC Robotics System – Team Sudan', desc: 'Robot control and sensor logic built for Team Sudan at the FIRST Global Challenge.', tags: ['C++', 'Robotics', 'Sensors', 'Hardware Control'] },
  { title: 'Smart IoT Monitoring & Automation Prototype', desc: 'Connected sensors that monitor conditions and trigger automated actions in real time.', tags: ['IoT', 'C++', 'Python', 'Embedded Systems'] },
  { title: 'AI & Cybersecurity Web Toolkit', desc: 'A web toolkit exploring AI helpers and practical cybersecurity checks.', tags: ['Python', 'Web Development', 'Cybersecurity', 'AI'] },
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
            <h3 className="font-display text-2xl mb-3 text-foreground">{p.title}</h3>
            <p className="text-muted-foreground mb-5 flex-1">{p.desc}</p>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="rounded-md bg-primary/20 border border-primary/50 px-2 py-0.5 text-xs text-foreground">{t}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);
