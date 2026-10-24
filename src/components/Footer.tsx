import { Logo } from '@/components/Logo';
import { Instagram, Linkedin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 border-t border-border/20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Footer Content */}
          <div className="text-center mb-10">
            <Logo className="h-14 w-auto mx-auto mb-4" />
            <h3 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent mb-3">
              Mohanad Abubaker
            </h3>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-10">
            <a
              href="https://www.instagram.com/mo_n5d?igsh=MXM3d2xtajlvMHBscw=="
              target="_blank"
              rel="noopener noreferrer"
              className="group w-12 h-12 rounded-full glass flex items-center justify-center hover:glow-primary transition-smooth border border-primary/30 hover:border-primary"
            >
              <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://www.linkedin.com/in/mohanadabubakerabdallh/"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-12 h-12 rounded-full glass flex items-center justify-center hover:glow-primary transition-smooth border border-primary/30 hover:border-primary"
            >
              <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
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
              
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};