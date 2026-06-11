/** Per-page OG and hero imagery (generated assets in /public/og and /public/blog) */
export const pageImages = {
  home: {
    og: '/og/og-home.png',
    alt: 'Abstract blueprint illustration for a senior full-stack engineer portfolio',
  },
  about: {
    og: '/og/og-about.png',
    hero: '/og/og-about.png',
    alt: 'Abstract resume and career timeline illustration',
  },
  work: {
    og: '/og/og-work.png',
    hero: '/og/og-work.png',
    alt: 'Abstract B2B e-commerce and portfolio work illustration',
  },
  blog: {
    og: '/og/og-blog.png',
    hero: '/og/og-blog.png',
    alt: 'Abstract engineering blog illustration with blueprint grid',
  },
} as const;
