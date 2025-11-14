'use client'

import React from 'react';
import { motion } from 'framer-motion';

const SimplifiedCTA = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/contact';
    }
  };

  return (
    <section className="relative py-16 md:py-24 px-4 md:px-8 overflow-hidden bg-[#1a4d3a]">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Short Pitch */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-kallisto">
              Let's Build Your Project
            </h2>
            <p className="text-lg md:text-xl text-white/90">
              Ready to upgrade your website? Tell me about your business and I'll show you what we can build.
            </p>
          </motion.div>

          {/* Right: Two Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="rounded-md bg-white text-[#1a4d3a] px-8 py-4 text-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:bg-[#f5f5f0]"
            >
              Contact Me
            </motion.button>
            <motion.a
              href="https://linkedin.com/in/nicholasloperena"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-md bg-transparent hover:bg-white/10 backdrop-blur-sm text-white px-8 py-4 text-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl border-2 border-white text-center"
            >
              View LinkedIn
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SimplifiedCTA;

