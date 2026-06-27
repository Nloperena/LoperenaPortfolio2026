import { readdirSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

function markdownIncludePaths(dir) {
  try {
    return readdirSync(dir)
      .filter((file) => file.endsWith('.md'))
      .map((file) => `./${dir}/${file}`.replace(/\\/g, '/'));
  } catch {
    return [];
  }
}

const assistantKnowledgeFiles = markdownIncludePaths('src/lib/recruiting/knowledge/extensions');

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    includeFiles: [
      ...markdownIncludePaths('src/content/case-studies'),
      ...markdownIncludePaths('src/content/blog'),
      ...assistantKnowledgeFiles,
    ],
  }),
  integrations: [react(), tailwind({
    applyBaseStyles: false,
  })],
});
