'use client'

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ServicesDrawer from '@/components/ServicesDrawer';
import { ArrowRight, ArrowDown, Layers } from 'lucide-react';

const NewHero = React.memo(() => {
  const [isServicesDrawerOpen, setIsServicesDrawerOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('selected-works');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex flex-col pt-32 md:pt-0 justify-center bg-[#0A1F1C] overflow-hidden text-white border-b border-white/20"
    >
      {/* Swiss Grid Lines - Hero Specific */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Vertical Center Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20 hidden md:block" />
        {/* Horizontal Grid Line - Top Third */}
        <div className="absolute left-0 right-0 top-1/3 h-px bg-white/20" />
        {/* Horizontal Grid Line - Bottom Third */}
        <div className="absolute left-0 right-0 bottom-1/3 h-px bg-white/20" />
        {/* Left Margin Line */}
        <div className="absolute left-6 md:left-12 top-0 bottom-0 w-px bg-white/20" />
        {/* Right Margin Line */}
        <div className="absolute right-6 md:right-12 top-0 bottom-0 w-px bg-white/20" />
      </div>

      {/* Oak and Tree Decorative Background - Larger Than Life, Rooted */}
      <div className="absolute inset-0 pointer-events-none overflow-visible" style={{ zIndex: 0 }}>
        <div 
          className="absolute right-0 bottom-0"
          style={{
            width: '55vw',
            height: '120vh',
            transform: 'translateX(0%) scaleX(-1) scale(1.05)',
            minWidth: '1200px',
            minHeight: '1800px',
          }}
        >
          <img
            src="/oakandtree.svg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-contain"
            style={{ 
              filter: 'brightness(0) invert(1)',
              mixBlendMode: 'soft-light',
              opacity: 0.08,
              objectPosition: 'bottom right',
            }}
            loading="eager"
          />
        </div>
      </div>

      {/* Dynamic Overlay Text - 'LIVE + DEVELOPER + ARCHITECT' style */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none opacity-[0.03]">
        <div className="transform -rotate-12 whitespace-nowrap text-[15vw] md:text-[12vw] font-black uppercase tracking-tighter text-white flex gap-8">
          <span>BUILD</span>
          <span className="text-[#E2725B]">+</span>
          <span>LEGACY</span>
          <span className="text-[#E2725B]">+</span>
          <span>SYSTEMS</span>
        </div>
      </div>

      {/* Content Container with backdrop blur layer for headline clarity */}
      <div className="absolute inset-0 pointer-events-none z-[5]" style={{ backdropFilter: 'blur(0.5px)' }}></div>

      {/* Content Container */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-[90%] mx-auto grid grid-cols-1 items-center"
      >
        
        <div className="space-y-8 text-center md:text-left">
          {/* Headline - BOLD & HIGH CONTRAST */}
          <div className="relative w-full">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10vw] xl:text-[11vw] leading-[0.8] font-serif font-bold tracking-tighter text-white mix-blend-difference w-full"
            >
              BUILDING <br className="md:hidden" />
              DIGITAL <br className="md:hidden" />
              <span className="italic text-white/80 block md:inline font-light">LEGACIES</span>
            </motion.h1>
            
            {/* Identity Line - Bold & Visible */}
            <motion.div
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, delay: 0.3 }}
               className="mt-6 md:mt-8 flex items-center gap-4"
            >
               <div className="h-1 w-12 bg-[#E2725B]" />
               <span className="text-xl md:text-2xl font-mono text-white font-bold tracking-tight">
                 Nicholas (Nico) Loperena — Digital Architect
               </span>
            </motion.div>
          </div>

          {/* Bottom Controls Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 md:pt-12 border-t border-white/20 mt-8 md:mt-12">
            
            {/* Left: Narrative */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-6"
            >
               <p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-sans font-light leading-[1.6] max-w-xl">
                 I build high-converting websites + systems for brands that need trust and growth.
               </p>
               
               <div className="flex flex-wrap gap-4 mt-8">
                  <button
                    onClick={scrollToProjects}
                    className="group flex items-center gap-2 px-8 py-4 bg-[#E2725B] text-white font-bold uppercase tracking-widest hover:bg-white hover:text-[#0A1F1C] transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none"
                  >
                    <span>View Case Studies</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <a
                    href="https://calendly.com/YOUR_USERNAME" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-medium uppercase tracking-widest hover:border-white hover:bg-white/10 transition-all duration-300"
                  >
                    <span>Explore Services / Book a Call</span>
                  </a>
               </div>
            </motion.div>

            {/* Right: Technical Data / Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="md:pl-12 md:border-l border-white/20 flex flex-col justify-between"
            >
               <div className="relative">
                 <p className="text-lg text-white/60 italic font-serif mb-8 pl-8 border-l border-[#E2725B]/50">
                   &quot;My family has engineered structures since 1065—today, I build yours in code.&quot;
                 </p>
               </div>
               
               <div className="flex items-center justify-between text-xs font-mono text-white/40 uppercase tracking-widest bg-white/5 p-4 rounded-sm border border-white/10">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#E2725B] rounded-full animate-pulse"></span>
                    Available for Q1 2025
                  </span>
                  <span>REF: 1065-2025</span>
               </div>
            </motion.div>

          </div>

        </div>

      </motion.div>

      {/* Services Drawer */}
      <ServicesDrawer 
        isOpen={isServicesDrawerOpen} 
        onClose={() => setIsServicesDrawerOpen(false)}
        onOpen={() => setIsServicesDrawerOpen(true)}
      />
    </section>
  );
});

NewHero.displayName = 'NewHero';

export default NewHero;
