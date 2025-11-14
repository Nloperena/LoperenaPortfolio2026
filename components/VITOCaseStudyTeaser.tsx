'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import TestimonialVideosGrid from './TestimonialVideosGrid';

const VITOCaseStudyTeaser = () => {
  return (
    <section className="bg-[#f5f5f0] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="bg-[#F2611D]/20 border border-[#F2611D]/40 rounded-lg px-4 py-2 text-[#F2611D] font-bold text-sm uppercase tracking-wide mb-4 inline-block">
            Featured Case Study
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            VITO Fryfilter: From <span className="text-[#F2611D]">$500 Crisis</span> to Market Leader
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Complete digital transformation that eliminated customer confusion, generated 40+ video testimonials, 
            and drove 285% traffic growth through strategic systems and modern design.
          </p>
        </motion.div>

        {/* Key Achievements - Full width, centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            {/* Company Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-6 flex justify-center"
            >
              <img
                src="https://media.licdn.com/dms/image/v2/C560BAQHaALxWvtHzUA/company-logo_200_200/company-logo_200_200/0/1630629916465/vito_fryfilter_inc_logo?e=1764806400&v=beta&t=9ChfUXLFoNKQ5vEhxaiMS81VGo0u2SmgTwbVqVAqSGw"
                alt="VITO Fryfilter Inc. Logo"
                className="h-20 w-20 sm:h-24 sm:w-24 object-contain rounded-lg"
              />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Key Achievements</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <strong className="text-gray-900">Smart Quiz System:</strong> Eliminated $500 restocking fees by guiding customers to the right products
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <strong className="text-gray-900">Testimonial Automation:</strong> Created incentive program generating 70+ video testimonials and 40+ Google reviews
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <strong className="text-gray-900">Brand Transformation:</strong> Replaced "yellow nightmare" with professional design system
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <strong className="text-gray-900">Website Consolidation:</strong> Merged two separate websites into one unified platform
                </div>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-16"
        >
          <Link
            href="/projects/vito-fryfilter"
            className="inline-flex items-center gap-2 bg-[#1a4d3a] text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-[#2a5d4a] transition-colors shadow-lg"
          >
            View Full Case Study
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>

      {/* Testimonial Videos - Full width with darker background, outside container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="w-full"
      >
        <TestimonialVideosGrid />
      </motion.div>
    </section>
  );
};

export default VITOCaseStudyTeaser;

