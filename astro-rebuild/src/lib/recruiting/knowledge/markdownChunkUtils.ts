import type { KnowledgeChunk } from '../types';

export function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };

  const meta: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const simple = line.match(/^([A-Za-z0-9_-]+):\s*(.+)$/);
    if (!simple) continue;
    meta[simple[1]] = simple[2].replace(/^["']|["']$/g, '').trim();
  }
  return { meta, body: match[2] };
}

export function stripInlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[(.*?)\]\([^)]*\)/g, '$1')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function splitSections(body: string): { heading: string; content: string }[] {
  const sections: { heading: string; content: string }[] = [];
  let current = { heading: 'Overview', lines: [] as string[] };

  for (const line of body.split('\n')) {
    const h2 = line.match(/^##\s+(.+)/);
    if (h2) {
      const text = current.lines.join(' ').trim();
      if (text) sections.push({ heading: current.heading, content: stripInlineMarkdown(text) });
      current = { heading: stripInlineMarkdown(h2[1]), lines: [] };
      continue;
    }
    if (line.startsWith('# ')) continue;
    if (line.trim()) current.lines.push(stripInlineMarkdown(line));
  }

  const tail = current.lines.join(' ').trim();
  if (tail) sections.push({ heading: current.heading, content: stripInlineMarkdown(tail) });
  return sections.filter((s) => s.content.length > 40);
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
}

export function chunkFromMarkdown(input: {
  id: string;
  topics: KnowledgeChunk['topics'];
  title: string;
  source: string;
  sourceUrl?: string;
  keywords: string[];
  raw: string;
}): KnowledgeChunk[] {
  const { meta, body } = parseFrontmatter(input.raw);
  const sections = splitSections(body);
  if (sections.length === 0) return [];

  const projectId = meta.projectId ?? meta.slug;
  const baseKeywords = [
    ...input.keywords,
    ...Object.values(meta).flatMap((v) => v.toLowerCase().split(/[^a-z0-9+./-]+/)).filter((t) => t.length > 2),
  ];

  return sections.map((section, index) => ({
    id: `${input.id}-${slugify(section.heading) || index}`,
    topics: input.topics,
    title: `${input.title} — ${section.heading}`,
    source: input.source,
    sourceUrl: input.sourceUrl ?? (projectId ? `/work/${projectId}` : undefined),
    keywords: [...baseKeywords, slugify(section.heading), section.heading.toLowerCase()],
    content: section.content,
  }));
}
