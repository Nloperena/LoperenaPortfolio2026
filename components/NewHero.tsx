'use client'

import React, { useMemo, useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import FaultyTerminal from '@/components/FaultyTerminal';
import ServicesDrawer from '@/components/ServicesDrawer';
import GradualBlur from '@/components/GradualBlur';

const NewHero = React.memo(() => {
  const [isInView, setIsInView] = useState(false);
  const [isServicesDrawerOpen, setIsServicesDrawerOpen] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [isBackgroundReady, setIsBackgroundReady] = useState(false);
  const [showFaultyTerminal, setShowFaultyTerminal] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects-section');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Optimize DPR based on device capabilities
  const optimizedDPR = useMemo(() => {
    if (typeof window === 'undefined') return 1;
    // Cap DPR at 1.5 for better performance (instead of 2)
    return Math.min(window.devicePixelRatio || 1, 1.5);
  }, []);

  // Intersection Observer to detect when hero is in view
  useEffect(() => {
    let hasStarted = false;

    // Helper function to start loading sequence
    const startLoadingSequence = () => {
      if (hasStarted) return;
      hasStarted = true;
      
      // Show black skeleton first
      setShowSkeleton(true);
      // Start background fade after a brief delay
      setTimeout(() => {
        setIsBackgroundReady(true);
        // Show FaultyTerminal after fade completes
        setTimeout(() => {
          setShowFaultyTerminal(true);
        }, 700); // After fade duration (700ms)
      }, 300); // Brief delay to show black first (300ms)
    };

    // Check if already in view on mount (e.g., hero is at top of page)
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (isVisible) {
        setIsInView(true);
        startLoadingSequence();
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            startLoadingSequence();
          } else {
            setIsInView(false);
            hasStarted = false;
            // Reset states when out of view
            setShowSkeleton(false);
            setIsBackgroundReady(false);
            setShowFaultyTerminal(false);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '50px', // Start loading slightly before it comes into view
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative h-[calc(100vh-200px)] min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      {/* Fallback background gradient - always visible */}
      <div className="absolute inset-0 bg-[#1a4d3a]" style={{ zIndex: 0 }} />
      
      {/* Black skeleton loading state - fades to background */}
      {showSkeleton && (
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-700 ease-out ${
            isBackgroundReady ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ zIndex: 1 }}
        />
      )}

      {/* FaultyTerminal Background - Only render after fade completes */}
      {showFaultyTerminal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute inset-0 pointer-events-none will-change-contents"
          style={{ zIndex: 2 }}
        >
          <div className="w-full h-full pointer-events-auto">
            <FaultyTerminal
              scale={2.6}
              gridMul={[2, 1]}
              digitSize={1.2}
              timeScale={0.7}
              pause={false}
              scanlineIntensity={0.6}
              glitchAmount={0.8}
              flickerAmount={0.7}
              noiseAmp={0.8}
              chromaticAberration={0}
              dither={0}
              curvature={0}
              tint="#1a4d3a"
              mouseReact={true}
              mouseStrength={1.2}
              dpr={optimizedDPR}
              pageLoadAnimation={false}
              brightness={0.8}
            />
          </div>
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        </motion.div>
      )}

      {/* Content Overlay - Left Aligned */}
      <div className="relative z-10 px-8 md:px-12 lg:px-16 xl:px-20 max-w-7xl mx-auto h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-left"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-2 leading-tight">
            NICHOLAS LOPERENA
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-2 font-light uppercase tracking-wide">
            DIGITAL ARCHITECT
          </p>
          <p className="text-base md:text-lg lg:text-xl text-white/80 mb-10 font-light uppercase tracking-wide">
            PORTFOLIO & CASE STUDIES
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToProjects}
              className="bg-[#F2611D] text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-[#ff7a3d] transition-colors shadow-lg will-change-transform"
            >
              View Case Studies
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsServicesDrawerOpen(true)}
              className="bg-transparent text-white px-8 py-4 rounded-md font-semibold text-lg border-2 border-white hover:bg-white/10 transition-colors will-change-transform"
            >
              Explore Services <span aria-hidden="true" className="inline-block ml-2">→</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* GradualBlur effect at bottom - fades content into next section */}
      <GradualBlur
        target="parent"
        position="bottom"
        height="8rem"
        strength={2}
        divCount={6}
        curve="bezier"
        exponential={false}
        opacity={1}
      />

      {/* Services Drawer */}
      <ServicesDrawer 
        isOpen={isServicesDrawerOpen} 
        onClose={() => setIsServicesDrawerOpen(false)} 
      />
    </section>
  );
});

NewHero.displayName = 'NewHero';

export default NewHero;

