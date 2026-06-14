import { siteProfile } from './site';
import { localSeo } from './localSeo';

export type SeoPageKey = 'home' | 'about' | 'work' | 'blog';

export type OgType = 'website' | 'profile' | 'article';

export type PageSeo = {
  title: string;
  description: string;
  path: `/${string}` | '/';
  ogType: OgType;
};

const remoteHire =
  'Open to remote senior full-stack roles with US employers.';
const localBase = `Based in ${localSeo.city}, ${localSeo.region} (${localSeo.metro}) — ${localSeo.remoteLabel}.`;

export const pageSeo: Record<SeoPageKey, PageSeo> = {
  home: {
    title: `${siteProfile.name} | Senior Full-Stack Engineer — Remote (US)`,
    description: `${siteProfile.legalName} — senior full-stack engineer in Kissimmee / Orlando, FL. React, Next.js, Node.js, TypeScript, PostgreSQL, AWS. ${remoteHire}`,
    path: '/',
    ogType: 'website',
  },
  about: {
    title: `About ${siteProfile.legalName} | Senior Full-Stack Engineer`,
    description: `Experience, stack, and background for ${siteProfile.legalName} — senior full-stack engineer in Kissimmee, FL. ${remoteHire} React, Next.js, Node.js, PostgreSQL.`,
    path: '/about',
    ogType: 'profile',
  },
  work: {
    title: `Work | ${siteProfile.name} — Senior Full-Stack Engineer`,
    description: `Production portfolio: full-stack apps, APIs, and cloud systems. React, Next.js, Node.js, PostgreSQL, AWS. ${localBase}`,
    path: '/work',
    ogType: 'website',
  },
  blog: {
    title: `Blog | ${siteProfile.name} — Senior Full-Stack Engineer`,
    description: `Engineering notes on React, Next.js, PostgreSQL, and AWS from ${siteProfile.legalName} — senior full-stack engineer, remote US teams.`,
    path: '/blog',
    ogType: 'website',
  },
};

export function absoluteUrl(path: string): string {
  return new URL(path, siteProfile.siteUrl).href;
}
