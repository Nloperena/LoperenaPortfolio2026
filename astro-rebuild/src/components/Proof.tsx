import React from 'react';
import { motion } from 'framer-motion';
import { linkedInRecommendations, linkedInRecommendationsUrl } from '../data/linkedinRecommendations';
import { siteProfile } from '../data/site';
import { stampUp, VIEWPORT_ONCE } from '../utils/motionBlueprint';

export const Proof = () => (
  <section className="brutal-section bg-background">
    <motion.div
      className="brutal-section-head"
      variants={stampUp}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_ONCE}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-background/70">
            03 — Social proof
          </span>
          <h2 className="mt-1 font-mono text-2xl font-black uppercase tracking-tight md:text-3xl">
            LinkedIn recommendations
          </h2>
          <p className="mt-2 max-w-xl font-sans text-sm text-background/90">
            What managers and teammates have said — real people from my LinkedIn profile.
          </p>
        </div>
        <a
          href={linkedInRecommendationsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 border-2 border-background bg-background px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-foreground transition-none hover:bg-highlight"
        >
          View on LinkedIn ↗
        </a>
      </div>
    </motion.div>

    <div className="grid grid-cols-1 divide-y-2 divide-foreground lg:grid-cols-3 lg:divide-x-2 lg:divide-y-0">
      {linkedInRecommendations.map((rec, index) => (
        <blockquote
          key={rec.id}
          className="flex flex-col bg-background p-5 transition-none hover:bg-concrete md:p-6"
        >
          <div className="mb-4 flex items-center gap-3">
            <a
              href={rec.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group shrink-0"
              aria-label={`${rec.name} on LinkedIn`}
            >
              <img
                src={rec.avatar}
                alt={rec.avatarAlt}
                width={56}
                height={56}
                loading="lazy"
                decoding="async"
                className="h-14 w-14 border-2 border-foreground bg-concrete object-cover shadow-brutal-sm transition-none group-hover:border-highlight"
              />
            </a>
            <div className="min-w-0">
              <a
                href={rec.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm font-black uppercase tracking-tight hover:underline"
              >
                {rec.name}
              </a>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-secondary leading-snug">
                {rec.title} · {rec.company}
              </p>
            </div>
          </div>

          <p className="flex-1 font-sans text-sm leading-relaxed text-foreground md:text-base">&ldquo;{rec.quote}&rdquo;</p>

          <footer className="mt-4 border-t-2 border-foreground pt-3">
            <p className="font-mono text-[9px] uppercase tracking-widest text-secondary">
              {rec.relationship} · {rec.date}
            </p>
          </footer>
          <span className="sr-only">
            Recommendation {index + 1} of {linkedInRecommendations.length}
          </span>
        </blockquote>
      ))}
    </div>

    <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-foreground bg-foreground px-4 py-3 text-background md:px-6 lg:px-8">
      <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
        {linkedInRecommendations.length} received on LinkedIn
      </span>
      <a
        href={siteProfile.linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-[10px] font-bold uppercase tracking-widest text-highlight hover:underline"
      >
        {siteProfile.linkedInUrl.replace('https://', '')} ↗
      </a>
    </div>
  </section>
);
