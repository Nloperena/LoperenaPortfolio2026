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
    : 'min-h-[100svh] lg:min-h-[calc(100svh-4rem)]';

  const hasCtas = config.showContact || config.showResume || config.showExperienceLink;

  return (
    <section
      ref={rootRef}
      className={`relative w-full ${minHeight} bg-background pt-16 pb-8 md:pb-10 px-0 z-10 overflow-hidden border-b-2 border-foreground`}
      data-hero-animate
    >
      {config.heroImage && (
        <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.08] mix-blend-multiply" aria-hidden>
          <img src={config.heroImage} alt="" className="h-full w-full object-cover" loading="eager" decoding="async" />
        </div>
      )}

      <div
        className={`relative z-10 mx-auto flex w-full max-w-[1400px] flex-col gap-8 lg:gap-0 px-4 md:px-6 lg:px-8 ${
          config.showPortrait
            ? 'lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(240px,0.55fr)] lg:items-stretch'
            : 'lg:max-w-5xl'
        } ${minHeight}`}
      >
        <div
          className={`order-1 flex flex-col gap-6 md:gap-8 py-4 lg:py-8 ${
            config.showPortrait ? 'lg:border-r-2 lg:border-foreground lg:pr-8' : ''
          }`}
        >
          <div className="hero-meta flex flex-wrap items-center gap-3 border-2 border-foreground bg-concrete px-4 py-3 w-fit">
            <span className="brutal-label">{config.eyebrow}</span>
            <span className="text-foreground font-mono text-xs">|</span>
            <span className="brutal-label text-secondary">{config.meta}</span>
          </div>

          <div className="space-y-0 border-2 border-foreground bg-background shadow-brutal-lg">
            {config.headlineLines.map((line, index) => (
              <div key={`${page}-${line}`} className="overflow-hidden border-b-2 border-foreground last:border-b-0">
                <h1
                  className={`hero-headline-line block px-4 md:px-6 py-3 md:py-4 text-[clamp(2.5rem,9vw,5.5rem)] font-mono font-black uppercase leading-[0.95] tracking-tighter ${
                    index === 1 ? 'bg-highlight text-foreground' : 'bg-background text-foreground'
                  }`}
                >
                  {line}
                </h1>
              </div>
            ))}
          </div>

          <p className="hero-subline max-w-2xl font-sans text-base md:text-lg leading-relaxed text-foreground border-l-4 border-foreground pl-4 md:pl-5">
            {config.subline}
          </p>

          <div className="flex flex-wrap gap-2">
            {config.highlights.map((item) => (
              <span
                key={item}
                className="hero-highlight inline-flex items-center border-2 border-foreground bg-concrete px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em]"
              >
                {item}
              </span>
            ))}
          </div>

          {hasCtas && (
            <div className="hero-cta flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2">
              {config.showContact && (
                <button type="button" onClick={handleContactClick} className="brutal-btn group">
                  <span className="flex items-center gap-3">
                    Get in Touch
                    <span className="text-lg leading-none group-hover:translate-x-1 transition-none">→</span>
                  </span>
                </button>
              )}

              {config.showResume && (
                <a
                  href={siteProfile.resumePath}
                  download={siteProfile.resumeDownloadName}
                  onClick={() => track('hero_cta_click', { cta: 'resume', page })}
                  className="brutal-btn-ghost"
                >
                  Download Resume
                </a>
              )}

              {config.showExperienceLink && (
                <a
                  href="/about"
                  onClick={() => track('hero_cta_click', { cta: 'about', page })}
                  className="brutal-link px-2 py-4"
                >
                  View Experience
                </a>
              )}

              {page === 'about' && (
                <a href="#experience" className="brutal-link px-2 py-4">
                  View Timeline ↓
                </a>
              )}
            </div>
          )}
        </div>

        {config.showPortrait && (
          <div className="order-2 flex justify-center lg:justify-end items-center lg:pl-8 py-4 lg:py-8">
            <HeroPortrait />
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute bottom-6 left-4 md:left-8 hidden lg:block max-w-xs">
        <div className="hero-frame-line h-[3px] w-16 bg-foreground mb-3" />
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground leading-relaxed">
          {config.footerNote}
        </p>
      </div>
    </section>
  );
};
