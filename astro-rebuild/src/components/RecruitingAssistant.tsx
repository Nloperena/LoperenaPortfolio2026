import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { nicoBot } from '../data/nicoBot';
import { STARTER_PROMPTS } from '../data/recruitingPrompts';
import type { ChatCitation, ChatMessage, FitAssessment } from '../lib/recruiting/types';
import { track } from '../utils/analytics';
import { AssistantMessageContent, FitBadge } from './recruiting/AssistantMessageContent';

type AssistantMessage = ChatMessage & {
  citations?: ChatCitation[];
  fit?: FitAssessment;
  suggestedFollowUps?: string[];
};

type ChatApiResponse = {
  ok: boolean;
  reply?: string;
  citations?: ChatCitation[];
  fit?: FitAssessment;
  suggestedFollowUps?: string[];
  error?: string;
};

function AssistantAvatar() {
  return (
    <div
      aria-hidden
      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-foreground bg-highlight font-mono text-[10px] font-bold text-foreground"
    >
      N
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex gap-2.5">
      <AssistantAvatar />
      <div className="flex gap-1 py-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full bg-neutral-400"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}

function PromptChip({
  label,
  onSelect,
  disabled,
}: {
  label: string;
  onSelect: (text: string) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onSelect(label)}
      className="rounded-xl border border-neutral-300 bg-white px-3 py-2 text-left text-[13px] leading-snug text-neutral-800 transition-colors hover:border-foreground hover:bg-highlight/25 disabled:opacity-40"
    >
      {label}
    </button>
  );
}

