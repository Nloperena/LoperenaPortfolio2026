'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ContactModal from './ContactModal';
import TextType from './TextType';

const SimplifiedCTA = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <section className="relative py-16 md:py-20 overflow-hidden bg-[#1a4d3a]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 grid gap-10 md:grid-cols-2 items-center">
        {/* Left: Short Pitch */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <TextType
            as="h2"
            text="Let's Build Your Next Growth System"
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 block"
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={false}
            loop={false}
            startOnVisible={true}
          />
          <p className="text-base md:text-lg text-white/90 mb-3">
            No-pressure 20-minute call to see if we&apos;re a fit.
          </p>
          <p className="text-base md:text-lg text-white/80">
            Ready to upgrade your website? Tell me about your business and I&apos;ll show you what we can build.
          </p>
        </motion.div>

        {/* Right: Two Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsContactModalOpen(true)}
            className="rounded-md bg-[#F2611D] hover:bg-[#ff7a3d] text-white px-8 py-4 text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Schedule a Conversation
          </motion.button>
          <Link href="/projects/vito-fryfilter">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-md bg-transparent hover:bg-white/10 backdrop-blur-sm text-white px-8 py-4 text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-white text-center cursor-pointer"
            >
              View Case Studies
            </motion.div>
          </Link>
        </motion.div>
      </div>
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </section>
  );
};

export default SimplifiedCTA;

