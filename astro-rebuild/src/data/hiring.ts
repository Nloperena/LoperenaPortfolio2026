import { siteProfile } from './site';

/** Recruiter-facing facts — keep aligned with resume PDF and LinkedIn. */
export const hiringProfile = {
  legalName: siteProfile.legalName,
  preferredName: siteProfile.name,
  title: siteProfile.title,
  yearsExperience: 8,
  location: siteProfile.location,
  workStyle: siteProfile.workStyle,
  availability: siteProfile.availability,
  specialty: siteProfile.specialty,
  workAuthorization: 'Authorized to work in the United States. No visa sponsorship required.',
  roleTypes: ['Full-time W-2 (remote US)', 'Senior contract (remote US)'],
  compensationNote: 'Senior full-stack band — happy to discuss after role scope and team fit.',
  phone: '407-790-5891',
  /** Set when you have a scheduling link; UI hides the button when empty. */
  schedulingUrl: '' as string,
  founderNote:
    'I run Nexrena, my client web studio. This portfolio is for engineering hiring — Nexrena is separate from my job search.',
  idealFit: [
    'Product-led engineering teams with clear feature ownership',
    'B2B SaaS or e-commerce teams modernizing legacy stacks',
    'Remote US teams where full-stack means UI through API to deploy',
  ],
  lessIdeal: [
    'Daily onsite commutes outside the Orlando / Central Florida area',
    'Pure platform/DevOps or infra-only roles without product surface area',
    'Roles without stack depth (React/Node/PostgreSQL) or production ownership',
  ],
  quickLinks: {
    resumePdf: siteProfile.resumePath,
    resumePage: '/resume',
    work: '/work',
    about: '/about',
    hiringGuide: '/blog/hiring-senior-full-stack-engineer-remote',
    linkedIn: siteProfile.linkedInUrl,
    email: `mailto:${siteProfile.email}`,
  },
} as const;
