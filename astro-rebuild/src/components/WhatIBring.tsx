import React from 'react';
import { motion } from 'framer-motion';
import { whatIBring } from '../data/whatIBring';
import { capabilityProof } from '../data/capabilityProof';
import { coreHiringStack } from '../data/stack';
import { sectionSequence, stampUp, VIEWPORT_ONCE } from '../utils/motionBlueprint';

export function WhatIBring() {
  const hiringStack = coreHiringStack;

  return (
    <section className="brutal-section bg-concrete">
      <motion.div
        className="border-b-2 border-foreground bg-highlight px-4 py-5 md:px-6 lg:px-8"
        variants={stampUp}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_ONCE}
      >
        <div className="mx-auto max-w-[1400px]">
          <span className="brutal-label mb-3 block">01 — {whatIBring.eyebrow}</span>
          <h2 className="font-mono text-3xl font-black uppercase tracking-tighter leading-none md:text-4xl">
            {whatIBring.headline}
          </h2>
          <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-foreground md:text-base">
            {whatIBring.subheadline}
          </p>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 divide-x-2 divide-y-2 divide-foreground border-b-2 border-foreground md:grid-cols-4 md:divide-y-0"
        variants={sectionSequence}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_ONCE}
      >
        {capabilityProof.metrics.map((metric) => (
          <motion.div key={metric.label} variants={stampUp} className="flex min-h-[100px] flex-col justify-between bg-background p-4 md:p-5">
            <span className="font-mono text-2xl font-black tracking-tighter md:text-3xl">{metric.value}</span>
            <div>
              <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.16em]">{metric.label}</span>
              <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-widest text-secondary">{metric.note}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 divide-y-2 divide-foreground md:grid-cols-2 md:divide-x-2 md:divide-y-0">
        {whatIBring.pillars.map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <motion.article
              key={pillar.id}
              variants={stampUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT_ONCE}
              className="bg-background p-5 transition-none hover:bg-concrete md:p-6"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <Icon size={18} strokeWidth={2.5} className="text-foreground" />
              </div>
              <h3 className="mb-2 font-mono text-lg font-black uppercase tracking-tight md:text-xl">{pillar.title}</h3>
              <p className="mb-3 max-w-prose font-sans text-sm leading-relaxed text-foreground/90">{pillar.description}</p>
              <p className="mb-3 border-l-4 border-foreground pl-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em]">
                {pillar.outcome}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {pillar.stack.map((tag) => (
                  <span
                    key={tag}
                    className="border-2 border-foreground bg-background px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="border-t-2 border-foreground bg-foreground px-4 py-4 text-background md:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <span className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-[0.24em]">Core stack</span>
          <div className="flex flex-wrap gap-1.5">
            {hiringStack.map((tech) => {
              const TechIcon = tech.icon;
              return (
                <span
                  key={tech.name}
                  className="inline-flex items-center gap-1.5 border-2 border-background bg-background px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-foreground"
                >
                  {TechIcon && <TechIcon className="text-sm" />}
                  {tech.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
