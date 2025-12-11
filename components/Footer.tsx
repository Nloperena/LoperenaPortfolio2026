'use client';

import React from 'react';
import { Github, Linkedin, Mail, Twitter, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1C1B1A] text-[#F5F5DC] py-16 relative overflow-hidden">
      {/* Antique Divider Above Footer */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B87333]/40 to-transparent"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 -mt-12 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-2 border-[#B87333]/30 bg-[#1C1B1A] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border border-[#B87333]/20"></div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
           
           {/* Brand & Tagline */}
           <div className="col-span-1 md:col-span-2">
              <div className="flex items-start gap-6 mb-6">
                {/* Family Crest - Footer Size */}
                <div className="flex-shrink-0 w-48 h-48 relative">
                  <img
                    src="/family-crest-illustration.png"
                    alt="Loperena Family Crest"
                    className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300 filter drop-shadow-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-2xl font-bold text-[#F5F5DC] mb-2">Nicholas Loperena</h3>
                  <p className="text-[#F5F5DC]/60 text-sm font-serif leading-relaxed mb-2">
                    Ninth-generation engineer developing digital infrastructure.
                  </p>
                  <p className="text-[#F5F5DC]/40 text-xs font-mono uppercase tracking-widest">
                    Rooted in tradition, designed for tomorrow.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                 <a 
                   href="https://github.com/nicholasloperena" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="p-2 border border-[#B87333]/30 text-[#B87333]/70 hover:border-[#B87333] hover:text-[#B87333] hover:bg-[#B87333]/10 transition-all duration-300"
                   title="GitHub"
                 >
                   <Github size={18}/>
                 </a>
                 <a 
                   href="https://www.linkedin.com/in/nicholas-loperena-022813185/" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="p-2 border border-[#B87333]/30 text-[#B87333]/70 hover:border-[#B87333] hover:text-[#B87333] hover:bg-[#B87333]/10 transition-all duration-300"
                   title="LinkedIn"
                 >
                   <Linkedin size={18}/>
                 </a>
                 <a 
                   href="mailto:nicholas@loperena.com" 
                   className="p-2 border border-[#B87333]/30 text-[#B87333]/70 hover:border-[#B87333] hover:text-[#B87333] hover:bg-[#B87333]/10 transition-all duration-300"
                   title="Email"
                 >
                   <Mail size={18}/>
                 </a>
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
                    className="bg-[#333333] border border-[#8C7A5E]/50 py-3 text-sm text-[#F5F5DC] placeholder-[#F5F5DC]/50 font-serif focus:border-[#B87333] focus:bg-[#404040] outline-none transition-all px-3" 
                    required 
                  />
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="EMAIL" 
                    className="bg-[#333333] border border-[#8C7A5E]/50 py-3 text-sm text-[#F5F5DC] placeholder-[#F5F5DC]/50 font-serif focus:border-[#B87333] focus:bg-[#404040] outline-none transition-all px-3" 
                    required 
                  />
                </div>
                <textarea 
                  name="message" 
                  placeholder="PROJECT DETAILS" 
                  rows={3} 
                  className="w-full bg-[#333333] border border-[#8C7A5E]/50 py-3 text-sm text-[#F5F5DC] placeholder-[#F5F5DC]/50 font-serif focus:border-[#B87333] focus:bg-[#404040] outline-none transition-all resize-none px-3" 
                  required
                ></textarea>
                <button 
                  type="submit" 
                  className="w-full py-4 bg-[#B87333] text-[#F5F5DC] font-serif text-xs font-bold uppercase tracking-widest hover:bg-[#B87333]/90 transition-colors shadow-lg"
                >
                  Transmit
                </button>
              </form>
           </div>
        </div>

        {/* Subtle Navigation Links */}
        <div className="border-t border-[#F5F5DC]/10 pt-6 mb-6">
          <div className="flex flex-wrap justify-center gap-4 text-xs font-mono uppercase tracking-widest text-[#F5F5DC]/50">
            <a href="#heritage" className="hover:text-[#B87333] transition-colors">Heritage</a>
            <span className="text-[#F5F5DC]/20">|</span>
            <a href="#tech-stack" className="hover:text-[#B87333] transition-colors">Tools</a>
            <span className="text-[#F5F5DC]/20">|</span>
            <a href="#selected-works" className="hover:text-[#B87333] transition-colors">Portfolio</a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#F5F5DC]/10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-[#F5F5DC]/40 font-mono uppercase tracking-widest">
           <div>&copy; 2025 Nicholas Loperena. All Rights Reserved.</div>
           <div className="mt-4 md:mt-0 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#B87333] rounded-full"></span>
              Designed & Built in Florida
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
