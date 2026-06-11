export const siteProfile = {
  name: 'Nico Loperena',
  legalName: 'Nicholas Loperena',
  title: 'Senior Full-Stack Engineer',
  titleExtended:
    'Senior Full-Stack Engineer | React, Next.js, Node.js, TypeScript, PostgreSQL | Remote',
  location: 'Kissimmee, FL / Remote',
  locationShort: 'Kissimmee, FL // EST',
  availability: 'Open to full-time & senior contract roles',
  availabilityShort: 'OPEN TO FULL-TIME & CONTRACT',
  workStyle: 'Remote · US-based',
  specialty: 'React, Next.js, Node.js, TypeScript, PostgreSQL, AWS',
  tagline:
    'Production web applications and APIs with React, Next.js, Node.js, TypeScript, and PostgreSQL — shipped for B2B and e-commerce teams, remote-first.',
  heroHeadlineLines: ['Senior Full-Stack', 'Engineer'],
  heroSubline:
    'I build production web applications, APIs, and cloud infrastructure — from interface to database.',
  heroHighlights: ['React & Next.js', 'Node & TypeScript', 'PostgreSQL & AWS'],
  footerBlurb:
    'Senior full-stack engineer building production web applications, APIs, and cloud-deployed platforms for B2B and e-commerce.',
  linkedInUrl: 'https://www.linkedin.com/in/nicholas-loperena/',
  githubUrl: 'https://github.com/NLoperena',
  email: 'nicholasloperena@gmail.com',
  resumePath: '/Nicholas_Loperena_Resume_v6.pdf',
  resumeDownloadName: 'Nicholas_Loperena_Resume_v6.pdf',
  siteUrl: 'https://www.nicoloperena.com',
  ogImage: '/professional-photo.webp',
} as const;

export type PageKey = 'home' | 'about' | 'work';

export const pageHeroes: Record<
  PageKey,
  {
    eyebrow: string;
    meta: string;
    headlineLines: readonly [string, string];
    subline: string;
    highlights: readonly string[];
    showPortrait: boolean;
    showContact: boolean;
    showResume: boolean;
    showExperienceLink: boolean;
    compact: boolean;
    footerNote: string;
  }
> = {
  home: {
    eyebrow: siteProfile.title,
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
    headlineLines: ['Experience', '& Delivery'],
    subline:
      'Seven years shipping production web applications and APIs for B2B and e-commerce teams. I own features from UI through database — remote-first, results after handoff.',
    highlights: ['7+ Years', 'Full-Stack', 'Remote-First'],
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
};
