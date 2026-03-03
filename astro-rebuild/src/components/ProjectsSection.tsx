import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { projects } from "../data/projects";

export const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create a scroll track based on the number of panels (1 title panel + projects)
  const totalPanels = projects.length + 1;
  const trackHeight = `${totalPanels * 100}vh`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate horizontal translation with a subtle spring for momentum
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 400, damping: 90, mass: 0.1 });
  
  // Transform scroll progress into horizontal movement
  // Move exactly (totalPanels - 1) panels to the left
  const xTranslate = useTransform(smoothProgress, [0, 1], ["0%", `-${((totalPanels - 1) / totalPanels) * 100}%`]);

  // Global Progress bar spring
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="relative w-full bg-background" style={{ height: trackHeight }}>
      
      {/* Scroll Progress Bar at the top */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-accent/40 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Scroll Hint (Fades out when scrolling starts) */}
      <motion.div 
        className="fixed bottom-8 right-8 font-mono text-[10px] tracking-widest text-accent uppercase z-40 hidden md:flex items-center gap-3 bg-background/80 backdrop-blur-sm px-4 py-2 border border-accent/20 shadow-lg shadow-accent/5"
        style={{ opacity: useTransform(smoothProgress, [0, 0.02], [1, 0]) }}
      >
        <span>Scroll to Explore</span>
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >→</motion.span>
      </motion.div>

      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex bg-background">
        
        {/* Horizontal Track */}
        <motion.div 
          className="flex h-full"
          style={{ 
            x: xTranslate,
            width: `${totalPanels * 100}vw` 
          }}
        >
          {/* PANEL 1: Title Frame */}
          <div className="w-screen h-[100svh] flex-shrink-0 relative border-r border-accent/20 flex flex-col justify-center">
            {/* Structural Lines */}
            <div className="absolute top-16 md:top-24 left-0 right-0 h-px bg-accent/20"></div>
            <div className="absolute bottom-16 md:bottom-24 left-0 right-0 h-px bg-accent/20"></div>
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-accent/20 hidden md:block"></div>

            <div className="absolute top-24 left-6 md:top-32 md:left-12 font-mono text-[10px] md:text-xs font-bold tracking-[0.3em] text-accent/50 uppercase">
              [ PORTFOLIO LEDGER ]
            </div>

            <div className="w-full px-6 md:px-12 lg:px-24 relative overflow-hidden">
              <h1 className="text-[clamp(4rem,10vw,12rem)] font-sans font-black uppercase leading-[0.85] tracking-tighter text-foreground relative z-10">
                <motion.span 
                  className="block"
                  initial={{ y: "100%", opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  SHIPPED.
                </motion.span>
                <motion.span 
                  className="block text-accent/80"
                  initial={{ y: "100%", opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                >
                  SYSTEMS.
                </motion.span>
              </h1>
              
              {/* Background decorative typography */}
              <div className="absolute right-[-5%] top-[10%] text-[20vw] font-black text-accent/[0.02] select-none pointer-events-none leading-none z-0">
                WORK
              </div>
            </div>
          </div>

          {/* PANELS 2+: Project Specs */}
          {projects.map((project, index) => (
            <div key={project.id} className="w-screen h-[100svh] flex-shrink-0 relative border-r border-accent/20">
              <div className="flex flex-col md:grid md:grid-cols-12 h-full w-full">
                
                {/* Left Column (Content) - Reduced top padding and set strictly to 50svh on mobile */}
                <div className="md:col-span-5 relative flex flex-col pt-20 pb-4 px-6 md:py-32 md:px-12 lg:px-16 bg-background border-b md:border-b-0 md:border-r border-accent/20 z-10 h-[50svh] md:h-full shrink-0">
                  
                  <motion.div 
                    className="flex flex-col gap-2 md:gap-6 flex-grow justify-center"
                    initial={{ opacity: 0, filter: "blur(10px)", x: -20 }}
                    whileInView={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                    viewport={{ margin: "-10%" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="font-mono text-3xl md:text-6xl lg:text-7xl font-bold text-accent/20 leading-none">
                      {String(index + 1).padStart(2, "0")} //
                    </span>
                    <h2 className="font-sans text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none text-foreground">
                      {project.title}
                    </h2>
                    
                    {/* Clamped description on mobile so it never forces elements off-screen */}
                    <p className="font-serif italic text-foreground/70 text-sm md:text-lg border-l-2 border-accent/20 pl-4 mt-1 md:mt-2 line-clamp-3 md:line-clamp-none">
                      {project.description}
                    </p>
                    
                    <div className="border-y border-accent/20 py-2 md:py-4 mt-1 md:mt-4">
                      <span className="font-mono text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-foreground/70 block truncate">
                        {project.tags.join(' // ')}
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ margin: "-10%" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="mt-auto shrink-0 pt-2"
                  >
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="group/btn relative flex items-center justify-between p-4 md:p-6 lg:p-8 bg-neutral-900 text-white border border-transparent overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white translate-y-[101%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-[0.16,1,0.3,1] z-0"></div>
                      <span className="relative z-10 font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest text-white group-hover/btn:text-neutral-900 transition-colors duration-300 delay-75">
                        VIEW LIVE SYSTEM
                      </span>
                      <span className="relative z-10 font-mono text-lg group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 transition-all duration-300 text-white group-hover/btn:text-neutral-900 delay-75">
                        ↗
                      </span>
                    </a>
                  </motion.div>
                </div>

                {/* Right Column (Visual) */}
                <div className="md:col-span-7 relative h-[50svh] md:h-full bg-accent/5 overflow-hidden">
                  {/* Subtle 1px grid overlay to anchor the image */}
                  <div className="absolute inset-0 pointer-events-none z-10" style={{
                    backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                  }}></div>
                  
                  {/* Scale + Blur reveal animation when coming horizontally into view */}
                  <motion.div 
                    className="absolute inset-0 w-full h-full"
                    initial={{ scale: 1.15, filter: "blur(10px)", opacity: 0 }}
                    whileInView={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
                    viewport={{ margin: "-20%" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  >
                    {project.allowEmbed && project.link ? (
                      <iframe 
                        src={project.link} 
                        className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700 pointer-events-auto"
                        title={project.title}
                        loading="lazy"
                      />
                    ) : project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center font-mono text-sm text-foreground/30 uppercase tracking-widest">
                        SYSTEM PREVIEW UNAVAILABLE
                      </div>
                    )}
                  </motion.div>
                </div>

              </div>
            </div>
          ))}

        </motion.div>
      </div>
    </section>
  );
};
