import React from 'react';
import { motion } from 'framer-motion';
import { capabilityProof } from '../data/capabilityProof';
import {
  sectionSequence,
  drawLineX,
  drawLineY,
  stampUp,
  VIEWPORT_ONCE,
} from '../utils/motionBlueprint';

export function CapabilitiesHeader() {
  return (
    <div className="border-b border-accent/20">
      <motion.div
        className="relative px-8 md:px-12 pt-10 md:pt-12 pb-8 md:pb-10 bg-white/30"
        variants={sectionSequence}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_ONCE}
      >
        <motion.div className="absolute top-0 left-0 right-0 h-px bg-accent/20" variants={drawLineX} />
        <motion.div className="absolute top-0 bottom-0 left-0 w-px bg-accent/20" variants={drawLineY} />

        <div className="overflow-hidden">
          <motion.div variants={stampUp} className="flex items-center gap-6 mb-5">
            <span className="font-mono text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-accent">
              {capabilityProof.eyebrow}
            </span>
            <div className="h-px flex-1 bg-accent/20" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <div className="overflow-hidden">
              <motion.h2
                variants={stampUp}
                className="text-4xl md:text-5xl lg:text-6xl font-sans font-black tracking-tighter uppercase text-foreground leading-[0.95]"
              >
                {capabilityProof.headline}
              </motion.h2>
            </div>
            <motion.p
              variants={stampUp}
              className="mt-5 max-w-2xl font-serif text-lg md:text-xl italic leading-relaxed text-foreground/75"
            >
              {capabilityProof.subheadline}
            </motion.p>
          </div>

          <motion.p
            variants={stampUp}
            className="lg:col-span-5 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.16em] text-foreground/55 leading-relaxed lg:text-right lg:pb-1"
          >
            Outcomes from shipped client work — not agency estimates.
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-accent/20 border-t border-accent/20 bg-accent/[0.02]"
        variants={sectionSequence}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_ONCE}
      >
        {capabilityProof.metrics.map((metric) => (
          <motion.div
            key={metric.label}
            variants={stampUp}
            className="p-6 md:p-8 flex flex-col justify-between min-h-[132px]"
          >
            <span className="font-sans text-3xl md:text-4xl font-black tracking-tighter text-foreground">
              {metric.value}
            </span>
            <div>
              <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-foreground">
                {metric.label}
              </span>
              <span className="mt-1 block font-mono text-[9px] uppercase tracking-widest text-accent/80">
                {metric.note}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
