import { Cpu, Database, Layers, Server } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type ImpactPillar = {
  id: string;
  title: string;
  description: string;
  outcome: string;
  stack: readonly string[];
  icon: LucideIcon;
};

export const whatIBring = {
  eyebrow: 'What I bring',
  headline: 'I own the work end to end.',
  subheadline:
    'From UI to API to deploy — the same person in standup, in the PR, and when something needs fixing in production. I aim for code and systems the team can maintain without a heroics culture.',
  pillars: [
    {
      id: 'product',
      title: 'Full-Stack Product',
      description:
        'React and Next.js front ends with thoughtful UX for B2B buyers and internal users — typed TypeScript, accessible patterns, and interfaces that match how the business actually works.',
      outcome: 'Forzabuilt · 200+ SKU catalog · 99% Lighthouse desktop',
      stack: ['React', 'Next.js', 'TypeScript', 'Astro'],
      icon: Layers,
    },
    {
      id: 'apis',
      title: 'APIs & Data Layer',
      description:
        'Node.js services, REST integrations, and PostgreSQL schemas designed for real traffic — migrations, sane boundaries, and data models the next engineer can extend.',
      outcome: 'Nexrena ops platform · CRM, PM, invoicing in daily use',
      stack: ['Node.js', 'PostgreSQL', 'REST', 'Express'],
      icon: Database,
    },
    {
      id: 'cloud',
      title: 'Cloud & Reliability',
      description:
        'AWS and Vercel deployments with CDN, monitoring, and release habits that keep sites fast without needing a dedicated platform team on call.',
      outcome: 'Headless commerce on AWS · Core Web Vitals focus',
      stack: ['AWS', 'Vercel', 'Docker', 'CDN'],
      icon: Server,
    },
    {
      id: 'workflow',
      title: 'Modern Engineering Workflow',
      description:
        'Cursor and AI-assisted tooling in the loop for boilerplate, refactors, and docs — always reviewed, tested, and owned like any other code. Speed without shipping fragile demos.',
      outcome: 'Faster delivery on migrations and internal tools',
      stack: ['TypeScript', 'Git', 'CI/CD', 'Code review'],
      icon: Cpu,
    },
  ] satisfies ImpactPillar[],
} as const;
