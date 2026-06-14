import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const baseUrl = process.env.OG_BASE_URL ?? 'http://127.0.0.1:4321';

const pages = [
  { url: '/', out: 'public/og/og-home.png', alt: 'home' },
  { url: '/about/', out: 'public/og/og-about.png', alt: 'about' },
  { url: '/work/', out: 'public/og/og-work.png', alt: 'work' },
  { url: '/blog/', out: 'public/og/og-blog.png', alt: 'blog' },
  { url: '/for-recruiters/', out: 'public/og/og-for-recruiters.png', alt: 'for-recruiters' },
  { url: '/resume/', out: 'public/og/og-resume.png', alt: 'resume' },
  { url: '/blog/improve-core-web-vitals-react-astro/', out: 'public/blog/og-improve-core-web-vitals-react-astro.png' },
  { url: '/blog/building-b2b-ecommerce-nextjs/', out: 'public/blog/og-building-b2b-ecommerce-nextjs.png' },
  { url: '/blog/postgresql-patterns-full-stack-apps/', out: 'public/blog/og-postgresql-patterns-full-stack-apps.png' },
  { url: '/blog/hiring-senior-full-stack-engineer-remote/', out: 'public/blog/og-hiring-senior-full-stack-engineer-remote.png' },
  { url: '/blog/kissimmee-orlando-full-stack-engineer-remote/', out: 'public/blog/og-kissimmee-orlando-full-stack-engineer-remote.png' },
];

await mkdir(path.join(root, 'public/og'), { recursive: true });
await mkdir(path.join(root, 'public/blog'), { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();

for (const entry of pages) {
  const target = `${baseUrl}${entry.url}`;
  console.log(`Capturing ${target} -> ${entry.out}`);
  await page.goto(target, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2500);
  await page.screenshot({
    path: path.join(root, entry.out),
    clip: { x: 0, y: 0, width: 1200, height: 630 },
    type: 'png',
  });
}

await browser.close();
console.log('Done — captured', pages.length, 'OG screenshots');
