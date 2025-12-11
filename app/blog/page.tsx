'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SimplifiedCTA from '@/components/SimplifiedCTA';
import FaultyTerminal from '@/components/FaultyTerminal';
import { blogPosts } from '@/data/blogPosts';

export default function BlogIndexPage() {
  return (
    <div className="relative overflow-x-hidden bg-[#F5F5DC] dark:bg-[#0A1F1C] min-h-screen flex flex-col transition-colors duration-300">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pb-20 bg-[#0A1F1C] text-[#F5F5DC] overflow-hidden border-b border-[#F5F5DC]/10">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <FaultyTerminal
            pause={false}
            mouseReact={false}
            brightness={0.9}
            timeScale={0.2}
            className="w-full h-full"
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 md:px-12 space-y-6">
          <div className="flex items-center gap-4">
             <span className="h-px w-12 bg-[#E2725B]"></span>
             <span className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-[#E2725B]">Insights & Systems</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#F5F5DC]">The Ledger</h1>
          <p className="text-lg md:text-xl text-[#F5F5DC]/80 max-w-3xl font-sans font-light leading-relaxed">
            Compounding systems, credibility engines, and digital architecture breakdowns. Everything I build for clients starts
            here—with a practical blueprint.
          </p>
        </div>
      </section>

      {/* Blog Listing */}
      <section className="py-24 relative">
         {/* Swiss Grid Lines */}
        <div className="absolute inset-0 pointer-events-none max-w-7xl mx-auto px-6 md:px-12 border-x border-[#1C1B1A]/5 dark:border-[#F5F5DC]/5">
           <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#1C1B1A]/5 dark:bg-[#F5F5DC]/5 hidden md:block" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
          <div className="space-y-4 border-b border-[#1C1B1A]/10 dark:border-[#F5F5DC]/10 pb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1C1B1A] dark:text-[#F5F5DC]">Latest Entries</h2>
            <p className="text-lg text-[#1C1B1A]/70 dark:text-[#F5F5DC]/70 max-w-3xl font-sans">
              Thoughts on development, architecture, and building systems that compound over time.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col gap-6"
              >
                <div className="flex items-center gap-4 text-xs font-mono text-[#1C1B1A]/40 dark:text-[#F5F5DC]/40 uppercase tracking-widest">
                   <span className="text-[#E2725B] font-bold">{post.category || 'Insight'}</span> // Fallback category
                   <span className="w-4 h-px bg-[#1C1B1A]/20 dark:bg-[#F5F5DC]/20"></span>
                   <span>{post.date}</span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-3xl font-serif font-bold text-[#1C1B1A] dark:text-[#F5F5DC] group-hover:text-[#E2725B] transition-colors duration-300 leading-tight">
                    <Link href={`/blog/${post.slug}`}>
                        {post.title}
                    </Link>
                  </h3>
                  <p className="text-base text-[#1C1B1A]/70 dark:text-[#F5F5DC]/70 leading-relaxed line-clamp-3 font-sans">
                    {post.excerpt}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-widest bg-[#1C1B1A]/5 dark:bg-[#F5F5DC]/10 text-[#1C1B1A]/60 dark:text-[#F5F5DC]/60 px-3 py-1 rounded-sm border border-[#1C1B1A]/10 dark:border-[#F5F5DC]/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 mt-auto">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-[#1C1B1A] dark:text-[#F5F5DC] font-mono text-xs uppercase tracking-widest hover:text-[#E2725B] transition-colors border-b border-[#1C1B1A]/20 dark:border-[#F5F5DC]/20 pb-1 hover:border-[#E2725B]"
                  >
                    Read Entry
                    <span aria-hidden="true" className="ml-1">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SimplifiedCTA />
      <Footer />
    </div>
  );
}
