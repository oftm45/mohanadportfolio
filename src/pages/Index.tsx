import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { ShowcaseSection } from '@/components/ShowcaseSection';
import { AboutSection } from '@/components/AboutSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { AchievementsSection } from '@/components/AchievementsSection';
import { CertificatesSection } from '@/components/CertificatesSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

const Index = () => (
  <div className="min-h-screen text-foreground overflow-x-hidden">
    <Navigation />
    <main>
      <HeroSection />
      <ShowcaseSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <AchievementsSection />
      <CertificatesSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
);

export default Index;
