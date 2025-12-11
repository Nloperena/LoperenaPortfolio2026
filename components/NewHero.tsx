'use client'

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
// import ServicesDrawer from '@/components/ServicesDrawer'; // Temporarily disabled for redesign
import { ArrowRight, ArrowDown, Layers } from 'lucide-react';

const NewHero = React.memo(() => {
  // const [isServicesDrawerOpen, setIsServicesDrawerOpen] = useState(false); // Temporarily disabled
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
      className="relative min-h-[60vh] flex flex-col pt-32 md:pt-0 justify-center bg-[#F2F0E6] bg-paper-grain overflow-hidden text-[#0A1F1C] border-b double-line border-[#0A1F1C]/30"
      style={{ borderStyle: 'double', borderWidth: '3px', borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}
    >
      {/* Swiss Grid Lines - Hero Specific */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Vertical Center Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#0A1F1C]/10 hidden md:block" />
        {/* Horizontal Grid Line - Top Third */}
        <div className="absolute left-0 right-0 top-1/3 h-px bg-[#0A1F1C]/10" />
        {/* Horizontal Grid Line - Bottom Third */}
        <div className="absolute left-0 right-0 bottom-1/3 h-px bg-[#0A1F1C]/10" />
        {/* Left Margin Line */}
        <div className="absolute left-6 md:left-12 top-0 bottom-0 w-px bg-[#0A1F1C]/10" />
        {/* Right Margin Line */}
        <div className="absolute right-6 md:right-12 top-0 bottom-0 w-px bg-[#0A1F1C]/10" />
      </div>

      {/* Oak and Tree Decorative Background - Above texture, visible */}
      <div className="absolute inset-0 pointer-events-none overflow-visible" style={{ zIndex: 1 }}>
        <div 
          className="absolute right-0 bottom-0"
          style={{
            width: '55vw',
            height: '120vh',
            transform: 'translateX(0%) translateY(050%) scaleX(-1) scale(1.05)',
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
              filter: 'brightness(0.4) contrast(0.9) sepia(0.4)',
              mixBlendMode: 'multiply',
              opacity: 0.15,
              objectPosition: 'bottom right',
            }}
            loading="eager"
          />
        </div>
      </div>

      {/* Dynamic Overlay Text - 'LIVE + DEVELOPER + ARCHITECT' style */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none opacity-[0.03]">
        <div className="transform -rotate-12 whitespace-nowrap text-[15vw] md:text-[12vw] font-black uppercase tracking-tighter text-[#0A1F1C]/5 flex gap-8">
          <span>BUILD</span>
          <span className="text-[#B87333]">+</span>
          <span>LEGACY</span>
          <span className="text-[#B87333]">+</span>
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
              className="text-[10vw] xl:text-[11vw] leading-[0.8] font-serif font-bold tracking-tighter text-[#0A1F1C] w-full ink-bleed"
            >
              BUILDING <br className="md:hidden" />
              DIGITAL <br className="md:hidden" />
              <span className="italic text-[#0A1F1C]/80 block md:inline font-light">LEGACIES</span>
            </motion.h1>
            
            {/* Identity Line - Bold & Visible */}
            <motion.div
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, delay: 0.3 }}
               className="mt-6 md:mt-8 flex items-center gap-4"
            >
               <div className="h-1 w-12 bg-[#B87333]" />
               <span className="text-xl md:text-2xl font-mono text-[#0A1F1C] font-bold tracking-tight">
                 Nicholas (Nico) Loperena — Digital Architect
               </span>
            </motion.div>
          </div>

          {/* Bottom Controls Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 md:pt-12 border-t border-[#0A1F1C]/20 mt-8 md:mt-12">
            
            {/* Left: Narrative */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-6"
            >
               <p className="text-xl md:text-2xl lg:text-3xl text-[#0A1F1C]/90 font-serif font-normal leading-[1.6] max-w-xl italic">
                 I develop high-conversion websites and systems for brands focused on building trust and driving growth.
               </p>
               
               <div className="flex flex-wrap gap-4 mt-8">
                  <button
                    onClick={scrollToProjects}
                    className="group flex items-center gap-2 px-8 py-4 bg-[#0A1F1C] text-[#F2F0E6] font-serif font-bold uppercase tracking-widest hover:bg-[#B87333] hover:text-white transition-all duration-300"
                  >
                    <span>View Case Studies</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <a
                    href="https://calendly.com/YOUR_USERNAME" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-8 py-4 border-2 border-[#0A1F1C]/30 text-[#0A1F1C] font-serif font-medium uppercase tracking-widest hover:border-[#0A1F1C] hover:bg-[#0A1F1C]/10 transition-all duration-300"
                  >
                    <span>Explore Services / Schedule a Consultation</span>
                  </a>
               </div>
            </motion.div>

            {/* Right: Technical Data / Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="md:pl-12 md:border-l border-[#0A1F1C]/20 flex flex-col justify-between"
            >
               <div className="relative">
                 <p className="text-lg text-[#0A1F1C]/60 italic font-serif mb-8 pl-8 border-l border-[#B87333]/50">
                   &quot;With a family history in engineering dating back to 1065, I apply those principles to modern digital infrastructure.&quot;
                 </p>
               </div>
               
               <div className="flex items-center justify-between text-xs font-mono text-[#0A1F1C]/40 uppercase tracking-widest bg-[#0A1F1C]/5 p-4 rounded-sm border border-[#0A1F1C]/10">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#B87333] rounded-full animate-pulse"></span>
                    Available for Q1 2025
                  </span>
                  <span>REF: 1065-2025</span>
               </div>
            </motion.div>

          </div>

        </div>

      </motion.div>

      {/* Services Drawer - Temporarily disabled for redesign */}
      {/* <ServicesDrawer 
        isOpen={isServicesDrawerOpen} 
        onClose={() => setIsServicesDrawerOpen(false)}
        onOpen={() => setIsServicesDrawerOpen(true)}
      /> */}
    </section>
  );
});

NewHero.displayName = 'NewHero';

export default NewHero;