export const RecruitingAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [followUps, setFollowUps] = useState<string[]>([]);
  const [messages, setMessages] = useState<AssistantMessage[]>([
    { role: 'assistant', content: nicoBot.introMessage },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const openPanel = useCallback((source: string) => {
    track('recruiting_assistant_open', { source });
    setIsOpen(true);
  }, []);

  const closePanel = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    // @ts-expect-error global
    window.openRecruitingAssistant = () => openPanel('programmatic');
  }, [openPanel]);

  useEffect(() => {
    fetch('/api/recruiting/chat')
      .then((r) => r.json())
      .then((d: { enabled?: boolean }) => setEnabled(Boolean(d.enabled)))
      .catch(() => setEnabled(false));
  }, []);

  useEffect(() => {
    if (isOpen) scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading, isOpen, followUps]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      track('recruiting_assistant_message', { length: trimmed.length });
      setError(null);
      setInput('');
      setFollowUps([]);

      const userMsg: AssistantMessage = { role: 'user', content: trimmed };
      const history = messages.filter((m) => m.role === 'user' || m.role === 'assistant');
      setMessages((prev) => [...prev, userMsg]);
      setLoading(true);

      try {
        const res = await fetch('/api/recruiting/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: trimmed, history: history.slice(-8) }),
        });
        const data = (await res.json()) as ChatApiResponse;
        if (!data.ok || !data.reply) throw new Error(data.error ?? 'Assistant unavailable');

        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.reply!,
            citations: data.citations,
            fit: data.fit,
            suggestedFollowUps: data.suggestedFollowUps,
          },
        ]);
        if (data.suggestedFollowUps?.length) setFollowUps(data.suggestedFollowUps);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    },
    [loading, messages],
  );

  if (enabled === false) return null;

  const showStarters = messages.length === 1 && !loading;

  return (
    <div className="pointer-events-none fixed inset-0 z-[70]">
      <div className="pointer-events-auto fixed bottom-5 right-5 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
        <AnimatePresence>
          {isOpen && (
            <motion.section
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              className="flex h-[min(640px,calc(100dvh-5.5rem))] w-[min(440px,calc(100vw-2rem))] flex-col overflow-hidden border-2 border-foreground bg-white shadow-brutal-lg"
              role="dialog"
              aria-label={nicoBot.panelTitle}
            >
              <header className="flex shrink-0 items-center justify-between border-b-2 border-foreground bg-foreground px-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <AssistantAvatar />
                  <div className="min-w-0">
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-highlight">
                      Recruiting assistant
                    </p>
                    <p className="truncate text-sm font-medium text-background">{nicoBot.panelTitle}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closePanel}
                  className="shrink-0 rounded-lg px-2 py-1 font-mono text-xs font-bold uppercase tracking-wider text-background/70 hover:bg-white/10 hover:text-background"
                  aria-label="Close chat"
                >
                  ✕
                </button>
              </header>

              <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto bg-[#F7F7F7] px-3 py-4 sm:px-4">
                <div className="space-y-5">
                  {messages.map((msg, i) => (
                    <div key={`${msg.role}-${i}`}>
                      {msg.role === 'user' ? (
                        <div className="flex justify-end">
                          <div className="max-w-[88%] rounded-2xl rounded-br-sm border border-foreground/10 bg-foreground px-4 py-2.5 shadow-sm">
                            <AssistantMessageContent content={msg.content} variant="user" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-2.5">
                          <AssistantAvatar />
                          <div className="min-w-0 flex-1 pt-0.5">
                            {msg.fit && <FitBadge fit={msg.fit} />}
                            <AssistantMessageContent content={msg.content} variant="assistant" />
                            {msg.citations && msg.citations.length > 0 && (
                              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-secondary">
                                  Source
                                </span>
                                {msg.citations.map((c) => (
                                  <a
                                    key={c.id}
                                    href={c.sourceUrl ?? '/for-recruiters'}
                                    className="rounded-full border border-neutral-300 bg-white px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-neutral-600 hover:border-foreground hover:bg-highlight/30"
                                    onClick={() => track('recruiting_assistant_citation', { id: c.id })}
                                  >
                                    {c.title}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {loading && <TypingDots />}
                  {error && (
                    <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                      {error}
                    </p>
                  )}

                  {showStarters && (
                    <div className="space-y-2 pt-1">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-secondary">
                        Try asking
                      </p>
                      <div className="flex flex-col gap-2">
                        {STARTER_PROMPTS.map((prompt) => (
                          <PromptChip
                            key={prompt}
                            label={prompt}
                            onSelect={sendMessage}
                            disabled={loading}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {!showStarters && followUps.length > 0 && !loading && (
                    <div className="space-y-2 border-t border-neutral-200 pt-3">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-secondary">
                        Follow up
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {followUps.map((prompt) => (
                          <PromptChip
                            key={prompt}
                            label={prompt}
                            onSelect={sendMessage}
                            disabled={loading}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <footer className="shrink-0 border-t-2 border-foreground bg-white p-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(input);
                  }}
                  className="relative rounded-xl border-2 border-neutral-300 bg-white focus-within:border-foreground"
                >
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage(input);
                      }
                    }}
                    placeholder="Ask about Nico's experience, projects, or fit…"
                    rows={1}
                    className="max-h-32 min-h-[52px] w-full resize-none bg-transparent px-4 py-3.5 pr-14 text-[15px] leading-relaxed text-foreground placeholder:text-neutral-400 focus:outline-none"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="absolute bottom-2.5 right-2.5 flex h-9 w-9 items-center justify-center rounded-lg border-2 border-foreground bg-foreground font-mono text-sm font-bold text-background disabled:opacity-25 hover:bg-highlight hover:text-foreground"
                    aria-label="Send message"
                  >
                    ↑
                  </button>
                </form>
                <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-secondary">
                  Answers from portfolio sources only
                </p>
              </footer>
            </motion.section>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          layout
          onClick={() => (isOpen ? closePanel() : openPanel('tab'))}
          className="flex items-center gap-2 rounded-full border-2 border-foreground bg-foreground px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-wider text-background shadow-brutal hover:bg-highlight hover:text-foreground"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          {isOpen ? 'Close' : nicoBot.launcherLabel}
        </motion.button>
      </div>
    </div>
  );
};
