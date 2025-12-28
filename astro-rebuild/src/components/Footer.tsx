import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C1B1A] text-[#FAF9F6] py-20 relative border-t border-[#8C7A5E]/30 overflow-hidden">
      {/* Decorative Background Mark */}
      <div className="absolute right-[-5%] bottom-[-10%] opacity-[0.03] pointer-events-none select-none">
         <span className="font-serif text-[30vw] font-bold tracking-tighter italic">L</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-start">
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                 <div className="h-0.5 w-8 bg-[#8C7A5E]" />
                 <h3 className="font-serif text-3xl font-bold text-[#FAF9F6] uppercase tracking-[0.3em]">Loperena</h3>
              </div>
              <p className="text-[#FAF9F6]/60 text-lg font-serif italic max-w-sm leading-relaxed">
                &quot;We build digital foundations for enduring legacies and shared growth.&quot;
              </p>
            </div>

            <div className="flex items-center gap-6">
              {[
                { icon: Linkedin, href: 'https://linkedin.com/in/nicholasloperena', label: 'LinkedIn' },
                { icon: Github, href: 'https://github.com/nicklop', label: 'GitHub' },
                { icon: Mail, href: 'mailto:nicholas@loperena.com', label: 'Email' }
              ].map((social) => (
                <a 
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border border-[#8C7A5E]/30 text-[#8C7A5E] hover:border-[#FAF9F6] hover:text-[#FAF9F6] transition-all bg-[#FAF9F6]/5 rounded-full"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between h-full space-y-16">
            <div className="flex flex-wrap justify-start md:justify-end gap-10 text-[11px] font-mono uppercase tracking-[0.4em] text-[#FAF9F6]/50 font-bold">
               <a href="#heritage" className="hover:text-[#FAF9F6] transition-colors">Lineage</a>
               <a href="#selected-works" className="hover:text-[#FAF9F6] transition-colors">Archive</a>
               <a href="#tech-stack" className="hover:text-[#FAF9F6] transition-colors">Specification</a>
               <a href="#contact" className="hover:text-[#FAF9F6] transition-colors">Correspondence</a>
            </div>

            <div className="flex flex-col md:items-end space-y-6">
              <button 
                onClick={scrollToTop}
                className="group flex items-center gap-3 text-[#8C7A5E] hover:text-[#FAF9F6] transition-colors font-mono text-[10px] uppercase tracking-[0.3em] font-bold"
              >
                Return to Top <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
              </button>
              
              <div className="flex flex-col md:items-end gap-2">
                 <div className="text-[10px] font-mono text-[#FAF9F6]/20 uppercase tracking-[0.5em] font-bold">
                   Ref. 1065-2026 / Nicholas Loperena
                 </div>
                 <div className="text-[9px] font-mono text-[#FAF9F6]/10 uppercase tracking-[0.2em]">
                   Digital Architect / Est. 1732
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
