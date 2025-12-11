'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CurvedLoop from './CurvedLoop';
import TiltCard from '@/components/TiltCard';
import AnimatedSVG from '@/components/AnimatedSVG';
import LineageDrawer from '@/components/LineageDrawer';
import { Castle, Hammer, Cpu, MapPin, BookOpen, ChevronRight } from 'lucide-react';

const TimelineItem = ({ year, title, description, icon: Icon, isOpen, onClick }: any) => {
  return (
    <motion.div 
      className={`cursor-pointer border-l-2 pl-6 py-4 transition-all duration-300 relative group ${isOpen ? 'border-[#B87333] bg-[#F5F5DC] dark:bg-[#1a1a1a] shadow-sm' : 'border-[#1C1B1A]/20 dark:border-white/20 hover:border-[#B87333]/50'}`}
      onClick={onClick}
      onMouseEnter={onClick}
      role="button"
      aria-expanded={isOpen}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
    >
      <div className={`absolute -left-[9px] top-6 w-4 h-4 rounded-full border-2 transition-all duration-300 bg-[#F5F5DC] dark:bg-[#0A1F1C] group-hover:scale-110 ${isOpen ? 'border-[#B87333] bg-[#B87333] scale-110' : 'border-[#1C1B1A]/40 dark:border-white/40 group-hover:border-[#B87333]'}`} />
      
      <div className="flex items-center gap-3 mb-2">
         <span className={`font-mono text-sm font-bold transition-colors duration-300 ${isOpen ? 'text-[#B87333]' : 'text-[#1C1B1A]/50 dark:text-white/50 group-hover:text-[#B87333]'}`}>{year}</span>
         <h4 className={`font-serif text-lg transition-colors duration-300 ${isOpen ? 'text-[#111111] dark:text-white font-bold' : 'text-[#111111]/70 dark:text-white/70 group-hover:text-[#111111] dark:group-hover:text-white'}`}>{title}</h4>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-[#111111] dark:text-white/80 leading-relaxed pt-2 font-serif max-w-prose border-t double-line border-[#B87333]/20 mt-2" style={{ borderStyle: 'double', borderWidth: '3px', borderLeft: 'none', borderRight: 'none', borderBottom: 'none' }}>
              {description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const AboutMeSection = () => {
  const [openTimelineIndex, setOpenTimelineIndex] = useState(0);
  const [isLineageDrawerOpen, setIsLineageDrawerOpen] = useState(false);

  const timelineData = [
    {
      year: '1065',
      title: 'Foundation in Spain',
      description: '',
      icon: Castle
    },
    {
      year: '1836',
      title: 'Expansion to Puerto Rico',
      description: 'Family projects extend to the Americas, adapting craftsmanship to new contexts and supporting community infrastructure.',
      icon: Hammer
    },
    {
      year: '2024',
      title: 'Digital Architecture in Florida',
      description: '',
      icon: Cpu
    }
  ];

  return (
    <section
      aria-label="About Me"
      className="bg-[#F2F0E6] dark:bg-[#0A1F1C] py-24 relative overflow-hidden border-b double-line border-[#111111] dark:border-white/20 transition-colors duration-300" style={{ borderStyle: 'double', borderWidth: '3px', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Clean Container - No overlapping textures */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-[#F2F0E6] border-3 border-[#111111] p-8 md:p-12" style={{ borderStyle: 'double' }}
        >
          {/* Header Section - Centered Above All Columns */}
          <div className="text-center mb-12">
            <div className="font-mono text-xs uppercase tracking-widest text-[#111111]/60 mb-4">
              HERITAGE & APPROACH
            </div>
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-[#111111] mb-8 leading-tight">
              FROM FOUNDATIONS<br/>
              TO FRAMEWORKS
            </h2>
          </div>

          {/* The Hook - New Quote Spanning Full Width */}
          <div className="max-w-4xl mx-auto border-t border-b border-[#111111]/20 py-6 mb-12">
            <p className="font-serif text-xl md:text-2xl italic text-[#111111] text-center">
              &quot;I create digital infrastructure that instills confidence in your clients: a brand they can rely on.&quot;
            </p>
          </div>

          {/* Central Pillar Layout - 3 Columns with SVG as Spine */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 mb-12">
            {/* Column 1: Left Text */}
            <div className="space-y-6">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg leading-relaxed text-[#111111] font-serif text-justify">
                  <span className="drop-cap">S</span>tarting in IT support and marketing, I observed frequent misalignments between technical implementation and business objectives. This led me to shift toward architecture, designing systems that not only function but also scale effectively.
                </p>
                <p className="text-lg leading-relaxed text-[#111111] font-serif text-justify">
                  Today, I partner with teams to develop digital solutions that address complex challenges and support revenue expansion, with every element of code aligned to strategic goals.
                </p>
              </div>
            </div>

            {/* Column 2: Central Pillar - Wolf & Tree SVG */}
            <div className="flex flex-col items-center justify-center px-4 lg:px-8">
              <div className="w-full max-w-xs aspect-square relative">
                <AnimatedSVG 
                  src="/oakandtree.svg"
                  alt="Wolf and Tree - Basque House Symbol, Royal Militia"
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Column 3: Right Text */}
            <div className="space-y-6">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg leading-relaxed text-[#111111] font-serif text-justify">
                  The core values of precision, durability, and purpose—drawn from my heritage—guide each project, creating work that endures.
                </p>
                <p className="text-lg leading-relaxed text-[#111111] font-serif text-justify">
                  Our Basque roots, symbolized by the wolf and tree, reflect a commitment to building for the long term, a tradition that informs my approach.
                </p>
              </div>

              {/* Signature */}
              <div className="flex items-end justify-start gap-4 pt-6 border-t border-[#111111]/20">
                <div className="portrait-seal">
                  <img
                    src="https://media.licdn.com/dms/image/v2/D4E03AQGkyoWF6XLw_Q/profile-displayphoto-crop_800_800/B4EZk5boiUIkAI-/0/1757605170745?e=1766016000&v=beta&t=XEIsEA_StFtjNsLyD2AtWnPSUM6Y90ytJpfJW11TGLU"
                    alt="Nicholas Loperena"
                  />
                </div>
                <div className="text-left">
                  <div className="font-serif text-xl font-bold text-[#111111] mb-1">Nicholas Loperena</div>
                  <div className="font-mono text-xs uppercase tracking-widest text-[#111111]/60">Digital Architect</div>
                </div>
              </div>
            </div>
          </div>

          {/* Family Seal - Below the 3-Column Layout */}
          <div className="flex justify-center mb-12">
            <div className="w-full max-w-md aspect-square relative border-3 border-[#B87333] p-8 bg-[#F2F0E6]" style={{ borderStyle: 'double' }}>
              <img
                src="/family-crest-illustration.png"
                alt="Loperena Family Seal - Est. 1065"
                className="w-full h-full object-contain"
              />
              <div className="absolute -bottom-8 left-0 right-0 text-center">
                <p className="font-mono text-xs uppercase tracking-widest text-[#111111]/60 mb-1">Family Seal — Est. 1065</p>
              </div>
            </div>
          </div>

          {/* Lineage Project - Featured Callout */}
          <div className="mt-16 p-8 border-3 border-[#B87333] bg-[#B87333]/5 relative" style={{ borderStyle: 'double' }}>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 items-center">
              <div className="text-center lg:text-left">
                <div className="inline-block mb-4">
                  <button
                    onClick={() => setIsLineageDrawerOpen(true)}
                    className="group flex items-center gap-3 px-6 py-4 border-2 border-[#B87333] bg-[#B87333]/10 hover:bg-[#B87333]/20 transition-all duration-300 font-mono text-sm uppercase tracking-widest text-[#111111]"
                    aria-label="View Full Lineage"
                  >
                    <BookOpen className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span>Explore the Lineage</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                <p className="font-mono text-xs text-[#111111]/60 uppercase tracking-widest">
                  A Digital Legacy Project
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#111111] mb-3">
                  The Loperena Lineage — Digitally Archived
                </h3>
                <p className="text-base leading-relaxed text-[#111111] font-serif">
                  For the first time, our family lineage is fully documented online, ensuring its preservation for future generations. This initiative pays tribute to our ancestors, from Basque origins where we served as royal militia under the wolf and tree emblem, to the present.
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="border-t double-line border-[#111111] dark:border-white/20 p-8 mt-12" style={{ borderStyle: 'double', borderWidth: '3px', borderLeft: 'none', borderRight: 'none', borderBottom: 'none' }}>
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#1C1B1A]/60 dark:text-white/60 mb-8 flex items-center gap-2">
              The Builder&apos;s Timeline
            </h3>
            <div className="space-y-2">
              {timelineData.map((item, index) => (
                <TimelineItem 
                  key={index}
                  {...item}
                  isOpen={openTimelineIndex === index}
                  onClick={() => setOpenTimelineIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Personal Insight */}
          <div className="pt-8 border-t border-[#1C1B1A]/10 dark:border-white/10 mt-8">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#B87333] mb-4">Beyond Code</h4>
            <p className="text-base text-[#111111] dark:text-white/80 leading-relaxed font-serif italic">
              &quot;When not developing systems, I restore vintage machinery or study architectural history. Understanding enduring designs informs my engineering practice.&quot;
            </p>
          </div>
        </motion.div>
      </div>

      {/* Lineage Drawer */}
      <LineageDrawer 
        isOpen={isLineageDrawerOpen} 
        onClose={() => setIsLineageDrawerOpen(false)}
        onOpen={() => setIsLineageDrawerOpen(true)}
      />
    </section>
  );
};

export default AboutMeSection;
