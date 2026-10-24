import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import WavingPortfolioLanding from '@/components/ui/waving-portfolio-landing';

export const ShowcaseSection = () => (
  <section aria-label="Interactive showcase" className="overflow-hidden">
    <ContainerScroll
      titleComponent={
        <h2 className="font-display text-4xl md:text-6xl text-foreground">
          IoT & Robotics <span className="text-primary">Command Center</span>
        </h2>
      }
    >
      <WavingPortfolioLanding
        name="Mohanad Abubaker"
        year="2026"
        roles={["IoT Developer", "ICSC Ambassador"]}
        signature="MO/OSMAN"
        greeting="Hi, I'm Mohanad!"
        accent="hsl(var(--primary))"
        paper="hsl(var(--background))"
        ink="hsl(var(--foreground))"
        height="100%"
      />
    </ContainerScroll>
  </section>
);
