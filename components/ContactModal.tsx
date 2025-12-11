'use client'

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, Linkedin, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const contactInfo = {
    phone: '+1 (407) 790-5891',
    email: 'nicholasloperena@gmail.com',
    linkedin: 'https://www.linkedin.com/in/nicholas-loperena-022813185/'
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const contactItems = [
    {
      icon: Phone,
      label: 'Telephone',
      value: contactInfo.phone,
      href: `tel:${contactInfo.phone.replace(/\s/g, '')}`,
      copyValue: contactInfo.phone,
    },
    {
      icon: Mail,
      label: 'Correspondence',
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      copyValue: contactInfo.email,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'nicholasloperena',
      href: contactInfo.linkedin,
      copyValue: contactInfo.linkedin,
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Envelope Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Envelope Container */}
            <div className="relative max-w-lg w-full">
              {/* Envelope Back/Flap */}
              <div className="absolute -top-8 left-0 right-0 h-16 bg-[#E8E4D8] border-2 border-[#111111]/20 transform -rotate-1 origin-top" style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)' }}></div>
              
              {/* Letter Paper */}
              <div className="bg-[#F2F0E6] bg-paper-grain relative shadow-xl border border-[#111111]/30">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center hover:bg-[#111111]/5 transition-colors z-10"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 text-[#111111]/60" />
                </button>

                {/* Return Address (Top Right) */}
                <div className="absolute top-6 right-8 text-right">
                  <p className="font-serif text-xs text-[#111111]/70">Nicholas Loperena</p>
                  <p className="font-serif text-xs text-[#111111]/70">Florida, United States</p>
                </div>

                {/* Letter Content */}
                <div className="px-12 py-16">
                  {/* Contact Information */}
                  <div className="space-y-6">
                    {contactItems.map((item, index) => {
                      const IconComponent = item.icon;
                      const isCopied = copiedField === item.label;

                      return (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-4 pb-6 border-b border-[#111111]/10 last:border-0 last:pb-0"
                        >
                          <IconComponent className="w-5 h-5 text-[#111111]/50 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <a
                              href={item.href}
                              target={item.label === 'LinkedIn' ? '_blank' : undefined}
                              rel={item.label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                              className="font-serif text-base text-[#111111] hover:text-[#111111]/70 transition-colors break-all"
                            >
                              {item.value}
                            </a>
                          </div>
                          <button
                            onClick={() => copyToClipboard(item.copyValue, item.label)}
                            className="flex-shrink-0 text-[#111111]/40 hover:text-[#111111] transition-colors"
                            title="Copy"
                          >
                            {isCopied ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;

