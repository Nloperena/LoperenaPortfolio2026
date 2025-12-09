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
      label: 'Phone',
      value: contactInfo.phone,
      href: `tel:${contactInfo.phone.replace(/\s/g, '')}`,
      copyValue: contactInfo.phone,
      color: 'text-green-600'
    },
    {
      icon: Mail,
      label: 'Email',
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      copyValue: contactInfo.email,
      color: 'text-blue-600'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'nicholasloperena',
      href: contactInfo.linkedin,
      copyValue: contactInfo.linkedin,
      color: 'text-[#0077b5]'
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                <h2 className="text-2xl font-bold text-gray-900">Get In Touch</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <p className="text-gray-600 mb-6">
                  Choose your preferred way to reach out. I&apos;m always open to discussing new projects and opportunities.
                </p>

                {contactItems.map((item, index) => {
                  const IconComponent = item.icon;
                  const isCopied = copiedField === item.label;

                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-200 rounded-xl p-4 hover:border-[#F2611D] transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg bg-gray-50 ${item.color}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-gray-500 mb-1">{item.label}</div>
                          <a
                            href={item.href}
                            target={item.label === 'LinkedIn' ? '_blank' : undefined}
                            rel={item.label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                            className="text-lg font-semibold text-gray-900 hover:text-[#F2611D] transition-colors block mb-2 break-all"
                          >
                            {item.value}
                          </a>
                          <button
                            onClick={() => copyToClipboard(item.copyValue, item.label)}
                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#F2611D] transition-colors"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-4 h-4" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-50 rounded-b-2xl border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Prefer email? Just click the email address above to open your default email client.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;

