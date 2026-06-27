const AI_GATEWAY_BASE = 'https://ai-gateway.vercel.sh/v1';
const OPENAI_BASE = 'https://api.openai.com/v1';
const GEMINI_OPENAI_BASE = 'https://generativelanguage.googleapis.com/v1beta/openai';

export type LlmProvider = 'openai' | 'gemini' | 'vercel-ai-gateway';

export type LlmConfig = {
  authorization: string;
  baseUrl: string;
  provider: LlmProvider;
  model: string;
};

function geminiApiKey(): string | undefined {
  return (process.env.GEMINI_API_KEY ?? process.env.GOOGLE_GENERATIVE_AI_API_KEY)?.trim();
}

export function resolveLlmConfig(): LlmConfig | null {
  const gatewayKey = process.env.AI_GATEWAY_API_KEY?.trim();
  const openaiKey = process.env.OPENAI_API_KEY?.trim();
  const geminiKey = geminiApiKey();
  const oidc = process.env.VERCEL_OIDC_TOKEN?.trim();
  const customBase = process.env.OPENAI_BASE_URL?.trim();
  const customModel = process.env.RECRUITING_ASSISTANT_MODEL?.trim();

  if (gatewayKey) {
    return {
      authorization: `Bearer ${gatewayKey}`,
      baseUrl: customBase || AI_GATEWAY_BASE,
      provider: 'vercel-ai-gateway',
      model: customModel || 'gpt-4o-mini',
    };
  }
  if (openaiKey?.startsWith('vck_')) {
    return {
      authorization: `Bearer ${openaiKey}`,
      baseUrl: customBase || AI_GATEWAY_BASE,
      provider: 'vercel-ai-gateway',
      model: customModel || 'gpt-4o-mini',
    };
  }
  if (openaiKey) {
    return {
      authorization: `Bearer ${openaiKey}`,
      baseUrl: customBase || OPENAI_BASE,
      provider: 'openai',
      model: customModel || 'gpt-4o-mini',
    };
  }
  if (geminiKey) {
    return {
      authorization: `Bearer ${geminiKey}`,
      baseUrl: customBase || GEMINI_OPENAI_BASE,
      provider: 'gemini',
      model: customModel || 'gemini-2.5-flash',
    };
  }
  if (oidc && process.env.VERCEL) {
    return {
      authorization: `Bearer ${oidc}`,
      baseUrl: customBase || AI_GATEWAY_BASE,
      provider: 'vercel-ai-gateway',
      model: customModel || 'gpt-4o-mini',
    };
  }
  return null;
}

export function isRecruitingAssistantEnabled(): boolean {
  return resolveLlmConfig() !== null;
}
