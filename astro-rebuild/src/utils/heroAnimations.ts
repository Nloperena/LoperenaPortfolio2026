import type gsap from 'gsap';

type GsapInstance = typeof gsap;

export function runHeroIntro(root: HTMLElement, gsap: GsapInstance): gsap.core.Timeline | null {
  if (typeof window === 'undefined') return null;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set(root.querySelectorAll('[data-hero-animate]'), { clearProps: 'all' });
    return null;
  }

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from(root.querySelectorAll('.hero-frame-line'), {
    scaleX: 0,
    transformOrigin: 'left center',
    duration: 0.9,
    stagger: 0.08,
  })
    .from(
      root.querySelector('.hero-meta'),
      { y: 16, duration: 0.55 },
      '-=0.45'
    )
    .from(
      root.querySelectorAll('.hero-headline-line'),
      { yPercent: 115, duration: 0.85, stagger: 0.14 },
      '-=0.25'
    )
    .from(
      root.querySelector('.hero-subline'),
      { y: 20, duration: 0.65 },
      '-=0.35'
    );

  const highlights = root.querySelectorAll('.hero-highlight');
  if (highlights.length) {
    tl.from(highlights, { y: 14, duration: 0.45, stagger: 0.07 }, '-=0.3');
  }

  const portrait = root.querySelector('.hero-portrait');
  if (portrait) {
    tl.from(
      portrait,
      { y: 24, duration: 0.85, ease: 'power2.out' },
      '-=0.85'
    );
  }

  tl.from(
    root.querySelectorAll('.hero-cta > *'),
    { y: 18, duration: 0.5, stagger: 0.08 },
    '-=0.55'
  );

  return tl;
}

export function bindHeroParallax(root: HTMLElement, gsap: GsapInstance): () => void {
  if (typeof window === 'undefined') return () => {};

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {};
  }

  const portrait = root.querySelector('.hero-portrait');
  if (!portrait) {
    return () => {};
  }

  const onMove = (event: MouseEvent) => {
    const rect = root.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    gsap.to(portrait, {
      x: x * 6,
      y: y * 8,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  const onLeave = () => {
    gsap.to(portrait, { x: 0, y: 0, duration: 0.8, ease: 'power2.out' });
  };

  root.addEventListener('mousemove', onMove);
  root.addEventListener('mouseleave', onLeave);

  return () => {
    root.removeEventListener('mousemove', onMove);
    root.removeEventListener('mouseleave', onLeave);
  };
}
