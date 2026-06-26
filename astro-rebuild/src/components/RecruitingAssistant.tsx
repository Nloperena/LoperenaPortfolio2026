import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteProfile } from '../data/site';
import { hiringProfile } from '../data/hiring';
import { STARTER_PROMPTS } from '../lib/recruiting/prompts';
import type { ChatCitation, ChatMessage, FitAssessment } from '../lib/recruiting/types';
import { track } from '../utils/analytics';

type AssistantMessage = ChatMessage & {
  citations?: ChatCitation[];
  fit?: FitAssessment;
};

type ChatApiResponse = {
  ok: boolean;
  reply?: string;
  citations?: ChatCitation[];
  fit?: FitAssessment;
  suggestedFollowUps?: string[];
  error?: string;
};

const openContact = () => {
  track('contact_click', { source: 'recruiting_assistant' });
  // @ts-expect-error global contact hub
  if (typeof window !== 'undefined' && window.openContactHub) window.openContactHub();
};

function FitBadge({ fit }: { fit: FitAssessment }) {
  const colors: Record<FitAssessment['level'], string> = {
    strong: 'bg-highlight',
    good: 'bg-concrete',
    possible: 'bg-background',
    poor: 'bg-signal/20',
  };
  return (
    <div className={`mt-3 border-2 border-foreground p-3 text-sm ${colors[fit.level]}`}>
      <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em]">
        Fit signal: {fit.level.replace('_', ' ')}
      </p>
      {fit.reasons.length > 0 && (
        <ul className="mt-2 space-y-1 font-sans text-xs leading-relaxed">
          {fit.reasons.map((r) => (
            <li key={r}>+ {r}</li>
          ))}
        </ul>
      )}
      {fit.gaps.length > 0 && (
        <ul className="mt-2 space-y-1 font-sans text-xs leading-relaxed text-foreground/80">
          {fit.gaps.map((g) => (
            <li key={g}>− {g}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export const RecruitingAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      role: 'assistant',
      content:
        "Hi — I'm Nico's recruiting assistant. I answer from his portfolio, resume, and case studies only. Ask about experience, projects, stack, fit for your role, or what to probe in an interview.",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-expect-error global
    window.openRecruitingAssistant = () => {
      track('recruiting_assistant_open', { source: 'programmatic' });
      setIsOpen(true);
    };
  }, []);

  useEffect(() => {
    fetch('/api/recruiting/chat')
      .then((r) => r.json())
      .then((d: { enabled?: boolean }) => setEnabled(Boolean(d.enabled)))
      .catch(() => setEnabled(false));
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      track('recruiting_assistant_message', { length: trimmed.length });
      setError(null);
      setInput('');

      const userMsg: AssistantMessage = { role: 'user', content: trimmed };
      const history = messages.filter((m) => m.role === 'user' || m.role === 'assistant');
      setMessages((prev) => [...prev, userMsg]);
      setLoading(true);

      try {
        const res = await fetch('/api/recruiting/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: trimmed,
            history: history.slice(-8),
          }),
        });
        const data = (await res.json()) as ChatApiResponse;
        if (!data.ok || !data.reply) {
          throw new Error(data.error ?? 'Assistant unavailable');
        }
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.reply!,
            citations: data.citations,
            fit: data.fit,
          },
        ]);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    },
    [loading, messages],
  );

  if (enabled === false) return null;

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={() => {
            track('recruiting_assistant_open', { source: 'fab' });
            setIsOpen(true);
          }}
          className="fixed bottom-6 left-6 z-40 brutal-btn !py-3 !px-4 shadow-brutal-sm md:bottom-8 md:left-8"
          aria-label="Open recruiting assistant"
        >
          Ask about Nico
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end justify-center bg-foreground/40 p-0 md:items-center md:p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Recruiting assistant"
          >
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              className="flex h-[100dvh] w-full max-w-2xl flex-col border-2 border-foreground bg-background shadow-brutal-lg md:h-[min(720px,90dvh)] md:rounded-none"
            >
              <header className="flex shrink-0 items-start justify-between gap-3 border-b-2 border-foreground bg-foreground px-4 py-3 text-background">
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-background/70">
                    Recruiting assistant
                  </p>
                  <h2 className="font-mono text-lg font-black uppercase tracking-tight">
                    {siteProfile.name}
                  </h2>
                  <p className="mt-1 font-sans text-xs text-background/85">
                    Evidence-based answers · {hiringProfile.title}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="border-2 border-background px-3 py-1 font-mono text-[10px] font-bold uppercase hover:bg-highlight hover:text-foreground"
                >
                  Close
                </button>
              </header>

              <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {messages.map((msg, i) => (
                  <div
                    key={`${msg.role}-${i}`}
                    className={`max-w-[95%] ${msg.role === 'user' ? 'ml-auto text-right' : ''}`}
                  >
                    <div
                      className={`inline-block border-2 border-foreground px-3 py-2 text-left font-sans text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.role === 'user' ? 'bg-highlight' : 'bg-concrete'
                      }`}
                    >
                      {msg.content}
                    </div>
                    {msg.fit && <FitBadge fit={msg.fit} />}
                    {msg.citations && msg.citations.length > 0 && msg.role === 'assistant' && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {msg.citations.map((c) => (
                          <a
                            key={c.id}
                            href={c.sourceUrl ?? '/for-recruiters'}
                            className="border border-foreground px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider hover:bg-highlight"
                            onClick={() => track('recruiting_assistant_citation', { id: c.id })}
                          >
                            {c.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {loading && (
                  <p className="font-mono text-[10px] uppercase tracking-widest text-secondary animate-pulse">
                    Thinking…
                  </p>
                )}
                {error && (
                  <p className="border-2 border-signal bg-signal/10 px-3 py-2 font-sans text-sm">{error}</p>
                )}
              </div>

              {messages.length <= 2 && (
                <div className="shrink-0 border-t-2 border-foreground px-4 py-3">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-secondary mb-2">
                    Suggested questions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {STARTER_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => sendMessage(prompt)}
                        className="border-2 border-foreground px-2 py-1 font-sans text-xs hover:bg-highlight text-left"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <footer className="shrink-0 border-t-2 border-foreground p-4 space-y-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(input);
                  }}
                  className="flex gap-2"
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about experience, projects, fit…"
                    className="min-w-0 flex-1 border-2 border-foreground bg-background px-3 py-2 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-highlight"
                    disabled={loading}
                  />
                  <button type="submit" disabled={loading || !input.trim()} className="brutal-btn !px-4">
                    Send
                  </button>
                </form>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={openContact} className="brutal-btn-ghost !text-[10px]">
                    Contact Nico
                  </button>
                  <a href={siteProfile.resumePath} className="brutal-btn-ghost !text-[10px]">
                    Resume PDF
                  </a>
                  <a href="/for-recruiters" className="brutal-btn-ghost !text-[10px]">
                    Recruiter hub
                  </a>
                </div>
              </footer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
