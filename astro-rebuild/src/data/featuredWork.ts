/**
 * Featured Work strip copy — researched from production deployments and project outcomes.
 * Keep in sync with projects.ts ids.
 */
export const featuredWorkSection = {
  title: 'Featured Work',
  intro:
    'Live systems I helped build and still maintain — from catalog migrations and Shopify commerce to multi-brand architecture and the ops platform I run day to day. Nexrena is my client studio; this portfolio is for engineering hiring.',
} as const;

export type FeaturedWorkItem = {
  impact: string;
  description: string;
};

export const featuredWorkByProjectId: Record<string, FeaturedWorkItem> = {
  'forza-built': {
    impact: '99% Lighthouse · 28 MQLs in 4 mo',
    description:
      'Partnered with Forza leadership on a WordPress → Astro rebuild of a 200+ SKU industrial catalog: React islands, layered redirects, Product/FAQ schema, and procurement-focused IA on Vercel. Credited with the best inbound lead in company history.',
  },
  'rugged-red': {
    impact: 'Division launch · shared Forza platform',
    description:
      'Worked with the Forza team to launch Rugged Red as its own brand — dedicated category routes, headless React on AWS, and shared content/product ops so two brands run on one system.',
  },
  'vito-fryfilter': {
    impact: '+285% traffic · 2.8% CVR',
    description:
      'Sole US technical hire on Shopify — built custom calculator and quiz flows, SEO product pages, CDN integrations, and a testimonial automation pipeline that grew Google reviews from 8 to 40+. Still running in production.',
  },
  'nexrena-platform': {
    impact: 'CRM · PM · invoicing · APIs',
    description:
      'Full-stack platform I built and operate: Next.js UI, Express APIs, PostgreSQL/Prisma for CRM, project management, invoicing, subscriptions, and client delivery workflows — replaces a stack of SaaS tools.',
  },
  'furniture-packages-usa': {
    impact: '+210% organic · ~2× quote requests',
    description:
      '2024–2026 site and SEO program for turnkey vacation-rental furnishings: buyer-type navigation (investors, PMs, developers), structured quote paths, redirect-safe migration, and analytics on high-intent actions.',
  },
};
