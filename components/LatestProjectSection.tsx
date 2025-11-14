'use client'

import React from 'react';
import { motion } from 'framer-motion';
import TextType from './TextType';

const LatestProjectSection = () => {
  return (
    <section className="bg-[#f5f5f0] py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#1a4d3a]/70">
            Featured Project
          </p>
        </motion.div>

        {/* Two Column Layout - Image and Content */}
        <div className="grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center">
          {/* iPhone Mockup - Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <div className="relative" style={{ width: '380px', maxWidth: '100%' }}>
              {/* iPhone Frame */}
              <div className="relative bg-black rounded-[2.5rem] p-2 shadow-2xl">
                {/* iPhone Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-black rounded-b-xl z-10"></div>
                {/* Screen */}
                <div className="relative bg-white rounded-[2rem] overflow-hidden" style={{ aspectRatio: '9/16' }}>
                  <iframe
                    src="https://ruggedRed.com"
                    className="w-full h-full border-0"
                    title="RuggedRed.com - Mobile View"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full opacity-30"></div>
              </div>
            </div>
          </motion.div>

          {/* Content - Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            {/* Project Title */}
            <div>
              <TextType
                as="h3"
                text="RuggedRed.com: High-Performance Brand Site for a High-Performance Cleaner"
                className="text-3xl md:text-4xl font-black text-[#1a4d3a] block text-left"
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={false}
                loop={false}
                startOnVisible={true}
              />
            </div>

            {/* Description */}
            <p className="text-base md:text-lg text-gray-700 leading-relaxed text-left max-w-3xl">
              A modern, high-performance website built with Next.js and React. This project showcases 
              cutting-edge web development practices, responsive design, and seamless user experience. 
              Built for speed, scalability, and optimal performance across all devices.
            </p>

            {/* Key Features */}
            <div className="mt-3">
              <h4 className="text-lg font-semibold text-[#1a4d3a] mb-3 text-left">Key Features</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start text-left">
                  <span className="text-[#1a4d3a] mr-3 font-bold mt-0.5">•</span>
                  <span className="text-base md:text-lg">Next.js and React for optimal performance and SEO</span>
                </li>
                <li className="flex items-start text-left">
                  <span className="text-[#1a4d3a] mr-3 font-bold mt-0.5">•</span>
                  <span className="text-base md:text-lg">Fully responsive design across all devices</span>
                </li>
                <li className="flex items-start text-left">
                  <span className="text-[#1a4d3a] mr-3 font-bold mt-0.5">•</span>
                  <span className="text-base md:text-lg">Modern UI/UX with seamless user experience</span>
                </li>
                <li className="flex items-start text-left">
                  <span className="text-[#1a4d3a] mr-3 font-bold mt-0.5">•</span>
                  <span className="text-base md:text-lg">Optimized for speed and scalability</span>
                </li>
                <li className="flex items-start text-left">
                  <span className="text-[#1a4d3a] mr-3 font-bold mt-0.5">•</span>
                  <span className="text-base md:text-lg">Production-ready architecture and deployment</span>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <div>
              <a
                href="https://ruggedRed.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#1a4d3a] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#2a5d4a] transition-colors"
              >
                Visit RuggedRed.com →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LatestProjectSection;

