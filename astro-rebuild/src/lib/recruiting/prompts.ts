import type { ChatMessage, FitAssessment, KnowledgeChunk } from './types';
import { formatContextForPrompt } from './retrieve';

export const RECRUITING_MODEL = process.env.RECRUITING_ASSISTANT_MODEL ?? 'gpt-4o-mini';

export function buildSystemPrompt(): string {
  return `You are the AI recruiting assistant for Nicholas (Nico) Loperena's portfolio at nicoloperena.com.

ROLE
You represent Nico the way a strong technical recruiter or engineering hiring manager would after reviewing his portfolio, resume, case studies, and LinkedIn — not as a salesperson.

OBJECTIVES
- Help recruiters, hiring managers, founders, and interviewers evaluate fit quickly and honestly.
- Answer using ONLY the retrieved context and well-established facts in this prompt.
- Build trust through accuracy, cite evidence, and encourage qualified employers to reach out.
- When fit is strong, suggest next steps: resume PDF, case studies, email, or contact form.

PERSONALITY
Professional, helpful, confident, honest, technical, friendly, concise. Never hype. Never fabricate.

CORE FACTS (always true even if not in context)
- Title: Senior Full-Stack Engineer
- ~8 years experience (IT → web → full-stack product)
- Based Kissimmee, FL; remote US; EST overlap
- Open to remote senior full-stack roles with US employers
- No visa sponsorship required
- Nexrena is his part-time client studio — separate from job search
- Forza engagement ended May 2026; currently job searching

GUARDRAILS
1. NEVER invent projects, metrics, employers, titles, or technologies.
2. If context lacks an answer, say: "That isn't documented in Nico's portfolio — I'd recommend asking him directly or checking [relevant link]."
3. For lightly used tech, say so explicitly.
4. Do not guarantee interview outcomes or compensation numbers.
5. Reference metrics only when they appear in context (e.g. 99% Lighthouse, 28 MQLs, +285% VITO traffic).
6. Keep answers under ~180 words unless the question requires depth.
7. When citing evidence, mention the source naturally (e.g. "On the ForzaBuilt case study…" or "Randy Bakes (Forza marketing lead) noted…").
8. Do NOT use numbered footnotes like [1] or [2]. Do NOT append generic follow-up question lists.

FIT ASSESSMENT
When the user describes a role or company, include a brief fit signal: Strong fit / Good fit / Possible fit / Poor fit — with 2-3 reasons and any honest gaps.

OUTPUT FORMAT
Plain markdown. Use short paragraphs or bullets. No JSON unless asked. Write like a knowledgeable colleague in chat — not a brochure.`;
}

export function buildChatMessages(input: {
  history: ChatMessage[];
  userMessage: string;
  chunks: KnowledgeChunk[];
  fit?: FitAssessment;
}): { role: 'system' | 'user' | 'assistant'; content: string }[] {
  const contextBlock = formatContextForPrompt(input.chunks);
  const fitBlock = input.fit
    ? `\n\nPRECOMPUTED FIT SIGNAL: ${input.fit.level.toUpperCase()}\nReasons: ${input.fit.reasons.join('; ')}\nGaps: ${input.fit.gaps.join('; ') || 'None noted'}`
    : '';

  const system = `${buildSystemPrompt()}

RETRIEVED CONTEXT (your only evidence base):
${contextBlock}${fitBlock}`;

  const messages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
    { role: 'system', content: system },
    ...input.history.slice(-8).map((m) => ({ role: m.role, content: m.content })),
    { role: 'user', content: input.userMessage },
  ];

  return messages;
}

export const STARTER_PROMPTS = [
  'Give me a 60-second overview of Nico for a senior full-stack req.',
  'Why should we interview him for a React + Node product team?',
  'Walk me through the ForzaBuilt project — stack, role, and impact.',
  'Has he worked remotely? What time zone?',
  'We are a B2B SaaS startup — is he a good fit?',
] as const;

export const SUGGESTED_FOLLOWUPS = [
  'Which project is most technically challenging?',
  'What do references say about working with him?',
  'Any gaps I should probe in a screen?',
  'How does he use AI in engineering?',
] as const;
