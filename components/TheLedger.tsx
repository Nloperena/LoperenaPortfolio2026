'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Scroll, PenTool, History, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const articles = [
  {
    id: 4,
    title: 'Medieval Forms in Modern UX',
    excerpt: 'How the structural principles of 12th-century fortresses apply to cybersecurity and user trust in today\'s digital landscape.',
    date: 'December 10, 2024',
    category: 'Heritage Fusion',
    readTime: '6 min read',
    icon: History,
    image: 'https://images.unsplash.com/photo-1599619351208-3e6c839d6828?w=800&q=80'
  },
  {
    id: 2,
    title: 'The 100-Year Codebase',
    excerpt: 'Modern software rots fast. By applying the principles of stone masonry to our system architecture, we can build platforms that outlast the trend cycle.',
    date: 'November 04, 2024',
    category: 'System Architecture',
    readTime: '7 min read',
    icon: Scroll,
    image: 'https://images.unsplash.com/photo-1531502773384-67275b74d938?w=800&q=80'
  },
  {
    id: 3,
    title: 'Foundations First',
    excerpt: 'Like a house built on sand, rapid scaling without a solid technical foundation invites collapse. A 9th-generation builder\'s perspective on technical debt.',
    date: 'November 28, 2024',
    category: 'Strategy',
    readTime: '6 min read',
    icon: PenTool,
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80'
  }
];

const TheLedger = () => {
  return (
    <section id="ledger-section" className="w-full bg-[#F5F5DC] dark:bg-[#0A1F1C] py-24 md:py-32 border-t border-[#1C1B1A]/10 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
           <div>
              <span className="font-mono text-xs text-[#800000] dark:text-[#E2725B] uppercase tracking-[0.3em] block mb-4">V. Thought Leadership</span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#1C1B1A] dark:text-white">The Ledger</h2>
           </div>
           <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-[#800000] dark:bg-[#E2725B] hidden md:block"></span>
              <p className="max-w-md text-[#1C1B1A]/70 dark:text-white/70 font-serif italic text-lg text-right md:text-left">
                  &quot;Documenting the intersection of history, craft, and code.&quot;
              </p>
           </div>
        </div>

        {/* Articles Zig-Zag Layout */}
        <div className="space-y-20">
           {articles.map((article, index) => {
             const isEven = index % 2 === 0;
             return (
               <motion.div 
                 key={article.id}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-50px" }}
                 transition={{ duration: 0.6 }}
                 className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center group`}
               >
                 {/* Image / Visual Side */}
                 <div className="w-full md:w-1/2 relative aspect-[3/2] overflow-hidden rounded-sm shadow-md border border-[#1C1B1A]/10 dark:border-white/10 mb-8">
                    <div className="absolute inset-0 bg-[#800000]/20 mix-blend-multiply z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 bg-[#F5F5DC]/10 z-10 opacity-0 group-hover:opacity-20 transition-opacity duration-500 sepia"></div>
                    <Image 
                      src={article.image} 
                      alt={article.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    <div className="absolute top-4 left-4 bg-[#F5F5DC] dark:bg-[#1a1a1a] p-3 rounded-sm z-20 border border-[#1C1B1A]/10 dark:border-white/10 text-[#800000] dark:text-[#E2725B]">
                       <article.icon size={20} />
                    </div>
                 </div>

                 {/* Content Side */}
                 <div className="w-full md:w-1/2 space-y-8">
                    <div className="flex items-center gap-4 text-xs font-mono text-[#1C1B1A]/50 dark:text-white/50 uppercase tracking-widest mb-6">
                       <span className="text-[#E2725B]">{article.category}</span>
                       <span className="w-4 h-px bg-[#1C1B1A]/20 dark:bg-white/20"></span>
                    </div>
                    
                    {/* Date Stamp */}
                    <div className="inline-block px-4 py-2 bg-[#8C7A5E]/10 dark:bg-[#8C7A5E]/20 border border-[#8C7A5E]/30">
                       <span className="font-serif text-[#8C7A5E] text-sm italic">
                         {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                       </span>
                    </div>
                    
                    <h3 className="font-serif text-3xl md:text-4xl text-[#1C1B1A] dark:text-white leading-tight group-hover:text-[#006400] dark:group-hover:text-[#E2725B] transition-colors duration-300">
                      {article.title}
                    </h3>
                    
                    <p className="font-sans text-lg text-[#1C1B1A]/70 dark:text-white/70 leading-[1.8]">
                      {article.excerpt}
                    </p>

                    <Link href={`/blog/${article.id}`} className="inline-flex items-center gap-2 text-[#800000] dark:text-[#E2725B] font-bold text-sm uppercase tracking-wide group-hover:gap-4 transition-all duration-300">
                       Read Entry <ArrowRight size={16} />
                    </Link>
                 </div>
               </motion.div>
             );
           })}
        </div>

        {/* View All Link */}
        <div className="mt-24 text-center border-t border-[#1C1B1A]/10 dark:border-white/10 pt-12">
           <Link href="/blog" className="inline-block px-8 py-4 bg-[#1C1B1A] dark:bg-white text-[#F5F5DC] dark:text-[#0A1F1C] font-mono text-xs uppercase tracking-widest hover:bg-[#006400] dark:hover:bg-[#E2725B] hover:text-white transition-colors duration-300 rounded-sm shadow-lg">
              View Full Archive
           </Link>
        </div>
      </div>
    </section>
  );
};

export default TheLedger;
