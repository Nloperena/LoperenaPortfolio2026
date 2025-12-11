'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft } from 'lucide-react';

interface CaseStudyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: string;
    title: string;
    role: string;
    year: string;
    outcome: string;
    challenge: string;
    craft: string;
    result: string;
    abstract?: string;
    image?: string;
    embedUrl?: string;
  } | null;
}

const CaseStudyDrawer: React.FC<CaseStudyDrawerProps> = ({ isOpen, onClose, project }) => {
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

  if (!project) return null;

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

      {/* Paper Drawer - Slides from right */}
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
            aria-labelledby="case-study-title"
          >
            {/* Paper Container - Old World Style */}
            <div className="h-full bg-[#F2F0E6] bg-paper-grain relative overflow-y-auto border-l-4 border-[#B87333] shadow-2xl">

              {/* Header - Document Header */}
              <div className="sticky top-0 z-10 bg-[#F2F0E6] border-b-3 border-[#111111] p-6" style={{ borderStyle: 'double', borderWidth: '3px', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleClose}
                      className="p-2 hover:bg-[#111111]/10 rounded-full transition-colors border border-[#111111]/20"
                      aria-label="Close drawer"
                    >
                      <ArrowLeft className="w-5 h-5 text-[#111111]" />
                    </button>
                    <div>
                      <h2 
                        id="case-study-title"
                        className="font-serif text-2xl font-bold text-[#111111] ink-bleed"
                      >
                        {project.title}
                      </h2>
                      <p className="font-mono text-xs text-[#111111]/60 uppercase tracking-widest mt-1">
                        {project.role} | {project.year}
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

              {/* Content - Case Study Details */}
              <div className="relative z-10 p-8 md:p-12 max-w-5xl mx-auto">
                {/* Decorative Corner Flourish - Top Left */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#B87333] z-20 pointer-events-none" />
                
                {/* Decorative Corner Flourish - Bottom Right */}
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#B87333] z-20 pointer-events-none" />

                {/* VITO Special Format - Industrial Report Style */}
                {project.id === 'vito-shop' ? (
                  <div className="space-y-8">
                    {/* The Abstract */}
                    <div className="pb-8 border-b border-[#1C1B1A]/20">
                      <div className="font-mono text-xs uppercase tracking-widest text-[#111111]/60 mb-3">I. THE ABSTRACT</div>
                      <p className="font-serif text-lg text-[#111111] leading-relaxed text-justify">{project.abstract}</p>
                    </div>

                    {/* The Friction */}
                    <div className="pb-8 border-b border-[#1C1B1A]/20">
                      <div className="font-mono text-xs uppercase tracking-widest text-[#B87333] mb-3">II. THE FRICTION</div>
                      <p className="font-serif text-base text-[#111111] leading-relaxed text-justify">{project.challenge}</p>
                    </div>

                    {/* The Architecture */}
                    <div className="pb-8 border-b border-[#1C1B1A]/20">
                      <div className="font-mono text-xs uppercase tracking-widest text-[#006400] mb-3">III. THE ARCHITECTURE</div>
                      <p className="font-serif text-base text-[#111111] leading-relaxed text-justify">{project.craft}</p>
                    </div>

                    {/* The Yield */}
                    <div>
                      <div className="font-mono text-xs uppercase tracking-widest text-[#800000] mb-3">IV. THE YIELD</div>
                      <p className="font-serif text-2xl font-bold text-[#111111] leading-tight mb-4">
                        {project.outcome}
                      </p>
                      <p className="font-serif text-base text-[#111111] leading-relaxed text-justify">{project.result}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Outcome */}
                    <div className="pb-8 border-b border-[#1C1B1A]/20">
                      <p className="font-serif text-3xl font-bold text-[#111111] leading-tight">
                        {project.outcome}
                      </p>
                    </div>

                    {/* Challenge */}
                    <div className="pb-8 border-b border-[#1C1B1A]/20">
                      <div className="font-mono text-xs uppercase tracking-widest text-[#B87333] mb-3">Challenge</div>
                      <p className="font-serif text-base text-[#111111] leading-relaxed text-justify">{project.challenge}</p>
                    </div>

                    {/* Craft */}
                    <div className="pb-8 border-b border-[#1C1B1A]/20">
                      <div className="font-mono text-xs uppercase tracking-widest text-[#006400] mb-3">Craft</div>
                      <p className="font-serif text-base text-[#111111] leading-relaxed text-justify">{project.craft}</p>
                    </div>

                    {/* Result */}
                    <div>
                      <div className="font-mono text-xs uppercase tracking-widest text-[#800000] mb-3">Result</div>
                      <p className="font-serif text-base text-[#111111] leading-relaxed text-justify">{project.result}</p>
                    </div>
                  </div>
                )}

                {/* Project Image/Preview */}
                {project.image && (
                  <div className="mt-12 pt-8 border-t border-[#1C1B1A]/20">
                    <div className="w-full aspect-video relative border-2 border-[#111111]/20 p-4 bg-white">
                      <img
                        src={project.image}
                        alt={`${project.title} - Project Preview`}
                        className="w-full h-full object-contain portfolio-image"
                        style={{
                          filter: 'sepia(0.8) grayscale(0.2)',
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Live Preview iframe */}
                {project.embedUrl && (
                  <div className="mt-12 pt-8 border-t border-[#1C1B1A]/20">
                    <div className="w-full aspect-video relative border-2 border-[#111111]/20 bg-white">
                      <iframe
                        src={project.embedUrl}
                        className="w-full h-full border-0"
                        title={`${project.title} - Live Preview`}
                        allow="fullscreen"
                        style={{
                          filter: 'sepia(5%) contrast(1.05)',
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Footer - Document Footer */}
              <div className="sticky bottom-0 bg-[#F2F0E6] border-t-2 border-[#111111]/20 p-4 z-10">
                <div className="flex items-center justify-between text-xs font-mono text-[#111111]/60 max-w-5xl mx-auto">
                  <span>REF: {project.id.toUpperCase()}-{project.year}</span>
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

export default CaseStudyDrawer;

