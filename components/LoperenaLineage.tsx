'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const lineageData = [
  { year: '1685', name: 'Diego Loperena, The Root', location: 'Navarre, Spain' },
  { year: '1750', name: 'Pedro Juan Loperena, The Immigrant', location: 'First to plant the family standard in Puerto Rico' },
  { year: '~1770', name: 'Manuel Loperena, First Criollo', location: 'Born on island soil' },
  { year: '1833', name: 'Félix Antonio Loperena, The Landowner', location: 'Built enduring fincas in Moca' },
  { year: '1865', name: 'José María Loperena y Conti, The Bridge', location: 'United Houses Loperena and Conti' },
  { year: '1891', name: 'Hipólito Loperena Sr., The Anchor', location: 'Guided the house through the American century' },
  { year: '1939', name: 'Hipólito “Polo” Loperena Jr., The Unifier', location: '' },
  { year: '1960s', name: 'Hipólito “Joe” Loperena III, Pioneer of the North', location: 'Carried the line to Florida' },
  { year: '2025 → Present', name: 'Nicholas & William Loperena', location: 'Ninth-generation standard bearers commissioning digital institutions that endure' },
];

const LoperenaLineage = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section className="w-full py-24 bg-[#F8F4F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <h2 className="text-center font-serif text-2xl md:text-3xl text-[#1C1B1A] mb-16 md:mb-24">
          The Loperena Lineage <span className="text-[#8C7A5E] mx-2">—</span> <span className="italic text-lg md:text-xl">est. 1685 – present</span>
        </h2>

        {/* Timeline Container */}
        <div className="relative w-full min-h-[200px] md:min-h-[150px] flex items-center justify-between">
          
          {/* The Line */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#8C7A5E]/70 transform -translate-y-1/2"></div>

          {/* The Dots */}
          <div className="w-full flex justify-between items-center relative z-10 overflow-x-auto md:overflow-visible px-4 md:px-0 pb-12 md:pb-0 hide-scrollbar">
             <div className="flex md:w-full justify-between min-w-[800px] md:min-w-0 gap-8 md:gap-0">
                {lineageData.map((item, index) => (
                  <div 
                    key={index} 
                    className="relative group"
                    onMouseEnter={() => setActiveIdx(index)}
                    onMouseLeave={() => setActiveIdx(null)}
                    onClick={() => setActiveIdx(activeIdx === index ? null : index)} // Mobile tap
                  >
                    {/* Dot */}
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.05, type: 'spring' }}
                      viewport={{ once: true }}
                      className={`w-3 h-3 rounded-full border border-[#8C7A5E] cursor-pointer transition-all duration-300 ${activeIdx === index ? 'bg-[#49111C] scale-150' : 'bg-[#F8F4F0] hover:bg-[#8C7A5E]'}`}
                    ></motion.div>
                    
                    {/* Year Label (Always visible or only on hover? Design implies just dots, but user asked for tooltips. Let's show year below dot subtly) */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 font-mono text-[10px] text-[#1C1B1A]/60 whitespace-nowrap opacity-100 md:opacity-60 group-hover:opacity-100 transition-opacity">
                      {item.year.split(' ')[0]}
                    </div>

                    {/* Tooltip */}
                    <AnimatePresence>
                      {activeIdx === index && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: -20, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 bg-[#1C1B1A] text-[#F8F4F0] p-4 rounded-sm shadow-xl z-50 pointer-events-none md:pointer-events-auto"
                        >
                          <div className="text-center">
                            <div className="font-mono text-[#8C7A5E] text-[10px] tracking-widest mb-1 uppercase">{item.year}</div>
                            <div className="font-serif text-sm mb-2 leading-tight">{item.name}</div>
                            {item.location && (
                              <div className="text-[10px] text-[#F8F4F0]/70 leading-relaxed border-t border-[#F8F4F0]/10 pt-2 mt-2">
                                {item.location}
                              </div>
                            )}
                          </div>
                          {/* Arrow */}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#1C1B1A]"></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
             </div>
          </div>

        </div>

        <div className="text-center mt-12 md:mt-24">
          <p className="font-mono text-xs md:text-sm text-[#1C1B1A]/60 tracking-widest uppercase">
            “Nine generations of builders. One continuous standard.”
          </p>
        </div>

      </div>
    </section>
  );
};

export default LoperenaLineage;














