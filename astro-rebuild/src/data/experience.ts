/** Work history — keep in sync with Nicholas_Loperena_Resume_v6.pdf / gen_v6.py */
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
    dates: 'Jan 2025 – Present',
    role: 'Senior Full-Stack Engineer',
    company: 'Forza',
    location: 'Remote',
    bullets: [
      'Rebuilt ForzaBuilt.com and RuggedRed.com on React/Astro; improved Core Web Vitals',
      'Shipped interactive product tools and industry landing pages on Vercel',
    ],
  },
  {
    id: 'nexrena',
    dates: 'Apr 2024 – Present',
    role: 'Founder & Lead Full-Stack Engineer',
    company: 'Nexrena',
    location: 'Remote',
    companyUrl: 'https://www.nexrena.com',
    bullets: [
      'Built platform (Next.js, Node/Express, PostgreSQL) for CRM, PM, and invoicing',
      'API-integrated workflows for client delivery and operations',
    ],
  },
  {
    id: 'vito',
    dates: 'Dec 2023 – Sep 2024',
    role: 'Web Developer',
    company: 'VITO Fryfilter, Inc.',
    bullets: [
      'Shopify e-commerce: 285% YoY traffic growth, 2.8% conversion rate, +19% sales',
      'Testimonial automation; Google reviews 8 to 40+ (still active)',
    ],
  },
  {
    id: 'villa-marketers',
    dates: 'Mar 2022 – Mar 2024',
    role: 'SEO Copywriter & Junior Developer',
    company: 'Villa Marketers',
    location: 'Remote',
    bullets: ['15+ WordPress sites, 99%+ uptime; first-page rankings for key terms'],
  },
  {
    id: 'fpusa',
    dates: 'May 2020 – Dec 2023',
    role: 'Help Desk Admin / Jr Developer',
    company: 'Furniture Packages USA',
    bullets: ['IT infrastructure, marketing automation, internal web tooling'],
  },
];
