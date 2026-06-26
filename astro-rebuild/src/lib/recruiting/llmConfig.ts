const AI_GATEWAY_BASE = 'https://ai-gateway.vercel.sh/v1';
const OPENAI_BASE = 'https://api.openai.com/v1';

export function resolveLlmConfig(): { authorization: string; baseUrl: string } | null {
  const gatewayKey = process.env.AI_GATEWAY_API_KEY?.trim();
  const openaiKey = process.env.OPENAI_API_KEY?.trim();
  const oidc = process.env.VERCEL_OIDC_TOKEN?.trim();
  const customBase = process.env.OPENAI_BASE_URL?.trim();

  if (gatewayKey) {
    return { authorization: `Bearer ${gatewayKey}`, baseUrl: customBase || AI_GATEWAY_BASE };
  }
  if (openaiKey?.startsWith('vck_')) {
    return { authorization: `Bearer ${openaiKey}`, baseUrl: customBase || AI_GATEWAY_BASE };
  }
  if (openaiKey) {
    return { authorization: `Bearer ${openaiKey}`, baseUrl: customBase || OPENAI_BASE };
  }
  if (oidc && process.env.VERCEL) {
    return { authorization: `Bearer ${oidc}`, baseUrl: customBase || AI_GATEWAY_BASE };
  }
  return null;
}

export function isRecruitingAssistantEnabled(): boolean {
  return resolveLlmConfig() !== null;
}
