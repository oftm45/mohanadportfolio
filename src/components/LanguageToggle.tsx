import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      size="sm"
      className="glass border-white/20 hover:border-primary/50 transition-smooth group"
    >
      <Globe className="w-4 h-4 mr-2 group-hover:text-primary transition-smooth" />
      <span className="font-medium">
        {language === 'en' ? 'العربية' : 'English'}
      </span>
    </Button>
  );
};