import React from 'react';
import { defaultPlaceholder, projectPlaceholders, type ProjectPlaceholder } from '../data/projectPlaceholders';

interface Props {
  projectId: string;
  title: string;
  compact?: boolean;
  className?: string;
}

export function ProjectBrandedPlaceholder({ projectId, title, compact = false, className = '' }: Props) {
  const brand: ProjectPlaceholder = projectPlaceholders[projectId] ?? defaultPlaceholder;
  const slug = title.toUpperCase().replace(/[^A-Z0-9]+/g, '_');

  return (
    <div className={`absolute inset-0 flex flex-col bg-concrete overflow-hidden border-2 border-foreground ${className}`} aria-hidden={true}>
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #0D0D0D 1px, transparent 1px), linear-gradient(to bottom, #0D0D0D 1px, transparent 1px)',
          backgroundSize: compact ? '24px 24px' : '32px 32px',
        }}
      />

      <div className={`relative z-10 flex flex-col h-full ${compact ? 'p-4' : 'p-6 md:p-8'}`}>
        <div className="flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.2em] border-b-2 border-foreground pb-2">
          <span className="font-bold">{brand.fig}</span>
          <span className="truncate">{slug}</span>
          <span className="hidden sm:inline bg-foreground text-background px-1">{brand.status}</span>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div
            className={`relative flex items-center justify-center border-2 border-foreground bg-background shadow-brutal ${
              compact ? 'w-24 h-24' : 'w-28 h-28 md:w-36 md:h-36'
            }`}
          >
            <span className={`font-mono font-black tracking-tighter ${compact ? 'text-3xl' : 'text-4xl md:text-5xl'}`}>{brand.monogram}</span>
          </div>
        </div>

        <div className="flex items-end justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.18em] border-t-2 border-foreground pt-2">
          <span>REF::{brand.monogram}</span>
          <span className="bg-highlight text-foreground px-1 font-bold">RENDER::PLACEHOLDER</span>
        </div>
      </div>
    </div>
  );
}
