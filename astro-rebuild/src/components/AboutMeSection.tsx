import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TimelineItem = ({ year, title, description, isOpen, onClick }: any) => {
  return (
    <motion.div 
      className={`cursor-pointer border-l-2 pl-6 py-5 transition-all duration-300 relative group ${isOpen ? 'border-[#8C7A5E] bg-[#1A2F28]/5' : 'border-[#1C1B1A]/10 hover:border-[#8C7A5E]/30'}`}
      onClick={onClick}
    >
      <div className={`absolute -left-[9px] top-7 w-4 h-4 rounded-full border-2 bg-[#FAF9F6] transition-all ${isOpen ? 'border-[#8C7A5E] bg-[#8C7A5E]' : 'border-[#1C1B1A]/20 group-hover:border-[#8C7A5E]/40'}`} />
      
      <div className="flex items-center gap-4 mb-1">
         <span className={`font-mono text-[10px] font-bold tracking-widest ${isOpen ? 'text-[#8C7A5E]' : 'text-[#1C1B1A]/40'}`}>{year}</span>
         <h4 className={`font-serif text-xl tracking-tight ${isOpen ? 'text-[#1C1B1A] font-bold' : 'text-[#1C1B1A]/60'}`}>{title}</h4>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-[#1C1B1A]/80 leading-[1.8] pt-2 font-serif max-w-prose italic">
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
      title: 'Structural Genesis', 
      description: 'The foundation of the Loperena lineage in the Basque region, where engineering was first treated as a discipline of both survival and artistry.' 
    },
    { 
      year: '1836', 
      title: 'Architectural Migration', 
      description: 'Expansion into the Americas, translating traditional masonry and structural principles into the burgeoning infrastructure of the New World.' 
    },
    { 
      year: '2024', 
      title: 'Digital Systems Architecture', 
      description: 'The convergence of ancestral precision with modern computation—architecting autonomous, high-concurrency systems that serve as enduring business foundations.' 
    }
  ];

  return (
    <section id="heritage" className="bg-[#FAF9F6] section-padding relative overflow-hidden border-b double-line border-[#111111]/10">
      <div className="max-w-7xl mx-auto px-6 relative z-10 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-transparent border-y border-[#8C7A5E]/20 py-16 md:py-24"
        >
          <div className="text-center mb-20">
            <div className="font-mono text-[10px] uppercase tracking-[0.6em] text-[#8C7A5E] mb-6 font-bold">LOPERENA LINEAGE</div>
            <h2 className="font-serif text-5xl md:text-8xl font-bold text-[#4A1010] leading-tight tracking-[0.02em] ink-bleed uppercase">
              Our Shared <br/>Engineering Journey
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-20 items-start">
            {/* Column 1: Core Principles */}
            <div className="space-y-10">
              <div className="space-y-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#8C7A5E] font-bold">I. PHILOSOPHY</span>
                <p className="text-xl md:text-3xl font-serif italic text-[#1C1B1A] leading-snug border-l-4 border-[#8C7A5E] pl-8 py-2">
                  &quot;We do not build for the moment; we architect for the legacy.&quot;
                </p>
              </div>
              
              <div className="font-serif text-[#1C1B1A]/80 space-y-8 text-lg leading-[1.8]">
                <p className="drop-cap">
                  True architecture is the invisible alignment of technical precision and strategic intent. I believe that digital systems should behave like physical foundations—silent, strong, and capable of supporting your immense growth without fracture.
                </p>
                <p>
                  Together, we transform technical complexity into premium digital artifacts. We give your data a voice and your brand a structure that justifies high-tier market positions, ensuring that every line of code serves as a reinforcement for your long-term ROI.
                </p>
              </div>
              
              <div className="flex flex-col gap-6 pt-12 border-t border-[#8C7A5E]/10">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#8C7A5E]/30 p-1 shadow-lg">
                    <img src="https://media.licdn.com/dms/image/v2/D4E03AQGkyoWF6XLw_Q/profile-displayphoto-crop_800_800/B4EZk5boiUIkAI-/0/1757605170745?e=1766016000&v=beta&t=XEIsEA_StFtjNsLyD2AtWnPSUM6Y90ytJpfJW11TGLU" alt="Nico Loperena" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                    <div className="font-serif font-bold text-xl text-[#1C1B1A] tracking-tight">Nicholas Loperena</div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8C7A5E] font-bold">Digital Architect</div>
                  </div>
                </div>
                
                {/* Personal Signature Placeholder */}
                <div className="pt-4 opacity-70">
                   <div className="font-serif italic text-3xl text-[#4A1010] tracking-widest pl-4">N. Loperena</div>
                   <div className="h-px w-32 bg-gradient-to-r from-[#8C7A5E]/40 to-transparent mt-2"></div>
                </div>
              </div>
            </div>

            {/* Hand-Drawn Styled Divider */}
            <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-[#8C7A5E]/40 to-transparent h-full relative">
               <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3 h-3 border border-[#8C7A5E]/20 rotate-45 bg-[#FAF9F6]"></div>
               <div className="absolute top-3/4 left-1/2 -translate-x-1/2 w-3 h-3 border border-[#8C7A5E]/20 rotate-45 bg-[#FAF9F6]"></div>
            </div>

            {/* Column 2: Strategic Outcomes / Records */}
            <div className="space-y-10">
              <div className="space-y-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#8C7A5E] font-bold">II. STRATEGIC RECORD</span>
                <h3 className="font-serif text-2xl font-bold text-[#1C1B1A] tracking-tight">Evolution of Methodology</h3>
              </div>

              <div className="space-y-4">
                {timelineData.map((item, index) => (
                  <TimelineItem 
                    key={index}
                    {...item}
                    isOpen={openTimelineIndex === index}
                    onClick={() => setOpenTimelineIndex(index)}
                  />
                ))}
              </div>

              <div className="p-8 bg-[#1A2F28]/5 border border-[#8C7A5E]/10 rounded-sm mt-12 relative overflow-hidden">
                {/* Decorative corner mark */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-[#8C7A5E]/10 flex items-center justify-center">
                   <div className="w-1.5 h-1.5 bg-[#4A1010] rounded-full animate-pulse" />
                </div>
                
                <div className="space-y-4">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#4A1010] font-bold">CURRENT ENGAGEMENT</span>
                  <p className="font-serif text-base text-[#1C1B1A]/80 leading-relaxed italic">
                    Currently architecting context-aware AI ecosystems that empower businesses with operational autonomy. We give your historical data a voice and a future.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMeSection;
