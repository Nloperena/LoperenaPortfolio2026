/** Local + recruiter SEO constants — Kissimmee base, remote delivery */
export const localSeo = {
  city: 'Kissimmee',
  region: 'FL',
  postalCode: '34744',
  country: 'US',
  metro: 'Orlando–Kissimmee–Sanford',
  areaLabel: 'Kissimmee, Orlando & Central Florida',
  remoteLabel: 'Remote · US-based · EST',
  geo: {
    latitude: 28.2919,
    longitude: -81.4076,
  },
  serviceAreas: ['Kissimmee', 'Orlando', 'Central Florida', 'Florida', 'United States'],
  recruiterKeywords: [
    'Nico Loperena',
    'Nicholas Loperena',
    'Nexrena founder',
    'senior full-stack engineer',
    'remote full-stack developer',
    'React Next.js engineer',
    'hire full-stack engineer',
    'TypeScript PostgreSQL developer',
  ],
  localKeywords: [
    'full-stack developer Kissimmee',
    'software engineer Kissimmee FL',
    'web developer Orlando',
    'React developer Central Florida',
    'remote developer Florida',
  ],
} as const;

export const seoKeywords = [
  ...localSeo.recruiterKeywords,
  ...localSeo.localKeywords,
  'Node.js',
  'Astro',
  'B2B e-commerce',
  'Core Web Vitals',
].join(', ');
