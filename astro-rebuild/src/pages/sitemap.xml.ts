import type { APIRoute } from 'astro';
import { absoluteUrl } from '../data/seo';
import { getPublishedPosts, postPath } from '../lib/blog';

export const prerender = true;

const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/about', priority: '0.9', changefreq: 'monthly' },
  { path: '/work', priority: '0.8', changefreq: 'monthly' },
  { path: '/resume', priority: '0.9', changefreq: 'monthly' },
  { path: '/for-recruiters', priority: '0.9', changefreq: 'monthly' },
  { path: '/blog', priority: '0.9', changefreq: 'weekly' },
];

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
  const today = new Date().toISOString().slice(0, 10);

  const staticUrls = staticPages
    .map(
      (page) => `<url>
  <loc>${escapeXml(absoluteUrl(page.path))}</loc>
  <lastmod>${today}</lastmod>
  <changefreq>${page.changefreq}</changefreq>
  <priority>${page.priority}</priority>
</url>`,
    )
    .join('\n');

  const postUrls = posts
    .map((post) => {
      const lastmod = (post.data.updatedDate ?? post.data.pubDate).toISOString().slice(0, 10);
      return `<url>
  <loc>${escapeXml(absoluteUrl(postPath(post.id)))}</loc>
  <lastmod>${lastmod}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${postUrls}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
