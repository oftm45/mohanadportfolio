import { motion } from 'framer-motion';
import { Code2, Cpu, Target } from 'lucide-react';
import { TextScrollTitle } from '@/components/ui/text-scroll-animation';

const groups = [
  { icon: Code2, title: 'Programming & Development', items: ['Python', 'C++', 'AI Prompt Engineering', 'AI-Assisted Development'] },
  { icon: Cpu, title: 'IoT & Robotics', items: ['IoT Prototyping', 'Arduino / ESP32', 'Sensor Integration', 'Robotics Control', 'SOLIDWORKS'] },
  { icon: Target, title: 'Focus Areas & Interests', items: ['Cybersecurity', 'Artificial Intelligence (AI)', 'Competitive Computer Science', 'Hardware Innovation'] },
];

export const SkillsSection = () => (
  <section id="skills" className="py-20">
    <div className="container mx-auto px-6 max-w-6xl">
      <div className="text-center mb-12">
        <TextScrollTitle
          text="Skills"
          className="font-display text-4xl md:text-5xl text-foreground"
        />
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {groups.map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-2xl border border-primary/60 bg-background/70 p-6 transition-shadow hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
          >
            <g.icon className="w-7 h-7 text-accent mb-4" />
            <h3 className="font-display text-2xl mb-4 text-foreground">{g.title}</h3>
            <div className="flex flex-wrap gap-2">
              {g.items.map((s) => (
                <span key={s} className="rounded-full border border-primary/70 px-3 py-1 text-sm text-foreground">{s}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
