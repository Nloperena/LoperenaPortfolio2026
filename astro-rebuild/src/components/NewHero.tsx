import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const NewHero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={sectionRef}
      className="relative hero-height min-h-[500px] flex flex-col justify-center bg-[#FAF9F6] overflow-hidden text-[#1C1B1A] border-b-4 border-double border-[#8C7A5E]/40"
    >
      {/* Heritage Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#8C7A5E] hidden md:block" />
        <div className="absolute left-0 right-0 top-1/3 h-px bg-[#8C7A5E]" />
      </div>

      {/* SVG Background Watermark */}
      <div className="absolute right-[-10%] bottom-[-10%] w-[70%] h-[120%] opacity-[0.07] pointer-events-none">
        <img 
          src="/oakandtree.svg" 
          alt="" 
          className="w-full h-full object-contain"
          style={{ filter: 'sepia(1) contrast(0.5)' }}
        />
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-[90%] mx-auto py-12 md:py-24"
      >
        <div className="space-y-6 md:space-y-8">
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8 }}
             className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4"
          >
             <div className="flex items-center gap-4">
                <div className="h-0.5 w-8 md:w-12 bg-[#8C7A5E]" />
                <span className="text-sm md:text-xl font-mono text-[#8C7A5E] font-bold uppercase tracking-[0.3em]">
                  Architect of Intelligent Systems
                </span>
             </div>
             <div className="flex items-center gap-2 ml-12 md:ml-0">
                <span className="font-serif italic text-[#8C7A5E]/60 text-xs md:text-sm">Est. 1732</span>
             </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-[10vw] md:text-[7vw] lg:text-[8vw] leading-[0.85] font-serif font-bold tracking-tighter text-[#4A1010] ink-bleed uppercase"
          >
            BUILDING <br />
            DIGITAL LEGACIES,<br />
            <span className="italic text-[#1A2F28]/80 font-light">TOGETHER</span>
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-8 border-t border-[#8C7A5E]/20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
               <p className="text-lg md:text-2xl text-[#1C1B1A]/80 font-serif leading-relaxed italic">
                  Nicholas Loperena develops high-conversion websites and systems for brands focused on building trust and driving growth through context-aware intelligence.
               </p>
               
               <div className="flex flex-wrap gap-4">
                  <a
                    href="#selected-works"
                    className="group flex items-center gap-2 px-6 py-3 bg-[#1A2F28] text-[#FAF9F6] font-serif font-bold uppercase tracking-widest text-xs hover:bg-[#4A1010] transition-all border border-[#8C7A5E]/20 shadow-lg"
                  >
                    <span>View Archive</span>
                    <ArrowRight size={14} />
                  </a>
                  <a
                    href="mailto:nicholas@loperena.com" 
                    className="px-6 py-3 border border-[#8C7A5E]/30 text-[#1C1B1A] font-serif font-bold uppercase tracking-widest text-xs hover:bg-[#8C7A5E]/5 transition-all"
                  >
                    Start a conversation
                  </a>
               </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden md:flex flex-col justify-between pl-8 border-l border-[#8C7A5E]/20"
            >
               <p className="text-sm text-[#1C1B1A]/60 italic font-serif leading-relaxed">
                 &quot;Engineering context-aware intelligence that serves as a business foundation. From implementation to artistry.&quot;
               </p>
               
               <div className="flex items-center justify-between text-[10px] font-mono text-[#8C7A5E] uppercase tracking-widest bg-[#8C7A5E]/5 p-4 border border-[#8C7A5E]/10">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#4A1010] rounded-full animate-pulse"></span>
                    Operational: Q1 2025
                  </span>
                  <span className="opacity-40">REF.1065-2026</span>
               </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default NewHero;

