import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Logo } from '@/components/Logo';


export const Navigation = () => {
  const { t } = useLanguage();
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
      const sections = ['hero', 'about', 'skills', 'projects', 'achievements', 'certificates', 'contact'];
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

  // While the mobile menu is open: lock page scroll and close on Escape
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsMobileMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isMobileMenuOpen]);

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
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'contact', label: t('contact') },
  ];

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary origin-left z-[60]"
        style={{ scaleX }}
      />

      <nav
        className="fixed top-1 inset-x-0 z-50 pb-6 bg-gradient-to-b from-background/90 via-background/60 to-transparent"
      >
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('hero')}
              aria-label="Mohanad - back to top"
              className="flex items-center gap-2 min-w-0"
            >
              <Logo className="h-9 sm:h-10 w-auto shrink-0" /><span className="font-display text-xl sm:text-2xl text-foreground truncate">Mohanad</span>
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
                </button>
              ))}
              
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-4">
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/60 bg-card/90 text-foreground transition-smooth hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
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
              id="mobile-menu"
              className="fixed top-[4.75rem] inset-x-4 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-2xl border border-primary/50 bg-card/95 p-3 shadow-[0_0_35px_hsl(var(--primary)/0.35)] z-50 md:hidden"
            >
              <nav aria-label="Mobile" className="flex flex-col gap-1">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    onClick={() => scrollToSection(item.id)}
                    aria-current={activeSection === item.id ? 'true' : undefined}
                    className={`flex min-h-12 w-full items-center rounded-xl border-s-4 px-4 text-start text-lg font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      activeSection === item.id
                        ? 'border-accent bg-primary/25 text-foreground'
                        : 'border-transparent text-foreground/85 hover:bg-primary/15 hover:text-foreground'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};