'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Play, QrCode, Mail, Video, TrendingUp, Zap, CheckCircle, ArrowRight, Verified } from 'lucide-react';

interface VideoTestimonial {
  videoUrl: string;
  title: string;
  company: string;
  clientName?: string;
}

const vitoTestimonials: VideoTestimonial[] = [
  {
    videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/Caption_video_project-1_1__1_dbbb9822-d82e-45ee-9225-a25be9f41f0b.mp4?v=1724180981',
    title: 'Waterside Market',
    company: 'Waterside Market',
    clientName: 'Chris'
  },
  {
    videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/Caption_video_project_2.mp4?v=1724179828',
    title: 'Teter\'s Market',
    company: 'Teter\'s Market'
  },
  {
    videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/Caption_video_project_1.mp4?v=1724354006',
    title: 'Good Ol Days Diner',
    company: 'Good Ol\' Days Diner'
  },
  {
    videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/Untitled-1_17.mp4?v=1726158775',
    title: 'Nineveh Assyrian',
    company: 'Nineveh Assyrian',
    clientName: 'Jacob'
  }
];

const TrustBuildingSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [testimonialCount, setTestimonialCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Animated counter
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const target = document.getElementById('trust-section');
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 2000; // 2 seconds
    const steps = 70;
    const increment = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      if (current <= 70) {
        setTestimonialCount(current);
      } else {
        clearInterval(timer);
      }
    }, increment);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section id="trust-section" className="w-full bg-[#F2F0E6] dark:bg-[#0A1F1C] py-24 md:py-32 border-b double-line border-[#111111]/10 dark:border-white/10 relative transition-colors duration-300 bg-paper-grain" style={{ borderStyle: 'double', borderWidth: '3px', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
      {/* Swiss Grid Lines */}
      <div className="absolute inset-0 pointer-events-none max-w-7xl mx-auto px-6 md:px-12 border-x border-[#1C1B1A]/10 dark:border-white/5">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#1C1B1A]/10 dark:bg-white/5 hidden lg:block" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Hero Testimonial Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="bg-[#0A1F1C] dark:bg-[#1C1B1A] p-12 md:p-16 border border-[#1C1B1A]/20 dark:border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E2725B]/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10 max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <Verified className="w-5 h-5 text-[#B87333]" />
                <span className="font-mono text-xs text-[#B87333] uppercase tracking-widest">Verified Client Testimonial</span>
              </div>
              <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#F5F5DC] dark:text-white leading-tight mb-6 ink-bleed">
                &quot;Nico built us a credibility engine, not just a website.&quot;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#B87333]/20 flex items-center justify-center">
                  <span className="text-[#B87333] font-bold text-lg">V</span>
                </div>
                <div>
                  <p className="font-semibold text-[#F5F5DC] dark:text-white text-lg">VITO Executive Team</p>
                  <p className="text-sm text-[#F5F5DC]/70 dark:text-white/70">VITO Fryfilter Inc.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 border-b double-line border-[#111111]/20 dark:border-white/10 pb-12" style={{ borderStyle: 'double', borderWidth: '3px', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-12 bg-[#B87333]"></span>
                <span className="font-mono text-xs text-[#B87333] uppercase tracking-widest">IV. Trust Architecture</span>
              </div>
              <h2 className="font-serif text-5xl md:text-6xl text-[#1C1B1A] dark:text-white leading-tight mb-6 ink-bleed">
                The Proof: 70+ Testimonials Captured
              </h2>
              <p className="text-xl text-[#1C1B1A]/70 dark:text-white/70 leading-relaxed font-serif italic">
                Trust isn&apos;t built by asking. It&apos;s engineered through systems that compound credibility on command.
              </p>
            </div>
            <div className="lg:pl-12 lg:border-l border-[#1C1B1A]/20 dark:border-white/10">
              <div className="p-8 border border-[#111111]/30 dark:border-white/30">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-serif text-[#1C1B1A] dark:text-white">{testimonialCount}+</span>
                  <span className="text-lg text-[#1C1B1A]/60 dark:text-white/60 font-mono uppercase tracking-widest">Video Testimonials</span>
                </div>
                <p className="text-sm text-[#1C1B1A]/60 dark:text-white/60 font-sans">
                  From 6 Google reviews to a self-sustaining credibility engine
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Before/After Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative p-8 border-2 border-red-500/30 dark:border-red-500/20">
              <div className="absolute top-4 right-4 font-mono text-xs text-red-600 dark:text-red-400 uppercase tracking-widest">Before</div>
              <div className="mt-8">
                <div className="text-6xl font-serif text-[#1C1B1A] dark:text-white mb-2">6</div>
                <div className="text-sm font-mono uppercase tracking-widest text-[#1C1B1A]/60 dark:text-white/60 mb-4">Google Reviews</div>
                <ul className="space-y-2 text-sm text-[#1C1B1A]/70 dark:text-white/70 font-sans">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">×</span>
                    <span>Three reviews from internal employees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">×</span>
                    <span>Zero credibility in U.S. market</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">×</span>
                    <span>No proof, no trust, no sales</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative p-8 border-2 border-green-600/30 dark:border-green-500/20">
              <div className="absolute top-4 right-4 font-mono text-xs text-green-600 dark:text-green-400 uppercase tracking-widest">After</div>
              <div className="mt-8">
                <div className="text-6xl font-serif text-[#1C1B1A] dark:text-white mb-2">{testimonialCount}+</div>
                <div className="text-sm font-mono uppercase tracking-widest text-[#1C1B1A]/60 dark:text-white/60 mb-4">Video Testimonials</div>
                <ul className="space-y-2 text-sm text-[#1C1B1A]/70 dark:text-white/70 font-sans">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                    <span>Authentic proof from real customers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                    <span>Self-sustaining credibility engine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                    <span>Record traffic + 24x ROAS</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* The Problem & Solution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 border border-[#111111]/30 dark:border-white/30">
              <h3 className="font-serif text-2xl text-[#111111] dark:text-white mb-4">The Problem</h3>
              <p className="text-[#111111] dark:text-white/70 leading-relaxed font-serif italic">
                VITO had premium German hardware but zero credibility in the U.S. market. Six Google reviews—three from internal employees. No proof. No trust. No sales.
              </p>
            </div>
            <div className="p-6 border border-[#111111]/30 dark:border-white/30">
              <h3 className="font-serif text-2xl text-[#111111] dark:text-white mb-4">The Solution</h3>
              <p className="text-[#111111] dark:text-white/70 leading-relaxed font-serif italic">
                I didn&apos;t just ask customers for reviews. I architected a credibility engine—automated systems that capture authentic proof at scale, without manual follow-ups.
              </p>
            </div>
          </div>
        </motion.div>

        {/* The Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-20"
        >
          <div className="mb-12">
            <h3 className="font-serif text-4xl text-[#1C1B1A] dark:text-white mb-4">How It Works: The Credibility Engine</h3>
            <p className="text-lg text-[#1C1B1A]/60 dark:text-white/60 font-sans max-w-3xl">
              Four systematic pillars that transform satisfied customers into undeniable proof
            </p>
          </div>

          <div className="relative">
            {/* Connecting Lines (visible on larger screens) */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B87333]/20 to-transparent"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {/* Pillar 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="p-6 border border-[#111111]/30 dark:border-white/30 group hover:border-[#B87333]/50 transition-colors relative"
              >
                <div className="absolute -top-3 left-6 bg-[#F5F5DC] dark:bg-[#0A1F1C] px-2 font-mono text-xs text-[#B87333] uppercase tracking-widest">Step 1</div>
                <div className="w-12 h-12 bg-[#B87333]/10 dark:bg-[#B87333]/20 rounded-sm flex items-center justify-center mb-4 group-hover:bg-[#B87333]/20 dark:group-hover:bg-[#B87333]/30 transition-colors">
                  <QrCode className="w-6 h-6 text-[#B87333]" />
                </div>
                <h4 className="font-serif text-xl text-[#1C1B1A] dark:text-white mb-3">QR Code Automation</h4>
                <p className="text-sm text-[#1C1B1A]/70 dark:text-white/70 leading-relaxed font-serif italic">
                  QR codes on packaging lead directly to video submission portals. No friction. No excuses.
                </p>
              </motion.div>

              {/* Pillar 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="p-6 border border-[#111111]/30 dark:border-white/30 group hover:border-[#B87333]/50 transition-colors relative"
              >
                <div className="absolute -top-3 left-6 bg-[#F5F5DC] dark:bg-[#0A1F1C] px-2 font-mono text-xs text-[#B87333] uppercase tracking-widest">Step 2</div>
                <div className="w-12 h-12 bg-[#B87333]/10 dark:bg-[#B87333]/20 rounded-sm flex items-center justify-center mb-4 group-hover:bg-[#B87333]/20 dark:group-hover:bg-[#B87333]/30 transition-colors">
                  <Mail className="w-6 h-6 text-[#B87333]" />
                </div>
                <h4 className="font-serif text-xl text-[#1C1B1A] dark:text-white mb-3">Post-Install Automation</h4>
                <p className="text-sm text-[#1C1B1A]/70 dark:text-white/70 leading-relaxed font-serif italic">
                  Automated follow-up sequences triggered after installation, catching customers at peak satisfaction.
                </p>
              </motion.div>

              {/* Pillar 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="p-6 border border-[#111111]/30 dark:border-white/30 group hover:border-[#B87333]/50 transition-colors relative"
              >
                <div className="absolute -top-3 left-6 bg-[#F5F5DC] dark:bg-[#0A1F1C] px-2 font-mono text-xs text-[#B87333] uppercase tracking-widest">Step 3</div>
                <div className="w-12 h-12 bg-[#B87333]/10 dark:bg-[#B87333]/20 rounded-sm flex items-center justify-center mb-4 group-hover:bg-[#B87333]/20 dark:group-hover:bg-[#B87333]/30 transition-colors">
                  <Video className="w-6 h-6 text-[#B87333]" />
                </div>
                <h4 className="font-serif text-xl text-[#1C1B1A] dark:text-white mb-3">Guided Video Prompts</h4>
                <p className="text-sm text-[#1C1B1A]/70 dark:text-white/70 leading-relaxed font-serif italic">
                  Smart prompts guide customers to record authentic testimonials on their phones—no studio needed.
                </p>
              </motion.div>

              {/* Pillar 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="p-6 border border-[#111111]/30 dark:border-white/30 group hover:border-[#B87333]/50 transition-colors relative"
              >
                <div className="absolute -top-3 left-6 bg-[#F5F5DC] dark:bg-[#0A1F1C] px-2 font-mono text-xs text-[#B87333] uppercase tracking-widest">Step 4</div>
                <div className="w-12 h-12 bg-[#B87333]/10 dark:bg-[#B87333]/20 rounded-sm flex items-center justify-center mb-4 group-hover:bg-[#B87333]/20 dark:group-hover:bg-[#B87333]/30 transition-colors">
                  <Zap className="w-6 h-6 text-[#B87333]" />
                </div>
                <h4 className="font-serif text-xl text-[#1C1B1A] dark:text-white mb-3">Smart Incentives</h4>
                <p className="text-sm text-[#1C1B1A]/70 dark:text-white/70 leading-relaxed font-serif italic">
                  Strategic rewards that feel genuine, not transactional. Value for value.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* The Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <div className="bg-[#0A1F1C] dark:bg-[#F5F5DC] p-12 border border-[#1C1B1A]/20 dark:border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-serif text-[#F5F5DC] dark:text-[#0A1F1C] mb-2">70+</div>
                <div className="text-sm font-mono uppercase tracking-widest text-[#F5F5DC]/80 dark:text-[#0A1F1C]/80">Video Testimonials</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-serif text-[#F5F5DC] dark:text-[#0A1F1C] mb-2">520K+</div>
                <div className="text-sm font-mono uppercase tracking-widest text-[#F5F5DC]/80 dark:text-[#0A1F1C]/80">New US Visitors</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-serif text-[#F5F5DC] dark:text-[#0A1F1C] mb-2">24x</div>
                <div className="text-sm font-mono uppercase tracking-widest text-[#F5F5DC]/80 dark:text-[#0A1F1C]/80">ROAS on Paid Ads</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Video Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif text-4xl text-[#1C1B1A] dark:text-white mb-2">Social Proof in Action</h3>
                <p className="text-lg text-[#1C1B1A]/60 dark:text-white/60 font-sans">
                  Real faces. Real kitchens. Real results.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Verified className="w-4 h-4 text-[#B87333]" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#1C1B1A]/60 dark:text-white/60">VITO</span>
                </div>
                <span className="text-[#1C1B1A]/20 dark:text-white/20">|</span>
                <span className="font-mono text-xs uppercase tracking-widest text-[#1C1B1A]/60 dark:text-white/60">More Coming: Furniture Packages USA</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vitoTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="group relative aspect-[3/4] overflow-hidden bg-black rounded-sm cursor-pointer"
                onClick={() => setSelectedVideo(testimonial.videoUrl)}
              >
                <video
                  playsInline
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ filter: 'brightness(0.7)' }}
                >
                  <source src={testimonial.videoUrl} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#B87333]/90 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="font-serif text-lg text-white mb-1">{testimonial.title}</h4>
                  {testimonial.clientName && (
                    <p className="font-mono text-xs uppercase tracking-widest text-white/80">{testimonial.clientName}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center border-t double-line border-[#111111]/20 dark:border-white/10 pt-12" style={{ borderStyle: 'double', borderWidth: '3px', borderLeft: 'none', borderRight: 'none', borderBottom: 'none' }}
        >
            <p className="text-xl text-[#1C1B1A]/70 dark:text-white/70 font-serif italic mb-6 max-w-2xl mx-auto">
                Your product deserves proof. Let&apos;s build a credibility engine that compounds trust long after launch.
              </p>
              <a
            href="mailto:nicholas@loperena.com"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-[#111111] dark:bg-white text-[#F2F0E6] dark:text-[#0A1F1C] font-mono text-xs uppercase tracking-widest hover:bg-[#B87333] hover:text-white transition-all duration-300"
          >
            Build Your Credibility Engine
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="max-w-4xl w-full relative" onClick={(e) => e.stopPropagation()}>
              <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 text-white text-2xl hover:text-[#B87333] transition-colors"
            >
              ×
            </button>
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full rounded-sm"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </section>
  );
};

export default TrustBuildingSection;

