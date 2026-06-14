export interface ProjectCaseStudy {
  problem: string;
  role: string;
  approach: string;
  outcome: string;
}

export interface Project {
  id: string;
  title: string;
  year: string;
  description: string;
  longDescription: string;
  impact: string;
  tags: string[];
  link: string;
  image?: string;
  caseStudy?: ProjectCaseStudy;
}

export const projects: Project[] = [
  {
    id: 'forza-built',
    title: 'Forzabuilt',
    year: '2025–2026',
    description: 'WordPress → Astro rebuild of 200+ SKU industrial catalog with redirect-safe migration.',
    longDescription:
      'Led the WordPress-to-Astro rebuild of ForzaBuilt.com — 200+ SKU B2B adhesives catalog with React islands, layered redirect architecture, structured data, and procurement-focused information architecture. Sustained 99% Lighthouse desktop and 28 qualified inbound leads in the first four months post-launch. Credited with the best single website contact in company history.',
    impact: '99% Lighthouse · 28 MQLs in 4 mo',
    tags: ['React', 'Astro', 'TypeScript', 'Vercel'],
    link: 'https://forzabuilt.com',
    image: '/Forzabuilt.png',
    caseStudy: {
      problem: 'Legacy WordPress catalog was slow, hard to maintain, and losing organic traffic.',
      role: 'Senior full-stack engineer; owned front-end architecture and migration.',
      approach: 'Astro/React rebuild, redirect map, CMS governance, Core Web Vitals focus on Vercel.',
      outcome: '99% Lighthouse desktop; credited with record inbound lead for the company.',
    },
  },
  {
    id: 'furniture-packages-usa',
    title: 'Furniture Packages USA',
    year: '2024–2026',
    description: 'Buyer-type procurement UX and SEO program for Florida vacation-rental furnishings.',
    longDescription:
      'Led site architecture and search growth for a turnkey furnishings company serving investors and property managers — buyer-persona navigation, structured quote pathways, redirect-safe migration, and analytics tied to quote requests. Organic traffic up 210% over six months; inbound quote volume nearly doubled.',
    impact: '+210% organic · ~2× quote requests',
    tags: ['Next.js', 'SEO', 'B2B', 'Analytics'],
    link: 'https://www.furniturepackagesusa.com',
    image: '/FPUSA.png',
    caseStudy: {
      problem: 'High-touch B2B procurement was buried in generic site flows; investors and PMs could not find clear quote paths.',
      role: 'Lead engineer on site rebuild, IA, and SEO program (2024–2026 engagement).',
      approach: 'Buyer-type navigation, structured quote workflows, technical SEO overhaul with full redirect mapping.',
      outcome: '+210% organic traffic in six months; quote requests up ~95%; stronger engagement on buyer pathways.',
    },
  },
  {
    id: 'vito-fryfilter',
    title: 'VITO Fryfilter',
    year: '2023–2024',
    description: 'US Shopify storefront with product calculator, SEO program, and testimonial automation.',
    longDescription:
      'Sole US technical hire for VITO Fryfilter — owned shop.vitofryfilter.com on Shopify with custom Liquid, HTML/CSS, and JavaScript. Shipped product calculator and quiz flows, SEO-optimized product pages, CDN integrations, and an automated testimonial pipeline that scaled Google reviews from 8 to 40+. Store traffic up 285% YoY with a 2.8% conversion rate; automation still running in production.',
    impact: '+285% traffic · 2.8% CVR',
    tags: ['Shopify', 'Liquid', 'JavaScript', 'SEO'],
    link: 'https://shop.vitofryfilter.com',
    image: '/VITOShop.png',
    caseStudy: {
      problem: 'Premium commercial fryer filtration with a dated US storefront, weak social proof, and poor mobile UX blocking conversions.',
      role: 'Sole US technical hire; owned Shopify storefront, custom front end, and marketing automation.',
      approach: 'Shopify rebuild, product calculator/quiz, technical SEO, CDN performance, automated video testimonial capture.',
      outcome: '285% YoY traffic growth, 2.8% conversion, 40+ Google reviews via pipeline still active in production.',
    },
  },
  {
    id: 'nexrena-platform',
    title: 'Nexrena Platform',
    year: '2024–Present',
    description: 'Custom CRM, PM, invoicing, and client API platform on Next.js and PostgreSQL.',
    longDescription:
      'Built and operate the full-stack platform behind Nexrena — Next.js UI, Express APIs, and PostgreSQL/Prisma for CRM, project management, invoicing, subscription tracking, and REST-integrated client workflows. Single owned system replacing multiple SaaS tools in daily use.',
    impact: 'CRM · PM · invoicing · APIs',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'TypeScript'],
    link: 'https://www.nexrena.com',
    image: '/Nexrena.png',
    caseStudy: {
      problem: 'Agency ops spread across CRM, PM, invoicing, and ad hoc spreadsheets.',
      role: 'Founder and lead engineer; sole builder of the platform.',
      approach: 'Next.js UI, Express APIs, PostgreSQL/Prisma, integrated client workflows.',
      outcome: 'Single owned system replacing multiple SaaS tools in daily use.',
    },
  },
  {
    id: 'rugged-red',
    title: 'Rugged Red',
    year: '2025',
    description: 'Forza cleaning division launched as a standalone brand on shared platform architecture.',
    longDescription:
      'Architected Rugged Red as Forza\'s dedicated cleaning product line — separate category routes and customer-facing identity while sharing content ops, routing logic, and deployment with ForzaBuilt. Headless React on AWS with Stripe; scalable multi-brand URL patterns without maintaining two separate stacks.',
    impact: 'Division launch · shared platform',
    tags: ['React', 'Node.js', 'AWS', 'TypeScript'],
    link: 'https://ruggedred.com',
    image: '/RuggedRed.png',
    caseStudy: {
      problem: 'Forza needed Rugged Red discoverable as its own cleaning division without duplicating platforms or content ops.',
      role: 'Senior full-stack engineer; division architecture and shared multi-brand routing.',
      approach: 'Dedicated cleaners routes, headless React on AWS, shared product/content backbone with ForzaBuilt.',
      outcome: 'Launch-ready division UX with one scalable operating system for both brands.',
    },
  },
];
