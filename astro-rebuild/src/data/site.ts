export const siteProfile = {
  name: 'Nico Loperena',
  legalName: 'Nicholas Loperena',
  title: 'Senior Full-Stack Engineer',
  titleExtended:
    'Senior Full-Stack Engineer & Nexrena Founder | React, Next.js, Node.js, TypeScript | Kissimmee, FL · Remote',
  location: 'Kissimmee, FL · Remote (US)',
  locationShort: 'Kissimmee, FL // Remote // EST',
  availability: 'Open to remote full-time & senior contract roles (US)',
  availabilityShort: 'OPEN TO REMOTE FULL-TIME & CONTRACT',
  workStyle: 'Remote only · US-based · EST overlap',
  specialty: 'React, Next.js, Node.js, TypeScript, PostgreSQL, AWS',
  tagline:
    'Senior full-stack engineer in Kissimmee, FL — remote delivery for US teams. Production web apps, APIs, and e-commerce with React, Next.js, Node.js, TypeScript, and PostgreSQL.',
  heroHeadlineLines: ['Senior Full-Stack', 'Engineer'],
  heroSubline:
    'Senior full-stack engineer and Nexrena founder, based in Kissimmee, FL. I build production web apps, APIs, and cloud infrastructure for remote US teams—from interface to database.',
  heroHighlights: ['Nexrena Founder', 'Kissimmee · Remote', 'React & PostgreSQL'],
  footerBlurb:
    'Senior full-stack engineer in Kissimmee, FL (Orlando metro), building production web applications and APIs for remote US teams and Central Florida employers.',
  linkedInUrl: 'https://www.linkedin.com/in/nicholas-loperena/',
  githubUrl: 'https://github.com/NLoperena',
  email: 'nicholasloperena@gmail.com',
  resumePath: '/Nicholas_Loperena_Resume_v6.pdf',
  resumeDownloadName: 'Nicholas_Loperena_Resume_v6.pdf',
  siteUrl: 'https://www.nicoloperena.com',
  ogImage: '/professional-photo.webp',
  nexrenaUrl: 'https://www.nexrena.com',
  nexrenaBlurb:
    'Nexrena is my B2B web design and growth agency for Central Florida and US teams—conversion-focused builds, SEO, and case studies with measured business impact.',
  founderLine: 'Founder & Lead Architect, Nexrena',
} as const;

export type PageKey = 'home' | 'about' | 'work' | 'blog';

export const pageHeroes: Record<
  PageKey,
  {
    eyebrow: string;
    meta: string;
    headlineLines: readonly [string, string];
    subline: string;
    highlights: readonly string[];
    heroImage?: string;
    showPortrait: boolean;
    showContact: boolean;
    showResume: boolean;
    showExperienceLink: boolean;
    compact: boolean;
    footerNote: string;
  }
> = {
  home: {
    eyebrow: `${siteProfile.title} · Nexrena Founder`,
    meta: siteProfile.location,
    headlineLines: ['Senior Full-Stack', 'Engineer'],
    subline: siteProfile.heroSubline,
    highlights: siteProfile.heroHighlights,
    showPortrait: true,
    showContact: true,
    showResume: true,
    showExperienceLink: true,
    compact: false,
    footerNote: siteProfile.availability,
  },
  about: {
    eyebrow: 'About',
    meta: siteProfile.locationShort,
    heroImage: '/og/og-about.png',
    headlineLines: ['Experience', '& Delivery'],
    subline:
      'Seven years shipping production web applications and APIs for B2B and e-commerce teams. Based in Kissimmee, FL—remote for US employers, with EST overlap and clear handoff.',
    highlights: ['Kissimmee · Remote', 'Full-Stack', 'Recruiter-ready'],
    showPortrait: false,
    showContact: true,
    showResume: true,
    showExperienceLink: false,
    compact: false,
    footerNote: siteProfile.availability,
  },
  work: {
    eyebrow: 'Portfolio',
    meta: 'Selected specimens',
    heroImage: '/og/og-work.png',
    headlineLines: ['Shipped', 'Systems'],
    subline:
      'Production B2B storefronts, e-commerce platforms, and full-stack applications — built to perform, maintain, and convert.',
    highlights: ['B2B', 'E-Commerce', 'Cloud'],
    showPortrait: false,
    showContact: false,
    showResume: false,
    showExperienceLink: false,
    compact: true,
    footerNote: 'Scroll to explore projects',
  },
  blog: {
    eyebrow: 'Blog',
    meta: 'For recruiters & teams',
    heroImage: '/og/og-blog.png',
    headlineLines: ['Hire', 'With clarity'],
    subline:
      'Guides for recruiters and employers—plus engineering notes on React, Next.js, PostgreSQL, and remote delivery from Kissimmee, FL.',
    highlights: ['Remote US', 'Kissimmee · Orlando', 'Senior full-stack'],
    showPortrait: false,
    showContact: true,
    showResume: false,
    showExperienceLink: false,
    compact: true,
    footerNote: 'Scroll for articles',
  },
};
