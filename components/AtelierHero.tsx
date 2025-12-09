'use client';

import React from 'react';
import { ArrowDown } from 'lucide-react';

const AtelierHero = () => {
  const scrollToLedger = () => {
    const ledger = document.getElementById('ledger');
    if (ledger) {
      ledger.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#F9F5F1] overflow-hidden">
      {/* Grain Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")` }}>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto space-y-10">
        
        {/* Monogram Badge */}
        <div className="relative w-24 h-24 flex items-center justify-center rounded-full border border-[#8C7A5E] bg-[#F9F5F1] shadow-sm mb-4">
          <div className="absolute inset-1 rounded-full border border-[#8C7A5E] opacity-30"></div>
          <span className="font-serif text-3xl text-[#1C1B1A] tracking-tighter">NL</span>
        </div>

        {/* Title Block */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-serif text-[#1C1B1A] tracking-tight">
            Nicholas Loperena
          </h1>
          <div className="flex items-center justify-center gap-3 text-[#8C7A5E] font-mono text-sm md:text-base uppercase tracking-widest">
            <span>Digital Architect</span>
            <span className="w-1 h-1 rounded-full bg-[#8C7A5E]"></span>
            <span>Ninth-Generation Builder</span>
          </div>
        </div>

        {/* Mission Statement */}
        <p className="text-xl md:text-2xl font-medium text-[#1C1B1A] max-w-2xl leading-relaxed font-sans">
          “My family has engineered enduring institutions since 1685. <br className="hidden md:block"/>
          Today I build yours in code.”
        </p>

        {/* CTA Button */}
        <button 
          onClick={scrollToLedger}
          className="group mt-8 px-8 py-4 bg-[#49111C] text-[#F8F4F0] font-mono text-sm uppercase tracking-widest hover:bg-[#3a0d16] transition-all duration-500 flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          <span>Examine the Ledger</span>
          <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </button>

      </div>
    </section>
  );
};

export default AtelierHero;
