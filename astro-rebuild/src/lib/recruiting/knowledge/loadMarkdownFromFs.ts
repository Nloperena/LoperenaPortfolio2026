import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { KnowledgeChunk } from '../types';
import {
  chunkFromMarkdown,
  parseFrontmatter,
  slugify,
  stripInlineMarkdown,
} from './markdownChunkUtils';

const HERE = path.dirname(fileURLToPath(import.meta.url));

function resolveSrcRoot(): string {
  const fromModule = path.join(HERE, '../../..');
  if (fs.existsSync(path.join(fromModule, 'content/case-studies'))) return fromModule;
  const fromCwd = path.join(process.cwd(), 'src');
  if (fs.existsSync(path.join(fromCwd, 'content/case-studies'))) return fromCwd;
  return fromModule;
}

const SRC_ROOT = resolveSrcRoot();

function readMdDirectory(absoluteDir: string): Record<string, string> {
  const files: Record<string, string> = {};
  if (!fs.existsSync(absoluteDir)) return files;
  for (const name of fs.readdirSync(absoluteDir)) {
    if (!name.endsWith('.md')) continue;
    files[name] = fs.readFileSync(path.join(absoluteDir, name), 'utf8');
  }
  return files;
}

/** Used by retrieval eval (`npm run recruiting:eval`) where Vite glob is unavailable. */
export function loadMarkdownKnowledgeChunksFromFs(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];

  for (const [fileName, raw] of Object.entries(readMdDirectory(path.join(SRC_ROOT, 'content/case-studies')))) {
    const slug = fileName.replace('.md', '');
    const { meta } = parseFrontmatter(raw);
    chunks.push(
      ...chunkFromMarkdown({
        id: `cs-${meta.projectId ?? slug}`,
        topics: ['project'],
        title: meta.title ?? slug,
        source: 'Case study (markdown)',
        sourceUrl: `/work/${meta.projectId ?? slug}`,
        keywords: [slug, meta.projectId ?? slug, 'case study', 'project'],
        raw,
      }),
    );
  }

  for (const [fileName, raw] of Object.entries(readMdDirectory(path.join(SRC_ROOT, 'content/blog')))) {
    const slug = fileName.replace('.md', '');
    const { meta } = parseFrontmatter(raw);
    chunks.push(
      ...chunkFromMarkdown({
        id: `blog-${slug}`,
        topics: ['blog', 'technical'],
        title: meta.title ?? slug,
        source: 'Blog post',
        sourceUrl: `/blog/${slug}`,
        keywords: [slug, 'blog', 'engineering', 'technical'],
        raw,
      }),
    );
  }

  for (const [fileName, raw] of Object.entries(readMdDirectory(path.join(HERE, 'extensions')))) {
    const name = fileName.replace('.md', '');
    if (name.toLowerCase() === 'readme') continue;
    const { meta, body } = parseFrontmatter(raw);
    const plain = stripInlineMarkdown(body);
    if (plain.length < 20) continue;
    chunks.push({
      id: `ext-${slugify(name)}`,
      topics: ['project', 'faq'],
      title: meta.title ?? name.replace(/-/g, ' '),
      source: 'Assistant knowledge extension',
      sourceUrl: meta.sourceUrl,
      keywords: [name, ...name.split('-'), ...(meta.keywords?.split(/[,;]+/) ?? [])].map((k) =>
        k.trim().toLowerCase(),
      ),
      content: plain,
    });
  }

  return chunks;
}
