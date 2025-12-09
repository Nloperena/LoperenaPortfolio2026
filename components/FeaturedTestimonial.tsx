'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const FeaturedTestimonial = () => {
  return (
    <section className="bg-[#f5f5f0] py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12 border-l-4 border-[#F2611D]"
        >
          {/* Quote Icon */}
          <div className="absolute top-6 right-6 opacity-10">
            <Quote className="w-16 h-16 md:w-20 md:h-20 text-[#1a4d3a]" />
          </div>

          {/* Quote Text */}
          <div className="relative z-10">
            <blockquote className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1a4d3a] leading-relaxed mb-6">
              &quot;Nico built us a credibility engine, not just a website.&quot;
            </blockquote>

            {/* Attribution */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#1a4d3a]/10 flex items-center justify-center">
                <span className="text-[#1a4d3a] font-bold text-lg">V</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-base md:text-lg">
                  VITO Executive Team
                </p>
                <p className="text-sm text-gray-600">
                  VITO Fryfilter Inc.
                </p>
              </div>
            </div>

            {/* Context */}
            <p className="mt-6 text-base text-gray-700 leading-relaxed border-t border-gray-200 pt-6">
              <strong>The result?</strong> From 6 Google reviews to 70+ authentic video testimonials, record US traffic, 
              and a system that keeps generating proof without paid ads.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedTestimonial;




