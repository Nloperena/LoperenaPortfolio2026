import React, { useLayoutEffect, useRef } from 'react';
import { track } from '../utils/analytics';
import { pageHeroes, siteProfile, type PageKey } from '../data/site';
import { HeroPortrait } from './HeroPortrait';

type PageHeroProps = {
  page: PageKey;
};

export const PageHero = ({ page }: PageHeroProps) => {
  const rootRef = useRef<HTMLElement>(null);
  const config = pageHeroes[page];

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let cleanupParallax = () => {};
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    const runIntro = () => {
      cleanupParallax();
      ctx?.revert();
      ctx = null;

      void (async () => {
        const [{ default: gsap }, { runHeroIntro, bindHeroParallax }] = await Promise.all([
          import('gsap'),
          import('../utils/heroAnimations'),
        ]);

        if (cancelled || !rootRef.current) return;

        ctx = gsap.context(() => {
          runHeroIntro(root, gsap);
        }, root);

        if (config.showPortrait) {
          cleanupParallax = bindHeroParallax(root, gsap);
        }
      })();
    };

    runIntro();
    document.addEventListener('astro:page-load', runIntro);

    return () => {
      cancelled = true;
      document.removeEventListener('astro:page-load', runIntro);
      cleanupParallax();
      ctx?.revert();
    };
  }, [page, config.showPortrait]);

  const handleContactClick = () => {
    track('hero_cta_click', { cta: 'contact', page });
    track('contact_click', { source: `hero_${page}` });
    // @ts-ignore
    if (typeof window !== 'undefined' && window.openContactHub) {
      // @ts-ignore
      window.openContactHub();
    }
  };

  const minHeight = config.compact
    ? 'min-h-[72svh] lg:min-h-[68svh]'
    : 'min-h-[100svh] lg:min-h-[calc(100svh-8rem)]';

  const hasCtas = config.showContact || config.showResume || config.showExperienceLink;

  return (
    <section
      ref={rootRef}
      className={`relative w-full ${minHeight} bg-background pt-28 pb-16 md:pt-32 md:pb-20 px-4 md:px-8 lg:px-12 z-10 overflow-hidden`}
      data-hero-animate
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #7D6B5D 1px, transparent 1px), linear-gradient(to bottom, #7D6B5D 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden
      />

      <div
        className={`relative z-10 mx-auto flex w-full max-w-[1400px] flex-col gap-10 lg:gap-0 ${
          config.showPortrait
            ? 'lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.72fr)] lg:items-center'
            : 'lg:max-w-4xl'
        } ${minHeight}`}
      >
        <div
          className={`order-2 lg:order-1 flex flex-col gap-8 md:gap-10 py-2 lg:py-10 ${
            config.showPortrait ? 'lg:pr-10' : ''
          }`}
        >
          <div className="hero-meta flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.28em] text-accent">
            <span>{config.eyebrow}</span>
            <span className="hidden sm:inline text-accent/40">/</span>
            <span className="text-accent/80">{config.meta}</span>
          </div>

          <div className="space-y-1 md:space-y-2">
            {config.headlineLines.map((line, index) => (
              <div key={`${page}-${line}`} className="overflow-hidden">
                <h1
                  className={`hero-headline-line block text-[clamp(2.75rem,8vw,6.5rem)] font-sans font-black uppercase leading-[0.92] tracking-tighter ${
                    index === 1 ? 'text-accent' : 'text-foreground'
                  }`}
                >
                  {line}
                </h1>
              </div>
            ))}
          </div>

          <p className="hero-subline max-w-xl font-serif text-lg md:text-xl italic leading-relaxed text-foreground/80">
            {config.subline}
          </p>

          <div className="flex flex-wrap gap-2 md:gap-3">
            {config.highlights.map((item) => (
              <span
                key={item}
                className="hero-highlight inline-flex items-center border border-accent/25 bg-white/50 px-3 py-2 font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/80"
              >
                {item}
              </span>
            ))}
          </div>

          {hasCtas && (
            <div className="hero-cta flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4">
              {config.showContact && (
                <button
                  type="button"
                  onClick={handleContactClick}
                  className="group bg-foreground text-background py-4 px-6 md:py-5 md:px-7 font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] hover:bg-highlight hover:text-foreground transition-colors duration-300 border border-foreground"
                >
                  <span className="flex items-center gap-3">
                    Get in Touch
                    <span className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1.5">
                      →
                    </span>
                  </span>
                </button>
              )}

              {config.showResume && (
                <a
                  href={siteProfile.resumePath}
                  download={siteProfile.resumeDownloadName}
                  onClick={() => track('hero_cta_click', { cta: 'resume', page })}
                  className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-foreground border border-foreground/30 hover:border-foreground py-4 px-6 md:py-5 md:px-7 transition-colors"
                >
                  Download Resume
                </a>
              )}

              {config.showExperienceLink && (
                <a
                  href="/about"
                  onClick={() => track('hero_cta_click', { cta: 'about', page })}
                  className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-accent hover:text-foreground transition-colors"
                >
                  View Experience
                </a>
              )}

              {page === 'about' && (
                <a
                  href="#experience"
                  className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-accent hover:text-foreground transition-colors"
                >
                  View Timeline ↓
                </a>
              )}
            </div>
          )}
        </div>

        {config.showPortrait && (
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end lg:pl-6">
            <HeroPortrait />
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute bottom-8 left-4 md:left-8 hidden lg:block">
        <div className="hero-frame-line h-px w-24 bg-accent/30 mb-3" />
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent/60 max-w-[12rem] leading-relaxed">
          {config.footerNote}
        </p>
      </div>
    </section>
  );
};
