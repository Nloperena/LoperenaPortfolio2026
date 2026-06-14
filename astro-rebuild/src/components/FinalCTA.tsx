import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { track } from '../utils/analytics';
import { siteProfile } from '../data/site';

export const FinalCTA = () => {
  const currentYear = new Date().getFullYear();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const handleContactClick = () => {
    track('contact_click', { source: 'final_cta' });
    // @ts-expect-error global contact hub
    if (typeof window !== 'undefined' && window.openContactHub) {
      // @ts-expect-error global contact hub
      window.openContactHub();
    }
  };

  const y1 = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.75], [0, 1]);

  return (
    <section ref={containerRef} className="relative w-full h-[100vh] -z-10">
      <div className="fixed bottom-0 left-0 w-full h-screen bg-background-dark text-foreground-light overflow-hidden flex flex-col pointer-events-auto border-t-4 border-foreground">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08]"
          aria-hidden="true"
          style={{
            backgroundImage:
              'linear-gradient(to right, var(--color-highlight-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-highlight-line) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1400px] flex-col border-x-2 border-foreground">
          <div className="grid flex-1 grid-cols-1 md:grid-cols-2">
            <div className="relative flex flex-col justify-end border-b-2 border-foreground bg-background-dark p-8 md:border-b-0 md:border-r-2 md:p-12 lg:p-16">
              <div className="absolute left-8 top-8 flex items-center gap-4 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-secondary md:left-12 md:top-12">
                {siteProfile.availability}
                <span className="hidden h-0.5 w-8 bg-highlight sm:block" />
                {siteProfile.workStyle}
              </div>

              <motion.div style={{ y: y1, opacity: opacity1 }}>
                <h2 className="font-mono text-[clamp(3rem,7vw,8rem)] font-black uppercase leading-[0.88] tracking-tighter">
                  LET&apos;S
                  <br />
                  CONNECT
                  <br />
                  SOON.
                </h2>
                <p className="mt-6 max-w-md font-sans text-lg leading-relaxed text-secondary">
                  Hiring for a senior full-stack role? I&apos;d like to hear about your team, what you&apos;re
                  building, and whether I&apos;m a good fit.
                </p>
              </motion.div>
            </div>

            <div
              className="group relative flex cursor-pointer flex-col items-start justify-end overflow-hidden border-b-2 border-foreground bg-highlight p-8 text-foreground md:border-b-0 md:p-12 lg:p-16"
              onClick={handleContactClick}
            >
              <motion.div className="relative z-10 flex w-full flex-col gap-4" style={{ y: y1, opacity: opacity1 }}>
                <span className="font-mono text-[clamp(2rem,5vw,4.5rem)] font-black uppercase leading-none tracking-tight group-hover:underline decoration-4 underline-offset-8">
                  LET&apos;S TALK
                </span>
                <span className="font-mono text-5xl leading-none md:text-6xl group-hover:translate-x-3 transition-none">
                  →
                </span>
              </motion.div>
            </div>
          </div>

          <div className="relative z-20 flex min-h-20 shrink-0 items-center border-t-2 border-foreground bg-foreground">
            <div className="flex h-full w-full flex-col items-center justify-between gap-4 px-6 py-4 md:flex-row md:px-12 md:py-0">
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-background">
                © {currentYear} NICO LOPERENA // {siteProfile.title.toUpperCase()}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                {[
                  { label: 'RESUME', url: siteProfile.resumePath, external: false, download: siteProfile.resumeDownloadName },
                  { label: 'RECRUITERS', url: '/for-recruiters', external: false },
                  { label: 'BLOG', url: '/blog', external: false },
                  { label: 'NEXRENA', url: siteProfile.nexrenaUrl, external: true },
                  { label: 'LINKEDIN', url: siteProfile.linkedInUrl, external: true },
                  { label: 'GITHUB', url: siteProfile.githubUrl, external: true },
                  { label: 'EMAIL', url: `mailto:${siteProfile.email}`, external: false },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    download={'download' in social ? social.download : undefined}
                    target={social.external ? '_blank' : undefined}
                    rel={social.external ? 'noopener noreferrer' : undefined}
                    onClick={() => track('final_cta_social_click', { platform: social.label.toLowerCase() })}
                    className="group flex cursor-pointer items-center gap-1"
                  >
                    <span className="px-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-background group-hover:bg-highlight group-hover:text-foreground">
                      {social.label}
                    </span>
                    <span className="font-mono text-[10px] text-highlight opacity-0 group-hover:opacity-100">
                      {social.external ? '↗' : '→'}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
