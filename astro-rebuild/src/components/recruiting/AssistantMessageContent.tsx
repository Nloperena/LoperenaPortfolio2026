import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { FitAssessment } from '../../lib/recruiting/types';

type Variant = 'assistant' | 'user';

function stripCitationMarkers(content: string): string {
  return content.replace(/\[\d+\]/g, '').trim();
}

function buildComponents(variant: Variant): Components {
  const isUser = variant === 'user';
  const text = isUser ? 'text-background/95' : 'text-foreground';
  const muted = isUser ? 'text-background/70' : 'text-secondary';

  return {
    p: ({ children }) => (
      <p className={`mb-3 text-[15px] leading-relaxed last:mb-0 ${text}`}>{children}</p>
    ),
    ul: ({ children }) => (
      <ul className={`mb-3 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed last:mb-0 ${text}`}>
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className={`mb-3 list-decimal space-y-1.5 pl-5 text-[15px] leading-relaxed last:mb-0 ${text}`}>
        {children}
      </ol>
    ),
    li: ({ children }) => <li className={`${text} [&>p]:mb-0`}>{children}</li>,
    strong: ({ children }) => (
      <strong className={`font-semibold ${isUser ? 'text-white' : 'text-foreground'}`}>{children}</strong>
    ),
    em: ({ children }) => <em className={`italic ${muted}`}>{children}</em>,
    h3: ({ children }) => (
      <h3
        className={`mb-2 mt-4 font-mono text-[11px] font-bold uppercase tracking-[0.14em] first:mt-0 ${
          isUser ? 'text-highlight' : 'text-foreground'
        }`}
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4
        className={`mb-1.5 mt-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] first:mt-0 ${muted}`}
      >
        {children}
      </h4>
    ),
    a: ({ href, children }) => {
      const external = Boolean(href?.startsWith('http'));
      return (
        <a
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className={
            isUser
              ? 'font-medium text-highlight underline decoration-highlight/70 underline-offset-2 hover:text-white'
              : 'font-medium text-foreground underline decoration-highlight decoration-2 underline-offset-2 hover:bg-highlight/25'
          }
        >
          {children}
        </a>
      );
    },
    code: ({ className, children, ...props }) => {
      const isBlock = /language-/.test(className ?? '');
      if (isBlock) {
        return (
          <code className={`block whitespace-pre-wrap font-mono text-[13px] leading-relaxed ${text}`} {...props}>
            {children}
          </code>
        );
      }
      return (
        <code
          className={`rounded px-1 py-0.5 font-mono text-[13px] ${
            isUser ? 'bg-white/15 text-highlight' : 'bg-neutral-200/90 text-foreground'
          }`}
          {...props}
        >
          {children}
        </code>
      );
    },
    pre: ({ children }) => (
      <pre className="mb-3 overflow-x-auto rounded-lg border border-foreground/10 bg-neutral-100 px-3 py-2.5 last:mb-0">
        {children}
      </pre>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className={`mb-3 border-l-2 pl-3 last:mb-0 ${isUser ? 'border-highlight/50' : 'border-highlight'} ${muted}`}
      >
        {children}
      </blockquote>
    ),
    hr: () => <hr className="my-4 border-neutral-300" />,
    table: ({ children }) => (
      <div className="mb-3 overflow-x-auto last:mb-0">
        <table className="min-w-full border-collapse text-left text-[13px]">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border border-neutral-300 bg-neutral-100 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider">
        {children}
      </th>
    ),
    td: ({ children }) => <td className="border border-neutral-300 px-2 py-1">{children}</td>,
  };
}

export const AssistantMessageContent = memo(function AssistantMessageContent({
  content,
  variant = 'assistant',
}: {
  content: string;
  variant?: Variant;
}) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={buildComponents(variant)}>
      {stripCitationMarkers(content)}
    </ReactMarkdown>
  );
});

const FIT_LABELS: Record<FitAssessment['level'], string> = {
  strong: 'Strong fit',
  good: 'Good fit',
  possible: 'Possible fit',
  poor: 'Poor fit',
};

const FIT_STYLES: Record<FitAssessment['level'], string> = {
  strong: 'bg-highlight text-foreground border-foreground',
  good: 'bg-highlight/50 text-foreground border-foreground/60',
  possible: 'bg-neutral-200 text-foreground border-neutral-400',
  poor: 'bg-neutral-100 text-secondary border-neutral-300',
};

export function FitBadge({ fit }: { fit: FitAssessment }) {
  return (
    <span
      className={`mb-2 inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${FIT_STYLES[fit.level]}`}
    >
      {FIT_LABELS[fit.level]}
    </span>
  );
}
