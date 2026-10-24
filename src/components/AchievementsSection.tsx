import { motion } from 'framer-motion';
import { Award, Bot, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const AchievementsSection = () => (
  <section id="achievements" className="py-20">
    <div className="container mx-auto px-6 max-w-5xl">
      <h2 className="font-display text-4xl md:text-5xl text-center mb-12 text-foreground">Achievements & Leadership</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="rounded-2xl border border-primary/60 bg-background/70 p-8 hover:shadow-[0_0_35px_hsl(var(--primary)/0.45)] transition-shadow">
          <Award className="w-8 h-8 text-primary mb-4" />
          <h3 className="font-display text-3xl mb-3 text-foreground">Official ICSC Ambassador</h3>
          <p className="text-muted-foreground mb-6">Proud to be an official Ambassador for the International Computer Science Competition (ICSC).</p>
          <Button asChild variant="outline" className="border-primary text-foreground hover:bg-primary/20">
            <a href="https://icscompetition.org/en/mabubaker" target="_blank" rel="noopener noreferrer">View my ICSC page <ExternalLink className="w-4 h-4 ml-2" /></a>
          </Button>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-primary/60 bg-background/70 p-8 hover:shadow-[0_0_35px_hsl(var(--primary)/0.45)] transition-shadow">
          <Bot className="w-8 h-8 text-primary mb-4" />
          <h3 className="font-display text-3xl mb-3 text-foreground">Team Sudan – FIRST Global Challenge (FGC)</h3>
          <p className="text-muted-foreground">Representing Sudan in the FIRST Global Challenge, building and programming a competition robot with the national team.</p>
        </motion.div>
      </div>
    </div>
  </section>
);
