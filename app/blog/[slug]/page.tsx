"use client";

import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AtelierCTA from "@/components/AtelierCTA";
import LetterGlitch from "@/components/LetterGlitch";
import { blogPosts } from "@/data/blogPosts";

interface BlogDetailPageProps {
  params: { slug: string };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = blogPosts.find((entry) => entry.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="relative overflow-x-hidden bg-[#F5F5DC] dark:bg-[#0A1F1C] min-h-screen flex flex-col transition-colors duration-300">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pb-24 bg-[#0A1F1C] text-[#F5F5DC] overflow-hidden border-b border-[#F5F5DC]/10">
        <div className="absolute inset-0 opacity-35 pointer-events-none">
          <LetterGlitch
            glitchColors={['#0A1F1C', '#E2725B', '#F5F5DC', '#8C7A5E']}
            glitchSpeed={50}
            centerVignette={true}
            outerVignette={false}
            smooth={true}
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 md:px-12 space-y-8">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-[#F5F5DC]/70 font-mono">
            <Link href="/blog" className="hover:text-[#E2725B] transition-colors">
              The Ledger
            </Link>
            <span>/</span>
            <span>Entry 00{blogPosts.indexOf(post) + 1}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-[#F5F5DC] leading-tight">{post.title}</h1>
          <p className="text-lg md:text-xl text-[#F5F5DC]/80 max-w-3xl font-sans font-light leading-relaxed">{post.heroHighlight}</p>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-[#F5F5DC]/60 font-mono uppercase tracking-widest pt-4">
            <span>{post.date}</span>
            <span className="w-1 h-1 bg-[#E2725B] rounded-full"></span>
            <span>{post.readTime}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-widest bg-[#F5F5DC]/5 border border-[#F5F5DC]/20 px-3 py-1 rounded-sm text-[#F5F5DC]/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-16 relative z-10">
          
          {/* Paper Texture Background for Content */}
          <div className="absolute inset-0 -mx-6 md:-mx-12 bg-white/50 dark:bg-[#0A1F1C]/50 pointer-events-none -z-10 rounded-3xl" />

          {post.sections.map((section) => (
            <article key={section.heading} className="space-y-6">
              <h2 className="text-3xl font-serif font-bold text-[#1C1B1A] dark:text-[#F5F5DC]">{section.heading}</h2>
              {section.paragraphs.map((paragraph, idx) => (
                <p key={idx} className="text-lg text-[#1C1B1A]/80 dark:text-[#F5F5DC]/80 leading-relaxed font-sans">
                  {paragraph}
                </p>
              ))}
            </article>
          ))}

          <div className="border-t border-[#1C1B1A]/10 dark:border-[#F5F5DC]/10 pt-12 mt-12">
            <h3 className="text-sm font-mono font-bold text-[#1C1B1A] dark:text-[#F5F5DC] mb-6 uppercase tracking-widest flex items-center gap-3">
                <span className="w-2 h-2 bg-[#E2725B] rounded-full"></span>
                Key Takeaways
            </h3>
            <ul className="space-y-4">
              {post.keyTakeaways.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="text-[#E2725B] font-serif italic text-xl">"</span>
                  <span className="text-lg text-[#1C1B1A]/80 dark:text-[#F5F5DC]/80 italic font-serif">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      <AtelierCTA />
      <Footer />
    </div>
  );
}
