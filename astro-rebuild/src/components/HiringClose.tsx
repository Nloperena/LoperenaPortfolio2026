import React from 'react';
import { motion } from 'framer-motion';
import { siteProfile } from '../data/site';
import { track } from '../utils/analytics';
import { stampUp, VIEWPORT_ONCE } from '../utils/motionBlueprint';
import { IdealRoleFit } from './IdealRoleFit';

const openContact = () => {
  track('contact_click', { source: 'hiring_close' });
  // @ts-expect-error global contact hub
  if (typeof window !== 'undefined' && window.openContactHub) {
    // @ts-expect-error global contact hub
    window.openContactHub();
  }
};

export const HiringClose = () => (
  <section className="brutal-section bg-concrete">
    <motion.div
      className="border-b-2 border-foreground bg-highlight px-4 py-5 md:px-6 lg:px-8"
      variants={stampUp}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_ONCE}
    >
      <div className="mx-auto max-w-[1400px]">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-secondary">04 — Next step</span>
        <h2 className="mt-1 font-mono text-2xl font-black uppercase tracking-tight md:text-3xl">What I&apos;m looking for</h2>
        <p className="mt-3 max-w-3xl font-sans text-sm leading-relaxed text-foreground md:text-base">
          Remote senior full-stack roles on US teams — own features across the stack and stay involved after launch.
        </p>
        <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-widest text-secondary">
          {siteProfile.specialty} · {siteProfile.workStyle}
        </p>
      </div>
    </motion.div>

    <IdealRoleFit />

    <div className="grid grid-cols-1 divide-y-2 divide-foreground sm:grid-cols-2 sm:divide-x-2 sm:divide-y-0">
      <a
        href={siteProfile.resumePath}
        download={siteProfile.resumeDownloadName}
        onClick={() => track('resume_download', { source: 'hiring_close' })}
        className="flex items-center justify-center bg-foreground px-6 py-5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-background transition-none hover:bg-highlight hover:text-foreground"
      >
        Download resume
      </a>
      <button
        type="button"
        onClick={openContact}
        className="flex items-center justify-center bg-background px-6 py-5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-foreground transition-none hover:bg-concrete"
      >
        Start a conversation
      </button>
    </div>

    <p className="border-t-2 border-foreground bg-background px-4 py-3 font-sans text-sm text-secondary md:px-6 lg:px-8">
      <span className="mx-auto block max-w-[1400px]">
        I also run{' '}
        <a
          href={siteProfile.nexrenaUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('nexrena_hub_click', { target: 'hiring_close_footnote' })}
          className="font-mono text-[10px] font-bold uppercase tracking-widest text-foreground hover:underline"
        >
          Nexrena
        </a>
        , my client web studio — separate from this hiring site.
      </span>
    </p>
  </section>
);
