'use client'

import React from 'react';
import { motion } from 'framer-motion';
import TextType from './TextType';

const LatestProjectSection = () => {
  return (
    <section className="bg-[#f5f5f0] py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <TextType
            as="h2"
            text="Latest Project"
            className="text-6xl md:text-7xl lg:text-8xl font-black text-[#1a4d3a] mb-4 block"
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={false}
            loop={false}
            startOnVisible={true}
          />
        </motion.div>

      
        {/* Mobile View and Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center">
          {/* iPhone View - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center md:justify-end"
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

          {/* Title and Description - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center md:text-left max-w-lg"
          >
            <TextType
              as="h3"
              text="RuggedRed.com"
              className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1a4d3a] mb-6 block"
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={false}
              loop={false}
              startOnVisible={true}
            />
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
              A modern, high-performance website built with Next.js and React. This project showcases 
              cutting-edge web development practices, responsive design, and seamless user experience. 
              Built for speed, scalability, and optimal performance across all devices.
            </p>
            <a
              href="https://ruggedRed.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#1a4d3a] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#2a5d4a] transition-colors mb-8"
            >
              Visit RuggedRed.com →
            </a>
            
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-[#1a4d3a] mr-3 font-bold">•</span>
                <span>We use professional-level AI to create video content that elevates your brand</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#1a4d3a] mr-3 font-bold">•</span>
                <span>Advanced AI-driven video generation for marketing campaigns and social media</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#1a4d3a] mr-3 font-bold">•</span>
                <span>Hybrid approach combining AI efficiency with professional video production expertise</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#1a4d3a] mr-3 font-bold">•</span>
                <span>Custom video solutions tailored to your brand identity and marketing objectives</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#1a4d3a] mr-3 font-bold">•</span>
                <span>Seamless integration of AI-generated visuals with existing content and footage</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LatestProjectSection;

