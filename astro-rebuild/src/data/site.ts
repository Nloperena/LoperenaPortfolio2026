export const siteProfile = {

  name: 'Nico Loperena',

  legalName: 'Nicholas Loperena',

  title: 'Senior Full-Stack Engineer',

  titleExtended:

    'Senior Full-Stack Engineer | React, Next.js, Node.js, TypeScript | Remote (US)',

  location: 'Kissimmee, FL · Remote (US)',

  locationShort: 'Kissimmee, FL // Remote // EST',

  availability: 'Open to remote senior full-stack roles (US)',

  availabilityShort: 'OPEN TO REMOTE SENIOR ROLES',

  workStyle: 'Remote · US-based · EST overlap',

  specialty: 'React, Next.js, Node.js, TypeScript, PostgreSQL, AWS',

  tagline:

    'Senior full-stack engineer building production web apps and APIs for remote US teams.',

  heroHeadlineLines: ['Senior Full-Stack', 'Engineer'],

  heroSubline:

    'I\'m Nico — eight years shipping full-stack products for B2B and e-commerce teams. I started in IT and help desk, went deep on web and engineering, and I still care most about what happens after launch: systems that stay fast, clear to work with, and easy for the next person to pick up.',

  heroHighlights: ['8 yrs in production', 'Collaborative · remote-ready', 'React · Node · TypeScript'],

  footerBlurb:

    'Senior full-stack engineer in Kissimmee, FL (Orlando metro). I build web applications and APIs for remote US teams and I\'m open to senior engineering roles.',

  linkedInUrl: 'https://www.linkedin.com/in/nicholas-loperena/',

  githubUrl: 'https://github.com/NLoperena',

  email: 'nicholasloperena@gmail.com',

  phone: '407-790-5891',

  resumePath: '/Nicholas_Loperena_Resume_v8.pdf',

  resumeDownloadName: 'Nicholas_Loperena_Resume_v8.pdf',

  siteUrl: 'https://www.nicoloperena.com',

  ogImage: '/og/og-home.png',

  nexrenaUrl: 'https://www.nexrena.com',

  nexrenaBlurb:
    'Nexrena is my client web studio for B2B builds. This portfolio is focused on engineering hiring.',

  founderLine: 'Founder & Lead Engineer, Nexrena',

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

    eyebrow: 'Open to remote senior roles',

    meta: siteProfile.location,

    headlineLines: ['Senior Full-Stack', 'Engineer'],

    subline: siteProfile.heroSubline,

    highlights: siteProfile.heroHighlights,

    showPortrait: false,

    showContact: true,

    showResume: true,

    showExperienceLink: true,

    compact: false,

    footerNote: 'Remote US · EST overlap · Happy to talk stack and team fit',

  },

  about: {

    eyebrow: 'About',

    meta: siteProfile.locationShort,

    heroImage: '/og/og-about.png',

    headlineLines: ['Senior Full-Stack', 'Engineer'],

    subline:

      'My path started in help desk and IT, moved through web and SEO, and landed in full-stack engineering — so I’m used to translating between business folks, designers, and code. Based in Kissimmee, FL; remote for US teams with clear communication and EST overlap.',

    highlights: ['Kissimmee · Remote', 'Team-oriented', 'Production-first'],

    showPortrait: true,

    showContact: true,

    showResume: true,

    showExperienceLink: false,

    compact: false,

    footerNote: siteProfile.availability,

  },

  work: {

    eyebrow: 'Portfolio',

    meta: 'Production systems',

    heroImage: '/og/og-work.png',

    headlineLines: ['Selected', 'Work'],

    subline:

      'Real apps in production — B2B catalogs, headless commerce, and internal ops platforms. Each project below includes my role, approach, and what changed for the team.',

    highlights: ['Live in production', 'Full-stack ownership', 'Measurable outcomes'],

    showPortrait: false,

    showContact: true,

    showResume: true,

    showExperienceLink: false,

    compact: true,

    footerNote: 'Scroll the gallery or read case studies on the homepage',

  },

  blog: {

    eyebrow: 'Blog',

    meta: 'React · Next.js · PostgreSQL · AWS',

    heroImage: '/og/og-blog.png',

    headlineLines: ['Engineering', 'Notes'],

    subline:

      'Short write-ups on things I\'ve actually shipped — migrations, data modeling, performance, and full-stack patterns. Written for engineers evaluating how I think and work.',

    highlights: ['Production learnings', 'React · Node · Postgres', 'Remote · US-based'],

    showPortrait: false,

    showContact: true,

    showResume: false,

    showExperienceLink: false,

    compact: true,

    footerNote: 'Scroll for articles',

  },

};


