import { lazy, Suspense } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';

// Below-the-fold sections load in separate chunks so the first screen appears faster.
const ShowcaseSection = lazy(() => import('@/components/ShowcaseSection').then((m) => ({ default: m.ShowcaseSection })));
const AboutSection = lazy(() => import('@/components/AboutSection').then((m) => ({ default: m.AboutSection })));
const SkillsSection = lazy(() => import('@/components/SkillsSection').then((m) => ({ default: m.SkillsSection })));
const ProjectsSection = lazy(() => import('@/components/ProjectsSection').then((m) => ({ default: m.ProjectsSection })));
const AchievementsSection = lazy(() => import('@/components/AchievementsSection').then((m) => ({ default: m.AchievementsSection })));
const CertificatesSection = lazy(() => import('@/components/CertificatesSection').then((m) => ({ default: m.CertificatesSection })));
const ContactSection = lazy(() => import('@/components/ContactSection').then((m) => ({ default: m.ContactSection })));
const Footer = lazy(() => import('@/components/Footer').then((m) => ({ default: m.Footer })));

const Index = () => (
  <div className="min-h-screen text-foreground overflow-x-hidden">
    <Navigation />
    <main>
      <HeroSection />
      <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
        <ShowcaseSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <AchievementsSection />
        <CertificatesSection />
        <ContactSection />
      </Suspense>
    </main>
    <Suspense fallback={null}>
      <Footer />
    </Suspense>
  </div>
);

export default Index;
