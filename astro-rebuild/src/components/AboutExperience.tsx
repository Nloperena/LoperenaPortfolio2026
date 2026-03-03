import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { stackTechnologies, stackCopy } from '../data/stack';

const experience = [
  {
    year: '2025 - PRESENT',
    role: 'SENIOR FULL-STACK ENGINEER (TECH LEAD)',
    company: 'FORZA',
    description: 'Lead architect for flagship digital products (ForzaBuilt.com, RuggedRed.com). Developing customer support agents via Google Gemini API and built internal product/media management portals using Vite, React, PostgreSQL, and Heroku.'
  },
  {
    year: '2024 - PRESENT',
    role: 'SENIOR CONSULTANT — AI & WEB',
    company: 'INDEPENDENT',
    description: 'Designing and delivering custom AI solutions that automate business workflows. Building high-performance web applications optimized for Core Web Vitals and advising on digital transformation strategy.'
  },
  {
    year: '2023 - 2024',
    role: 'DIR. OF DIGITAL MARKETING & DEV',
    company: 'VITO FRYFILTER',
    description: 'Architected a complete Shopify e-commerce ecosystem producing 285% YoY traffic growth. Built automated testimonial systems and designed data-segmented email marketing funnels achieving 30% open rates.'
  },
  {
    year: '2022 - 2024',
    role: 'FULL-STACK WEB DEVELOPER',
    company: 'VILLA MARKETERS',
    description: 'Managed technical infrastructure for 15+ WordPress sites with 99%+ uptime. Implemented custom PHP/React functionality and executed technical SEO strategies for high-competition keywords.'
  },
  {
    year: '2020 - 2023',
    role: 'IT ADMINISTRATOR & DEVELOPER',
    company: 'FURNITURE PACKAGES USA',
    description: 'Owned the entire IT infrastructure while building early internal automation tools to connect inventory and marketing data. Served as primary technical advisor for operational requirements.'
  }
];

