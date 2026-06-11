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
      { y: 16, opacity: 0, duration: 0.55 },
      '-=0.45'
    )
    .from(
      root.querySelectorAll('.hero-headline-line'),
      { yPercent: 115, opacity: 0, duration: 0.85, stagger: 0.14 },
      '-=0.25'
    )
    .from(
      root.querySelector('.hero-subline'),
      { y: 20, opacity: 0, duration: 0.65 },
      '-=0.35'
    )
    .from(
      root.querySelectorAll('.hero-highlight'),
      { y: 14, opacity: 0, duration: 0.45, stagger: 0.07 },
      '-=0.3'
    )
    .from(
      root.querySelector('.hero-video'),
      { y: 40, opacity: 0, scale: 0.94, duration: 1.1, ease: 'power2.out' },
      '-=0.85'
    )
    .from(
      root.querySelectorAll('.hero-cta > *'),
      { y: 18, opacity: 0, duration: 0.5, stagger: 0.08 },
      '-=0.55'
    );

  return tl;
}

export function bindHeroParallax(root: HTMLElement, gsap: GsapInstance): () => void {
  if (typeof window === 'undefined') return () => {};

  const video = root.querySelector('.hero-video');
  if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {};
  }

  const onMove = (event: MouseEvent) => {
    const rect = root.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    gsap.to(video, {
      x: x * 10,
      y: y * 14,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  const onLeave = () => {
    gsap.to(video, { x: 0, y: 0, duration: 0.8, ease: 'power2.out' });
  };

  root.addEventListener('mousemove', onMove);
  root.addEventListener('mouseleave', onLeave);

  return () => {
    root.removeEventListener('mousemove', onMove);
    root.removeEventListener('mouseleave', onLeave);
  };
}
