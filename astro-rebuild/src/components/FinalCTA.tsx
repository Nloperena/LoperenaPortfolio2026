import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const FinalCTA = () => {
  const currentYear = new Date().getFullYear();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const handleContactClick = () => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.openContactHub) {
      // @ts-ignore
      window.openContactHub();
    }
  };

  const y1 = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <section ref={containerRef} className="relative w-full h-[100vh] -z-10">
      <div className="fixed bottom-0 left-0 w-full h-screen bg-[#0a0a0a] text-[#ededed] overflow-hidden flex flex-col pointer-events-auto">
      
      {/* Noise Texture */}
      <div className="absolute inset-0 z-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

      {/* Radial Gradients for Cinematic Lighting */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100vw] h-[100vh] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% 120%, rgba(255, 255, 255, 0.08) 0%, rgba(10, 10, 10, 1) 70%)',
          opacity: opacity1
        }}
      />
      
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-neutral-800/30 blur-[120px] pointer-events-none z-0"
        animate={{
          x: ["-50%", "-40%", "-60%", "-50%"],
          y: ["-50%", "-60%", "-40%", "-50%"],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      />

      {/* Main Grid Wrapper */}
      <div className="flex-1 w-full max-w-[1400px] mx-auto border-x border-neutral-800/50 relative z-10 flex flex-col h-full pt-20 md:pt-0">
        
        {/* The Main Grid Split (50/50) */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Fluid Colossal Typography */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-end border-b md:border-b-0 md:border-r border-neutral-800/50 relative">
            {/* Eyebrow */}
            <div className="absolute top-8 left-8 md:top-12 md:left-12 font-mono text-[10px] md:text-xs font-bold tracking-[0.3em] text-neutral-500 uppercase flex items-center gap-4">
              Ready when you are <span className="hidden sm:block w-12 h-px bg-neutral-800"></span> Let’s build something
            </div>
            
            <motion.div style={{ y: y1, opacity: opacity1 }}>
              <h2 className="text-[clamp(3.5rem,7vw,9rem)] font-black leading-[0.85] tracking-tighter uppercase text-[#ededed]">
                BUILD<br/>
                SOMETHING<br/>
                LASTING.
              </h2>
              <p className="font-serif text-neutral-400 mt-8 text-xl max-w-md italic leading-relaxed">
                Have a project in mind? I’d love to hear about it—and help you ship something that lasts.
              </p>
            </motion.div>
          </div>

          {/* Right Column: CTA */}
          <div className="group relative flex flex-col items-start justify-end p-8 md:p-12 lg:p-16 cursor-pointer overflow-hidden text-left bg-transparent" onClick={handleContactClick}>
            <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/40 transition-colors duration-700 pointer-events-none"></div>
            
            <motion.div 
              className="flex flex-col gap-6 w-full relative z-10"
              style={{ y: y1, opacity: opacity1 }}
            >
              <span className="font-sans text-[clamp(2.5rem,5vw,5rem)] font-bold uppercase tracking-tight text-[#ededed] leading-[1.1] group-hover:text-white transition-colors duration-500">
                LET'S TALK
              </span>
              <div className="flex items-center">
                <span className="text-neutral-600 group-hover:text-white transform group-hover:translate-x-4 transition-all duration-500 text-5xl md:text-6xl leading-none font-light">
                  →
                </span>
              </div>
            </motion.div>
          </div>

        </div>

        {/* The System Status Footer Strip */}
        <div className="w-full h-24 md:h-20 border-t border-neutral-800/50 bg-transparent relative z-20 flex items-center shrink-0">
          <div className="w-full px-6 md:px-12 flex flex-col md:flex-row items-center justify-between h-full py-4 md:py-0">
            <div className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2 md:mb-0">
              © {currentYear} NICO LOPERENA // FULL-STACK DEVELOPER
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
              {[
                { label: 'LINKEDIN', url: 'https://www.linkedin.com/in/nicholas-loperena-022813185/' },
                { label: 'GITHUB', url: 'https://github.com/NLoperena' },
                { label: 'EMAIL', url: 'mailto:NicholasLoperena@gmail.com' }
              ].map((social) => (
                <a 
                  key={social.label}
                  href={social.url} 
                  target={social.label !== 'EMAIL' ? "_blank" : undefined}
                  rel={social.label !== 'EMAIL' ? "noreferrer" : undefined}
                  className="group flex items-center gap-1 cursor-pointer"
                >
                  <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 group-hover:text-white transition-colors duration-300">
                    {social.label}
                  </span>
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 font-mono text-[10px] md:text-xs text-white">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};
