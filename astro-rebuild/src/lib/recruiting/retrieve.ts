import { hiringProfile } from '../../data/hiring';
import type { FitAssessment, FitLevel, KnowledgeChunk } from '../types';
import { knowledgeChunks } from './knowledge/buildChunks';

const STOPWORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
  'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'shall',
  'can', 'need', 'dare', 'ought', 'used', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by',
  'from', 'up', 'about', 'into', 'through', 'during', 'before', 'after', 'above', 'below',
  'between', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where',
  'why', 'how', 'all', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor',
  'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just', 'and', 'but', 'if', 'or',
  'because', 'as', 'until', 'while', 'although', 'though', 'he', 'she', 'it', 'they', 'we',
  'you', 'i', 'me', 'my', 'your', 'his', 'her', 'their', 'our', 'what', 'which', 'who', 'whom',
  'this', 'that', 'these', 'those', 'am', 'nico', 'nicholas', 'loperena', 'tell', 'about',
]);

const QUERY_EXPANSIONS: Record<string, string[]> = {
  manufacturing: ['forza', 'industrial', 'adhesives', 'b2b'],
  industrial: ['forza', 'rugged', 'adhesives'],
  ecommerce: ['vito', 'shopify', 'commerce', 'storefront'],
  'e-commerce': ['vito', 'shopify', 'commerce'],
  commerce: ['vito', 'shopify', 'forza', 'catalog'],
  'real estate': ['furniture', 'fpusa', 'villa', 'procurement'],
  realtor: ['furniture', 'fpusa', 'rental'],
  manager: ['randy', 'recommendation', 'managed', 'marketing'],
  managers: ['randy', 'recommendation', 'marketing'],
  pressure: ['sydney', 'overtime', 'deadline', 'randy', 'hard worker'],
  non: ['hruthika', 'communication', 'approachable'],
  engineers: ['hruthika', 'communication'],
  kubernetes: ['weakness', 'devops', 'gap'],
  k8s: ['weakness', 'devops'],
  mobile: ['weakness', 'gap', 'ios', 'android'],
  career: ['experience', 'progression', 'years'],
  progression: ['experience', 'fpusa', 'vito', 'forza'],
  industries: ['industries-served', 'manufacturing', 'ecommerce'],
  dtc: ['vito', 'shopify', 'ecommerce'],
};

