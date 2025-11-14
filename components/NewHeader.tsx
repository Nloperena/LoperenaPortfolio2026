'use client'

import React from 'react';
import Link from 'next/link';

const NewHeader = () => {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a4d3a] shadow-sm">
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-white text-2xl font-bold">
              N_
            </Link>

            {/* Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a 
                href="#services-section"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('services-section');
                }}
                className="text-white hover:text-[#2d6b52] transition-colors font-medium"
              >
                Work
              </a>
              <a 
                href="#contact-section"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact-section');
                }}
                className="bg-[#1a4d3a] border-2 border-white text-white px-6 py-2 rounded-md hover:bg-[#2d6b52] transition-colors font-medium"
              >
                Contact
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white" aria-label="Open menu">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
        
        {/* Under Construction Bar */}
        <div className="bg-[#F2611D] text-white text-center py-2 text-xs md:text-sm font-medium flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Under Construction</span>
        </div>
      </header>
    </>
  );
};

export default NewHeader;

