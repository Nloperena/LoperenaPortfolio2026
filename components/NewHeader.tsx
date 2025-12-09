'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ContactModal from './ContactModal';

const NewHeader = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleOpenContactModal = () => {
      setIsContactModalOpen(true);
    };

    window.addEventListener('openContactModal', handleOpenContactModal);
    return () => {
      window.removeEventListener('openContactModal', handleOpenContactModal);
    };
  }, []);

  // Handle scroll direction for navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show navbar at the top of the page
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else {
        // Show navbar when scrolling up, hide when scrolling down
        if (currentScrollY < lastScrollY) {
          // Scrolling up
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY) {
          // Scrolling down
          setIsVisible(false);
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 bg-[#1a4d3a] shadow-sm transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-white text-2xl font-bold">
              N_
            </Link>

            {/* Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/blog"
                className="text-white/90 hover:text-white transition-colors font-semibold text-base"
              >
                Blogs
              </Link>
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="bg-[#F2611D] hover:bg-[#ea580c] text-white px-6 py-2 rounded-md transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
              >
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white" 
              aria-label="Open menu"
              onClick={() => setIsContactModalOpen(true)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </>
  );
};

export default NewHeader;

