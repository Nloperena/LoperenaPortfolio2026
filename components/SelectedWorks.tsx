'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, Database, Box, Building, ArrowRight, Code2, Globe, Layers, Cpu, Github, ExternalLink } from 'lucide-react';
import CADProjectCard from './CADProjectCard';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 'rugged-red',
    title: 'RuggedRed',
    role: 'Lead Architect',
    year: '2024',
    outcome: '+41% Organic Revenue Increase',
    challenge: 'Legacy platform struggling with performance and ad-dependency.',
    craft: 'Headless React/AWS architecture with custom analytics.',
    result: 'Record revenue quarter with zero ad-spend.',
    legacyLens: 'Like 1836 Puerto Rico builds, this delivers compounding 41% revenue via precision architecture.',
    techDetails: ['React', 'AWS', 'Node.js', 'Headless Architecture'],
    fig: 'FIG 1.1',
    image: '/RuggedRed.png',
    embedUrl: 'https://ruggedred.com',
    link: '/projects/vito-fryfilter', // Keep existing link for now
    demoLink: 'https://ruggedred.com',
    repoLink: '#'
  },
  {
    id: 'vito-shop',
    title: 'VITO Fry Filter',
    role: 'Full-Stack Developer',
    year: '2023',
    outcome: '+285% Traffic Growth',
    challenge: 'Need for dual-market positioning (Industrial vs Household).',
    craft: 'Next.js e-commerce with split-screen hero & Shopify integration.',
    result: '70+ record-breaking video testimonials captured.',
    legacyLens: 'Like foundational infrastructure, this platform serves both industrial and household needs—one solution, two markets.',
    techDetails: ['Next.js', 'Shopify', 'Custom E-commerce', 'Video Integration'],
    fig: 'FIG 1.2',
    image: '/VITOShop.png',
    // embedUrl: 'https://shop.vitofryfilter.com', // Reverted per user request
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
  return (
    <section id="selected-works" className="w-full bg-[#F5F5DC] dark:bg-[#0A1F1C] relative py-24 border-t border-[#1C1B1A]/20 dark:border-white/10 transition-colors duration-300">
      
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
        <div className="grid grid-cols-1 lg:grid-cols-2 items-end border-b border-[#1C1B1A] dark:border-white/20 pb-8">
           <div>
              <span className="font-mono text-xs text-[#800000] dark:text-[#E2725B] uppercase tracking-[0.3em] block mb-4">III. Portfolio</span>
              <h2 className="font-serif text-6xl md:text-7xl text-[#1C1B1A] dark:text-white">Built to Last</h2>
           </div>
           <div className="lg:text-right lg:pl-12">
              <p className="text-[#1C1B1A]/60 dark:text-white/60 font-serif italic text-lg max-w-md ml-auto">
                 Select works demonstrating the intersection of heritage craftsmanship and digital scale.
              </p>
           </div>
        </div>
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
              className="grid grid-cols-1 lg:grid-cols-2 border-b border-[#1C1B1A]/20 dark:border-white/10 relative group min-h-[650px] hover:bg-[#F5F5DC]/30 dark:hover:bg-white/5 transition-colors duration-500"
            >
              
              {/* Vertical Divider for Grid */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#1C1B1A]/20 dark:bg-white/10 hidden lg:block z-0" />

              {/* Text Side */}
              <div className={`p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10 bg-[#F5F5DC]/50 dark:bg-[#0A1F1C]/50 lg:bg-transparent ${isEven ? 'order-1 lg:pr-24' : 'order-1 lg:order-2 lg:pl-24'}`}>
                <div className="mb-4 flex items-center justify-between">
                   <div className="font-serif text-xl italic text-[#E2725B]">{project.year}</div>
                   <div className="font-mono text-xs text-[#1C1B1A]/40 dark:text-white/40">PROJ. 00{index + 1}</div>
                </div>
                
                <h3 className="font-serif text-4xl md:text-5xl text-[#1C1B1A] dark:text-white mb-4 leading-tight group-hover:text-[#006400] dark:group-hover:text-[#E2725B] transition-colors duration-500 font-bold">{project.title}</h3>
                
                <div className="mb-8">
                  <span className="inline-block px-3 py-1 bg-[#E2725B]/10 dark:bg-[#E2725B]/20 text-[#E2725B] font-mono text-xs uppercase tracking-widest border border-[#E2725B]/20">
                    {project.role}
                  </span>
                </div>

                {/* Outcome Line - Bold */}
                <div className="mb-8 pb-8 border-b border-[#1C1B1A]/10 dark:border-white/10">
                    <p className="font-sans text-xl md:text-2xl font-bold text-[#1C1B1A] dark:text-white leading-tight">
                        {project.outcome}
                    </p>
                </div>
                
                {/* 3 Bullets: Challenge / Craft / Result */}
                <div className="space-y-4 mb-8">
                  <div className="flex gap-4">
                     <span className="font-mono text-xs uppercase tracking-widest text-[#E2725B] w-24 flex-shrink-0 pt-1">Challenge</span>
                     <p className="font-sans text-sm text-[#1C1B1A]/80 dark:text-white/80 leading-relaxed">{project.challenge}</p>
                  </div>
                  <div className="flex gap-4">
                     <span className="font-mono text-xs uppercase tracking-widest text-[#006400] dark:text-[#4ade80] w-24 flex-shrink-0 pt-1">Craft</span>
                     <p className="font-sans text-sm text-[#1C1B1A]/80 dark:text-white/80 leading-relaxed">{project.craft}</p>
                  </div>
                  <div className="flex gap-4">
                     <span className="font-mono text-xs uppercase tracking-widest text-[#800000] dark:text-[#f87171] w-24 flex-shrink-0 pt-1">Result</span>
                     <p className="font-sans text-sm text-[#1C1B1A]/80 dark:text-white/80 leading-relaxed">{project.result}</p>
                  </div>
                </div>

                <div className="mt-auto pt-8 flex flex-wrap gap-4">
                  <Link 
                    href={project.link} 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#1C1B1A] dark:bg-white text-[#F5F5DC] dark:text-[#0A1F1C] font-mono text-xs uppercase tracking-widest hover:bg-[#E2725B] dark:hover:bg-[#E2725B] hover:text-white dark:hover:text-white transition-all shadow-md"
                  >
                    View Case Study <ArrowRight size={14} />
                  </Link>
                  
                  {project.demoLink && (
                    <a 
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-[#1C1B1A]/20 dark:border-white/20 text-[#1C1B1A] dark:text-white font-mono text-xs uppercase tracking-widest hover:border-[#E2725B] hover:text-[#E2725B] dark:hover:text-[#E2725B] transition-all"
                    >
                      <Globe size={14} /> Live Site
                    </a>
                  )}
                </div>
              </div>

              {/* Visual Side - Full Bleed Screenshots */}
              <div className={`${project.id === 'vito-shop' ? 'bg-[#006400]/5 dark:bg-[#006400]/10' : 'bg-[#F9F5F1] dark:bg-[#1a1a1a]'} relative z-10 flex flex-col border-[#1C1B1A]/20 dark:border-white/10 ${isEven ? 'order-2 border-t lg:border-t-0 lg:border-l' : 'order-2 lg:order-1 border-t lg:border-t-0 lg:border-r'}`}>
                <div className="w-full h-full relative group-hover:shadow-2xl transition-shadow duration-500">
                  {/* Project Screenshot - Full Width, Hero Size */}
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="relative w-full aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden cursor-pointer"
                  >
                      {project.embedUrl ? (
                        <>
                          <div className="absolute top-4 left-4 font-mono text-[10px] text-white uppercase tracking-widest z-10 bg-[#0A1F1C]/80 px-3 py-1.5 backdrop-blur-sm pointer-events-none">LIVE PREVIEW</div>
                          <iframe 
                            src={project.embedUrl}
                            title={project.title}
                            className="w-full h-full border-0"
                            loading="lazy"
                          />
                          {/* Hover Glow Effect */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F1C]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                          <div className="absolute inset-0 ring-2 ring-[#E2725B]/0 group-hover:ring-[#E2725B]/50 transition-all duration-300 pointer-events-none"></div>
                        </>
                      ) : project.image ? (
                        <>
                          <div className="absolute top-4 left-4 font-mono text-[10px] text-white uppercase tracking-widest z-10 bg-[#0A1F1C]/80 px-3 py-1.5 backdrop-blur-sm">REF: {project.fig}</div>
                          <img
                            src={project.image}
                            alt={`${project.title} - Project Screenshot`}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                          />
                          {/* Hover Glow Effect */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F1C]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute inset-0 ring-2 ring-[#E2725B]/0 group-hover:ring-[#E2725B]/50 transition-all duration-300"></div>
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
    </section>
  );
};

export default SelectedWorks;
