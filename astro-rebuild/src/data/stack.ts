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

/** Homepage “Core stack” strip — hiring signal only. AWS omitted here; listed under deploy pillar. */
const CORE_HIRING_STACK_NAMES = [
  'REACT',
  'NEXT.JS',
  'TYPESCRIPT',
  'NODE.JS',
  'POSTGRESQL',
  'PYTHON',
  'VERCEL',
] as const;

export const coreHiringStack = CORE_HIRING_STACK_NAMES.map(
  (name) => stackTechnologies.find((t) => t.name === name)!,
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
    label: 'Deploy & host',
    items: ['Vercel', 'AWS', 'Shopify', 'CDN'],
  },
  {
    id: 'workflow',
    label: 'Workflow',
    items: ['Git', 'Code review', 'Cursor', 'AI-assisted delivery'],
  },
];

export const stackCopy = {
  eyebrow: 'Stack',
  headline: 'Tools I ship with in production.',
  description:
    'The stack I reach for on client and product work — not a buzzword cloud. I care more about clear ownership, review, and what happens after launch than chasing every new tool.',
  proofLine: 'Used on Forzabuilt · VITO Fryfilter · Nexrena · Furniture Packages USA',
} as const;
