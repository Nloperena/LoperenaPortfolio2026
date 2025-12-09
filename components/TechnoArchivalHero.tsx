"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function TechnoArchivalHero() {
  const scrollToLedger = () => {
    const ledgerSection = document.getElementById('ledger-section');
    if (ledgerSection) {
      ledgerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[90vh] bg-[#F9F5F1] text-[#1C1B1A] flex flex-col items-center justify-center font-serif overflow-hidden">
      
      {/* 1. BACKGROUND TEXTURE (Laid Paper + Architectural Lines) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.6]" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23F9F5F1'/%3E%3Cg fill='%238C7A5E' fill-opacity='0.05'%3E%3Cpath d='M0 0h100v1H0zM0 20h100v1H0zM0 40h100v1H0zM0 60h100v1H0zM0 80h100v1H0z'/%3E%3C/g%3E%3C/svg%3E")`,
             backgroundSize: '20px 20px'
           }}>
      </div>
      
      {/* 2. CENTERED STACK */}
      <div className="relative z-10 text-center space-y-8 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-4"
        >
           {/* Minimal Family Monogram */}
           <div className="w-16 h-16 rounded-full border border-[#8C7A5E] flex items-center justify-center mb-6 bg-[#F9F5F1] shadow-sm">
              <span className="font-serif italic text-xl text-[#1C1B1A]">NL</span>
           </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight text-[#1C1B1A] leading-tight">
            Nicholas Loperena
          </h1>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-lg md:text-xl font-serif text-[#1C1B1A]/80 italic">
            <span>Digital Architect</span>
            <span className="hidden md:inline w-1 h-1 bg-[#8C7A5E] rounded-full"></span>
            <span>Ninth-Generation Builder</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="max-w-xl mx-auto pt-8 border-t border-[#49111C]/20 mt-8"
        >
          <p className="font-sans text-sm md:text-base text-[#1C1B1A] uppercase tracking-[0.2em] leading-relaxed">
            “My family has engineered enduring institutions since 1685. Today I build yours in code.”
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="pt-12"
        >
          <button 
            onClick={scrollToLedger}
            className="bg-[#49111C] text-[#F8F4F0] px-10 py-4 font-serif text-lg italic tracking-wide hover:bg-[#1C1B1A] transition-colors duration-500 shadow-lg hover:shadow-xl"
          >
            Examine the Ledger
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[#4A0E1B]/40"
      >
        <ArrowDown className="w-6 h-6 animate-bounce" />
      </motion.div>
    </section>
  );
}
