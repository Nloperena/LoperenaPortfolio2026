'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Scroll, PenTool, History, ArrowRight, Code, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import { blogPosts } from '@/data/blogPosts';

// Map tags/categories to icons
const getIconForCategory = (category: string) => {
  const categoryLower = category.toLowerCase();
  if (categoryLower.includes('ai') || categoryLower.includes('tech')) return Code;
  if (categoryLower.includes('growth') || categoryLower.includes('trend')) return TrendingUp;
  if (categoryLower.includes('mentor') || categoryLower.includes('training')) return Users;
  if (categoryLower.includes('heritage') || categoryLower.includes('history')) return History;
  if (categoryLower.includes('architect') || categoryLower.includes('system')) return Scroll;
  return PenTool;
};

const TheLedger = () => {
  // Get the 3 most recent blog posts (sorted by date)
  const recentPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section id="ledger-section" className="w-full bg-[#F2F0E6] dark:bg-[#0A1F1C] py-24 md:py-32 border-t border-[#111111]/10 dark:border-white/10 transition-colors duration-300 bg-paper-grain">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
           <div>
              <span className="font-mono text-xs text-[#800000] dark:text-[#B87333] uppercase tracking-[0.3em] block mb-4">V. Thought Leadership</span>
              <h2 className="font-serif text-5xl md:text-6xl font-bold text-[#1C1B1A] dark:text-white ink-bleed">The Ledger</h2>
           </div>
           <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-[#800000] dark:bg-[#B87333] hidden md:block"></span>
              <p className="max-w-md text-[#1C1B1A]/70 dark:text-white/70 font-serif italic text-lg text-right md:text-left">
                  &quot;Documenting the intersection of history, craft, and code.&quot;
              </p>
           </div>
        </div>

        {/* Articles Zig-Zag Layout */}
        <div className="space-y-20">
           {recentPosts.map((post, index) => {
             const isEven = index % 2 === 0;
             const category = post.tags[0] || 'Insight';
             const Icon = getIconForCategory(category);
             
             return (
               <motion.div 
                 key={post.slug}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-50px" }}
                 transition={{ duration: 0.6 }}
                 className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center group`}
               >
                 {/* Image / Visual Side */}
                 <div className="w-full md:w-1/2 relative aspect-[3/2] overflow-hidden rounded-sm shadow-md border border-[#1C1B1A]/10 dark:border-white/10 mb-8">
                    {/* Blueprint-style background */}
                    <div className="absolute inset-0 bg-[#F5F5DC] dark:bg-[#0A1F1C]">
                      {/* Blueprint grid pattern */}
                      <svg className="absolute inset-0 w-full h-full opacity-30 dark:opacity-20" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id={`grid-${post.slug}`} width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8C7A5E" strokeWidth="0.5" className="dark:stroke-[#8C7A5E]/40"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#grid-${post.slug})`} />
                      </svg>
                      {/* Diagonal blueprint lines */}
                      <div className="absolute inset-0 opacity-10 dark:opacity-5">
                        <div className="absolute top-0 left-0 w-full h-full" style={{
                          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, #8C7A5E 2px, #8C7A5E 4px)'
                        }}></div>
                        <div className="absolute top-0 left-0 w-full h-full" style={{
                          backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 2px, #8C7A5E 2px, #8C7A5E 4px)'
                        }}></div>
                      </div>
                      {/* Blueprint measurement-style corner brackets */}
                      <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-[#8C7A5E]/40"></div>
                      <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-[#8C7A5E]/40"></div>
                      <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-[#8C7A5E]/40"></div>
                      <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-[#8C7A5E]/40"></div>
                    </div>
                    <div className="absolute inset-0 bg-[#800000]/10 mix-blend-multiply z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-4 left-4 bg-[#F5F5DC] dark:bg-[#1a1a1a] p-3 rounded-sm z-20 border border-[#1C1B1A]/10 dark:border-white/10 text-[#800000] dark:text-[#E2725B]">
                       <Icon size={20} />
                    </div>
                 </div>

                 {/* Content Side */}
                 <div className="w-full md:w-1/2 space-y-8">
                    <div className="flex items-center gap-4 text-xs font-mono text-[#1C1B1A]/50 dark:text-white/50 uppercase tracking-widest mb-6">
                       <span className="text-[#E2725B]">{category}</span>
                       <span className="w-4 h-px bg-[#1C1B1A]/20 dark:bg-white/20"></span>
                    </div>
                    
                    {/* Date Stamp */}
                    <div className="inline-block px-4 py-2 bg-[#8C7A5E]/10 dark:bg-[#8C7A5E]/20 border border-[#8C7A5E]/30">
                       <span className="font-serif text-[#8C7A5E] text-sm italic">
                         {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                       </span>
                    </div>
                    
                    <h3 className="font-serif text-3xl md:text-4xl text-[#1C1B1A] dark:text-white leading-tight group-hover:text-[#006400] dark:group-hover:text-[#E2725B] transition-colors duration-300">
                      {post.title}
                    </h3>
                    
                    <p className="font-serif text-lg text-[#1C1B1A]/70 dark:text-white/70 leading-[1.8]">
                      {post.excerpt}
                    </p>

                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-[#800000] dark:text-[#E2725B] font-bold text-sm uppercase tracking-wide group-hover:gap-4 transition-all duration-300">
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
