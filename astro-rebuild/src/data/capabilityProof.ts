export type CapabilityMetric = {
  value: string;
  label: string;
  note: string;
};

export const capabilityProof = {
  eyebrow: 'Scope & proof',
  headline: 'Built for production teams.',
  subheadline:
    'Full-stack web apps, APIs, and cloud infrastructure for B2B and e-commerce — scoped for speed, maintainability, and measurable outcomes after launch.',
  metrics: [
    {
      value: '99%',
      label: 'Lighthouse desktop',
      note: 'Forzabuilt · 200+ SKU catalog',
    },
    {
      value: '0→28',
      label: 'Qualified inbound',
      note: 'First 4 months post-launch',
    },
    {
      value: '285%',
      label: 'YoY traffic growth',
      note: 'VITO Shopify rebuild',
    },
    {
      value: '7+ yrs',
      label: 'In production',
      note: 'React · Node · PostgreSQL',
    },
  ] satisfies CapabilityMetric[],
} as const;
