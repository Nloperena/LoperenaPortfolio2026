import React from 'react';
import { ArrowRight } from 'lucide-react';

const AtelierCTA = () => {
  return (
    <section className="w-full py-32 md:py-40 bg-[#006400] text-[#F5F5DC] flex flex-col items-center justify-center text-center px-6">
      <div className="max-w-3xl space-y-12">
        
        <span className="font-mono text-xs uppercase tracking-widest text-[#F5F5DC]/60 block mb-6">VI. The Atelier</span>

        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight">
          Building Trust at Scale—From Historical Foundations to Digital Mastery.
          <span className="block mt-4 text-[#F5F5DC]/90 text-3xl md:text-4xl">
            Let&apos;s Build Your Next System.
          </span>
        </h2>

        <div className="flex justify-center pt-8">
          <a 
            href="mailto:nicholas@loperena.com"
            className="group relative px-12 py-6 bg-[#F5F5DC] text-[#006400] hover:bg-[#E2725B] hover:text-white transition-colors duration-300 font-sans font-bold text-lg flex items-center gap-4 shadow-lg rounded-sm"
          >
            <span className="relative z-10">Schedule a Consultation</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default AtelierCTA;



