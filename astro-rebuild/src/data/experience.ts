/** Work history — keep in sync with Nicholas_Loperena_Resume_v10.pdf */
export type ExperienceEntry = {
  id: string;
  dates: string;
  role: string;
  company: string;
  location?: string;
  companyUrl?: string;
  bullets: readonly string[];
};

export const experience: ExperienceEntry[] = [
  {
    id: 'forza',
    dates: 'Jan 2025 – May 2026',
    role: 'Senior Full-Stack Engineer',
    company: 'Forza',
    location: 'Remote',
    bullets: [
      'Led product-focused full-stack delivery for a multi-brand industrial adhesives manufacturer',
      'Rebuilt ForzaBuilt.com and RuggedRed.com on React/Astro; 99% Lighthouse desktop and 28 MQLs in four months post-launch',
      'Employee of the Month (September 2025)',
    ],
  },
  {
    id: 'nexrena',
    dates: 'Apr 2024 – Present',
    role: 'Lead Full-Stack Engineer',
    company: 'Nexrena',
    location: 'Remote',
    companyUrl: 'https://www.nexrena.com',
    bullets: [
      'Part-time alongside full-time roles; built and operate platform (Next.js, Node/Express, PostgreSQL) for CRM, PM, and invoicing',
      'API-integrated workflows for client delivery and operations',
    ],
  },
  {
    id: 'vito',
    dates: 'Dec 2023 – Sep 2024',
    role: 'Full-Stack Web Developer',
    company: 'VITO Fryfilter, Inc.',
    bullets: [
      'Shopify e-commerce: 285% YoY traffic growth, 2.8% conversion rate, +19% sales',
      'Testimonial automation; Google reviews 8 to 40+ (still active)',
    ],
  },
  {
    id: 'villa-marketers',
    dates: 'Mar 2022 – Mar 2024',
    role: 'Full-Stack Web Developer & SEO Specialist',
    company: 'Villa Marketers',
    location: 'Remote',
    bullets: ['11+ WordPress sites, 99%+ uptime; first-page rankings for key terms'],
  },
  {
    id: 'fpusa',
    dates: 'May 2020 – Dec 2023',
    role: 'Help Desk Admin / Jr Developer',
    company: 'Furniture Packages USA',
    bullets: ['IT infrastructure, marketing automation, internal web tooling'],
  },
];
