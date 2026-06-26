/** Recruiter FAQ — grounded answers the assistant must prefer over inference. */
export const recruiterFaqs = [
  {
    id: 'faq-years-experience',
    keywords: ['years', 'experience', 'how long', 'tenure', 'seniority'],
    q: 'How many years of experience does Nico have?',
    a: 'Eight years total — from IT/help desk and web development (2020) through full-stack product engineering. Career arc: Furniture Packages USA (IT → junior dev) → Villa Marketers (WordPress/SEO) → VITO Fryfilter (Shopify commerce) → Nexrena (part-time platform, 2024–present) → Forza (senior full-stack, Jan 2025–May 2026).',
  },
  {
    id: 'faq-remote',
    keywords: ['remote', 'hybrid', 'onsite', 'office', 'location', 'est', 'timezone'],
    q: 'Has he worked remotely?',
    a: 'Yes. Forza, Nexrena, and Villa Marketers were remote. VITO and Furniture Packages USA were Florida-based with remote collaboration where applicable. He is based in Kissimmee, FL (Orlando metro), works US-remote, and overlaps EST for standups and launches. Open to remote senior full-stack roles with US employers. Less ideal: daily onsite outside Central Florida.',
  },
  {
    id: 'faq-work-authorization',
    keywords: ['visa', 'sponsorship', 'authorization', 'citizen', 'eligible'],
    q: 'Does he need visa sponsorship?',
    a: 'No. Authorized to work in the United States. No visa sponsorship required.',
  },
  {
    id: 'faq-why-looking',
    keywords: ['why looking', 'why leave', 'why left', 'open to', 'job search', 'available'],
    q: 'Why is he looking for a new opportunity?',
    a: 'Forza engagement concluded May 2026 after delivering the ForzaBuilt and Rugged Red rebuilds. He is open to remote senior full-stack roles with US product teams where he can own features end to end. Nexrena (his client studio) continues part-time and is separate from his job search.',
  },
  {
    id: 'faq-leadership',
    keywords: ['lead', 'leadership', 'manage', 'manager', 'mentor', 'owned', 'independently'],
    q: 'Has he led projects or worked independently?',
    a: 'Yes. At Forza he led full-stack delivery for multi-brand web platforms. At Nexrena he is sole builder of the ops platform. At VITO he was the sole US technical hire. He collaborates with design and marketing stakeholders but owns architecture, implementation, and production deploys.',
  },
  {
    id: 'faq-ai',
    keywords: ['ai', 'cursor', 'openai', 'llm', 'automation', 'copilot'],
    q: 'Has he worked with AI?',
    a: 'Yes — in daily engineering workflow. Uses Cursor and OpenAI API integrations for intake automation (Nexrena), content pipelines, and accelerated migration work. He treats AI-generated code like any other: reviewed, tested, and owned in production.',
  },
  {
    id: 'faq-salary',
    keywords: ['salary', 'comp', 'compensation', 'rate', 'pay', 'expectation'],
    q: 'What are his salary expectations?',
    a: 'Senior full-stack band — he prefers to discuss compensation after role scope, team fit, and level are clear. Not documented as a specific number on the portfolio.',
  },
  {
    id: 'faq-testing',
    keywords: ['test', 'testing', 'jest', 'cypress', 'qa', 'tdd'],
    q: 'What is his approach to testing?',
    a: 'Testing depth varies by project. Documented production work emphasizes manual QA, stakeholder review, Lighthouse/Core Web Vitals validation, and migration redirect verification. Automated test suites are not prominently documented across client projects — ask about testing expectations for the specific role.',
  },
  {
    id: 'faq-weaknesses',
    keywords: ['weakness', 'gap', 'not', 'limited', 'weak', 'improve'],
    q: 'What are potential weaknesses or gaps?',
    a: 'Honest gaps to discuss: (1) Not a pure DevOps/platform engineer — deploys on Vercel/AWS but infra-only roles are a poor fit. (2) Mobile-native (Swift/Kotlin) not in documented stack. (3) Large-enterprise process experience is lighter than FAANG — strength is hands-on ownership at SMB/mid-market B2B. (4) Spanish is limited working proficiency.',
  },
  {
    id: 'faq-best-project',
    keywords: ['best project', 'strongest', 'most impressive', 'proudest', 'demonstrates'],
    q: 'What project best demonstrates his skills?',
    a: 'ForzaBuilt for full-stack + migration + performance + business impact (99% Lighthouse, 28 MQLs, 200+ SKU catalog). Nexrena platform for API/data ownership. VITO for commerce + automation at scale.',
  },
  {
    id: 'faq-debugging',
    keywords: ['debug', 'debugging', 'troubleshoot', 'incident', 'production issue'],
    q: 'How does he approach debugging?',
    a: 'Not extensively documented in writing. Based on role pattern: reproduces in production-like environments, checks logs and network boundaries, isolates UI vs API vs data layer, and communicates status to stakeholders. Forza and Nexrena work required fixing live client issues under deadline pressure.',
  },
  {
    id: 'faq-designers',
    keywords: ['designer', 'design', 'figma', 'ux', 'collaboration', 'stakeholder'],
    q: 'How does he work with designers?',
    a: 'Collaborates closely with designers — Sydney Saathoff (Forza) and marketing leads at VITO/Forza noted strong design partnership. Builds from mockups in React/Next/Astro, gives realistic deadline feedback (per Randy Bakes recommendation).',
  },
] as const;

export const technicalDepthNotes: Record<string, string> = {
  react:
    'Production use: React islands in Astro (ForzaBuilt), Next.js apps (Nexrena, FPUSA), headless React on AWS (Rugged Red). Strong in component architecture, selective hydration, and B2B catalog UX.',
  nextjs:
    'Production Next.js for Nexrena platform, FPUSA procurement flows, and B2B patterns. App routing, API routes, and SEO-aware page structure.',
  nodejs:
    'Express APIs on Heroku for intake backend and Nexrena platform. REST design, validation, PostgreSQL integration.',
  postgresql:
    'Primary database in production — Nexrena (Prisma), intake backend, FPUSA quoting logic. Schema design, migrations, relational modeling.',
  shopify:
    'Deep Shopify/Liquid at VITO — custom JS, calculators, cart validation, international storefronts.',
  aws: 'EC2, S3, CloudFront for Rugged Red headless storefront. Not primary identity as a cloud architect.',
  seo: 'Documented strength — technical SEO, redirects, structured data, Core Web Vitals on ForzaBuilt and FPUSA (+210% organic).',
  auth: 'Session auth in Nexrena ops dashboard and portfolio operations (cookie-based). Not documented as SSO/OAuth specialist.',
  ci_cd:
    'Deploys via Vercel and Heroku with manual release validation. Git-based workflow; formal CI/CD pipeline details not extensively documented.',
};
