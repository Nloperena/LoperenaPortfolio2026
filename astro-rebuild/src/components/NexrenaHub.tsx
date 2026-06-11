import React from 'react';
import { motion } from 'framer-motion';
import { siteProfile } from '../data/site';
import { track } from '../utils/analytics';
import { stampUp, sectionSequence, VIEWPORT_ONCE } from '../utils/motionBlueprint';

const caseStudyLinks = [
  { label: 'Forzabuilt', href: `${siteProfile.nexrenaUrl}/work/forzabuilt` },
  { label: 'Rugged Red', href: `${siteProfile.nexrenaUrl}/work/rugged-red` },
  { label: 'VITO Fryfilter', href: `${siteProfile.nexrenaUrl}/work/vito-fryfilter` },
  { label: 'All case studies', href: `${siteProfile.nexrenaUrl}/work` },
];

export const NexrenaHub = () => (
  <section className="relative w-full px-4 md:px-8 lg:px-12 pb-24">
    <motion.div
      className="mx-auto max-w-[1400px] border border-accent/20 bg-white/40"
      variants={sectionSequence}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_ONCE}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-accent/20 p-8 md:p-10">
          <motion.p variants={stampUp} className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-accent mb-4">
            Agency · B2B delivery
          </motion.p>
          <motion.h2 variants={stampUp} className="font-sans text-3xl md:text-4xl font-black uppercase tracking-tighter text-foreground leading-[0.95]">
            Founder at Nexrena
          </motion.h2>
          <motion.p variants={stampUp} className="mt-4 font-serif text-base md:text-lg italic text-foreground/75 leading-relaxed max-w-md">
            {siteProfile.nexrenaBlurb}
          </motion.p>
          <motion.a
            variants={stampUp}
            href={siteProfile.nexrenaUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('nexrena_hub_click', { target: 'homepage' })}
            className="mt-8 inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-foreground border border-foreground/30 hover:border-foreground px-5 py-3 transition-colors"
          >
            Visit Nexrena.com <span aria-hidden="true">↗</span>
          </motion.a>
        </div>

        <div className="lg:col-span-7 p-8 md:p-10 flex flex-col justify-center gap-6">
          <motion.p variants={stampUp} className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
            Business case studies (ROI & conversions)
          </motion.p>
          <div className="flex flex-col gap-3">
            {caseStudyLinks.map((item) => (
              <motion.a
                key={item.label}
                variants={stampUp}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('nexrena_hub_click', { target: item.label })}
                className="group flex items-center justify-between border border-accent/20 bg-background/60 px-5 py-4 hover:bg-white transition-colors"
              >
                <span className="font-sans text-sm md:text-base font-bold uppercase tracking-wide text-foreground">
                  {item.label}
                </span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent group-hover:text-foreground transition-colors">
                  On Nexrena →
                </span>
              </motion.a>
            ))}
          </div>
          <motion.p variants={stampUp} className="font-mono text-[9px] uppercase tracking-widest text-foreground/50">
            Personal portfolio here · Agency outcomes at Nexrena
          </motion.p>
        </div>
      </div>
    </motion.div>
  </section>
);
