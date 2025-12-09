'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import VITOPromptModal from './VITOPromptModal';

const TrustBar = () => {
  const [isVITOModalOpen, setIsVITOModalOpen] = useState(false);

  const brands = [
    { name: "VITO Fryfilter", isClickable: true, url: 'https://shop.vitofryfilter.com' },
    { name: "Rugged Red", isClickable: false },
    { name: "Furniture Packages USA", isClickable: false },
    { name: "Waterside Market", isClickable: false },
    { name: "Teter's Market", isClickable: false },
    { name: "Good Ol' Days Diner", isClickable: false }
  ];

  const handleBrandClick = (brand: typeof brands[0]) => {
    if (brand.name === "VITO Fryfilter") {
      setIsVITOModalOpen(true);
    }
  };

  return (
    <>
      <section className="bg-[#F8F4F0] dark:bg-[#0A1F1C] border-b border-[#1C1B1A]/10 dark:border-white/10 py-12 relative overflow-hidden transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <span className="font-mono text-xs uppercase tracking-widest text-[#1C1B1A]/40 dark:text-white/40 whitespace-nowrap shrink-0">Trusted By</span>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-16 w-full">
                  {brands.map((brand, i) => (
                      <motion.span 
                          key={i} 
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                          onClick={() => brand.isClickable && handleBrandClick(brand)}
                          className={`font-serif text-xl md:text-2xl text-[#1C1B1A]/60 dark:text-white/60 italic hover:text-[#E2725B] dark:hover:text-[#E2725B] transition-colors ${
                            brand.isClickable ? 'cursor-pointer' : 'cursor-default'
                          }`}
                      >
                          {brand.name}
                      </motion.span>
                  ))}
              </div>
          </div>
      </section>

      <VITOPromptModal isOpen={isVITOModalOpen} onClose={() => setIsVITOModalOpen(false)} />
    </>
  )
}

export default TrustBar;





