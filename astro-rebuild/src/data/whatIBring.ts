import { Bot, Database, Layers, Server } from 'lucide-react';

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

    'From UI to API to deploy — the same person in standup, in the PR, and when something needs fixing in production. Product-minded full-stack work: thoughtful UX, maintainable APIs, and outcomes you can measure.',

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

        'Node.js services, REST integrations, and PostgreSQL schemas designed for maintainability and growth — migrations, sane boundaries, and data models the next engineer can extend.',

      outcome: 'Nexrena ops platform · CRM, PM, invoicing in daily use',

      stack: ['Node.js', 'PostgreSQL', 'REST', 'Express'],

      icon: Database,

    },

    {

      id: 'ai',

      title: 'AI & Automation',

      description:

        'Cursor and AI-assisted engineering in production — client intake flows, content pipelines, and internal tooling. Generated code is reviewed, tested, and owned like any other commit.',

      outcome: 'VITO testimonial pipeline · Nexrena workflows · faster migrations',

      stack: ['Cursor', 'OpenAI API', 'TypeScript', 'Node.js'],

      icon: Bot,

    },

    {

      id: 'deploy',

      title: 'Deployment & Performance',

      description:

        'Vercel deployments with CDN tuning, release discipline, and Core Web Vitals focus — fast, reliable sites without over-engineering platform complexity.',

      outcome: 'Forzabuilt 99% Lighthouse · Rugged Red multi-brand launch · headless commerce',

      stack: ['Vercel', 'CDN', 'Git', 'Core Web Vitals'],

      icon: Server,

    },

  ] satisfies ImpactPillar[],

} as const;


