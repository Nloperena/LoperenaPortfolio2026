import React from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Clock } from 'lucide-react';

const AtelierCTA = () => {
  return (
    <section id="contact" className="relative w-full bg-[#1A2F28] text-[#FAF9F6] section-padding overflow-hidden border-t-4 border-[#8C7A5E]/20">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-[#FAF9F6]" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-[#FAF9F6]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <div className="space-y-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#8C7A5E] font-bold">CONTACT THE ATELIER</span>
            <h2 className="font-serif text-5xl md:text-7xl font-bold tracking-tighter italic text-[#FAF9F6] leading-[1.1]">
              Let&apos;s build something <br/>beautiful together.
            </h2>
            <p className="font-serif text-xl text-[#FAF9F6]/60 max-w-xl italic leading-relaxed">
              &quot;I believe the best systems start with a simple conversation. Whether you have a detailed blueprint or just a spark of an idea, I’m here to listen and help you find the way forward.&quot;
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
             <div className="space-y-3">
                <div className="flex items-center gap-3 text-[#8C7A5E]">
                   <Mail size={16} />
                   <span className="font-mono text-[9px] uppercase tracking-widest font-bold">Direct Correspondence</span>
                </div>
                <a href="mailto:nicholas@loperena.com" className="font-serif text-lg hover:text-[#8C7A5E] transition-colors block">
                   nicholas@loperena.com
                </a>
             </div>
             <div className="space-y-3">
                <div className="flex items-center gap-3 text-[#8C7A5E]">
                   <Clock size={16} />
                   <span className="font-mono text-[9px] uppercase tracking-widest font-bold">Studio Hours</span>
                </div>
                <p className="font-serif text-lg">Mon — Fri, 09:00 — 17:00 EST</p>
             </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#FAF9F6]/5 backdrop-blur-md p-10 md:p-12 border border-[#8C7A5E]/20 relative shadow-2xl"
        >
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="font-mono text-[9px] uppercase tracking-widest text-[#8C7A5E] font-bold">Your Name</label>
                <input 
                  type="text" 
                  placeholder="ARCHITECT / BRAND"
                  className="w-full bg-[#1C1B1A]/40 border-b border-[#8C7A5E]/30 text-[#FAF9F6] placeholder-[#FAF9F6]/20 py-3 px-0 text-xs font-mono tracking-widest focus:border-[#8C7A5E] outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[9px] uppercase tracking-widest text-[#8C7A5E] font-bold">Your Email</label>
                <input 
                  type="email" 
                  placeholder="ENTITY@DOMAIN.COM"
                  className="w-full bg-[#1C1B1A]/40 border-b border-[#8C7A5E]/30 text-[#FAF9F6] placeholder-[#FAF9F6]/20 py-3 px-0 text-xs font-mono tracking-widest focus:border-[#8C7A5E] outline-none transition-colors"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="font-mono text-[9px] uppercase tracking-widest text-[#8C7A5E] font-bold">Project Scope / Vision</label>
              <textarea 
                placeholder="Tell me about the dream you’re building..."
                rows={4}
                className="w-full bg-[#1C1B1A]/40 border-b border-[#8C7A5E]/30 text-[#FAF9F6] placeholder-[#FAF9F6]/20 py-3 px-0 text-xs font-mono tracking-widest focus:border-[#8C7A5E] outline-none resize-none transition-colors"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-6 bg-[#4A1010] text-[#FAF9F6] hover:bg-[#8C7A5E] transition-all font-serif font-bold text-sm uppercase tracking-[0.4em] border border-[#8C7A5E]/30 shadow-2xl active:scale-[0.98]"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default AtelierCTA;
