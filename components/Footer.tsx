'use client';

import React from 'react';
import { Github, Linkedin, Mail, Twitter, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1C1B1A] text-[#F5F5DC] py-16 border-t border-[#800000]/30 relative overflow-hidden">
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
           
           {/* Brand & Tagline */}
           <div className="col-span-1 md:col-span-2">
              <div className="flex items-start gap-6 mb-6">
                {/* Family Crest - Footer Size */}
                <div className="flex-shrink-0 w-48 h-48 relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E2725B]/20 to-[#006400]/20 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative w-full h-full p-4 bg-[#F5F5DC]/10 rounded-full border-2 border-[#E2725B]/30 group-hover:border-[#E2725B]/50 transition-all duration-300">
                    <img
                      src="/family-crest-illustration.png"
                      alt="Loperena Family Crest"
                      className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-all duration-300 filter drop-shadow-xl group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-2xl text-[#F5F5DC] mb-2">Nicholas Loperena</h3>
                  <p className="text-[#F5F5DC]/60 text-sm font-sans leading-relaxed mb-2">
                    Ninth-generation builder crafting digital legacies.
                  </p>
                  <p className="text-[#F5F5DC]/40 text-xs font-mono uppercase tracking-widest">
                    Rooted in history, engineered for the future.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 mt-8">
                 <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[#F5F5DC]/60 hover:text-[#E2725B] transition-colors"><Github size={20}/></a>
                 <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#F5F5DC]/60 hover:text-[#E2725B] transition-colors"><Linkedin size={20}/></a>
                 <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#F5F5DC]/60 hover:text-[#E2725B] transition-colors"><Twitter size={20}/></a>
                 <a href="mailto:nicholas@loperena.com" className="text-[#F5F5DC]/60 hover:text-[#E2725B] transition-colors"><Mail size={20}/></a>
              </div>
           </div>

           {/* Contact Form Area */}
           <div className="col-span-1 md:col-span-2 bg-[#F5F5DC]/5 p-8 border border-[#F5F5DC]/10">
              <h4 className="font-mono text-xs text-[#E2725B] uppercase tracking-widest mb-6">Initiate Contact</h4>
              <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="NAME" 
                    className="bg-[#333333] border-2 border-[#E2725B]/60 py-3 text-sm text-[#F5F5DC] placeholder-[#F5F5DC]/50 focus:border-[#E2725B] focus:bg-[#404040] outline-none transition-all px-3" 
                    required 
                  />
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="EMAIL" 
                    className="bg-[#333333] border-2 border-[#E2725B]/60 py-3 text-sm text-[#F5F5DC] placeholder-[#F5F5DC]/50 focus:border-[#E2725B] focus:bg-[#404040] outline-none transition-all px-3" 
                    required 
                  />
                </div>
                <textarea 
                  name="message" 
                  placeholder="PROJECT DETAILS" 
                  rows={3} 
                  className="w-full bg-[#333333] border-2 border-[#E2725B]/60 py-3 text-sm text-[#F5F5DC] placeholder-[#F5F5DC]/50 focus:border-[#E2725B] focus:bg-[#404040] outline-none transition-all resize-none px-3" 
                  required
                ></textarea>
                <button 
                  type="submit" 
                  className="w-full py-4 bg-[#E2725B] text-[#F5F5DC] font-mono text-xs uppercase tracking-widest hover:bg-[#F5F5DC] hover:text-[#0A1F1C] transition-colors shadow-lg"
                >
                  Transmit
                </button>
              </form>
           </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#F5F5DC]/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[#F5F5DC]/40 font-mono uppercase tracking-widest">
           <div>&copy; 2025 Nicholas Loperena. All Rights Reserved.</div>
           <div className="mt-4 md:mt-0 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#006400] rounded-full"></span>
              Designed & Built in Florida
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
