import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { PROJECT_CARDS } from '@/data/projects';
import { RightsNotice, useRightsToast } from '@/components/RightsNotice';
import CardSwap, { Card, CardSwapRef } from '@/components/ui/CardSwap';
import { Button } from '@/components/ui/button';
import { TextScrollTitle } from '@/components/ui/text-scroll-animation';

export const ProjectsSection = () => {
  const sectionRef = useRightsToast<HTMLElement>();
  const swapRef = useRef<CardSwapRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="projects" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Centered Section Header */}
        <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <div>
            <TextScrollTitle
              text="Featured Projects"
              className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground"
            />
          </div>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">
            Explore STEM innovations in AI, Robotics and IoT
          </p>
        </div>

        {/* 3D CardSwap View with Larger Dimensions */}
        <div className="flex flex-col items-center">
          <div className="w-full h-[560px] sm:h-[640px] md:h-[690px] flex items-center justify-center my-3">
            <CardSwap
              ref={swapRef}
              width={620}
              height={480}
              cardDistance={60}
              verticalDistance={70}
              depth={85}
              skewAmount={5}
              visibleCards={4}
              delay={4500}
              autoplay={true}
              pauseOnHover={true}
              draggable={true}
              speed={1.1}
              bounce={0.35}
              hoverSpread={0.14}
              cardRadius={24}
              onChange={(idx) => setActiveIndex(idx)}
              className="w-full h-full"
            >
              {PROJECT_CARDS.map((p, i) => (
                <Card
                  key={p.slug}
                  className="p-6 sm:p-7 md:p-8 flex flex-col justify-between h-full bg-gradient-to-br from-[#1a060d] via-[#120308] to-[#080104] border border-primary/50 text-foreground shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
                >
                  <div className="flex-1 flex flex-col">
                    {/* Top bar */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="rounded-full bg-primary/25 border border-primary/60 px-3.5 py-1 text-xs font-mono text-accent">
                        0{i + 1} / 0{PROJECT_CARDS.length}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                        {p.tags[0]}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground mb-1.5">
                      {p.title}
                    </h3>
                    <p className="text-sm sm:text-base text-accent mb-3 font-medium">
                      {p.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 sm:line-clamp-4 mb-4">
                      {p.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                      {p.tags.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-primary/20 border border-primary/40 px-2.5 py-1 text-xs text-foreground/90"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="pt-3 border-t border-primary/25 flex items-center justify-between gap-3 mt-2 shrink-0">
                    <Link
                      to={`/projects/${p.slug}`}
                      aria-label={`View details for ${p.title}`}
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs sm:text-sm font-medium text-primary-foreground transition-all hover:shadow-[0_0_25px_hsl(var(--primary)/0.7)] hover:scale-105"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Explore Project <ArrowRight className="w-4 h-4" />
                    </Link>

                    {p.link && (
                      <a
                        href={p.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-accent hover:underline px-3 py-1.5 rounded-full hover:bg-primary/10 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {p.link.label} <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>

          {/* Controls & Indicator */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => swapRef.current?.prev()}
              className="h-10 w-10 rounded-full border-primary/60 hover:bg-primary/20 text-foreground"
              aria-label="Previous card"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex items-center gap-1.5">
              {PROJECT_CARDS.map((_, i) => (
                <span
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? 'w-6 bg-accent'
                      : 'w-2 bg-primary/30'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => swapRef.current?.next()}
              className="h-10 w-10 rounded-full border-primary/60 hover:bg-primary/20 text-foreground"
              aria-label="Next card"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
            <span>Drag or click cards to swap</span> · <span>Use arrow keys or buttons</span>
          </p>
        </div>

        <RightsNotice owner="Mohanad Abubaker & project teams" className="mt-12" />
      </div>
    </section>
  );
};
