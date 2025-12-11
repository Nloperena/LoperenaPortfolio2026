'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, ChevronRight } from 'lucide-react';

interface LineageDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const LineageDrawer: React.FC<LineageDrawerProps> = ({ isOpen, onClose, onOpen }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClose = React.useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      onClose();
      setIsAnimating(false);
    }, 300);
  }, [onClose]);

  // Close on Escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleClose]);

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Drawer - Styled as Old World Paper/Document */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-4xl z-50 pointer-events-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lineage-drawer-title"
          >
            {/* Paper Container - Old World Style */}
            <div className="h-full bg-[#E8E4D8] bg-paper-grain relative overflow-hidden border-l-4 border-[#B87333] shadow-2xl">

              {/* Header - Old World Document Header */}
              <div className="relative z-10 bg-[#E8E4D8] border-b-3 border-[#111111] p-6" style={{ borderStyle: 'double', borderWidth: '3px', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#B87333]/20 flex items-center justify-center border-2 border-[#B87333]">
                      <BookOpen className="w-6 h-6 text-[#B87333]" />
                    </div>
                    <div>
                      <h2 
                        id="lineage-drawer-title"
                        className="font-serif text-2xl font-bold text-[#111111] ink-bleed"
                      >
                        The Loperena Lineage
                      </h2>
                      <p className="font-mono text-xs text-[#111111]/60 uppercase tracking-widest mt-1">
                        Est. 1065 — Nine Generations
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-2 hover:bg-[#111111]/10 rounded-full transition-colors border-2 border-[#111111]/20"
                    aria-label="Close drawer"
                  >
                    <X className="w-5 h-5 text-[#111111]" />
                  </button>
                </div>
              </div>

              {/* Content - Iframe Container */}
              <div className="relative h-[calc(100%-100px)] overflow-hidden">
                {/* Decorative Corner Flourish - Top Left */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#B87333] z-20 pointer-events-none" />
                
                {/* Decorative Corner Flourish - Bottom Right */}
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#B87333] z-20 pointer-events-none" />

                {/* Iframe - Embedded Lineage Site */}
                <iframe
                  src="https://loperena-lineage.vercel.app"
                  className="w-full h-full border-0"
                  title="Loperena Family Lineage"
                  allow="fullscreen"
                  style={{
                    filter: 'sepia(5%) contrast(1.05)',
                  }}
                />
              </div>

              {/* Footer - Document Footer */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#E8E4D8] border-t-2 border-[#111111]/20 p-4 z-10">
                <div className="flex items-center justify-between text-xs font-mono text-[#111111]/60">
                  <span>REF: LINEAGE-1065-2025</span>
                  <span>Press ESC to close</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LineageDrawer;

