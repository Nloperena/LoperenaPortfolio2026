'use client'

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Globe } from 'lucide-react';

interface VITOPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VITOPromptModal: React.FC<VITOPromptModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleVisit = () => {
    window.open('https://shop.vitofryfilter.com', '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#F5F5DC] dark:bg-[#0A1F1C] border-2 border-[#1C1B1A] dark:border-white/20 shadow-[8px_8px_0px_0px_rgba(28,27,26,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] max-w-lg w-full relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-[#1C1B1A]/10 dark:hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-[#1C1B1A] dark:text-white" />
              </button>

              {/* Content */}
              <div className="p-8 md:p-12">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-px w-8 bg-[#E2725B]"></span>
                    <span className="font-mono text-xs text-[#E2725B] uppercase tracking-widest">VITO Fryfilter</span>
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl text-[#1C1B1A] dark:text-white mb-4">
                    Visit Live Site
                  </h2>
                  <p className="font-sans text-base text-[#1C1B1A]/80 dark:text-white/80 leading-relaxed">
                    Explore the digital transformation in action. See the e-commerce platform, dual-market positioning, and the systems that drove <strong className="text-[#E2725B]">285% traffic growth</strong>.
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 p-4 bg-[#F9F5F1] dark:bg-[#1a1a1a] border border-[#1C1B1A]/10 dark:border-white/10">
                    <Globe className="w-5 h-5 text-[#E2725B] flex-shrink-0" />
                    <div>
                      <div className="font-mono text-xs text-[#1C1B1A]/60 dark:text-white/60 uppercase tracking-widest mb-1">Live Website</div>
                      <div className="font-sans text-sm text-[#1C1B1A] dark:text-white font-medium">shop.vitofryfilter.com</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleVisit}
                    className="flex-1 group flex items-center justify-center gap-2 px-6 py-3 bg-[#1C1B1A] dark:bg-white text-[#F5F5DC] dark:text-[#0A1F1C] font-mono text-xs uppercase tracking-widest hover:bg-[#E2725B] dark:hover:bg-[#E2725B] hover:text-white dark:hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(28,27,26,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 border border-[#1C1B1A]/20 dark:border-white/20 text-[#1C1B1A] dark:text-white font-mono text-xs uppercase tracking-widest hover:border-[#E2725B] hover:text-[#E2725B] transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default VITOPromptModal;




