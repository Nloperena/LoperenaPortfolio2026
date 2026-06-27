import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { nicoBot } from '../data/nicoBot';
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
  error?: string;
};

function MessageText({ content }: { content: string }) {
  const text = content.replace(/\[\d+\]/g, '').trim();
  return <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-neutral-800">{text}</p>;
}

function TypingDots() {
  return (
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
  );
}

export const RecruitingAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
  }, [messages, loading, isOpen]);

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
          { role: 'assistant', content: data.reply!, citations: data.citations, fit: data.fit },
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

  const chatReady = enabled !== false;

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
              className="flex h-[min(560px,calc(100dvh-7rem))] w-[min(400px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.12)]"
              role="dialog"
              aria-label={nicoBot.panelTitle}
            >
              <header className="flex shrink-0 items-center justify-between border-b border-neutral-200 px-4 py-3">
                <p className="text-sm font-medium text-neutral-900">{nicoBot.panelTitle}</p>
                <button
                  type="button"
                  onClick={closePanel}
                  className="rounded-lg px-2 py-1 text-sm text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                  aria-label="Close chat"
                >
                  ✕
                </button>
              </header>

              <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
                <div className="space-y-4">
                  {messages.map((msg, i) => (
                    <div
                      key={`${msg.role}-${i}`}
                      className={msg.role === 'user' ? 'flex justify-end' : ''}
                    >
                      {msg.role === 'user' ? (
                        <div className="max-w-[88%] rounded-2xl bg-neutral-100 px-4 py-2.5">
                          <MessageText content={msg.content} />
                        </div>
                      ) : (
                        <div className="max-w-full">
                          <MessageText content={msg.content} />
                          {msg.citations && msg.citations.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {msg.citations.map((c) => (
                                <a
                                  key={c.id}
                                  href={c.sourceUrl ?? '/for-recruiters'}
                                  className="rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-600 hover:bg-neutral-200"
                                  onClick={() => track('recruiting_assistant_citation', { id: c.id })}
                                >
                                  {c.title}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                  {loading && <TypingDots />}
                  {error && <p className="text-sm text-red-600">{error}</p>}
                </div>
              </div>

              <footer className="shrink-0 border-t border-neutral-200 p-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(input);
                  }}
                  className="flex items-end gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 px-3 py-2 focus-within:border-neutral-400 focus-within:bg-white"
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
                    placeholder="Message…"
                    rows={1}
                    className="max-h-28 min-h-[24px] min-w-0 flex-1 resize-none bg-transparent text-[15px] leading-relaxed text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="shrink-0 rounded-lg bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-30"
                  >
                    ↑
                  </button>
                </form>
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
