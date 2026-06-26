import type { ChatMessage, ChatResponsePayload } from './types';
import { knowledgeChunkById } from './knowledge/buildChunks';
import { looksUnanswered, validateResponse } from './guardrails';
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
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error('Recruiting assistant is not configured (missing OPENAI_API_KEY).');
  }

  const chunks = retrieveChunks(input.message);
  const fit = assessRoleFit(input.message);
  const messages = buildChatMessages({
    history: input.history,
    userMessage: input.message,
    chunks,
    fit,
  });

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
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
    throw new Error(data.error?.message ?? `OpenAI request failed (${res.status})`);
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
