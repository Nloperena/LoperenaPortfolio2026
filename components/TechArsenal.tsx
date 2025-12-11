'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Globe, Layers, Server, Zap, Cpu, Box, Network, Shield, TrendingUp } from 'lucide-react';

const TechArsenal = () => {
  const techCategories = [
    {
      id: 'frontend',
      label: 'Frontend',
      icon: Layers,
      tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
      color: '#B87333'
    },
    {
      id: 'cms',
      label: 'CMS & Systems',
      icon: Database,
      tech: ['Shopify', 'Supabase', 'PostgreSQL', 'Sanity', 'Node.js', 'Python'],
      color: '#006400'
    },
    {
      id: 'growth',
      label: 'Growth & Ops',
      icon: TrendingUp, // Using TrendingUp for Growth, or maybe Server/Cloud
      tech: ['AWS', 'Vercel', 'Docker', 'CI/CD', 'Analytics', 'SEO'],
      color: '#800000' // Keeping maroon for this category
    }
  ];

  return (
    <section id="tech-stack" className="bg-[#F2F0E6] dark:bg-[#0A1F1C] py-24 border-t double-line border-[#111111]/10 dark:border-white/10 relative transition-colors duration-300 bg-paper-grain" style={{ borderStyle: 'double', borderWidth: '3px', borderLeft: 'none', borderRight: 'none', borderBottom: 'none' }}>
      {/* Swiss Grid Lines */}
      <div className="absolute inset-0 pointer-events-none max-w-[1600px] mx-auto px-6 md:px-12 border-x border-[#1C1B1A]/20 dark:border-white/10">
         <div className="absolute left-1/3 top-0 bottom-0 w-px bg-[#1C1B1A]/20 dark:bg-white/10 hidden lg:block" />
         <div className="absolute right-1/3 top-0 bottom-0 w-px bg-[#1C1B1A]/20 dark:bg-white/10 hidden lg:block" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 border-b double-line border-[#1C1B1A]/20 dark:border-white/10 pb-8 mb-8"
          style={{ borderStyle: 'double', borderWidth: '3px', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 items-end gap-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="h-px w-12 bg-[#B87333]"></span>
                <span className="font-mono text-xs text-[#B87333] uppercase tracking-widest">TECHNICAL CAPABILITIES</span>
              </div>
              <h2 className="font-serif text-5xl md:text-6xl font-bold text-[#1C1B1A] dark:text-white leading-tight ink-bleed">
                Tools & Technologies
              </h2>
            </div>
            <div className="lg:pl-12 lg:border-l border-[#1C1B1A]/20 dark:border-white/10">
              <p className="text-[#1C1B1A]/60 dark:text-white/60 font-serif italic text-lg">
                <em>&quot;Strategic selections for precise outcomes.&quot;</em>
              </p>
            </div>
          </div>
        </motion.div>

        {/* 3-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {techCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col gap-6 p-6 border border-[#111111]/30 dark:border-white/30"
              >
                {/* Header */}
                <div className="flex items-center gap-4 pb-4 border-b double-line border-[#1C1B1A]/20 dark:border-white/20" style={{ borderStyle: 'double', borderWidth: '3px', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
                    <div 
                      className="p-3 rounded-sm flex-shrink-0"
                      style={{ backgroundColor: `${category.color}15` }}
                    >
                      <IconComponent 
                        className="w-6 h-6" 
                        style={{ color: category.color }}
                      />
                    </div>
                    <h3 className="font-mono text-sm uppercase tracking-widest text-[#1C1B1A] dark:text-white font-bold leading-tight">
                      {category.label}
                    </h3>
                </div>

                {/* List - Styled like Specimen Labels */}
                <ul className="space-y-3">
                    {category.tech.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 border-l-2 border-[#B87333]/20 pl-3 py-1">
                            <span className="font-mono text-xs text-[#B87333] mt-1.5 w-6">{String(i + 1).padStart(2, '0')}.</span>
                            <span className="font-serif text-base text-[#1C1B1A] dark:text-white/90 font-normal italic">{item}</span>
                        </li>
                    ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Philosophy Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 p-8 border-t double-line border-b double-line border-[#111111] dark:border-white/20"
          style={{ borderStyle: 'double', borderWidth: '3px', borderLeft: 'none', borderRight: 'none' }}
        >
          <h3 className="font-mono text-xs uppercase tracking-widest text-[#1C1B1A]/40 dark:text-white/40 mb-6 flex items-center gap-2">
            <Shield size={14} /> Core Principles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-serif text-lg text-[#1C1B1A] dark:text-white italic mb-2">Fault Tolerance</h4>
              <p className="font-serif text-base text-[#1C1B1A]/70 dark:text-white/70 leading-relaxed italic">Systems engineered for resilient performance and automatic recovery.</p>
            </div>
            <div>
              <h4 className="font-serif text-lg text-[#1C1B1A] dark:text-white italic mb-2">Scalability Focus</h4>
              <p className="font-serif text-base text-[#1C1B1A]/70 dark:text-white/70 leading-relaxed italic">Architecture that adapts seamlessly to business expansion.</p>
            </div>
            <div>
              <h4 className="font-serif text-lg text-[#1C1B1A] dark:text-white italic mb-2">Legacy Optimization</h4>
              <p className="font-serif text-base text-[#1C1B1A]/70 dark:text-white/70 leading-relaxed italic">Converting existing technical challenges into competitive strengths.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Cloud icon component (simple cloud shape)
const Cloud = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  </svg>
);

export default TechArsenal;
