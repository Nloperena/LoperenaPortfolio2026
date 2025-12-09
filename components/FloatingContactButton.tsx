'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import ContactModal from './ContactModal';

const FloatingContactButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 left-6 right-6 md:hidden z-50 bg-[#49111C] text-[#F8F4F0] py-4 rounded-full shadow-2xl border border-[#8C7A5E]/30 font-serif italic text-lg flex items-center justify-center gap-2"
        aria-label="Schedule Consultation"
      >
        <span>Schedule Consultation</span>
      </motion.button>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default FloatingContactButton;

