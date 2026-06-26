import type { ChatMessage, ChatResponsePayload } from './types';
import { looksUnanswered, validateResponse } from './guardrails';
import { resolveLlmConfig } from './llmConfig';
import { buildChatMessages, RECRUITING_MODEL, SUGGESTED_FOLLOWUPS } from './prompts';
import { assessRoleFit, retrieveChunks } from './retrieve';

type OpenAIChatResponse = {
  choices?: { message?: { content?: string } }[];
  error?: { message?: string };
};

export async function generateRecruitingReply(input: {
  message: string;
  history: ChatMessage[];
}): Promise<ChatResponsePayload & { unanswered: boolean; warnings: string[] }> {
  const llm = resolveLlmConfig();
  if (!llm) {
    throw new Error(
      'Recruiting assistant is not configured (set OPENAI_API_KEY, AI_GATEWAY_API_KEY, or deploy on Vercel with OIDC).',
    );
  }

  const chunks = retrieveChunks(input.message);
  const fit = assessRoleFit(input.message);
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
      model: RECRUITING_MODEL,
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

  const citations = chunks.slice(0, 4).map((c) => ({
    id: c.id,
    title: c.title,
    sourceUrl: c.sourceUrl,
  }));

  return {
    message,
    citations,
    fit,
    suggestedFollowUps: [...SUGGESTED_FOLLOWUPS].slice(0, 3),
    unanswered,
    warnings: validation.warnings,
  };
}
