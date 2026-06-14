/** Per-page OG imagery — desktop screenshots in /public/og and /public/blog */
export const pageImages = {
  home: {
    og: '/og/og-home.png',
    alt: 'Nico Loperena portfolio homepage — senior full-stack engineer',
  },
  about: {
    og: '/og/og-about.png',
    hero: '/og/og-about.png',
    alt: 'About Nico Loperena — senior full-stack engineer in Kissimmee, FL',
  },
  work: {
    og: '/og/og-work.png',
    hero: '/og/og-work.png',
    alt: 'Selected work — B2B e-commerce and full-stack engineering projects',
  },
  blog: {
    og: '/og/og-blog.png',
    hero: '/og/og-blog.png',
    alt: 'Engineering blog by Nico Loperena',
  },
  forRecruiters: {
    og: '/og/og-for-recruiters.png',
    alt: 'For recruiters — senior full-stack engineer hiring reference',
  },
  resume: {
    og: '/og/og-resume.png',
    alt: 'Resume — Nicholas Loperena, senior full-stack engineer',
  },
} as const;

export function blogPostOgImage(slug: string): string {
  return `/blog/og-${slug.replace(/\.md$/, '')}.png`;
}
