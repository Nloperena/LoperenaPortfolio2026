import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';

export type BlogEntry = CollectionEntry<'blog'>;

export async function getPublishedPosts(): Promise<BlogEntry[]> {
  return (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export function formatPostDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function postPath(slug: string): `/blog/${string}` {
  return `/blog/${slug}`;
}

export type BlogAudience = 'recruiter' | 'engineering';

export function getPostAudience(post: BlogEntry): BlogAudience {
  if (post.data.audience) return post.data.audience;
  const tagBlob = post.data.tags.join(' ').toLowerCase();
  if (/hiring|recruit|employer|kissimmee|orlando/.test(tagBlob)) return 'recruiter';
  return 'engineering';
}
