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
    <div
      className={`absolute inset-0 flex flex-col bg-background overflow-hidden ${className}`}
      aria-hidden={true}
    >
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: compact ? '24px 24px' : '32px 32px',
          color: brand.accent,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/[0.08]" />

      <div className={`relative z-10 flex flex-col h-full ${compact ? 'p-4' : 'p-6 md:p-8'}`}>
        <div className="flex items-center justify-between gap-4 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-accent/80">
          <span className="font-bold text-accent">{brand.fig}</span>
          <span className="truncate">{slug}</span>
          <span className="hidden sm:inline">{brand.status}</span>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div
            className={`relative flex items-center justify-center border border-accent/25 bg-white/40 backdrop-blur-[1px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)] ${
              compact ? 'w-24 h-24' : 'w-28 h-28 md:w-36 md:h-36'
            }`}
            style={{ boxShadow: `0 0 0 1px ${brand.accent}22, 0 18px 40px -24px ${brand.accent}55` }}
          >
            <span
              className={`font-black tracking-tighter text-foreground/75 ${compact ? 'text-3xl' : 'text-4xl md:text-5xl'}`}
              style={{ color: brand.accent }}
            >
              {brand.monogram}
            </span>
            <div className="absolute -top-px left-8 right-8 h-px bg-accent/20" />
            <div className="absolute -bottom-px left-8 right-8 h-px bg-accent/20" />
            <div className="absolute -left-px top-8 bottom-8 w-px bg-accent/20" />
            <div className="absolute -right-px top-8 bottom-8 w-px bg-accent/20" />
          </div>
        </div>

        <div className="flex items-end justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/45">
          <span>REF::{brand.monogram}</span>
          <span>RENDER::PLACEHOLDER</span>
        </div>
      </div>
    </div>
  );
}
