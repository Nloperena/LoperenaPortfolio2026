'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Zap, Database, Box, Building, ArrowRight, Code2, Globe, Layers, Cpu, Github, ExternalLink } from 'lucide-react';
import CADProjectCard from './CADProjectCard';
import CaseStudyDrawer from './CaseStudyDrawer';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 'rugged-red',
    title: 'RuggedRed',
    role: 'Lead Architect',
    year: '2024',
    outcome: '+41% Organic Revenue Growth',
    challenge: 'Outdated platform reliant on ads, with performance issues.',
    craft: 'Headless React/AWS architecture integrated with custom analytics.',
    result: 'Record revenue without advertising expenditure.',
    legacyLens: 'Like 1836 Puerto Rico builds, this delivers compounding 41% revenue via precision architecture.',
    techDetails: ['React', 'AWS', 'Node.js', 'Headless Architecture'],
    fig: 'FIG 1.1',
    image: '/RuggedRed.png',
    embedUrl: 'https://ruggedred.com',
    link: '/projects/vito-fryfilter',
    demoLink: 'https://ruggedred.com',
    repoLink: '#'
  },
  {
    id: 'vito-shop',
    title: 'VITO Fryfilter',
    role: 'Director of Marketing',
    year: '2024',
    outcome: 'A 584% increase in engagement proved that B2B industrial equipment doesn\'t have to be boring.',
    challenge: 'Legacy sales methods without e-commerce; limited U.S. brand visibility; absence of ROI tracking systems.',
    craft: 'Three-phase strategy: Brand refinement (32MB manual with 3D renders emphasizing German precision); E-commerce build (custom Shopify with JavaScript validation); Targeted marketing (account-based outreach to McDonald\'s, Burger King, Jollibee).',
    result: 'Revenue: +$40k (19% growth). Traffic: 285% YoY increase. Engagement: 584% rise in interactions (6x industry average). Partnerships: Secured with McDonald\'s USA, Burger King, Dunkin\'.',
    abstract: 'Transforming a traditional B2B equipment manufacturer into a data-driven U.S. leader. By aligning brand strategy with full-stack development, we achieved 19% revenue growth and partnerships with major QSR brands like McDonald\'s.',
    fig: 'EXHIBIT A',
    image: '/VITOShop.png',
    link: '/projects/vito-fryfilter',
    demoLink: '#',
    repoLink: '#'
  },
  {
    id: 'furniture-packages',
    title: 'Furniture Packages USA',
    role: 'Systems Architect',
    year: '2022',
    outcome: '80% Reduction in Manual Entry',
    challenge: 'B2B logistics bottlenecked by manual processes.',
    craft: 'Custom Next.js/Supabase platform with automated workflows.',
    result: 'End-to-end workflow visibility and vendor automation.',
    legacyLens: 'Streamlining operations to create a self-sustaining system, mirroring the efficiency of well-planned infrastructure.',
    techDetails: ['Next.js', 'Supabase', 'B2B APIs', 'Workflow Automation'],
    fig: 'FIG 1.3',
    image: '/FPUSA.png',
    embedUrl: 'https://furniturepackagesusa.com',
    link: '#',
    demoLink: '#',
    repoLink: '#'
  }
];

