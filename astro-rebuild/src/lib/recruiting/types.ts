export type KnowledgeTopic =
  | 'profile'
  | 'experience'
  | 'project'
  | 'technical'
  | 'hiring'
  | 'recommendation'
  | 'education'
  | 'fit'
  | 'faq'
  | 'blog';

export type KnowledgeChunk = {
  id: string;
  topics: KnowledgeTopic[];
  keywords: string[];
  title: string;
  content: string;
  source: string;
  sourceUrl?: string;
};

export type ChatRole = 'user' | 'assistant';

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type FitLevel = 'strong' | 'good' | 'possible' | 'poor';

export type FitAssessment = {
  level: FitLevel;
  reasons: string[];
  gaps: string[];
};

export type RetrievedContext = {
  chunks: KnowledgeChunk[];
  fit?: FitAssessment;
};

export type ChatCitation = {
  id: string;
  title: string;
  sourceUrl?: string;
};

export type ChatResponsePayload = {
  message: string;
  citations: ChatCitation[];
  fit?: FitAssessment;
  suggestedFollowUps: string[];
};

export type AnalyticsEvent =
  | 'chat_open'
  | 'chat_message'
  | 'chat_citation_click'
  | 'chat_contact_cta'
  | 'chat_unanswered';
