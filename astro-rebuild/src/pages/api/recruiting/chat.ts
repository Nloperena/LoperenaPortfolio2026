import type { APIRoute } from 'astro';
import { sanitizeUserMessage } from '../../../lib/recruiting/guardrails';
import { generateRecruitingReply } from '../../../lib/recruiting/openai';
import { isRecruitingAssistantEnabled, resolveLlmConfig } from '../../../lib/recruiting/llmConfig';
import { checkRateLimit, clientIp } from '../../../lib/recruiting/rateLimit';
import type { ChatMessage } from '../../../lib/recruiting/types';

export const prerender = false;

function parseHistory(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(
      (m): m is ChatMessage =>
        m &&
        typeof m === 'object' &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string',
    )
    .slice(-10);
}

export const POST: APIRoute = async ({ request }) => {
  if (!isRecruitingAssistantEnabled()) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: 'Recruiting assistant is not configured. Set OPENAI_API_KEY on the server.',
      }),
      { status: 503, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const ip = clientIp(request);
  const rate = checkRateLimit(ip);
  if (!rate.allowed) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Rate limit exceeded. Please wait and try again.' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(rate.retryAfterSec ?? 60),
        },
      },
    );
  }

  let body: { message?: string; history?: unknown };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON body.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const message = sanitizeUserMessage(body.message ?? '');
  if (!message) {
    return new Response(JSON.stringify({ ok: false, error: 'Message is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const result = await generateRecruitingReply({
      message,
      history: parseHistory(body.history),
    });

    if (result.unanswered) {
      console.info('[recruiting-assistant] unanswered', { ip, message: message.slice(0, 120) });
    }
    if (result.warnings.length) {
      console.warn('[recruiting-assistant] warnings', result.warnings);
    }

    return new Response(
      JSON.stringify({
        ok: true,
        reply: result.message,
        citations: result.citations,
        fit: result.fit,
        suggestedFollowUps: result.suggestedFollowUps,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error('[recruiting-assistant] error', error);
    return new Response(
      JSON.stringify({
        ok: false,
        error: error instanceof Error ? error.message : 'Assistant unavailable.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
};

export const GET: APIRoute = async () => {
  const llm = resolveLlmConfig();
  return new Response(
    JSON.stringify({
      ok: true,
      enabled: llm !== null,
      model: process.env.RECRUITING_ASSISTANT_MODEL ?? 'gpt-4o-mini',
      provider: llm?.baseUrl.includes('ai-gateway') ? 'vercel-ai-gateway' : 'openai',
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } },
  );
};
