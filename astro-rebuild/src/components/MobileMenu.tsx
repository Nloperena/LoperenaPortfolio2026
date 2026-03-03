import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleContactClick = () => {
    onClose();
    // @ts-ignore
    if (typeof window !== 'undefined' && window.openContactHub) {
      // @ts-ignore
      window.openContactHub();
    }
  };

  const handleSkillsClick = () => {
    onClose();
    // @ts-ignore
    if (typeof window !== 'undefined' && window.toggleStackRibbonState) {
      // @ts-ignore
      window.toggleStackRibbonState();
    }
  };

  const menuVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1], staggerChildren: 0.1, delayChildren: 0.2 }
    },
    exit: {
      x: '100%',
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] h-[100svh] w-screen bg-[#0a0a0a]/95 backdrop-blur-md flex flex-col text-[#ededed] lg:hidden"
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Subtle architectural grid lines behind everything */}
          <div className="absolute inset-0 pointer-events-none z-0" style={{
            backgroundImage: 'linear-gradient(to right, #262626 1px, transparent 1px), linear-gradient(to bottom, #262626 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.5
          }}></div>

          {/* Header area with Close button */}
          <div className="h-16 w-full flex items-center justify-between px-4 border-b border-neutral-800 relative z-10 bg-[#0a0a0a]">
            <span className="font-sans text-xs font-black tracking-tighter uppercase text-[#ededed] leading-none">
              NICO LOPERENA
            </span>
            <button 
              onClick={onClose}
              className="font-mono text-[10px] font-bold tracking-widest text-neutral-500 hover:text-white transition-colors duration-300 uppercase flex items-center gap-2 group h-full px-2 cursor-pointer"
            >
              Close
              <span className="text-lg leading-none -mt-0.5 group-hover:rotate-90 transition-transform duration-300">[ X ]</span>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 flex flex-col justify-center px-8 relative z-10">
            <nav className="flex flex-col gap-8">
              <motion.a 
                href="/work" 
                onClick={onClose}
                variants={itemVariants}
                className="font-sans text-5xl sm:text-6xl font-black uppercase tracking-tighter text-[#ededed] hover:text-[#C4A484] transition-colors"
              >
                Work
              </motion.a>
              <motion.a 
                href="/about" 
                onClick={onClose}
                variants={itemVariants}
                className="font-sans text-5xl sm:text-6xl font-black uppercase tracking-tighter text-[#ededed] hover:text-[#C4A484] transition-colors"
              >
                About
              </motion.a>
              <motion.button 
                onClick={handleSkillsClick}
                variants={itemVariants}
                className="text-left font-sans text-5xl sm:text-6xl font-black uppercase tracking-tighter text-[#ededed] hover:text-[#C4A484] transition-colors bg-transparent border-none outline-none cursor-pointer"
              >
                Skills
              </motion.button>
            </nav>
          </div>

          {/* Footer CTA */}
          <motion.div variants={itemVariants} className="w-full relative z-10 border-t border-neutral-800 bg-[#0a0a0a]">
            <button 
              onClick={handleContactClick}
              className="w-full h-20 bg-[#ededed] text-[#0a0a0a] hover:bg-white transition-colors duration-0 flex items-center justify-between px-8 group border-none outline-none cursor-pointer"
            >
              <span className="font-mono text-xs font-bold uppercase tracking-widest">
                LET'S TALK
              </span>
              <span className="font-mono text-xl group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300">
                ↗
              </span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
