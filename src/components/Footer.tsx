import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram, Linkedin, Heart, Code2 } from 'lucide-react';

export const Footer = () => {
  const { t, language } = useLanguage();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 border-t border-border/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-secondary/5 blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Footer Content */}
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent mb-3">
              Mohanad Abubaker
            </h3>
            <p className="text-muted-foreground">
              {language === 'ar' ? 'شغوف بالبرمجة وتطوير المواقع' : 'Programming & Web Development Enthusiast'}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-10">
            <a
              href="https://www.instagram.com/mo_n5d?igsh=MXM3d2xtajlvMHBscw=="
              target="_blank"
              rel="noopener noreferrer"
              className="group w-12 h-12 rounded-full glass flex items-center justify-center hover:glow-purple hover:scale-110 transition-spring border border-primary/20 hover:border-purple-500/50"
            >
              <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-purple-400 transition-colors" />
            </a>
            <a
              href="https://www.linkedin.com/in/mohanad-abubaker-564043374"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-12 h-12 rounded-full glass flex items-center justify-center hover:glow-blue hover:scale-110 transition-spring border border-primary/20 hover:border-blue-500/50"
            >
              <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-blue-400 transition-colors" />
            </a>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

          {/* Copyright */}
          <div className="text-center space-y-3">
            <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
              {language === 'ar' ? 'صُنع بـ' : 'Made with'} 
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> 
              {language === 'ar' ? 'بواسطة مهند' : 'by Mohanad'}
            </p>
            <p className="text-muted-foreground/80 text-sm">
              © {currentYear} Mohanad Abubaker. {language === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved'}.
            </p>
            <p className="text-muted-foreground/50 text-xs flex items-center justify-center gap-2">
              <Code2 className="w-3 h-3" />
              React • TypeScript • Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};