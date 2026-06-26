import type { KnowledgeChunk } from './types';
import { knowledgeChunkById } from './knowledge/buildChunks';

const HALLUCINATION_PATTERNS = [
  /\b(faang|google|meta|amazon|microsoft|apple)\b.*\b(worked|employed|engineer at)\b/i,
  /\b10\+?\s*years\b/i,
  /\b(kubernetes|k8s|docker)\b.*\b(expert|specialist|primary)\b/i,
];

const UNCERTAINTY_PHRASES = [
  "isn't documented",
  'not documented',
  "don't have that",
  'recommend asking',
  'portfolio does not',
  'not prominently documented',
  'ask him directly',
];

export function validateResponse(text: string, chunks: KnowledgeChunk[]): {
  ok: boolean;
  warnings: string[];
} {
  const warnings: string[] = [];

  for (const pattern of HALLUCINATION_PATTERNS) {
    if (pattern.test(text)) {
      warnings.push(`Possible hallucination pattern: ${pattern.source}`);
    }
  }

  const chunkIds = new Set(chunks.map((c) => c.id));
  const citedIds = [...text.matchAll(/id=([a-z0-9-]+)/gi)].map((m) => m[1]);
  for (const id of citedIds) {
    if (!chunkIds.has(id) && !knowledgeChunkById[id]) {
      warnings.push(`Cited unknown chunk id: ${id}`);
    }
  }

  return { ok: warnings.length === 0, warnings };
}

export function looksUnanswered(text: string): boolean {
  return UNCERTAINTY_PHRASES.some((p) => text.toLowerCase().includes(p));
}

export function sanitizeUserMessage(raw: string): string {
  return raw.trim().slice(0, 2000);
}

export function isRecruitingAssistantEnabled(): boolean {
  return Boolean(process.env.OPENAI_API_KEY?.trim());
}
