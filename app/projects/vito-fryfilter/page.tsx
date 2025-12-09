'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AtelierCTA from '@/components/AtelierCTA';
import { ArrowLeft, TrendingUp, Users, Video, Target, Zap, BarChart, Code, Award, CheckCircle } from 'lucide-react';

export default function VITOCaseStudy() {
  const metrics = [
    {
      icon: TrendingUp,
      value: '19%',
      label: 'YoY Revenue Growth',
      description: 'Directly drove over $40,000 in additional sales.',
      color: 'text-[#1a4d3a]'
    },
    {
      icon: Users,
      value: '285%',
      label: 'Traffic Surge',
      description: 'Year-over-year increase in online store sessions.',
      color: 'text-[#F2611D]'
    },
    {
      icon: Zap,
      value: '2.8%',
      label: 'Conversion Rate',
      description: 'Achieved industry-leading e-commerce efficiency.',
      color: 'text-blue-600'
    },
    {
      icon: Video,
      value: '584%',
      label: 'Higher Engagement',
      description: 'Outperformed industry averages by nearly 6x.',
      color: 'text-purple-600'
    }
  ];

  const strategies = [
    {
      phase: 'Phase 1',
      title: 'Brand Identity Transformation',
      items: [
        'Visual System Overhaul: Complete 32MB brand manual with "Made in Germany" heritage focus.',
        '3D Product Visualization: High-end renders demonstrating engineering quality.',
        'Motion Graphics: Assets explaining filtration vortex technology without complex text.'
      ]
    },
    {
      phase: 'Phase 2',
      title: 'Technical E-Commerce Architecture',
      items: [
        'Custom Shopify Development: Tailored specifically for B2B needs.',
        'Smart Cart Validation: Custom JS engine to prevent incompatible product combinations.',
        'Automated Systems: Review generation (8 to 40+ reviews) and email marketing infrastructure.'
      ]
    },
    {
      phase: 'Phase 3',
      title: 'Content & Enterprise Strategy',
      items: [
        'Education-First Content: Technical blogs and "How-To" guides.',
        'Multi-Platform Social Strategy: "2 Stories + 2 Posts" weekly cadence across 5 platforms.',
        'Enterprise ABM: Bespoke sales materials for McDonald\'s, Burger King, Dunkin\', Jollibee.'
      ]
    }
  ];

  const testimonials = [
    {
      videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/Caption_video_project-1_1__1_dbbb9822-d82e-45ee-9225-a25be9f41f0b.mp4?v=1724180981',
      title: 'Waterside Market',
      description: 'Found the secret to keeping flavors fresh and kitchen efficient. Save up to 50% on cooking oil.',
      clientName: 'Chris',
      company: 'Waterside Market'
    },
    {
      videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/Caption_video_project_2.mp4?v=1724179828',
      title: 'Teters Market',
      description: 'Discovered the secret for magical savings with VITO. Watch the oil costs drop by up to 50%.',
      company: 'Teter\'s Market'
    },
    {
      videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/Caption_video_project_1.mp4?v=1724354006',
      title: 'Good Ol Days Diner',
      description: 'Maintained the flavor of yesteryears while stepping into the future. Homemade taste efficiently.',
      company: 'Good Ol\' Days Diner',
    },
    {
      videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/Untitled-1_17.mp4?v=1726158775',
      title: 'Nineveh Assyrian',
      description: 'Jacob has seen the difference in both food truck and restaurant kitchens! Easy to use, keeps oil cleaner.',
      clientName: 'Jacob',
      company: 'Nineveh Assyrian',
    }
  ];

  const techStack = [
    { category: 'Development', tools: 'Shopify Liquid, HTML5, CSS3, JavaScript (Custom Validation)' },
    { category: 'Design', tools: 'Adobe Creative Suite (Illustrator, Photoshop, After Effects), Blender (3D)' },
    { category: 'Marketing & CRM', tools: 'MailChimp, Hootsuite, Google Analytics, ClickUp' },
    { category: 'Platforms', tools: 'LinkedIn, Instagram, TikTok, Facebook, X (Twitter)' }
  ];

  return (
    <div className="relative overflow-x-hidden bg-[#F5F5DC] dark:bg-[#0A1F1C] min-h-screen flex flex-col font-sans transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-[#1a4d3a] text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '30px 30px'
        }}></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-mono uppercase tracking-widest"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Link>

            <div className="max-w-4xl space-y-6">
              <div className="inline-flex items-center gap-3 px-3 py-1 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">
                 <span className="w-2 h-2 bg-[#F2611D] rounded-full animate-pulse"></span>
                 <span className="text-xs font-mono uppercase tracking-widest text-white/90">Director of U.S. Marketing</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight">
                VITO FryFilters: <br/>
                <span className="text-[#F2611D]">Digital Transformation</span>
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg text-white/80 leading-relaxed pt-4 border-t border-white/10">
                 <div>
                    <h3 className="text-white font-bold mb-2">Executive Summary</h3>
                    <p>
                        As the Director of U.S. Marketing, I led a comprehensive digital transformation that evolved a traditional B2B equipment supplier into a modern, data-driven brand. By unifying brand strategy, technical development, and content marketing, we achieved 19% year-over-year revenue growth.
                    </p>
                 </div>
                 <div className="space-y-4 font-mono text-sm">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                        <span className="text-white/50">Timeline</span>
                        <span>2024</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                        <span className="text-white/50">Focus</span>
                        <span className="text-right">Brand Strategy, Digital Transformation, <br/>B2B Enterprise Sales</span>
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-24 bg-white dark:bg-[#0A1F1C] transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="font-mono text-xs text-[#F2611D] uppercase tracking-widest block mb-4">The Challenge</span>
                    <h2 className="text-4xl font-serif font-bold text-[#1a4d3a] dark:text-[#F5F5DC] mb-6">Superior Product, Outdated Presence.</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                        VITO FryFilters had a superior product—offering 30% oil cost savings—but faced significant market hurdles. managing cooking oil is messy, dangerous, and expensive, yet the digital experience didn't reflect the solution's sophistication.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-[#F2611D]/10 flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="w-2 h-2 bg-[#F2611D] rounded-full"></span>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1a4d3a] dark:text-[#F5F5DC]">Outdated Digital Presence</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Legacy B2B sales approach lacking modern e-commerce.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-[#F2611D]/10 flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="w-2 h-2 bg-[#F2611D] rounded-full"></span>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1a4d3a] dark:text-[#F5F5DC]">Complex Value Proposition</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Technical product requiring accessible educational content.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-[#F2611D]/10 flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="w-2 h-2 bg-[#F2611D] rounded-full"></span>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1a4d3a] dark:text-[#F5F5DC]">Zero Metrics</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">No systems to track ROI or engagement.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
                
                <div className="relative">
                    {/* Placeholder for Challenge Image - using existing assets if available or a placeholder div */}
                    <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-lg relative">
                         {/* We can use the 'vito-before-website.png' if appropriate, or a conceptual graphic */}
                         <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-mono text-sm">
                            Legacy Systems & Market Hurdles
                         </div>
                    </div>
                    <div className="absolute -bottom-6 -left-6 bg-[#1a4d3a] text-white p-6 rounded-lg shadow-xl max-w-xs">
                        <p className="font-serif italic text-lg">"The Goal: Transform VITO into the premier digital-first brand in commercial fryer filtration."</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Strategic Solution */}
      <section className="py-24 bg-[#F5F5DC] dark:bg-[#1a4d3a]/20 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="font-mono text-xs text-[#1a4d3a] dark:text-[#F5F5DC] uppercase tracking-widest block mb-4">The Solution</span>
                <h2 className="text-4xl font-serif font-bold text-[#1a4d3a] dark:text-[#F5F5DC] mb-6">Three-Phase Strategic Overhaul</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    I implemented a strategy focusing on Foundation, Digitization, and Growth to bridge the gap between creative storytelling and technical execution.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {strategies.map((strategy, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white dark:bg-[#0A1F1C] p-8 rounded-xl shadow-sm border border-gray-200 dark:border-white/10 hover:border-[#1a4d3a] transition-colors group"
                    >
                        <span className="font-mono text-xs text-[#F2611D] uppercase tracking-widest mb-4 block">{strategy.phase}</span>
                        <h3 className="text-xl font-bold text-[#1a4d3a] dark:text-[#F5F5DC] mb-6 group-hover:text-[#F2611D] transition-colors">{strategy.title}</h3>
                        <ul className="space-y-4">
                            {strategy.items.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                                    <CheckCircle className="w-4 h-4 text-[#1a4d3a] dark:text-[#F5F5DC] flex-shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-24 bg-[#1a4d3a] text-white overflow-hidden relative">
         {/* Background Elements */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-[#F2611D] opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
         
         <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="mb-16 border-b border-white/10 pb-8">
                <h2 className="text-4xl font-serif font-bold mb-4">Key Results & Business Impact</h2>
                <p className="text-white/70 text-lg">The transformation delivered immediate, measurable success across revenue, engagement, and brand authority.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {metrics.map((metric, index) => {
                    const Icon = metric.icon;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white/5 border border-white/10 p-6 rounded-lg backdrop-blur-sm"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <Icon className="w-6 h-6 text-[#F2611D]" />
                                <span className={`text-2xl font-bold ${metric.color === 'text-[#1a4d3a]' ? 'text-white' : 'text-white'}`}>{metric.value}</span>
                            </div>
                            <h4 className="font-bold text-lg mb-2">{metric.label}</h4>
                            <p className="text-sm text-white/60">{metric.description}</p>
                        </motion.div>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                    <h3 className="flex items-center gap-3 text-xl font-bold mb-6">
                        <Award className="w-6 h-6 text-[#F2611D]" /> Major Wins
                    </h3>
                    <ul className="space-y-4 text-white/80">
                        <li className="flex gap-3">
                            <span className="w-1.5 h-1.5 bg-[#F2611D] rounded-full mt-2"></span>
                            <span><strong>Enterprise Partnerships:</strong> Secured and expanded relationships with McDonald's USA, Burger King, Dunkin', Denny's, and Jollibee.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="w-1.5 h-1.5 bg-[#F2611D] rounded-full mt-2"></span>
                            <span><strong>Industry Recognition:</strong> Featured in QSR Magazine (April & May 2024) and commanded strong presence at NRA Show 2024.</span>
                        </li>
                    </ul>
                </div>

                 <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                    <h3 className="flex items-center gap-3 text-xl font-bold mb-6">
                        <BarChart className="w-6 h-6 text-[#F2611D]" /> Engagement Metrics
                    </h3>
                    <ul className="space-y-4 text-white/80">
                        <li className="flex gap-3">
                            <span className="w-1.5 h-1.5 bg-[#F2611D] rounded-full mt-2"></span>
                            <span><strong>300k+ Emails Sent:</strong> Maintained open rates of 6-30% (3x industry average).</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="w-1.5 h-1.5 bg-[#F2611D] rounded-full mt-2"></span>
                            <span><strong>Social Dominance:</strong> 700% higher engagement on Instagram compared to competitors.</span>
                        </li>
                    </ul>
                </div>
            </div>
         </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 bg-white dark:bg-[#0A1F1C] border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6">
             <div className="text-center mb-16">
                <span className="font-mono text-xs text-[#1a4d3a] dark:text-[#F5F5DC] uppercase tracking-widest block mb-4">Under the Hood</span>
                <h2 className="text-3xl font-serif font-bold text-[#1a4d3a] dark:text-[#F5F5DC]">Tech Stack & Tools</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {techStack.map((stack, index) => (
                    <div key={index} className="space-y-3">
                        <h4 className="font-bold text-[#1a4d3a] dark:text-[#F5F5DC] border-b border-[#F2611D]/30 pb-2 inline-block">{stack.category}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{stack.tools}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>
      
      {/* Testimonials (Visual Proof) */}
      <section className="py-24 bg-[#F5F5DC] dark:bg-[#1a4d3a]/20 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6">
            <div className="mb-12">
                <h2 className="text-3xl font-serif font-bold text-[#1a4d3a] dark:text-[#F5F5DC] mb-4">Visual Proof</h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                    Part of the content strategy involved capturing authentic video testimonials from across the country. These assets became the cornerstone of our social proof engine.
                </p>
            </div>
             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-[#0A1F1C] rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-white/10"
                  >
                    <div className="relative aspect-[9/16] bg-black">
                      <video
                        playsInline
                        autoPlay
                        muted
                        loop
                        className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                      >
                        <source src={testimonial.videoUrl} type="video/mp4" />
                      </video>
                    </div>
                    <div className="p-4">
                        <h4 className="font-bold text-[#1a4d3a] dark:text-[#F5F5DC] text-sm">{testimonial.title}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{testimonial.company}</p>
                    </div>
                  </motion.div>
                ))}
             </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="py-24 bg-white dark:bg-[#0A1F1C] transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-serif font-bold text-[#1a4d3a] dark:text-[#F5F5DC] mb-6">Conclusion</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed italic font-serif">
                "This project demonstrates the power of a holistic marketing approach. By bridging the gap between creative storytelling and technical execution, I was able to not only modernize the VITO brand but also drive significant, quantifiable business growth. The systems and strategies implemented created a scalable foundation that continues to generate value today."
            </p>
        </div>
      </section>

      <AtelierCTA />
      <Footer />
    </div>
  );
}