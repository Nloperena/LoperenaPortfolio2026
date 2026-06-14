import React from 'react';
import { stackCopy, stackGroups } from '../data/stack';

export const StackSection = () => (
  <section id="stack" className="scroll-mt-24 brutal-section bg-background">
    <div className="border-b-2 border-foreground bg-highlight px-4 py-5 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-secondary">
          {stackCopy.eyebrow}
        </span>
        <h2 className="mt-1 font-mono text-2xl font-black uppercase tracking-tight md:text-3xl">{stackCopy.headline}</h2>
        <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-foreground md:text-base">
          {stackCopy.description}
        </p>
      </div>
    </div>

    <div className="mx-auto max-w-[1400px] divide-y-2 divide-foreground border-b-2 border-foreground">
      {stackGroups.map((group) => (
        <div
          key={group.id}
          className="grid grid-cols-1 gap-3 px-4 py-4 md:grid-cols-12 md:items-start md:gap-6 md:px-6 md:py-5 lg:px-8"
        >
          <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-secondary md:col-span-3 lg:col-span-2">
            {group.label}
          </dt>
          <dd className="flex flex-wrap gap-2 md:col-span-9 lg:col-span-10">
            {group.items.map((item) => (
              <span
                key={item}
                className="border-2 border-foreground bg-background px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em]"
              >
                {item}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </div>

    <p className="mx-auto max-w-[1400px] border-b-2 border-foreground px-4 py-4 font-mono text-[10px] font-bold uppercase tracking-widest text-secondary md:px-6 lg:px-8">
      {stackCopy.proofLine}
    </p>
  </section>
);