function expandTokens(tokens: string[]): string[] {
  const expanded = new Set(tokens);
  for (const token of tokens) {
    for (const [key, values] of Object.entries(QUERY_EXPANSIONS)) {
      if (token.includes(key) || key.includes(token)) {
        values.forEach((v) => expanded.add(v));
      }
    }
  }
  return [...expanded];
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s.+#/-]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

function scoreChunk(chunk: KnowledgeChunk, queryTokens: string[]): number {
  let score = 0;
  const titleTokens = tokenize(chunk.title);
  const contentTokens = new Set(tokenize(chunk.content));
  const keywordSet = new Set(chunk.keywords.map((k) => k.toLowerCase()));

  for (const token of queryTokens) {
    if (keywordSet.has(token)) score += 8;
    if (titleTokens.includes(token)) score += 4;
    if (contentTokens.has(token)) score += 2;
    for (const kw of chunk.keywords) {
      if (kw.includes(token) || token.includes(kw)) score += 3;
    }
  }

  return score;
}

export function retrieveChunks(query: string, limit = 8): KnowledgeChunk[] {
  const queryTokens = expandTokens(tokenize(query));
  if (queryTokens.length === 0) {
    return knowledgeChunks.filter((c) => c.id === 'profile-summary' || c.id === 'hiring-fit').slice(0, limit);
  }

  const scored = knowledgeChunks
    .map((chunk) => ({ chunk, score: scoreChunk(chunk, queryTokens) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return knowledgeChunks
      .filter((c) => ['profile-summary', 'hiring-fit', 'stack-overview'].includes(c.id))
      .slice(0, limit);
  }

  const top = scored.slice(0, limit).map((s) => s.chunk);

  // Always include profile for broad "tell me about" queries
  if (/who|about|summary|background|introduce/.test(query.toLowerCase()) && !top.some((c) => c.id === 'profile-summary')) {
    top.unshift(knowledgeChunks.find((c) => c.id === 'profile-summary')!);
  }

  return top.slice(0, limit);
}

type CompanyProfile = {
  keywords: string[];
  strong: string[];
  good: string[];
  poor: string[];
};

const COMPANY_PROFILES: Record<string, CompanyProfile> = {
  startup: {
    keywords: ['startup', 'early stage', 'seed', 'series a', '0 to 1'],
    strong: ['ownership', 'full-stack', 'product', 'independent'],
    good: ['react', 'next.js', 'postgresql'],
    poor: ['enterprise process only', 'narrow specialist'],
  },
  saas: {
    keywords: ['saas', 'b2b software', 'subscription', 'product-led'],
    strong: ['b2b', 'react', 'next.js', 'postgresql', 'api'],
    good: ['remote', 'product'],
    poor: ['marketing-only', 'no product surface'],
  },
  ecommerce: {
    keywords: ['ecommerce', 'e-commerce', 'commerce', 'shopify', 'dtc', 'storefront'],
    strong: ['shopify', 'vito', 'forza', 'catalog', 'conversion'],
    good: ['next.js', 'seo'],
    poor: ['no commerce context'],
  },
  enterprise: {
    keywords: ['enterprise', 'fortune', 'large company', 'corporate'],
    good: ['production', 'b2b', 'stakeholder'],
    strong: [],
    poor: ['only smb', 'no scale proof'],
  },
  agency: {
    keywords: ['agency', 'consultancy', 'client services', 'studio'],
    strong: ['nexrena', 'client', 'multiple projects'],
    good: ['full-stack', 'seo'],
    poor: ['single product only'],
  },
  internal: {
    keywords: ['internal tools', 'internal platform', 'ops', 'crm', 'admin'],
    strong: ['nexrena', 'crm', 'postgresql', 'api', 'platform'],
    good: ['next.js', 'express'],
    poor: ['frontend only'],
  },
};

export function shouldAssessFit(query: string): boolean {
  const lower = query.toLowerCase();
  if (lower.length < 25) return false;
  return /fit|good fit|hire|interview|role|position|req|requisition|team|startup|saas|company|employer|looking for|should we|evaluate|candidate for|right for|match for/.test(
    lower,
  );
}

export function assessRoleFit(description: string): FitAssessment | undefined {
  const lower = description.toLowerCase();
  if (lower.length < 20) return undefined;

  const reasons: string[] = [];
  const gaps: string[] = [];
  let level: FitLevel = 'possible';

  for (const item of hiringProfile.idealFit) {
    if (matchesAny(lower, ['product', 'b2b', 'remote', 'full-stack', 'react', 'legacy'])) {
      reasons.push(`Aligns with stated ideal fit: ${item}`);
    }
  }

  for (const item of hiringProfile.lessIdeal) {
    if (
      (lower.includes('onsite') && lower.includes('daily') && !lower.includes('florida')) ||
      (lower.includes('devops') && lower.includes('only')) ||
      (lower.includes('platform engineer') && !lower.includes('product'))
    ) {
      gaps.push(`May conflict with less-ideal criteria: ${item}`);
    }
  }

  for (const [, profile] of Object.entries(COMPANY_PROFILES)) {
    if (profile.keywords.some((k) => lower.includes(k))) {
      reasons.push(`Relevant experience for ${profile.keywords[0]} context`);
    }
  }

  if (gaps.length >= 2) level = 'poor';
  else if (reasons.length >= 2 && gaps.length === 0) level = 'strong';
  else if (reasons.length >= 1) level = 'good';

  if (/senior full-stack|full stack engineer|react.*node/i.test(description)) {
    level = gaps.length ? 'good' : 'strong';
    reasons.push('Title and stack match documented senior full-stack positioning');
  }

  return { level, reasons: [...new Set(reasons)].slice(0, 4), gaps: [...new Set(gaps)].slice(0, 3) };
}

function matchesAny(text: string, terms: string[]): boolean {
  return terms.some((t) => text.includes(t));
}

export function formatContextForPrompt(chunks: KnowledgeChunk[]): string {
  return chunks
    .map(
      (c, i) =>
        `[${i + 1}] id=${c.id} | ${c.title}\nsource: ${c.source}${c.sourceUrl ? ` (${c.sourceUrl})` : ''}\n${c.content}`,
    )
    .join('\n\n---\n\n');
}
