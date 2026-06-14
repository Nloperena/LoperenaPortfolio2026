import type { IconType } from 'react-icons';
import {
  SiReact,
  SiNextdotjs,
  SiAstro,
  SiTypescript,
  SiPostgresql,
  SiAmazonwebservices,
  SiNodedotjs,
  SiTailwindcss,
  SiShopify,
  SiVercel,
  SiPython,
} from 'react-icons/si';

export type StackTech = {
  name: string;
  icon?: IconType;
};

export type StackGroup = {
  id: string;
  label: string;
  items: string[];
};

/** Full list for icon marquees or legacy use — prefer stackGroups for display. */
export const stackTechnologies: StackTech[] = [
  { name: 'REACT', icon: SiReact },
  { name: 'NEXT.JS', icon: SiNextdotjs },
  { name: 'ASTRO', icon: SiAstro },
  { name: 'TYPESCRIPT', icon: SiTypescript },
  { name: 'POSTGRESQL', icon: SiPostgresql },
  { name: 'AWS', icon: SiAmazonwebservices },
  { name: 'NODE.JS', icon: SiNodedotjs },
  { name: 'TAILWIND', icon: SiTailwindcss },
  { name: 'VERCEL', icon: SiVercel },
  { name: 'SHOPIFY', icon: SiShopify },
  { name: 'PYTHON', icon: SiPython },
];

/** Homepage “Core stack” strip — hiring signal only. */
export const coreHiringStack = stackTechnologies.filter((t) =>
  ['REACT', 'NEXT.JS', 'TYPESCRIPT', 'NODE.JS', 'POSTGRESQL', 'AWS', 'PYTHON'].includes(t.name),
);

export const stackGroups: StackGroup[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    items: ['React', 'Next.js', 'Astro', 'TypeScript', 'Tailwind'],
  },
  {
    id: 'backend',
    label: 'Backend & data',
    items: ['Node.js', 'PostgreSQL', 'REST', 'Express'],
  },
  {
    id: 'platform',
    label: 'Platform',
    items: ['AWS', 'Vercel', 'Shopify', 'CDN'],
  },
  {
    id: 'workflow',
    label: 'Workflow',
    items: ['Git', 'CI/CD', 'Code review', 'Cursor in the loop'],
  },
];

export const stackCopy = {
  eyebrow: 'Stack',
  headline: 'Tools I ship with in production.',
  description:
    'The stack I reach for on client and product work — not a buzzword cloud. I care more about clear ownership, review, and what happens after launch than chasing every new tool.',
  proofLine: 'Used on Forzabuilt · VITO Fryfilter · Nexrena · Furniture Packages USA',
} as const;
