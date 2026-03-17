import { LanguageProvider } from '@/contexts/LanguageContext';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { CertificatesSection } from '@/components/CertificatesSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navigation />
        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <CertificatesSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
