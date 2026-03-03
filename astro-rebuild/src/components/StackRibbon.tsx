import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { stackTechnologies, stackCopy } from '../data/stack';

export const StackRibbon = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Override the global toggle function
    // @ts-ignore
    window.toggleStackRibbonState = () => {
      setIsOpen(prev => !prev);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => {
      setIsOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Don't close if clicking inside the nav (which contains the toggle button)
      if (target.closest('nav') || target.closest('#stack-ribbon-container')) {
        return;
      }
      setIsOpen(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const shouldReduceMotion = useReducedMotion();

  // Duplicate for seamless infinite scroll
  const marqueeItems = [...stackTechnologies, ...stackTechnologies, ...stackTechnologies];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="stack-ribbon-container"
          className="fixed top-16 left-0 w-full z-40 bg-[#0a0a0a] text-[#ededed] border-b border-neutral-800 overflow-hidden shadow-2xl"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="w-full max-w-[1400px] mx-auto border-x border-neutral-800">
            
            {/* Top Row: Structural redesign */}
            <div className="p-8 md:p-12 lg:p-16 border-b border-neutral-800 flex flex-col bg-[#0a0a0a]">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 mb-12"
              >
                {stackCopy.eyebrow}
              </motion.span>
              
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 justify-between items-start">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-[clamp(3rem,6vw,6rem)] font-black uppercase tracking-tighter leading-[0.9] text-[#ededed] max-w-3xl"
                >
                  {stackCopy.headline}
                </motion.h2>
                
                <div className="flex flex-col gap-8 max-w-md w-full shrink-0 pt-2 lg:pt-4">
                  <motion.p
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-lg md:text-xl font-light leading-relaxed text-neutral-400"
                  >
                    {stackCopy.description}
                  </motion.p>
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    onClick={() => {
                      if (typeof window !== 'undefined' && (window as unknown as { openContactHub?: () => void }).openContactHub) {
                        (window as unknown as { openContactHub: () => void }).openContactHub();
                      }
                      setIsOpen(false);
                    }}
                    className="inline-flex items-center justify-between gap-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#ededed] hover:text-[#0a0a0a] border border-neutral-700 hover:bg-[#ededed] hover:border-[#ededed] py-4 px-6 transition-all duration-300 group"
                  >
                    {stackCopy.ctaButton}
                    <span className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Bottom Row: The Infinite Marquee */}
            <div className="relative w-full py-8 md:py-12 overflow-hidden flex items-center bg-[#0a0a0a]" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
              <motion.div 
                className="flex whitespace-nowrap"
                animate={shouldReduceMotion ? { x: 0 } : { x: ["0%", "-33.333%"] }}
                transition={{ duration: 25, ease: "linear", repeat: Infinity }}
              >
                {marqueeItems.map((tech, i) => {
                  const TechIcon = tech.icon;

                  return (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                    className="flex items-center gap-6 px-8 md:px-10 text-[#ededed] text-[4vw] md:text-[3vw] font-bold tracking-tight uppercase leading-none select-none"
                  >
                    {TechIcon ? (
                      <TechIcon className="text-[0.9em] text-[#ededed] shrink-0" />
                    ) : (
                      <span className="text-[0.75em] text-neutral-500 shrink-0">■</span>
                    )}
                    <span>{tech.name}</span>
                    <span className="text-neutral-600">//</span>
                  </div>
                );
                })}
              </motion.div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};