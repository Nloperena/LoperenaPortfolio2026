import type { ChatMessage, ChatResponsePayload, KnowledgeChunk } from './types';
import { looksUnanswered, validateResponse } from './guardrails';
import { resolveLlmConfig } from './llmConfig';
import { SUGGESTED_FOLLOWUPS } from '../../data/recruitingPrompts';
import { buildChatMessages } from './prompts';
import { assessRoleFit, retrieveChunks, shouldAssessFit } from './retrieve';

type OpenAIChatResponse = {
  choices?: { message?: { content?: string } }[];
  error?: { message?: string };
};

const PROJECT_FOLLOWUPS: Record<string, string> = {
  'forza-built': 'What migration risks did Nico handle on ForzaBuilt?',
  'furniture-packages-usa': 'How did the FPUSA buyer-type navigation change quote volume?',
  'vito-fryfilter': 'What automation did Nico build for VITO reviews?',
  'nexrena-platform': 'What does the Nexrena platform include under the hood?',
  'rugged-red': 'What SEO work did Nico do on Rugged Red?',
};

function buildFollowUps(chunks: KnowledgeChunk[], message: string): string[] {
  const suggestions: string[] = [];
  const lower = message.toLowerCase();

  for (const chunk of chunks) {
    for (const [projectId, prompt] of Object.entries(PROJECT_FOLLOWUPS)) {
      if (chunk.id.includes(projectId) && !suggestions.includes(prompt)) {
        suggestions.push(prompt);
      }
    }
  }

  if (/remote|time zone|est|florida/.test(lower)) {
    suggestions.push('What do references say about working with him remotely?');
  }
  if (/reference|recommend|manager|collaborat/.test(lower)) {
    suggestions.push('Any gaps I should probe in a screen?');
  }
  if (/fit|startup|saas|role/.test(lower)) {
    suggestions.push('Which project best matches this kind of team?');
  }

  for (const fallback of SUGGESTED_FOLLOWUPS) {
    if (suggestions.length >= 3) break;
    if (!suggestions.includes(fallback)) suggestions.push(fallback);
  }

  return suggestions.slice(0, 3);
}

export async function generateRecruitingReply(input: {
  message: string;
  history: ChatMessage[];
}): Promise<ChatResponsePayload & { unanswered: boolean; warnings: string[] }> {
  const llm = resolveLlmConfig();
  if (!llm) {
    throw new Error(
      'Recruiting assistant is not configured (set GEMINI_API_KEY, OPENAI_API_KEY, AI_GATEWAY_API_KEY, or deploy on Vercel with OIDC).',
    );
  }

  const chunks = retrieveChunks(input.message);
  const fit = shouldAssessFit(input.message) ? assessRoleFit(input.message) : undefined;
  const messages = buildChatMessages({
    history: input.history,
    userMessage: input.message,
    chunks,
    fit,
  });

  const res = await fetch(`${llm.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: llm.authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: llm.model,
      temperature: 0.35,
      max_tokens: 700,
      messages,
    }),
  });

  const data = (await res.json()) as OpenAIChatResponse;
  if (!res.ok) {
    throw new Error(data.error?.message ?? `LLM request failed (${res.status})`);
  }

  const message = data.choices?.[0]?.message?.content?.trim();
  if (!message) throw new Error('Empty response from model');

  const validation = validateResponse(message, chunks);
  const unanswered = looksUnanswered(message);

  const citations = chunks.slice(0, 2).map((c) => ({
    id: c.id,
    title: c.title.split(' — ')[0],
    sourceUrl: c.sourceUrl,
  }));

  return {
    message,
    citations,
    fit,
    suggestedFollowUps: buildFollowUps(chunks, input.message),
    unanswered,
    warnings: validation.warnings,
  };
}
