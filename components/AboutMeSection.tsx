'use client'

import React from 'react';
import { motion } from 'framer-motion';
import CurvedLoop from './CurvedLoop';

const AboutMeSection = () => {
  return (
    <section 
      aria-label="About Me"
      className="bg-[#f5f5f0] py-12 md:py-16 border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a4d3a] mb-4">
            More Than a Developer: Your Digital Architect
          </h2>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Focus */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              From IT Support to Digital Architect: Building Beyond Code
            </h3>

            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              My journey began in IT support and marketing, where I discovered my passion for problem-solving and seeing the bigger picture. 
              I realized that the best solutions aren't just technically sound—they're strategically aligned with business goals and designed 
              to drive real, measurable results.
            </p>

            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              As a Digital Architect, I bridge the gap between business objectives and technical execution. My approach goes beyond writing code—I 
              architect systems that connect directly to ROI, performance metrics, and growth. Every solution I build is designed with conversion, 
              scalability, and long-term success in mind.
            </p>

            {/* Key Qualifications */}
            <div className="mt-6">
              <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-3">Key Qualifications</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <span className="text-[#1a4d3a] font-bold mt-1">•</span>
                  <span className="text-sm md:text-base text-gray-700">
                    Alumnus of <span className="font-semibold">University of Central Florida</span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1a4d3a] font-bold mt-1">•</span>
                  <span className="text-sm md:text-base text-gray-700">
                    Full-Stack expertise across modern web technologies
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1a4d3a] font-bold mt-1">•</span>
                  <span className="text-sm md:text-base text-gray-700">
                    Hybrid AI + Video production proficiency
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1a4d3a] font-bold mt-1">•</span>
                  <span className="text-sm md:text-base text-gray-700">
                    Focus on "Code to Conversion" — measurable business impact
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right Column - Architect's Focus */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[350px] md:h-[400px] flex items-center justify-center"
          >
            {/* Single, Dominant Headshot */}
            <div className="relative w-full max-w-sm h-full rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://media.licdn.com/dms/image/v2/D4E03AQGkyoWF6XLw_Q/profile-displayphoto-crop_800_800/B4EZk5boiUIkAI-/0/1757605170745?e=1764806400&v=beta&t=dAWY-djuCly_Y7PJV1JJ_yRFc165bpj8PQPZbJNphi4"
                alt="Nicholas Loperena - Digital Architect"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Elegant "About Me" Card - Bottom Corner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: 0.3,
                type: "spring",
                stiffness: 200
              }}
              className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 md:p-5 shadow-xl border border-gray-200 z-20"
            >
              {/* UCF Badge */}
              <div className="flex items-center gap-3">
                <img
                  src="https://media.licdn.com/dms/image/v2/D4E0BAQFOIyEFFfAtYQ/company-logo_200_200/B4EZpuJz_NHgAQ-/0/1762784657766/university_of_central_florida_logo?e=1764806400&v=beta&t=HW7fi2vrMBGr8bysoiY0r7REYkHDLWK_KOhZX5phCcE"
                  alt="UCF Logo"
                  className="w-12 h-12 md:w-14 md:h-14 object-contain flex-shrink-0"
                />
                <div className="text-sm md:text-base font-semibold text-[#1a4d3a]">UCF Alumnus</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Curved Loop Marquee at tail end of About section */}
      <CurvedLoop 
        marqueeText="Creative ✦ Developer ✦ Architect ✦ Designer ✦"
        speed={0.8}
        curveAmount={180}
        direction="right"
        interactive={true}
      />
    </section>
  );
};

export default AboutMeSection;

