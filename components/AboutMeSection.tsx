'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CurvedLoop from './CurvedLoop';
import TiltCard from '@/components/TiltCard';
import { Castle, Hammer, Cpu, MapPin } from 'lucide-react';

const TimelineItem = ({ year, title, description, icon: Icon, isOpen, onClick }: any) => {
  return (
    <motion.div 
      className={`cursor-pointer border-l-2 pl-6 py-4 transition-all duration-300 relative group ${isOpen ? 'border-[#E2725B] bg-[#F5F5DC] dark:bg-[#1a1a1a] shadow-sm' : 'border-[#1C1B1A]/20 dark:border-white/20 hover:border-[#E2725B]/50'}`}
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
      <div className={`absolute -left-[9px] top-6 w-4 h-4 rounded-full border-2 transition-all duration-300 bg-[#F5F5DC] dark:bg-[#0A1F1C] group-hover:scale-110 ${isOpen ? 'border-[#E2725B] bg-[#E2725B] scale-110' : 'border-[#1C1B1A]/40 dark:border-white/40 group-hover:border-[#E2725B]'}`} />
      
      <div className="flex items-center gap-3 mb-2">
         <span className={`font-mono text-sm font-bold transition-colors duration-300 ${isOpen ? 'text-[#E2725B]' : 'text-[#1C1B1A]/50 dark:text-white/50 group-hover:text-[#E2725B]'}`}>{year}</span>
         <h4 className={`font-serif text-lg transition-colors duration-300 ${isOpen ? 'text-[#1C1B1A] dark:text-white font-bold' : 'text-[#1C1B1A]/70 dark:text-white/70 group-hover:text-[#1C1B1A] dark:group-hover:text-white'}`}>{title}</h4>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-[#1C1B1A]/80 dark:text-white/80 leading-relaxed pt-2 font-sans max-w-prose border-t border-[#E2725B]/20 mt-2">
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

  const timelineData = [
    {
      year: '1065',
      title: 'The Foundation (Spain)',
      description: 'The Loperena line begins forging enduring works in Northern Spain. Builders by trade, mastering stone and structure to create legacies that withstand centuries.',
      icon: Castle
    },
    {
      year: '1836',
      title: 'New World Expansion (Puerto Rico)',
      description: 'Collateral projects expand to the Americas. The family craftsmanship adapts to new environments, building infrastructure that powers communities.',
      icon: Hammer
    },
    {
      year: '2024',
      title: 'Digital Architecture (Florida)',
      description: 'As a Digital Architect, I apply this 9th-generation legacy to code. Building scalable, high-performance systems that serve as the foundation for modern business growth.',
      icon: Cpu
    }
  ];

  return (
    <section
      aria-label="About Me"
      className="bg-[#F5F5DC] dark:bg-[#0A1F1C] py-24 relative overflow-hidden border-b border-[#1C1B1A] dark:border-white/20 transition-colors duration-300"
    >
      {/* Swiss Grid Lines */}
      <div className="absolute inset-0 pointer-events-none max-w-7xl mx-auto px-6 md:px-12 border-x border-[#1C1B1A]/20 dark:border-white/10">
         <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#1C1B1A]/20 dark:bg-white/10 hidden lg:block" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title - Aligned to Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 border-b border-[#1C1B1A]/20 dark:border-white/10 pb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
             <div>
                <div className="flex items-center gap-4 mb-4">
                   <span className="h-px w-12 bg-[#E2725B]"></span>
                   <span className="font-mono text-sm text-[#E2725B] uppercase tracking-widest">I. Heritage Fusion</span>
                </div>
                <h2 className="text-5xl lg:text-6xl font-serif font-medium text-[#1C1B1A] dark:text-white block text-left leading-tight">
                  From Foundations <br/>
                  <span className="italic">To Frameworks</span>
                </h2>
             </div>
             <div className="lg:pl-12 lg:border-l border-[#1C1B1A]/20 dark:border-white/10">
                <p className="text-xl text-[#1C1B1A]/80 dark:text-white/80 leading-relaxed font-serif italic">
                  &quot;Code without purpose is just noise. I bridge the gap between centuries-old craftsmanship and cutting-edge digital systems.&quot;
                </p>
             </div>
          </div>
        </motion.div>

        {/* Strict Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0">
          
          {/* Left Column - Narrative & Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-12 lg:pr-12"
          >
            <div className="prose prose-lg">
              <p className="text-lg text-[#1C1B1A]/90 dark:text-white/90 leading-[1.8] font-sans font-medium">
                My journey began in the trenches of IT support and marketing, where I saw firsthand how technical execution often failed to align with business strategy. 
                I transitioned from troubleshooting to architecture, driven by a desire to build systems that don't just work, but scale.
                Today, drawing from my lineage, I collaborate with teams to engineer digital solutions that solve complex problems and drive revenue growth, ensuring every line of code serves a larger purpose.
              </p>
            </div>

            {/* Timeline */}
            <div className="bg-[#F9F5F1] dark:bg-[#1a1a1a] border border-[#1C1B1A] dark:border-white/20 p-8 shadow-[4px_4px_0px_0px_rgba(28,27,26,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
               <h3 className="font-mono text-xs uppercase tracking-widest text-[#1C1B1A]/60 dark:text-white/60 mb-8 flex items-center gap-2">
                 The Builder&apos;s Lineage
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
            <div className="pt-8 border-t border-[#1C1B1A]/10 dark:border-white/10">
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#E2725B] mb-4">When I&apos;m Not Coding</h4>
              <p className="text-base text-[#1C1B1A]/80 dark:text-white/80 leading-relaxed font-sans italic">
                &quot;You&apos;ll likely find me restoring vintage machinery or exploring architectural history. There&apos;s something deeply satisfying about understanding how complex systems were built to last—a philosophy I carry directly into my software engineering.&quot;
              </p>
            </div>
          </motion.div>

          {/* Right Column - Family Crest & Photo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:pl-12 lg:border-l border-[#1C1B1A]/20 dark:border-white/10 h-full flex flex-col gap-8"
          >
            {/* Family Crest - Prominent Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full"
            >
              <div className="relative bg-gradient-to-br from-[#F9F5F1] to-[#F5F5DC] dark:from-[#1a1a1a] dark:to-[#0A1F1C] p-8 md:p-12 border-2 border-[#1C1B1A] dark:border-white/20 shadow-[8px_8px_0px_0px_rgba(28,27,26,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E2725B]/5 dark:bg-[#E2725B]/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#006400]/5 dark:bg-[#006400]/10 rounded-full blur-2xl"></div>
                
                <div className="aspect-square w-full max-w-md mx-auto relative z-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E2725B]/10 via-transparent to-[#006400]/10 rounded-full blur-2xl"></div>
                  <div className="relative w-full h-full p-6 bg-white/50 dark:bg-[#1a1a1a]/50 rounded-full border-4 border-[#E2725B]/20 dark:border-[#E2725B]/30 backdrop-blur-sm">
                    <img
                      src="/family-crest-illustration.png"
                      alt="Loperena Family Crest - Est. 1065"
                      className="w-full h-full object-contain drop-shadow-2xl filter"
                      style={{ filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.15))' }}
                    />
                  </div>
                </div>
                <div className="mt-6 text-center border-t-2 border-[#1C1B1A]/20 dark:border-white/20 pt-6 relative z-10">
                  <p className="font-mono text-xs text-[#1C1B1A]/60 dark:text-white/60 uppercase tracking-widest mb-2">Heraldic Seal</p>
                  <p className="font-serif text-xl text-[#1C1B1A] dark:text-white italic font-bold">Est. 1065</p>
                </div>
              </div>
            </motion.div>

            {/* Personal Photo - Compact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative w-full"
            >
              <div className="w-full aspect-[4/5] bg-[#1C1B1A] relative overflow-hidden border border-[#1C1B1A] dark:border-white/20 shadow-[4px_4px_0px_0px_rgba(0,100,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
                <img
                  src="https://media.licdn.com/dms/image/v2/D4E03AQGkyoWF6XLw_Q/profile-displayphoto-crop_800_800/B4EZk5boiUIkAI-/0/1757605170745?e=1766016000&v=beta&t=XEIsEA_StFtjNsLyD2AtWnPSUM6Y90ytJpfJW11TGLU"
                  alt="Nicholas Loperena"
                  className="w-full h-full object-cover grayscale contrast-125 opacity-90 hover:opacity-100 hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 border-[8px] border-white/10 pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-[#1a1a1a]/90 backdrop-blur-md p-4 border border-[#1C1B1A]/10 dark:border-white/10">
                   <div className="text-[#1C1B1A] dark:text-white font-serif text-xl mb-1">Nicholas Loperena</div>
                   <div className="flex items-center justify-between">
                      <span className="text-[#E2725B] font-mono text-[10px] uppercase tracking-widest">Digital Architect</span>
                      <div className="h-px flex-1 mx-4 bg-[#1C1B1A]/10 dark:bg-white/10" />
                      <span className="text-[#1C1B1A]/40 dark:text-white/40 font-mono text-[10px]">FL, USA</span>
                   </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
