import { experience } from '../data/experience';

import { localSeo } from '../data/localSeo';

import { projects } from '../data/projects';

import { siteProfile } from '../data/site';

import { absoluteUrl } from '../data/seo';



const personId = `${siteProfile.siteUrl}/#person`;



type Crumb = { name: string; path: string };



function kissimmeeAddress() {

  return {

    '@type': 'PostalAddress' as const,

    addressLocality: localSeo.city,

    addressRegion: localSeo.region,

    postalCode: localSeo.postalCode,

    addressCountry: localSeo.country,

  };

}



function areaServedJsonLd() {

  return localSeo.serviceAreas.map((name) => ({

    '@type': name === 'United States' ? 'Country' : 'City',

    name,

  }));

}



export function personJsonLd(options?: { includeExperience?: boolean }) {

  const base: Record<string, unknown> = {

    '@context': 'https://schema.org',

    '@type': 'Person',

    '@id': personId,

    name: siteProfile.legalName,

    alternateName: siteProfile.name,

    jobTitle: siteProfile.title,

    url: siteProfile.siteUrl,

    email: `mailto:${siteProfile.email}`,

    address: kissimmeeAddress(),

    homeLocation: {

      '@type': 'Place',

      name: `${localSeo.city}, ${localSeo.region}`,

      address: kissimmeeAddress(),

      geo: {

        '@type': 'GeoCoordinates',

        latitude: localSeo.geo.latitude,

        longitude: localSeo.geo.longitude,

      },

    },

    workLocation: {

      '@type': 'Place',

      name: 'Remote (United States)',

    },

    areaServed: areaServedJsonLd(),

    sameAs: [siteProfile.linkedInUrl, siteProfile.githubUrl, siteProfile.nexrenaUrl],
    affiliation: {
      '@type': 'Organization',
      name: 'Nexrena',
      url: siteProfile.nexrenaUrl,
      description: 'B2B web design, SEO, and digital growth agency',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Nexrena',
      url: siteProfile.nexrenaUrl,
    },

    knowsAbout: [

      'Full-Stack Development',

      'Remote Software Engineering',

      'React',

      'Next.js',

      'Node.js',

      'TypeScript',

      'Python',

      'PostgreSQL',

      'Astro',

      'E-Commerce',

      'B2B Software',

    ],

  };



  if (options?.includeExperience) {

    base.hasOccupation = experience.map((job) => ({

      '@type': 'Occupation',

      name: job.role,

      occupationalCategory: siteProfile.title,

      description: job.bullets.join(' '),

      skills: siteProfile.specialty,

    }));

  }



  return base;

}



export function websiteJsonLd() {

  return {

    '@context': 'https://schema.org',

    '@type': 'WebSite',

    name: `${siteProfile.name} — ${siteProfile.title}`,

    url: siteProfile.siteUrl,

    description: siteProfile.tagline,

    author: { '@id': personId },

    inLanguage: 'en-US',

    about: {

      '@type': 'Thing',

      name: 'Senior full-stack engineering services',

      description: 'Remote full-stack development for US employers and recruiters.',

    },

  };

}



export function breadcrumbJsonLd(crumbs: Crumb[]) {

  return {

    '@context': 'https://schema.org',

    '@type': 'BreadcrumbList',

    itemListElement: crumbs.map((crumb, index) => ({

      '@type': 'ListItem',

      position: index + 1,

      name: crumb.name,

      item: absoluteUrl(crumb.path),

    })),

  };

}



export function projectsJsonLd() {

  return {

    '@context': 'https://schema.org',

    '@type': 'ItemList',

    name: `${siteProfile.name} — Selected Work`,

    itemListElement: projects.map((project, index) => ({

      '@type': 'ListItem',

      position: index + 1,

      item: {

        '@type': 'CreativeWork',

        name: project.title,

        description: project.longDescription,

        url: project.link,

        keywords: project.tags.join(', '),

      },

    })),

  };

}



export function profilePageJsonLd() {

  return {

    '@context': 'https://schema.org',

    '@type': 'ProfilePage',

    name: `About ${siteProfile.legalName}`,

    url: absoluteUrl('/about'),

    mainEntity: { '@id': personId },

  };

}



export function blogIndexJsonLd(posts: { title: string; url: string; date: string }[]) {

  return {

    '@context': 'https://schema.org',

    '@type': 'Blog',

    name: `${siteProfile.name} — Engineering & Hiring Blog`,

    url: absoluteUrl('/blog'),

    description:

      'Articles for recruiters, employers, and engineering leaders from a senior full-stack engineer in Kissimmee, FL.',

    author: { '@id': personId },

    inLanguage: 'en-US',

    blogPost: posts.map((post) => ({

      '@type': 'BlogPosting',

      headline: post.title,

      url: post.url,

      datePublished: post.date,

      author: { '@id': personId },

    })),

  };

}



export function articleJsonLd(input: {

  title: string;

  description: string;

  url: string;

  pubDate: Date;

  updatedDate?: Date;

  image?: string;

  tags?: string[];

}) {

  return {

    '@context': 'https://schema.org',

    '@type': 'BlogPosting',

    headline: input.title,

    description: input.description,

    url: input.url,

    datePublished: input.pubDate.toISOString(),

    dateModified: (input.updatedDate ?? input.pubDate).toISOString(),

    image: input.image ? absoluteUrl(input.image) : absoluteUrl('/og/og-blog.png'),

    author: {

      '@type': 'Person',

      '@id': personId,

      name: siteProfile.legalName,

      url: siteProfile.siteUrl,

      address: kissimmeeAddress(),

    },

    publisher: {

      '@type': 'Person',

      name: siteProfile.legalName,

      url: siteProfile.siteUrl,

    },

    keywords: input.tags?.join(', '),

    mainEntityOfPage: {

      '@type': 'WebPage',

      '@id': input.url,

    },

  };

}


