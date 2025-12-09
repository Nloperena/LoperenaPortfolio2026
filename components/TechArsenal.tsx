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
      color: '#E2725B'
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
      color: '#800000'
    }
  ];

  return (
    <section id="tech-stack" className="bg-[#F8F4F0] dark:bg-[#0A1F1C] py-24 border-t border-[#1C1B1A]/10 dark:border-white/10 relative transition-colors duration-300">
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
          className="mb-16 border-b border-[#1C1B1A]/20 dark:border-white/10 pb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 items-end gap-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="h-px w-12 bg-[#E2725B]"></span>
                <span className="font-mono text-xs text-[#E2725B] uppercase tracking-widest">II. Technical Arsenal</span>
              </div>
              <h2 className="font-serif text-5xl lg:text-6xl text-[#1C1B1A] dark:text-white leading-tight">
                Tools & Technologies
              </h2>
            </div>
            <div className="lg:pl-12 lg:border-l border-[#1C1B1A]/20 dark:border-white/10">
              <p className="text-[#1C1B1A]/60 dark:text-white/60 font-serif italic text-lg">
                &quot;The right tools for the right problem. Every technology choice is a strategic decision.&quot;
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
                className="flex flex-col gap-6"
              >
                {/* Header */}
                <div className="flex items-center gap-4 pb-4 border-b border-[#1C1B1A]/20 dark:border-white/20 w-full">
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

                {/* List */}
                <ul className="space-y-5">
                    {category.tech.map((item, i) => (
                        <li key={i} className="flex items-center gap-3 py-2 border-b border-[#1C1B1A]/10 dark:border-white/10">
                            <span className="w-1.5 h-1.5 bg-[#1C1B1A]/40 dark:bg-white/40 rounded-full flex-shrink-0" style={{ marginTop: '0.125rem' }} />
                            <span className="font-sans text-lg text-[#1C1B1A] dark:text-white/90 font-medium leading-tight">{item}</span>
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
          className="mt-20 p-8 bg-[#F9F5F1] dark:bg-[#1a1a1a] border border-[#1C1B1A] dark:border-white/20 shadow-[4px_4px_0px_0px_rgba(28,27,26,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]"
        >
          <h3 className="font-mono text-xs uppercase tracking-widest text-[#1C1B1A]/40 dark:text-white/40 mb-6 flex items-center gap-2">
            <Shield size={14} /> Core Principles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-serif text-lg text-[#1C1B1A] dark:text-white italic mb-2">&quot;Fault Tolerance&quot;</h4>
              <p className="font-sans text-base text-[#1C1B1A]/70 dark:text-white/70 leading-relaxed">Systems designed to fail gracefully and recover automatically.</p>
            </div>
            <div>
              <h4 className="font-serif text-lg text-[#1C1B1A] dark:text-white italic mb-2">&quot;Scalability First&quot;</h4>
              <p className="font-sans text-base text-[#1C1B1A]/70 dark:text-white/70 leading-relaxed">Architecture that grows with your business, not against it.</p>
            </div>
            <div>
              <h4 className="font-serif text-lg text-[#1C1B1A] dark:text-white italic mb-2">&quot;Legacy Refactoring&quot;</h4>
              <p className="font-sans text-base text-[#1C1B1A]/70 dark:text-white/70 leading-relaxed">Transforming technical debt into strategic advantage.</p>
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
