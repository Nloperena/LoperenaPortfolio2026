import React from 'react';
import { hiringProfile } from '../data/hiring';

export const IdealRoleFit = () => (
  <section className="brutal-section bg-background" aria-label="Ideal role fit">
    <div className="grid grid-cols-1 divide-y-2 divide-foreground md:grid-cols-2 md:divide-x-2 md:divide-y-0">
      <div className="bg-highlight px-4 py-5 md:px-6 lg:px-8">
        <h3 className="font-mono text-lg font-black uppercase tracking-tight">Good fit</h3>
        <ul className="mt-4 space-y-2">
          {hiringProfile.idealFit.map((item) => (
            <li key={item} className="flex gap-2 font-sans text-sm leading-relaxed text-foreground">
              <span className="font-mono text-[10px] font-bold text-secondary shrink-0">+</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-background px-4 py-5 md:px-6 lg:px-8">
        <h3 className="font-mono text-lg font-black uppercase tracking-tight">Less ideal</h3>
        <ul className="mt-4 space-y-2">
          {hiringProfile.lessIdeal.map((item) => (
            <li key={item} className="flex gap-2 font-sans text-sm leading-relaxed text-foreground/90">
              <span className="font-mono text-[10px] font-bold text-secondary shrink-0">−</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 border-t-2 border-foreground pt-3 font-mono text-[10px] font-bold uppercase tracking-widest text-secondary">
          {hiringProfile.compensationNote}
        </p>
      </div>
    </div>
  </section>
);
