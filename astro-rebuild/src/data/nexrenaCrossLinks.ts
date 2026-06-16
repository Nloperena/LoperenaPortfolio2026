export type NexrenaCrossLink = {
  label: string;
  href: string;
  description: string;
};

/** Related Nexrena resources for portfolio blog posts (cross-domain SEO). */
export const nexrenaCrossLinksByPost: Record<string, NexrenaCrossLink[]> = {
  'improve-core-web-vitals-react-astro': [
    {
      label: 'Core Web Vitals for B2B sites',
      href: 'https://www.nexrena.com/resources/blog/core-web-vitals-b2b/',
      description: 'How Nexrena approaches performance on conversion-focused B2B builds.',
    },
  ],
  'building-b2b-ecommerce-nextjs': [
    {
      label: 'Headless e-commerce guide',
      href: 'https://www.nexrena.com/resources/blog/headless-ecommerce/',
      description: 'Agency perspective on headless commerce architecture and launch sequencing.',
    },
    {
      label: 'B2B conversion optimization',
      href: 'https://www.nexrena.com/resources/blog/b2b-conversion-optimization/',
      description: 'Conversion paths for technical and commercial buyers.',
    },
  ],
  'postgresql-patterns-full-stack-apps': [
    {
      label: 'Analytics for B2B websites',
      href: 'https://www.nexrena.com/resources/blog/analytics-b2b-website/',
      description: 'Instrumentation patterns for pipeline-focused reporting.',
    },
  ],
  'hiring-senior-full-stack-engineer-remote': [
    {
      label: 'Agency vs in-house delivery',
      href: 'https://www.nexrena.com/resources/blog/agency-vs-in-house/',
      description: 'When a client studio model vs a full-time hire makes sense.',
    },
  ],
  'kissimmee-orlando-full-stack-engineer-remote': [
    {
      label: 'Web design in Orlando — buyer guide',
      href: 'https://www.nexrena.com/resources/blog/web-design-orlando/',
      description: 'How Central Florida B2B teams evaluate web design partners.',
    },
  ],
};
