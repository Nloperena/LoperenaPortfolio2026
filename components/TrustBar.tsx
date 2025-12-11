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
      <section className="bg-[#F2F0E6] dark:bg-[#0A1F1C] border-t double-line border-b double-line border-[#111111] dark:border-white/20 py-8 relative transition-colors duration-300" style={{ borderStyle: 'double', borderWidth: '3px', borderLeft: 'none', borderRight: 'none' }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#111111]/20 dark:border-white/20">
                  {/* Ledger-style grid with borders */}
                  {brands.map((brand, i) => (
                      <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: i * 0.05 }}
                          onClick={() => brand.isClickable && handleBrandClick(brand)}
                          className={`
                            p-5 text-center font-serif text-lg md:text-xl text-[#111111] dark:text-white/90 italic
                            ${(i + 1) % 3 !== 0 ? 'border-r border-[#111111]/20 dark:border-white/20' : ''}
                            ${i < brands.length - (brands.length % 3 === 0 ? 3 : brands.length % 3) ? 'border-b border-[#111111]/20 dark:border-white/20' : ''}
                            ${brand.isClickable ? 'cursor-pointer hover:bg-[#F2F0E6]/50 dark:hover:bg-white/5 transition-colors' : 'cursor-default'}
                          `}
                      >
                          {brand.name}
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      <VITOPromptModal isOpen={isVITOModalOpen} onClose={() => setIsVITOModalOpen(false)} />
    </>
  )
}

export default TrustBar;







