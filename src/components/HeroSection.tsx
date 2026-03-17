import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowDown, Mail, Award } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { TypingWords } from '@/components/ui/typing-effect';

export const HeroSection = () => {
  const { t, language } = useLanguage();
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

  const typingWords = language === 'ar' 
    ? ['مطور IoT', 'مبتكر', 'مهندس إلكترونيات', 'مبرمج']
    : ['IoT Developer', 'Innovator', 'Electronics Engineer', 'Programmer'];

  return (
    <section ref={ref} id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden animated-gradient">
      {/* Parallax Background Decorations */}
      <motion.div style={{ y }} className="absolute inset-0 opacity-20">
        <motion.div 
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-32 h-32 rounded-full bg-primary/30 blur-3xl" 
        />
        <motion.div 
          animate={{ 
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-secondary/30 blur-3xl" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full bg-accent/20 blur-3xl" 
        />
      </motion.div>

      <motion.div 
        style={{ opacity, scale }}
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
            <div className="w-32 h-32 mx-auto rounded-full glass glow-blue overflow-hidden float">
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
            className="text-5xl md:text-7xl font-bold mb-6 text-glow"
          >
            <span className="gradient-primary bg-clip-text text-transparent">
              {t('heroTitle')}
            </span>
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
              onClick={() => scrollToSection('certificates')}
              size="lg"
              className="group relative overflow-hidden gradient-primary text-primary-foreground hover:scale-105 transition-spring min-w-[200px] glow-blue"
            >
              <Award className="w-5 h-5 mr-2 group-hover:rotate-12 transition-spring" />
              {t('viewCertificates')}
            </Button>

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
              {language === 'ar' ? 'اسحب للاستكشاف' : 'Scroll to explore'}
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('about')}
              className="p-2 rounded-full glass hover:glow-blue transition-smooth animate-bounce"
            >
              <ArrowDown className="w-6 h-6 text-primary" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};