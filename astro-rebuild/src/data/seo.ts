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
  'Open to remote full-time & senior contract roles for US employers and recruiters.';
const localBase = `Based in ${localSeo.city}, ${localSeo.region} (${localSeo.metro}) — ${localSeo.remoteLabel}.`;

export const pageSeo: Record<SeoPageKey, PageSeo> = {
  home: {
    title: `${siteProfile.name} | Senior Full-Stack Engineer & Nexrena Founder — Kissimmee, FL`,
    description: `Hire Nicholas Loperena — senior full-stack engineer and Nexrena founder in Kissimmee / Orlando, FL. React, Next.js, Node.js, TypeScript, PostgreSQL. ${remoteHire}`,
    path: '/',
    ogType: 'website',
  },
  about: {
    title: `About ${siteProfile.legalName} | Senior Full-Stack Engineer & Nexrena Founder`,
    description: `Resume, experience, and stack for Nicholas Loperena — senior full-stack engineer and Nexrena founder in Kissimmee, FL. ${remoteHire} React, Next.js, Node.js, PostgreSQL.`,
    path: '/about',
    ogType: 'profile',
  },
  work: {
    title: `Portfolio | ${siteProfile.name} — Senior Full-Stack Engineer (Remote)`,
    description: `Technical portfolio for recruiters: B2B storefronts, e-commerce, and full-stack apps. Business case studies at Nexrena.com. ${localBase}`,
    path: '/work',
    ogType: 'website',
  },
  blog: {
    title: `Blog | Hire a Senior Full-Stack Engineer — ${localSeo.city}, FL & Remote`,
    description: `Guides for recruiters and employers from ${siteProfile.legalName} — senior full-stack engineer and Nexrena founder in Kissimmee & Orlando, FL.`,
    path: '/blog',
    ogType: 'website',
  },
};

export function absoluteUrl(path: string): string {
  return new URL(path, siteProfile.siteUrl).href;
}
