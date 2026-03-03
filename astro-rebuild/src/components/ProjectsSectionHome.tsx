import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { projects } from "../data/projects";
import {
  sectionSequence,
  drawLineX,
  drawLineY,
  stampUp,
  VIEWPORT_ONCE,
  arrowIn,
} from "../utils/motionBlueprint";

export const ProjectsSectionHome = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate horizontal translation based on scroll progress
  // useSpring removes rigid jumps while scrolling, giving a high-end feel.
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 400, damping: 90, mass: 0.1 });
  // Map progress (0 to 1) to (-0% to -100% + viewport width)
  const xTranslate = useTransform(smoothProgress, (v) => `calc(-${v * 100}% + ${v * 100}vw)`);

  return (
    <section ref={containerRef} className="relative h-[400vh] w-full bg-background" id="project-strata-container">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden border-y border-accent/20 bg-accent/[0.01]">
        
        {/* Section Header */}
        <motion.div 
          className="absolute top-12 md:top-24 left-0 w-full px-6 md:px-12 lg:px-24 z-20 pointer-events-none"
          variants={sectionSequence}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
        >
          <div className="overflow-hidden w-full max-w-[1400px] mx-auto">
            <motion.div variants={stampUp} className="flex items-center gap-6">
              <h2 className="font-mono text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-accent whitespace-nowrap bg-background px-4 py-2 border border-accent/20 shadow-xl">
                Selected Specimens
              </h2>
              <div className="h-px flex-1 bg-accent/20" />
            </motion.div>
          </div>
        </motion.div>

        {/* Horizontal Track */}
        <motion.div 
          className="flex gap-16 md:gap-32 px-6 md:px-[10vw] w-max items-center h-full"
          style={{ x: xTranslate }}
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              className="project-card flex-shrink-0 w-[85vw] md:w-[1100px] relative bg-background border border-accent/20 p-8 md:p-12 transition-colors duration-0 group hover:bg-white"
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                
                {/* Content Side */}
                <div className="lg:col-span-5 space-y-10">
                  <div className="flex items-start gap-6 border-b border-accent/10 pb-8">
                    <div className="w-16 h-16 bg-foreground text-background flex items-center justify-center flex-shrink-0 font-mono text-lg font-bold border border-accent/20">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="space-y-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent">{project.year}</span>
                      <h3 className="text-4xl md:text-5xl font-black tracking-tighter leading-none text-foreground uppercase">{project.title}</h3>
                      <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-foreground/50">{project.tags.slice(0, 3).join(' / ')}</p>
                    </div>
                  </div>
                  
                  <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-serif italic border-l-2 border-accent/20 pl-8 md:min-h-[120px]">
                    {project.longDescription}
                  </p>

                  <div className="pt-4 flex items-center gap-4">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-3 text-[10px] font-mono font-bold uppercase tracking-[0.3em] px-8 py-4 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors duration-300 pointer-events-auto"
                    >
                      Visit Live
                      <motion.span variants={arrowIn}>→</motion.span>
                    </a>
                  </div>
                </div>

                {/* Visual Side */}
                <div className="lg:col-span-7 relative">
                  <div className="relative transform transition-transform duration-700 group-hover:scale-[1.02]">
                    <div className="aspect-[16/10] shadow-2xl overflow-hidden bg-background border border-accent/20 relative flex flex-col">
                      {/* Minimal Browser Bar */}
                      <div className="h-8 bg-background border-b border-accent/20 flex items-center px-4 gap-2 z-20 shrink-0">
                        <div className="w-2 h-2 rounded-full bg-accent-sage/30 group-hover:bg-accent-sage transition-colors duration-500"></div>
                        <div className="w-2 h-2 rounded-full bg-highlight/30 group-hover:bg-highlight transition-colors duration-500"></div>
                        <div className="w-2 h-2 rounded-full bg-accent/30 group-hover:bg-accent transition-colors duration-500"></div>
                        <div className="ml-2 font-mono text-[9px] text-foreground/40 tracking-widest uppercase truncate group-hover:text-foreground/80 transition-colors duration-500">
                          {project.link.replace('https://', '')}
                        </div>
                      </div>
                      
                      {/* Content Area */}
                      <div className="relative flex-1 bg-white overflow-hidden">
                        {project.allowEmbed && project.link ? (
                          <div className="absolute inset-0 w-[160%] h-[160%] origin-top-left scale-[0.625] bg-white">
                            <iframe 
                              src={project.link} 
                              className="w-full h-full border-0 pointer-events-none group-hover:pointer-events-auto transition-all grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 duration-700"
                              title={project.title}
                              loading="lazy"
                            />
                          </div>
                        ) : project.image ? (
                          <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                        ) : (
                          <div className="absolute inset-0 w-full h-full flex items-center justify-center font-mono text-xs uppercase tracking-[0.2em] text-foreground/50 bg-background">
                            Live Project
                          </div>
                        )}
                        <div className="absolute inset-0 border border-accent/10 pointer-events-none z-10 shadow-[inset_0_0_20px_rgba(0,0,0,0.05)]"></div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              
              {/* Structural lines inside the card for blueprint effect */}
              <motion.div className="absolute top-0 bottom-0 left-8 w-px bg-accent/10 pointer-events-none hidden md:block" />
              <motion.div className="absolute top-0 bottom-0 right-8 w-px bg-accent/10 pointer-events-none hidden md:block" />
            </motion.article>
          ))}
          
          {/* End Cap */}
          <div className="flex-shrink-0 w-[20vw] flex items-center">
             <div className="h-px w-full bg-accent/20"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
