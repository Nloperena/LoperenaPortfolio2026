import React from 'react';
import { motion } from 'framer-motion';
import {
  sectionSequence,
  drawLineX,
  drawLineY,
  stampUp,
  VIEWPORT_ONCE,
  arrowIn,
} from '../utils/motionBlueprint';

export const FooterReact = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden mt-0">
      <motion.div 
        className="relative z-10 w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 bg-background/90 backdrop-blur-sm border-x border-accent/20"
        variants={sectionSequence}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_ONCE}
      >
        {/* Animated Structural Borders */}
        <motion.div className="absolute top-0 left-0 right-0 h-px bg-accent/20 z-20" variants={drawLineX} />
        
        {/* --- ROW 1: 4 COLUMNS --- */}
        {/* Col 1: Identity */}
        <div className="lg:col-span-3 p-6 md:p-10 relative flex flex-col justify-start bg-accent/[0.01]">
          <motion.div className="absolute bottom-0 left-0 right-0 h-px bg-accent/20 z-20 lg:hidden" variants={drawLineX} />
          <motion.div className="absolute top-0 bottom-0 right-0 w-px bg-accent/20 z-20 hidden lg:block" variants={drawLineY} />
          
          <div className="overflow-hidden">
            <motion.div variants={stampUp}>
              <h3 className="font-sans text-xl md:text-2xl font-black uppercase tracking-tighter text-foreground mb-2">
                Nico Loperena
              </h3>
              <p className="font-sans text-xs md:text-sm text-foreground/60 leading-relaxed max-w-[250px]">
                Senior Software Architect building high-performance web ecosystems, AI integrations, and cloud infrastructure.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Col 2: System Status */}
        <div className="lg:col-span-3 p-6 md:p-10 relative flex flex-col justify-start bg-accent/[0.01]">
          <motion.div className="absolute bottom-0 left-0 right-0 h-px bg-accent/20 z-20 lg:hidden" variants={drawLineX} />
          <motion.div className="absolute top-0 bottom-0 right-0 w-px bg-accent/20 z-20 hidden lg:block" variants={drawLineY} />
          
          <div className="overflow-hidden">
            <motion.div variants={stampUp} className="flex flex-col gap-3">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                System Status
              </span>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                <span className="font-sans text-xs md:text-sm font-bold uppercase tracking-wider text-foreground">
                  Accepting New Projects
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Col 3: Coordinates */}
        <div className="lg:col-span-3 p-6 md:p-10 relative flex flex-col justify-start bg-accent/[0.01]">
          <motion.div className="absolute bottom-0 left-0 right-0 h-px bg-accent/20 z-20 lg:hidden" variants={drawLineX} />
          <motion.div className="absolute top-0 bottom-0 right-0 w-px bg-accent/20 z-20 hidden lg:block" variants={drawLineY} />
          
          <div className="overflow-hidden">
            <motion.div variants={stampUp} className="flex flex-col gap-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                Base of Operations
              </span>
              <span className="font-sans text-xs md:text-sm font-bold uppercase tracking-wider text-foreground">
                Orlando, FL // EST
              </span>
            </motion.div>
          </div>
        </div>

        {/* Col 4: Directory */}
        <div className="lg:col-span-3 p-6 md:p-10 relative flex flex-col justify-start bg-accent/[0.01]">
          <div className="overflow-hidden">
            <motion.div variants={stampUp} className="flex flex-col gap-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                Directory
              </span>
              <div className="flex flex-col gap-2">
                <motion.a
                  href="https://www.linkedin.com/in/nicholas-loperena-022813185/"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center w-fit hover:bg-white transition-colors duration-0"
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-foreground hover:text-highlight transition-colors">
                    LinkedIn
                  </span>
                  <motion.span variants={arrowIn} className="font-mono text-xs text-foreground ml-1">→</motion.span>
                </motion.a>
                <motion.a
                  href="https://github.com/NLoperena"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center w-fit hover:bg-white transition-colors duration-0"
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-foreground hover:text-highlight transition-colors">
                    GitHub
                  </span>
                  <motion.span variants={arrowIn} className="font-mono text-xs text-foreground ml-1">→</motion.span>
                </motion.a>
                <motion.a
                  href="mailto:NicholasLoperena@gmail.com"
                  className="group flex items-center w-fit hover:bg-white transition-colors duration-0"
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-foreground hover:text-highlight transition-colors">
                    Email
                  </span>
                  <motion.span variants={arrowIn} className="font-mono text-xs text-foreground ml-1">→</motion.span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- ROW 2: COPYRIGHT --- */}
        <div className="lg:col-span-12 p-6 md:px-10 relative flex items-center bg-white/30 border-t border-accent/20">
          <motion.div className="absolute top-0 left-0 right-0 h-px bg-accent/20 z-20" variants={drawLineX} />
          
          <div className="overflow-hidden w-full">
            <motion.div variants={stampUp} className="flex w-full items-center justify-between">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                © {currentYear} Nico Loperena
              </span>
              {/* Optional minimal accent lines on right side */}
              <div className="hidden sm:flex gap-1 opacity-30">
                <div className="w-1 h-3 border-l border-foreground"></div>
                <div className="w-1 h-3 border-l border-foreground"></div>
                <div className="w-1 h-3 border-l border-foreground"></div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom closing line */}
        <motion.div className="absolute bottom-0 left-0 right-0 h-px bg-accent/20 z-20" variants={drawLineX} />
      </motion.div>
    </footer>
  );
};