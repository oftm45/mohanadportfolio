import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import WavingPortfolioLanding from '@/components/ui/waving-portfolio-landing';

export const ShowcaseSection = () => (
  // data-mascot-hide: the travelling character steps aside while its poster twin is on screen.
  <section aria-label="Interactive showcase" data-mascot-hide className="overflow-hidden">
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
        accent="#800020"
        paper="#000000"
        ink="#F5F5F5"
        height="100%"
      />
    </ContainerScroll>
  </section>
);
