import { motion } from 'framer-motion';
import { Linkedin, Award, Wrench } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const MaintenancePage = () => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden animated-gradient">
      {/* Background glows */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-secondary/30 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto rounded-full glass glow-blue flex items-center justify-center float">
            <Wrench className="w-10 h-10 text-primary" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold mb-4 text-glow"
        >
          <span className="gradient-primary bg-clip-text text-transparent">
            {isAr ? 'الموقع تحت الصيانة' : 'Under Maintenance'}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl md:text-2xl text-secondary font-medium mb-3"
        >
          Let him cook 👨‍🍳
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {isAr
            ? 'أعمل حالياً على تحسينات جديدة. في هذه الأثناء، تقدر تتواصل معي أو تطلع على ملفي.'
            : "I'm currently working on some improvements. In the meantime, feel free to connect with me or check out my profile."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="https://www.linkedin.com/in/mohanadabubakerabdallh/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-6 py-3 rounded-lg glass border border-primary/30 hover:border-primary hover:glow-blue transition-smooth min-w-[220px] justify-center"
          >
            <Linkedin className="w-5 h-5 text-primary group-hover:scale-110 transition-spring" />
            <span className="font-medium">{isAr ? 'لينكد إن' : 'LinkedIn'}</span>
          </a>

          <a
            href="https://icscompetition.org/en/mabubaker"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-6 py-3 rounded-lg glass border border-secondary/30 hover:border-secondary hover:glow-blue transition-smooth min-w-[220px] justify-center"
          >
            <Award className="w-5 h-5 text-secondary group-hover:scale-110 transition-spring" />
            <span className="font-medium">
              {isAr ? 'ملف سفير ICSC' : 'ICSC Ambassador Profile'}
            </span>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-sm text-muted-foreground/70"
        >
          © {new Date().getFullYear()} Mohanad Abubaker
        </motion.p>
      </div>
    </main>
  );
};
