'use client';

import React from 'react';
import { Globe, Zap, Layers, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const HybridHero = () => {
  return (
    <section className="min-h-[90vh] flex flex-col border-b border-zinc-200 relative overflow-hidden">
      {/* Top Bar: Spec Sheet */}
      <div className="grid grid-cols-1 md:grid-cols-4 border-b border-zinc-200 divide-y md:divide-y-0 md:divide-x divide-zinc-200 bg-white z-10 relative">
        {/* Col 1 */}
        <div className="flex items-center gap-2 p-4 text-xs font-mono tracking-widest text-zinc-600 uppercase">
          <Globe className="w-3 h-3" />
          <span>LOC: ORLANDO, FL</span>
        </div>

        {/* Col 2 */}
        <div className="flex items-center gap-2 p-4 text-xs font-mono tracking-widest text-zinc-600 uppercase">
          <Zap className="w-3 h-3" />
          <span>EXP: 7+ YEARS</span>
        </div>

        {/* Col 3 */}
        <div className="flex items-center gap-2 p-4 text-xs font-mono tracking-widest text-zinc-600 uppercase">
          <Layers className="w-3 h-3" />
          <span>STACK: FULL SCALE</span>
        </div>

        {/* Col 4 */}
        <div className="p-0">
          <button className="w-full h-full p-4 bg-black text-white text-xs font-mono tracking-widest uppercase hover:bg-[#8B2E2E] transition-colors duration-300">
            AVAILABLE FOR HIRE
          </button>
        </div>
      </div>

      {/* Main Stage */}
      <div className="flex-grow flex flex-col justify-center relative p-4 md:p-12 lg:p-24">
        {/* System Status Overlay */}
        <div className="absolute top-12 right-12 hidden md:flex items-center gap-2 font-mono text-[10px] text-zinc-400 uppercase tracking-widest border border-zinc-200 px-3 py-1.5 rounded-full bg-white/50 backdrop-blur-sm">
           <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
           <span>System: Online</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full text-center md:text-left z-10"
        >
          <h1 className="font-serif text-[12vw] md:text-[11vw] leading-[0.8] tracking-tight text-black mb-8 uppercase mix-blend-darken">
            Nicholas <br />
            <span className="italic">Loperena</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl md:ml-4 z-10"
        >
          <p className="font-sans text-lg md:text-xl text-zinc-600 leading-relaxed mb-12 font-medium">
            I engineer digital infrastructure for enterprise scale. Blending the precision of old-world architecture with modern system design.
          </p>

          <button className="px-8 py-3 border border-black rounded-full font-mono text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 active:scale-95">
            VIEW SELECTED WORKS
          </button>
        </motion.div>
        
        {/* Background Text Texture (Subtle) */}
        <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none select-none overflow-hidden opacity-[0.02] z-0 flex items-end justify-center">
            <span className="font-mono text-[20vw] leading-none font-bold uppercase">Build</span>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="flex justify-between items-center p-4 border-t border-zinc-200 text-xs font-mono tracking-widest text-zinc-400 uppercase bg-white z-10">
        <span>REF: N-LOP-PORTFOLIO-V4</span>
        <span className="font-serif italic text-zinc-500 normal-case tracking-normal text-sm">Build things that last.</span>
      </div>
    </section>
  );
};

export default HybridHero;
