'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const AtelierCTA = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent('Project Consultation Request');
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:nicholas@loperena.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-[#F2F0E6] via-[#F2F0E6] to-[#0A1F1C] text-[#F2F0E6] overflow-hidden">
      {/* Gradient Transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A1F1C]/30 to-[#0A1F1C] pointer-events-none"></div>
      
      {/* Slim Dark Green Navigation Band */}
      <div className="relative z-10 bg-[#0A1F1C] py-8">
        <div className="max-w-6xl mx-auto px-6">
          {/* NL Seal - Centered */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <div className="w-20 h-20 relative">
              <div className="absolute inset-0 rounded-full border-3 border-[#B87333] bg-[#B87333]/10 flex items-center justify-center"
                style={{ borderStyle: 'double' }}
              >
                <div className="w-14 h-14 rounded-full border-2 border-[#B87333] flex items-center justify-center">
                  <span className="font-serif text-lg text-[#B87333]">NL</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Links - Elegant Serif, Centered */}
          <motion.nav 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mb-8"
          >
            <Link href="/" className="font-serif text-sm text-[#F2F0E6]/80 hover:text-[#B87333] transition-colors">
              Manifest
            </Link>
            <span className="text-[#F2F0E6]/20">|</span>
            <Link href="/#heritage" className="font-serif text-sm text-[#F2F0E6]/80 hover:text-[#B87333] transition-colors">
              Lineage
            </Link>
            <span className="text-[#F2F0E6]/20">|</span>
            <Link href="/#selected-works" className="font-serif text-sm text-[#F2F0E6]/80 hover:text-[#B87333] transition-colors">
              Works
            </Link>
            <span className="text-[#F2F0E6]/20">|</span>
            <Link href="/#ledger-section" className="font-serif text-sm text-[#F2F0E6]/80 hover:text-[#B87333] transition-colors">
              The Ledger
            </Link>
            <span className="text-[#F2F0E6]/20">|</span>
            <a 
              href="#correspondence" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('correspondence-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-serif text-sm text-[#F2F0E6]/80 hover:text-[#B87333] transition-colors"
            >
              Correspondence
            </a>
          </motion.nav>

          {/* Stats as Inline Badges - Small Circles */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center items-center gap-6 mb-8"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border border-[#B87333]/40 bg-[#B87333]/10 flex items-center justify-center">
                <span className="font-serif text-xs font-bold text-[#B87333]">10+</span>
              </div>
              <span className="font-mono text-xs text-[#F2F0E6]/60 uppercase tracking-widest">Years IT</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border border-[#B87333]/40 bg-[#B87333]/10 flex items-center justify-center">
                <span className="font-serif text-xs font-bold text-[#B87333]">8+</span>
              </div>
              <span className="font-mono text-xs text-[#F2F0E6]/60 uppercase tracking-widest">Years</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border border-[#B87333]/40 bg-[#B87333]/10 flex items-center justify-center">
                <span className="font-serif text-xs font-bold text-[#B87333]">100%</span>
              </div>
              <span className="font-mono text-xs text-[#F2F0E6]/60 uppercase tracking-widest">Guaranteed</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Button - Full Width */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 bg-[#0A1F1C] py-6"
      >
        <div className="max-w-4xl mx-auto px-6">
          <a 
            href="#correspondence-form"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('correspondence-form')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#B87333] text-[#F2F0E6] hover:bg-[#B87333]/90 transition-all duration-300 font-serif font-bold text-base md:text-lg uppercase tracking-wider border-2 border-[#B87333]"
          >
            <span>Schedule a Consultation</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </motion.div>

      {/* Contact Form - Embedded as Simple Fields in a Row */}
      <div id="correspondence-form" className="relative z-10 bg-[#0A1F1C] py-12">
        <div className="max-w-4xl mx-auto px-6">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-[#1C1B1A] border border-[#B87333]/30 text-[#F2F0E6] placeholder-[#F2F0E6]/40 py-3 px-4 text-sm font-serif focus:border-[#B87333] focus:outline-none transition-colors"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-[#1C1B1A] border border-[#B87333]/30 text-[#F2F0E6] placeholder-[#F2F0E6]/40 py-3 px-4 text-sm font-serif focus:border-[#B87333] focus:outline-none transition-colors"
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Project Details"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-[#1C1B1A] border border-[#B87333]/30 text-[#F2F0E6] placeholder-[#F2F0E6]/40 py-3 px-4 text-sm font-serif focus:border-[#B87333] focus:outline-none transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-[#B87333] text-[#F2F0E6] hover:bg-[#B87333]/90 transition-all duration-300 font-serif font-bold text-sm uppercase tracking-wider border-2 border-[#B87333]"
            >
              Submit Inquiry
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default AtelierCTA;



