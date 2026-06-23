import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  const { t, language } = useLanguage();
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['hero', 'about', 'projects', 'certificates', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'about', label: t('about') },
    { id: 'projects', label: t('projects') },
    { id: 'certificates', label: t('certificates') },
    { id: 'contact', label: t('contact') },
  ];

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary origin-left z-[60]"
        style={{ scaleX }}
      />

      <nav
        className={`fixed top-1 left-0 right-0 z-50 transition-smooth ${
          isScrolled ? 'glass backdrop-blur-xl shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('hero')}
              className="text-2xl font-bold gradient-primary bg-clip-text text-transparent hover:scale-105 transition-spring"
            >
              Mohanad
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 rounded-lg transition-smooth ${
                    activeSection === item.id
                      ? 'text-primary font-medium'
                      : 'text-foreground/80 hover:text-primary'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div 
                      layoutId="activeNav"
                      className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
              
            </div>

            {/* Right side: Language Toggle + Mobile Menu */}
            <div className="flex items-center gap-4">
              <LanguageToggle />
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg glass border-primary/30 hover:border-primary transition-smooth"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-primary" />
                ) : (
                  <Menu className="w-5 h-5 text-primary" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            />
            
            {/* Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              className="fixed top-20 left-4 right-4 glass rounded-2xl border border-primary/20 p-6 z-50 md:hidden"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: language === 'ar' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-4 py-3 rounded-xl text-lg font-medium transition-smooth text-start ${
                      activeSection === item.id
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'text-foreground/80 hover:bg-primary/10 hover:text-primary'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
                
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};