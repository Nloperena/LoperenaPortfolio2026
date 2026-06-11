import type { APIRoute } from 'astro';
import { siteProfile } from '../data/site';
import { absoluteUrl } from '../data/seo';
import { getPublishedPosts, postPath } from '../lib/blog';

export const prerender = true;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();

  const items = posts
    .map((post) => {
      const link = absoluteUrl(postPath(post.id));
      return `<item>
  <title>${escapeXml(post.data.title)}</title>
  <link>${link}</link>
  <guid isPermaLink="true">${link}</guid>
  <description>${escapeXml(post.data.description)}</description>
  <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
</item>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(`${siteProfile.name} Engineering Blog`)}</title>
    <link>${absoluteUrl('/blog')}</link>
    <description>${escapeXml('Articles on full-stack engineering, performance, e-commerce, and PostgreSQL.')}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
