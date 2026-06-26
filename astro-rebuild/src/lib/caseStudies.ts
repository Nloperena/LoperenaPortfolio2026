import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';

export type CaseStudyEntry = CollectionEntry<'case-studies'>;

export async function getPublishedCaseStudies(): Promise<CaseStudyEntry[]> {
  return (await getCollection('case-studies', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export function normalizeCaseStudySlug(slug: string): string {
  return slug.replace(/\.md$/, '');
}

export function caseStudyPath(slug: string): `/work/${string}` {
  return `/work/${normalizeCaseStudySlug(slug)}`;
}

export async function getCaseStudyByProjectId(
  projectId: string,
): Promise<CaseStudyEntry | undefined> {
  const studies = await getPublishedCaseStudies();
  return studies.find((study) => study.data.projectId === projectId);
}