const SelectedWorks = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleViewCaseStudy = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setIsDrawerOpen(true);
  };

  return (
    <section id="selected-works" className="w-full bg-[#F2F0E6] dark:bg-[#0A1F1C] relative py-24 border-t double-line border-[#111111]/20 dark:border-white/10 transition-colors duration-300 bg-paper-grain" style={{ borderStyle: 'double', borderWidth: '3px', borderLeft: 'none', borderRight: 'none', borderBottom: 'none' }}>
      
      {/* Swiss Grid Lines - Global for section */}
      <div className="absolute inset-0 pointer-events-none max-w-[1600px] mx-auto px-6 md:px-12 border-x border-[#1C1B1A]/20 dark:border-white/10">
         <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#1C1B1A]/20 dark:bg-white/10 hidden lg:block" />
      </div>

      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-[1600px] mx-auto px-6 md:px-12 mb-24 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 items-end border-b double-line border-[#1C1B1A] dark:border-white/20 pb-8 mb-8" style={{ borderStyle: 'double', borderWidth: '3px', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
           <div>
              <span className="font-mono text-xs text-[#800000] dark:text-[#B87333] uppercase tracking-[0.3em] block mb-4">PORTFOLIO</span>
              <h2 className="font-serif text-5xl md:text-6xl font-bold text-[#111111] dark:text-white ink-bleed">Built to Endure</h2>
           </div>
           <div className="lg:text-right lg:pl-12">
              <p className="text-[#111111] dark:text-white/60 font-serif italic text-lg max-w-md ml-auto">
                 Selected projects highlighting the integration of craftsmanship and digital scalability.
              </p>
           </div>
        </div>
        
        {/* Ornamental Divider */}
        <div className="ornamental-divider text-[#1C1B1A]/30 dark:text-white/30 mb-12"></div>
      </motion.div>

      <div className="max-w-[1600px] mx-auto border-t border-[#1C1B1A]/20 dark:border-white/10 relative z-10">
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="grid grid-cols-1 lg:grid-cols-2 border-b double-line border-[#1C1B1A]/20 dark:border-white/10 relative group min-h-[650px] hover:bg-[#F5F5DC]/30 dark:hover:bg-white/5 transition-colors duration-500"
              style={{ borderStyle: 'double', borderWidth: '3px', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
            >
              
              {/* Vertical Divider for Grid */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#1C1B1A]/20 dark:bg-white/10 hidden lg:block z-0" />

              {/* Text Side */}
              <div className={`p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10 ${isEven ? 'order-1 lg:pr-24 border-r border-[#111111]/30 dark:border-white/30' : 'order-1 lg:order-2 lg:pl-24 border-l border-[#111111]/30 dark:border-white/30'}`}>
                <div className="mb-4 flex items-center justify-between">
                   <div className="font-serif text-xl italic text-[#B87333]">{project.year}</div>
                   <div className="font-mono text-xs text-[#1C1B1A]/40 dark:text-white/40 uppercase tracking-widest">{project.fig}</div>
                </div>
                
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#111111] dark:text-white mb-4 leading-tight group-hover:text-[#006400] dark:group-hover:text-[#B87333] transition-colors duration-500 ink-bleed">{project.title}</h3>
                
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-[#B87333]/10 dark:bg-[#B87333]/20 text-[#B87333] font-mono text-xs uppercase tracking-widest border border-[#B87333]/20">
                    {project.role}
                  </span>
                </div>

                {/* VITO Special Format - Industrial Report Style */}
                {project.id === 'vito-shop' ? (
                  <>
                    {/* The Abstract */}
                    <div className="mb-6 pb-6 border-b border-[#1C1B1A]/20 dark:border-white/20">
                      <div className="font-mono text-xs uppercase tracking-widest text-[#111111]/60 dark:text-white/60 mb-2">I. THE ABSTRACT</div>
                      <p className="font-serif text-base text-[#111111] dark:text-white/90 leading-relaxed text-justify">{project.abstract}</p>
                    </div>

                    {/* The Friction */}
                    <div className="mb-6 pb-6 border-b border-[#1C1B1A]/20 dark:border-white/20">
                      <div className="font-mono text-xs uppercase tracking-widest text-[#B87333] mb-2">II. THE FRICTION</div>
                      <p className="font-serif text-sm text-[#111111] dark:text-white/80 leading-relaxed text-justify">{project.challenge}</p>
                    </div>

                    {/* The Architecture */}
                    <div className="mb-6 pb-6 border-b border-[#1C1B1A]/20 dark:border-white/20">
                      <div className="font-mono text-xs uppercase tracking-widest text-[#006400] dark:text-[#4ade80] mb-2">III. THE ARCHITECTURE</div>
                      <p className="font-serif text-sm text-[#111111] dark:text-white/80 leading-relaxed text-justify">{project.craft}</p>
                    </div>

                    {/* The Yield - Outcome as Headline */}
                    <div className="mb-8">
                      <div className="font-mono text-xs uppercase tracking-widest text-[#800000] dark:text-[#f87171] mb-2">IV. THE YIELD</div>
                      <p className="font-serif text-xl md:text-2xl font-bold text-[#111111] dark:text-white leading-tight mb-3">
                        {project.outcome}
                      </p>
                      <p className="font-serif text-sm text-[#111111] dark:text-white/80 leading-relaxed text-justify">{project.result}</p>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Standard Format for Other Projects */}
                    <div className="mb-8 pb-8 border-b border-[#1C1B1A]/10 dark:border-white/10">
                        <p className="font-serif text-xl md:text-2xl font-bold text-[#111111] dark:text-white leading-tight">
                            {project.outcome}
                        </p>
                    </div>
                    
                    {/* 3 Bullets: Challenge / Craft / Result */}
                    <div className="space-y-4 mb-8">
                      <div className="flex gap-4">
                         <span className="font-mono text-xs uppercase tracking-widest text-[#B87333] w-24 flex-shrink-0 pt-1">Challenge</span>
                         <p className="font-serif text-sm text-[#111111] dark:text-white/80 leading-relaxed italic text-justify">{project.challenge}</p>
                      </div>
                      <div className="flex gap-4">
                         <span className="font-mono text-xs uppercase tracking-widest text-[#006400] dark:text-[#4ade80] w-24 flex-shrink-0 pt-1">Craft</span>
                         <p className="font-serif text-sm text-[#111111] dark:text-white/80 leading-relaxed italic text-justify">{project.craft}</p>
                      </div>
                      <div className="flex gap-4">
                         <span className="font-mono text-xs uppercase tracking-widest text-[#800000] dark:text-[#f87171] w-24 flex-shrink-0 pt-1">Result</span>
                         <p className="font-serif text-sm text-[#111111] dark:text-white/80 leading-relaxed italic text-justify">{project.result}</p>
                      </div>
                    </div>
                  </>
                )}

                <div className="mt-auto pt-8 flex flex-wrap gap-4">
                  <button
                    onClick={() => handleViewCaseStudy(project)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#111111] dark:bg-white text-[#F2F0E6] dark:text-[#0A1F1C] font-serif text-xs font-bold uppercase tracking-widest hover:bg-[#B87333] dark:hover:bg-[#B87333] hover:text-white dark:hover:text-white transition-all"
                  >
                    View Case Study <ArrowRight size={14} />
                  </button>
                  
                  {project.demoLink && (
                    <a 
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-[#111111]/20 dark:border-white/20 text-[#111111] dark:text-white font-serif text-xs font-medium uppercase tracking-widest hover:border-[#B87333] hover:text-[#B87333] dark:hover:text-[#B87333] transition-all"
                    >
                      <Globe size={14} /> Live Site
                    </a>
                  )}
                </div>
              </div>

              {/* Visual Side - Full Bleed Screenshots with Vintage Frame */}
              <div className={`relative z-10 flex flex-col ${isEven ? 'order-2 border-t lg:border-t-0 lg:border-l border-[#111111]/30 dark:border-white/30' : 'order-2 lg:order-1 border-t lg:border-t-0 lg:border-r border-[#111111]/30 dark:border-white/30'}`}>
                <div className="w-full h-full relative p-4">
                  {/* Project Screenshot - Lithograph/Polaroid Frame Style */}
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="relative w-full aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden cursor-pointer"
                    style={{
                      border: '1px solid #aaa',
                      padding: '10px',
                      background: '#fff',
                      boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
                    }}
                  >
                      {project.embedUrl ? (
                        <>
                          <div className="absolute top-4 left-4 font-mono text-[10px] text-white uppercase tracking-widest z-10 bg-[#0A1F1C]/80 px-3 py-1.5 backdrop-blur-sm pointer-events-none">LIVE PREVIEW</div>
                          <iframe 
                            src={project.embedUrl}
                            title={project.title}
                            className="w-full h-full border-0"
                            loading="lazy"
                            style={{
                              filter: 'sepia(0.8) grayscale(0.2)',
                            }}
                          />
                          {/* Hover Glow Effect */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F1C]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                          <div className="absolute inset-0 ring-2 ring-[#B87333]/0 group-hover:ring-[#B87333]/50 transition-all duration-300 pointer-events-none"></div>
                        </>
                      ) : project.image ? (
                        <>
                          <div className="absolute top-4 left-4 font-mono text-[10px] text-white uppercase tracking-widest z-10 bg-[#0A1F1C]/80 px-3 py-1.5 backdrop-blur-sm">REF: {project.fig}</div>
                          <img
                            src={project.image}
                            alt={`${project.title} - Project Screenshot`}
                            className="w-full h-full object-cover object-top portfolio-image"
                            style={{
                              filter: 'sepia(0.8) grayscale(0.2)',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.filter = 'none';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.filter = 'sepia(0.8) grayscale(0.2)';
                            }}
                          />
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center border border-[#1C1B1A]/5 bg-[#F8F4F0] p-8">
                          <CADProjectCard title={project.title} fig={project.fig} icon={Zap} />
                        </div>
                      )}
                  </motion.div>
                </div>
              </div>

            </motion.div>
          );
        })}

      </div>

      {/* Case Study Drawer */}
      <CaseStudyDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        project={selectedProject}
      />
    </section>
  );
};

export default SelectedWorks;
