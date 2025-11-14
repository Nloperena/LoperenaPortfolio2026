'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import TextType from './TextType';

interface Metric {
  value: string;
  label: string;
}

interface VideoTestimonial {
  videoUrl: string;
  title: string;
  description: string;
  clientName?: string;
  company?: string;
  metrics?: Metric[];
}

const testimonials: VideoTestimonial[] = [
  {
    videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/Caption_video_project-1_1__1_dbbb9822-d82e-45ee-9225-a25be9f41f0b.mp4?v=1724180981',
    title: 'VITO Fryfilter',
    description: 'Complete digital transformation that eliminated customer confusion, generated 40+ video testimonials, and drove massive traffic growth through strategic systems and modern design.',
    clientName: 'VITO Team',
    company: 'VITO Fryfilter Inc.'
  },
  {
    videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/Caption_video_project_1.mp4?v=1724354006',
    title: 'Good Ol Days Diner',
    description: 'Good Ol\' Days Diner welcomes Smarter Frying with VITO! They\'ve maintained the flavor of yesteryears while stepping into the future.',
    company: 'Good Ol\' Days Diner',
  },
  {
    videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/Untitled-1_17.mp4?v=1726158775',
    title: 'Nineveh Assyrian',
    description: 'Jacob from Nineveh has seen the difference VITO makes in both their food truck and restaurant kitchens! Easy to use, keeps their oil cleaner, and extends its life.',
    clientName: 'Jacob',
    company: 'Nineveh Assyrian',
  },
  {
    videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/Caption_video_project_2.mp4?v=1724179828',
    title: 'Teters Market',
    description: 'Teter\'s Market has discovered the secret for magical savings with VITO, and they\'ve nicknamed it \'The Wizard\'!',
    company: 'Teter\'s Market',
  },
  {
    videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/Baily_Testimonial_-_Short_1_1.mp4?v=1724180955',
    title: 'Bailey Seafood',
    description: 'Freshness is king, and VITO helps us keep it fresh. Serving Buffalo\'s best seafood for decades, Bailey Seafood trusts VITO to keep top-quality food.',
    company: 'Bailey Seafood',
  },
  {
    videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/platime_1_033ab9cd-3ced-4972-9eda-487b96bd0412.mp4?v=1724180986',
    title: 'Playtime Arcade and Bar',
    description: 'At Playtime Arcade & Bar, the fun never stops! With VITO, they\'re keeping their kitchen clean and efficient.',
    company: 'Playtime Arcade & Bar',
  }
];

const VITOCaseStudyTeaser = () => {
  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];
  
  // Calculate the width of one set
  const singleSetWidth = testimonials.length * 448; // 400px width + 48px gap

  return (
    <section className="bg-gray-900 py-12 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="bg-[#F2611D]/20 border border-[#F2611D]/40 rounded-lg px-3 py-1 text-[#F2611D] font-bold text-xs uppercase tracking-wide mb-3 inline-block">
            Featured Case Study
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            <TextType
              text="VITO Fryfilter: From $500 Crisis to Market Leader"
              className="inline"
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={false}
              loop={false}
              startOnVisible={true}
            />
          </h2>
          <p className="text-base text-gray-300 max-w-2xl mx-auto mb-6">
            Complete digital transformation that eliminated customer confusion and drove 285% traffic growth.
          </p>
          
          {/* Compact CTA */}
          <Link
            href="/projects/vito-fryfilter"
            className="inline-flex items-center gap-2 bg-[#1a4d3a] text-white px-6 py-2.5 rounded-md font-semibold text-sm hover:bg-[#2a5d4a] transition-colors"
          >
            View Full Case Study
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* Client Success Stories - Scrolling Cards */}
      <div className="mb-8 text-center px-6 max-w-7xl mx-auto">
        <TextType
          as="h3"
          text="Client Success Stories"
          className="text-xl md:text-2xl font-bold text-white mb-2 block"
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={false}
          loop={false}
          startOnVisible={true}
        />
        <p className="text-sm text-gray-300 max-w-2xl mx-auto">
          Real results from real clients. See how our digital solutions drive measurable business outcomes.
        </p>
      </div>

      {/* Full-width edge-to-edge scrolling marquee */}
      <div className="w-full overflow-hidden">
        <motion.div
          className="flex gap-12 pl-8 md:pl-12 lg:pl-16 xl:pl-20"
          animate={{
            x: [0, -singleSetWidth],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 40,
              ease: 'linear',
            },
          }}
        >
          {duplicatedTestimonials.map((testimonial, index) => {
            const hasMetrics = testimonial.metrics && testimonial.metrics.length > 0;
            
            return (
              <div
                key={index}
                className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px] bg-white rounded-xl overflow-hidden shadow-xl border border-gray-700 hover:shadow-2xl transition-shadow flex flex-col"
              >
                {/* 1. Video Thumbnail - Top */}
                <div className="relative aspect-[9/16] bg-black rounded-t-xl overflow-hidden flex-shrink-0">
                  <video
                    playsInline
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover"
                  >
                    <source src={testimonial.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                {/* 2. Metrics Section - Middle (no icons, text only) */}
                {hasMetrics && (
                  <div className="px-4 py-3 bg-gray-50 border-y border-gray-200">
                    <div className={`grid ${testimonial.metrics!.length === 4 ? 'grid-cols-2' : 'grid-cols-1'} gap-2`}>
                      {testimonial.metrics!.map((metric, metricIndex) => (
                        <div key={metricIndex} className="text-center">
                          <div className={`text-base font-bold ${metricIndex === 0 ? 'text-[#1a4d3a]' : metricIndex === 1 ? 'text-[#F2611D]' : metricIndex === 2 ? 'text-blue-600' : 'text-purple-600'}`}>
                            {metric.value}
                          </div>
                          <div className="text-xs text-gray-600 leading-tight">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* 3. Quote and Client Info - Bottom */}
                <div className="p-4 bg-white flex-1 flex flex-col">
                  <div className="mb-2">
                    <h4 className="text-base font-bold text-gray-900 mb-1">
                      {testimonial.title}
                    </h4>
                    {(testimonial.clientName || testimonial.company) && (
                      <p className="text-xs text-gray-500">
                        {testimonial.clientName && <span className="font-semibold">{testimonial.clientName}</span>}
                        {testimonial.clientName && testimonial.company && ' at '}
                        {testimonial.company && <span>{testimonial.company}</span>}
                      </p>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">
                    {testimonial.description}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default VITOCaseStudyTeaser;
