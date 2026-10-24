import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowDown, Mail } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { TypingWords } from '@/components/ui/typing-effect';
import TechText from '@/components/ui/TechText';

export const HeroSection = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const typingWords = ['Grade 12 STEM Innovator', 'AI, Robotics & IoT', 'FIRST Global Gold Medalist', 'ICSC Ambassador'];

  return (
    <section ref={ref} id="hero" className="min-h-screen pt-28 pb-12 flex items-center justify-center relative overflow-hidden">
      <motion.div 
        style={{}}
        className="container mx-auto px-6 text-center relative z-10"
      >
        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Profile Photo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-primary shadow-[0_0_30px_hsl(var(--primary)/0.6)]">
              <img 
                src="/lovable-uploads/7c770d56-ebca-4630-9789-ff6c8fc90bbf.png"
                alt="Mohanad Abubaker"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Hero Text with Typing Effect */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 font-display text-primary"
          >
            <span className="sr-only">{t('heroTitle')}</span>
            <div aria-hidden="true" className="h-32 w-full md:h-40">
              <TechText
                text={t('heroTitle').trim()}
                fontWeight={400}
                fontSize={72}
                letterSpacing={0}
                reveal="letter"
                dashLength={4}
                dashGap={2}
                specks={15}
                intro="none"
                sweep
                speed={1}
                clickKick
                guides={false}
              />
            </div>
          </motion.h1>

          {/* Typing Words Effect */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-secondary font-medium mb-4 h-10"
          >
            <TypingWords words={typingWords} speed={100} pauseDuration={2000} className="text-secondary" />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            {t('heroDescription')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button
              onClick={() => scrollToSection('contact')}
              variant="outline"
              size="lg"
              className="group glass border-secondary/50 hover:border-secondary hover:bg-secondary/10 min-w-[200px] transition-smooth"
            >
              <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-spring" />
              {t('contactMe')}
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col items-center"
          >
            <p className="text-sm text-muted-foreground mb-2">
              Scroll to explore
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('about')}
              aria-label="Scroll to about section"
              className="p-2 rounded-full glass hover:glow-primary transition-smooth animate-bounce"
            >
              <ArrowDown className="w-6 h-6 text-primary" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};