const SplitText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.04, delayChildren: delay } }
      }}
      className="inline-block"
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20, rotateX: -90, filter: 'blur(4px)' },
            visible: { 
              opacity: 1, 
              y: 0, 
              rotateX: 0,
              filter: 'blur(0px)',
              transition: { type: "spring", damping: 15, stiffness: 400 }
            }
          }}
          className="inline-block origin-bottom"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export const AboutExperience = () => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full relative block bg-background pb-0">
      
      {/* SECTION 1: HERO (Sticks to Top) */}
      <section className="sticky top-0 min-h-screen w-full flex items-center justify-center bg-background z-10 overflow-hidden px-4 md:px-8 border-b border-accent/20">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #7D6B5D 1px, transparent 1px), linear-gradient(to bottom, #7D6B5D 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative z-10 pt-32 pb-16">
          <div className="flex flex-col justify-center">
            <div className="font-mono text-[10px] md:text-xs font-bold tracking-[0.3em] text-accent/50 uppercase mb-8">
              <SplitText text="[ ABOUT ME ]" />
            </div>
            <h1 className="text-[clamp(3rem,6vw,8rem)] break-words font-sans font-black tracking-tighter leading-[0.9] text-foreground uppercase mb-8">
              <SplitText text="SYSTEMS." />
              <br />
              <SplitText text="STRATEGY." delay={0.4} />
            </h1>
          </div>
          
          <div className="flex flex-col justify-center">
            <motion.p 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-sans text-2xl lg:text-3xl leading-relaxed text-foreground/80 font-light mb-12"
            >
              Senior software engineer with 7+ years building full-stack applications, with a sharp focus on integrating AI into real product workflows. I bring a practical, ROI-driven perspective: systems built at previous roles continue generating measurable results long after handoff.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              <a 
                href="/Nicholas_Loperena_Resume.pdf" 
                download="Nicholas_Loperena_Resume.pdf"
                className="inline-flex items-center gap-4 bg-foreground text-background py-5 px-8 font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-highlight hover:text-foreground transition-all duration-300 group"
              >
                DOWNLOAD RESUME
                <span className="font-mono text-lg leading-none -mt-0.5 transition-transform duration-300 group-hover:translate-y-1">↓</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: EXPERIENCE LEDGER (Sticks to Top) */}
      <section className="sticky top-0 min-h-screen w-full bg-white text-black z-20 flex flex-col justify-center pt-32 pb-32 px-4 md:px-8">
         <div className="max-w-[1400px] w-full mx-auto flex flex-col">
            <div className="mb-16 overflow-hidden">
              <motion.h2 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(3rem,5vw,6rem)] font-black uppercase tracking-tighter leading-none"
              >
                Experience
              </motion.h2>
            </div>
            
            <div className="flex flex-col flex-1">
              <div className="grid grid-cols-12 gap-4 pb-4 border-b border-black/20 text-black/50">
                <div className="col-span-3 lg:col-span-2 font-mono text-[10px] font-bold uppercase tracking-widest hidden md:block">YEAR</div>
                <div className="col-span-12 md:col-span-4 lg:col-span-4 font-mono text-[10px] font-bold uppercase tracking-widest">ROLE</div>
                <div className="col-span-4 md:col-span-4 lg:col-span-4 font-mono text-[10px] font-bold uppercase tracking-widest hidden md:block">ORGANIZATION</div>
                <div className="col-span-4 md:col-span-1 lg:col-span-2 font-mono text-[10px] font-bold uppercase tracking-widest text-right hidden md:block">DETAILS</div>
              </div>

              {experience.map((job, idx) => {
                const isExpanded = expandedRow === idx;
                return (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    className="flex flex-col border-b border-black/10 last:border-b-0 group/row"
                  >
                    <button 
                      onClick={() => setExpandedRow(isExpanded ? null : idx)}
                      className="w-full grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 py-8 items-start md:items-center text-left hover:bg-black/5 transition-colors duration-300 cursor-pointer relative md:px-4 md:-mx-4"
                    >
                      <div className="col-span-1 md:col-span-3 lg:col-span-2 font-mono text-xs text-black/60 mb-1 md:mb-0">{job.year}</div>
                      <div className="col-span-1 md:col-span-4 lg:col-span-4 font-sans text-xl md:text-2xl font-bold uppercase tracking-widest text-black">{job.role}</div>
                      <div className="col-span-1 md:col-span-4 lg:col-span-4 font-sans text-sm md:text-base uppercase tracking-widest text-black/70 mt-1 md:mt-0">{job.company}</div>
                      <div className="col-span-1 md:col-span-1 lg:col-span-2 flex justify-end items-center absolute top-8 right-0 md:relative md:top-0">
                        <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-black/40 group-hover/row:text-black transition-colors">
                          <span className="hidden lg:inline-block">{isExpanded ? 'Show less' : 'Read more'}</span>
                          <span className={`text-2xl leading-none transition-transform duration-300 ${isExpanded ? 'rotate-45' : 'rotate-0'}`}>+</span>
                        </span>
                      </div>
                    </button>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden bg-black/[0.02] md:-mx-4 md:px-4"
                        >
                          <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-8">
                            <div className="md:col-span-3 lg:col-span-2 hidden md:block">
                               <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">WHAT I DID</span>
                            </div>
                            <div className="md:col-span-9 lg:col-span-8">
                              <p className="font-sans text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-black/80">
                                {job.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
         </div>
      </section>

      {/* SECTION 3: What I work with — same content as Skills ribbon, fitted here */}
      <section className="sticky top-0 min-h-screen w-full bg-[#0a0a0a] text-[#ededed] z-30 flex flex-col">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col flex-1 min-h-0">
          {/* Top row: Structural redesign */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col bg-[#0a0a0a]">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 mb-12"
            >
              {stackCopy.eyebrow}
            </motion.span>
            
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 justify-between items-start">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-[clamp(3rem,6vw,6rem)] font-black uppercase tracking-tighter leading-[0.9] text-[#ededed] max-w-3xl"
              >
                {stackCopy.headline}
              </motion.h2>
              
              <div className="flex flex-col gap-8 max-w-md w-full shrink-0 pt-2 lg:pt-4">
                <motion.p
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                  className="text-lg md:text-xl font-light leading-relaxed text-neutral-400"
                >
                  {stackCopy.description}
                </motion.p>
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as unknown as { openContactHub?: () => void }).openContactHub) {
                      (window as unknown as { openContactHub: () => void }).openContactHub();
                    }
                  }}
                  className="inline-flex items-center justify-between gap-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#ededed] hover:text-[#0a0a0a] border border-neutral-700 hover:bg-[#ededed] hover:border-[#ededed] py-4 px-6 transition-all duration-300 group"
                >
                  {stackCopy.ctaButton}
                  <span className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1">→</span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Infinite marquee — same as ribbon */}
          <div className="relative w-full py-8 md:py-12 overflow-hidden flex items-center bg-[#0a0a0a] flex-1 min-h-[200px]" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            <motion.div
              className="flex whitespace-nowrap"
              animate={shouldReduceMotion ? { x: 0 } : { x: ['0%', '-33.333%'] }}
              transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
            >
              {[...stackTechnologies, ...stackTechnologies, ...stackTechnologies].map((tech, i) => {
                const TechIcon = tech.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-6 px-8 md:px-10 text-[#ededed] text-[4vw] md:text-[3vw] font-bold tracking-tight uppercase leading-none select-none"
                  >
                    {TechIcon ? (
                      <TechIcon className="text-[0.9em] text-[#ededed] shrink-0" />
                    ) : (
                      <span className="text-[0.75em] text-neutral-500 shrink-0">■</span>
                    )}
                    <span>{tech.name}</span>
                    <span className="text-neutral-600">//</span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4: EDUCATION (Sticks to Top) */}
      <section className="sticky top-0 min-h-[90vh] w-full bg-background z-40 flex flex-col justify-center pt-32 pb-32 px-4 md:px-8">
        <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <div className="overflow-hidden mb-8">
              <motion.h2 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(3rem,5vw,6rem)] font-black uppercase tracking-tighter leading-none text-foreground"
              >
                Education
              </motion.h2>
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="font-sans text-xl md:text-2xl font-light text-foreground/60 max-w-md"
            >
              Here’s where I’ve learned the craft—and keep learning.
            </motion.p>
          </div>

          <div className="flex flex-col gap-16 lg:border-l border-foreground/10 lg:pl-16 relative">
            <div className="absolute top-0 bottom-0 left-0 w-px bg-accent/30 scale-y-0 transform origin-top hidden lg:block" />
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative"
            >
              <div className="flex items-center gap-4 mb-8">
                <img src="/ucf.webp" alt="University of Central Florida seal" className="h-14 w-14 object-contain shrink-0" width={56} height={56} />
                <h3 className="font-sans text-2xl md:text-3xl font-bold uppercase tracking-widest text-foreground">
                  University of Central Florida
                </h3>
              </div>
              <div className="space-y-8">
                <div className="group">
                  <span className="font-mono text-sm md:text-base uppercase tracking-widest text-accent mb-2 block">2019 - 2020</span>
                  <span className="font-sans text-lg md:text-xl text-foreground/80 group-hover:text-foreground transition-colors duration-300">Cyber Defense Professional Certificate</span>
                </div>
                <div className="group">
                  <span className="font-mono text-sm md:text-base uppercase tracking-widest text-accent mb-2 block">2019</span>
                  <span className="font-sans text-lg md:text-xl text-foreground/80 group-hover:text-foreground transition-colors duration-300">Full-Stack Web Development Bootcamp</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative"
            >
              <div className="flex items-center gap-4 mb-8">
                <img src="/valencia-college.webp" alt="Valencia College seal" className="h-14 w-14 object-contain shrink-0" width={56} height={56} />
                <h3 className="font-sans text-2xl md:text-3xl font-bold uppercase tracking-widest text-foreground">
                  Valencia College
                </h3>
              </div>
              <div className="group">
                <span className="font-mono text-sm md:text-base uppercase tracking-widest text-accent mb-2 block">2015 - 2016</span>
                <span className="font-sans text-lg md:text-xl text-foreground/80 group-hover:text-foreground transition-colors duration-300">Business Certificate</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Spacer removed - let layout footer handle flow */}
    </div>
  );
};
