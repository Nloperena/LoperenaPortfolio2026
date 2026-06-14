export type CapabilityMetric = {

  value: string;

  label: string;

  note: string;

};



export const capabilityProof = {

  eyebrow: 'What I bring',

  headline: 'I own the work end to end.',

  subheadline:

    'From UI to API to deploy — the same person in standup, in the PR, and when something needs fixing in production.',

  metrics: [

    {

      value: '99%',

      label: 'Lighthouse desktop',

      note: 'Forzabuilt · 200+ SKU catalog',

    },

    {

      value: '8 yrs',

      label: 'Shipping in production',

      note: 'IT roots → full-stack',

    },

    {

      value: '40+',

      label: 'Google reviews',

      note: 'VITO · automated testimonial pipeline',

    },

    {

      value: '+285%',

      label: 'Traffic YoY',

      note: 'VITO Shopify storefront',

    },

  ] satisfies CapabilityMetric[],

} as const;


