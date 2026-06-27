import { capabilityProof } from '../../../data/capabilityProof';
import { education } from '../../../data/education';
import { experience } from '../../../data/experience';
import { hiringProfile } from '../../../data/hiring';
import { linkedInRecommendations } from '../../../data/linkedinRecommendations';
import { projects } from '../../../data/projects';
import { siteProfile } from '../../../data/site';
import { stackCopy, stackGroups } from '../../../data/stack';
import { whatIBring } from '../../../data/whatIBring';
import type { KnowledgeChunk } from '../types';
import { recruiterFaqs, technicalDepthNotes } from './faqs';
import { loadMarkdownKnowledgeChunksFromFs } from './loadMarkdownFromFs';

function chunk(
  partial: Omit<KnowledgeChunk, 'keywords'> & { keywords?: string[] },
): KnowledgeChunk {
  return {
    keywords: partial.keywords ?? [],
    ...partial,
  };
}

export function buildKnowledgeChunks(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];

  chunks.push(
    chunk({
      id: 'profile-summary',
      topics: ['profile', 'hiring'],
      title: 'Professional summary',
      source: 'Resume v11 / site profile',
      sourceUrl: '/resume',
      keywords: [
        'about',
        'summary',
        'background',
        'nico',
        'nicholas',
        'loperena',
        'who',
        'introduce',
        'overview',
      ],
      content: [
        `${siteProfile.legalName} (${siteProfile.name}) — ${siteProfile.title}.`,
        siteProfile.tagline,
        `${hiringProfile.yearsExperience} years experience. ${siteProfile.location}. ${siteProfile.availability}.`,
        `Stack: ${siteProfile.specialty}.`,
        `Work authorization: ${hiringProfile.workAuthorization}.`,
        hiringProfile.founderNote,
        `Portfolio: ${siteProfile.siteUrl} | GitHub: ${siteProfile.githubUrl} | LinkedIn: ${siteProfile.linkedInUrl}`,
      ].join(' '),
    }),
  );

  chunks.push(
    chunk({
      id: 'hiring-fit',
      topics: ['hiring', 'fit'],
      title: 'Ideal role fit',
      source: 'Hiring profile',
      sourceUrl: '/for-recruiters',
      keywords: ['fit', 'ideal', 'role', 'company', 'startup', 'saas', 'interview', 'hire'],
      content: [
        `Ideal fit: ${hiringProfile.idealFit.join('; ')}.`,
        `Less ideal: ${hiringProfile.lessIdeal.join('; ')}.`,
        `Role types: ${hiringProfile.roleTypes.join(', ')}.`,
        hiringProfile.compensationNote,
      ].join(' '),
    }),
  );

  chunks.push(
    chunk({
      id: 'what-i-bring',
      topics: ['profile', 'technical'],
      title: 'Core strengths',
      source: 'Portfolio pillars',
      sourceUrl: '/',
      keywords: ['strength', 'skill', 'full-stack', 'product', 'api', 'deploy', 'automation'],
      content: [
        whatIBring.headline,
        whatIBring.subheadline,
        ...whatIBring.pillars.map(
          (p) => `${p.title}: ${p.description} Outcome: ${p.outcome}. Stack: ${p.stack.join(', ')}.`,
        ),
      ].join(' '),
    }),
  );

  chunks.push(
    chunk({
      id: 'stack-overview',
      topics: ['technical'],
      title: 'Technical stack',
      source: 'Stack data',
      sourceUrl: '/about',
      keywords: ['stack', 'technology', 'tools', 'react', 'next', 'node', 'postgres', 'typescript'],
      content: [
        stackCopy.description,
        stackCopy.proofLine,
        ...stackGroups.map((g) => `${g.label}: ${g.items.join(', ')}.`),
      ].join(' '),
    }),
  );

  chunks.push(
    chunk({
      id: 'capability-metrics',
      topics: ['profile', 'project'],
      title: 'Key metrics',
      source: 'Capability proof',
      sourceUrl: '/work',
      keywords: ['metrics', 'lighthouse', 'traffic', 'conversion', 'reviews', 'impact', 'results'],
      content: capabilityProof.metrics.map((m) => `${m.value} ${m.label} — ${m.note}.`).join(' '),
    }),
  );

  for (const job of experience) {
    chunks.push(
      chunk({
        id: `experience-${job.id}`,
        topics: ['experience'],
        title: `${job.role} at ${job.company}`,
        source: 'Resume experience',
        sourceUrl: '/resume',
        keywords: [
          job.company.toLowerCase(),
          job.role.toLowerCase(),
          job.id,
          'experience',
          'work history',
          'job',
        ],
        content: [
          `${job.role} | ${job.company} | ${job.dates}${job.location ? ` | ${job.location}` : ''}.`,
          ...job.bullets,
        ].join(' '),
      }),
    );
  }

  for (const project of projects) {
    const cs = project.caseStudy;
    chunks.push(
      chunk({
        id: `project-${project.id}`,
        topics: ['project'],
        title: project.title,
        source: 'Portfolio project',
        sourceUrl: `/work/${project.id}`,
        keywords: [
          project.id,
          project.title.toLowerCase(),
          ...project.tags.map((t) => t.toLowerCase()),
          'project',
          'case study',
          'portfolio',
        ],
        content: [
          `${project.title} (${project.year}). ${project.longDescription}`,
          `Impact: ${project.impact}.`,
          cs
            ? `Problem: ${cs.problem} Role: ${cs.role} Approach: ${cs.approach} Outcome: ${cs.outcome}.`
            : '',
          `Live: ${project.link}.`,
        ].join(' '),
      }),
    );
  }

  for (const rec of linkedInRecommendations) {
    chunks.push(
      chunk({
        id: `rec-${rec.id}`,
        topics: ['recommendation'],
        title: `Recommendation — ${rec.name}`,
        source: 'LinkedIn',
        sourceUrl: rec.linkedInUrl,
        keywords: [
          'recommendation',
          'reference',
          'testimonial',
          rec.name.split(' ')[0].toLowerCase(),
          rec.company.toLowerCase(),
          'collaboration',
          'communication',
        ],
        content: `${rec.name}, ${rec.title} at ${rec.company} (${rec.date}): "${rec.quote}"`,
      }),
    );
  }

  for (const school of education) {
    chunks.push(
      chunk({
        id: `education-${school.school.replace(/\s+/g, '-').toLowerCase()}`,
        topics: ['education'],
        title: school.school,
        source: 'Resume education',
        sourceUrl: '/resume',
        keywords: ['education', 'bootcamp', 'ucf', 'valencia', 'degree', 'certification'],
        content: `${school.school}: ${school.items.map((i) => `${i.label} (${i.dates})`).join('; ')}.`,
      }),
    );
  }

  for (const faq of recruiterFaqs) {
    chunks.push(
      chunk({
        id: faq.id,
        topics: ['faq', 'hiring'],
        title: faq.q,
        source: 'Recruiter FAQ',
        sourceUrl: '/for-recruiters',
        keywords: [...faq.keywords, 'faq'],
        content: `Q: ${faq.q} A: ${faq.a}`,
      }),
    );
  }

  for (const [tech, note] of Object.entries(technicalDepthNotes)) {
    chunks.push(
      chunk({
        id: `tech-${tech}`,
        topics: ['technical'],
        title: `${tech.toUpperCase()} depth`,
        source: 'Technical notes',
        sourceUrl: '/blog',
        keywords: [tech, 'technical', 'depth', 'experience with'],
        content: note,
      }),
    );
  }

  chunks.push(
    chunk({
      id: 'industries-served',
      topics: ['profile', 'experience'],
      title: 'Industries and domains',
      source: 'Career summary',
      sourceUrl: '/work',
      keywords: [
        'industry',
        'industries',
        'domain',
        'manufacturing',
        'e-commerce',
        'ecommerce',
        'real estate',
        'hospitality',
        'vacation rental',
        'industrial',
        'b2b',
        'agency',
      ],
      content:
        'Industries: industrial manufacturing (Forza adhesives, Rugged Red cleaning products), e-commerce / commercial kitchen equipment (VITO Fryfilter Shopify), real estate / vacation rental furnishings (Furniture Packages USA, Villa Marketers WordPress portfolio), agency/client platforms (Nexrena B2B web studio).',
    }),
  );

  chunks.push(...loadMarkdownKnowledgeChunksFromFs());

  return chunks;
}

/** Pre-built at module load — deterministic for tests and API. */
export const knowledgeChunks = buildKnowledgeChunks();

export const knowledgeChunkById = Object.fromEntries(
  knowledgeChunks.map((c) => [c.id, c]),
) as Record<string, KnowledgeChunk>;
