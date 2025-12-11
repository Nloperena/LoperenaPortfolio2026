'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import ContactModal from '@/components/ContactModal';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Check local storage or system preference
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setDarkMode(true);
        document.documentElement.classList.add('dark');
    } else {
        setDarkMode(false);
        document.documentElement.classList.remove('dark');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
      if (darkMode) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
          setDarkMode(false);
      } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
          setDarkMode(true);
      }
  };

  const navLinks = [
    { name: 'Lineage', href: '/#heritage' },
    { name: 'Works', href: '/#selected-works' },
    { name: 'The Ledger', href: '/#ledger-section' },
    { name: 'Correspondence', action: 'modal' },
  ];

  const handleNavClick = (e: React.MouseEvent, link: any) => {
    if (link.action === 'modal') {
      e.preventDefault();
      setContactModalOpen(true);
      setMobileMenuOpen(false);
    } else {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#F2F0E6]/95 dark:bg-[#0A1F1C]/90 backdrop-blur-md shadow-sm py-4 border-b border-[#1C1B1A]/10 dark:border-white/10' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <Link href="#" className="group flex items-center gap-3">
            <div className={`relative w-20 h-20 flex-shrink-0 transition-all duration-300 ${
              scrolled ? 'opacity-100' : 'opacity-90'
            }`}>
              <img
                src="/family-crest-illustration.png"
                alt="Loperena Family Crest"
                className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className={`font-serif text-lg tracking-wide transition-colors duration-300 hidden sm:block ${
              scrolled ? 'text-[#1C1B1A] dark:text-[#F5F5DC]' : 'text-[#0A1F1C]'
            }`}>
              LOPERENA
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href || '#'}
                onClick={(e) => handleNavClick(e, link)}
                className={`font-serif text-sm font-medium uppercase tracking-widest transition-colors duration-300 hover:text-[#B87333] ${
                  scrolled ? 'text-[#1C1B1A] dark:text-[#F5F5DC]' : 'text-[#0A1F1C] hover:text-[#B87333]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Dark Mode Toggle */}
            <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-colors duration-300 ${
                    scrolled 
                        ? 'text-[#1C1B1A] hover:bg-[#1C1B1A]/10 dark:text-[#F5F5DC] dark:hover:bg-[#F5F5DC]/10' 
                        : 'text-[#0A1F1C] hover:bg-[#0A1F1C]/10'
                }`}
                aria-label="Toggle Dark Mode"
            >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center gap-4">
              <button
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-full transition-colors duration-300 ${
                      scrolled 
                          ? 'text-[#1C1B1A] dark:text-[#F5F5DC]' 
                          : 'text-[#0A1F1C]'
                  }`}
                  aria-label="Toggle Dark Mode"
              >
                  {darkMode ? <Sun size={24} /> : <Moon size={24} />}
              </button>

              <button 
                className={scrolled ? 'text-[#1C1B1A] dark:text-[#F5F5DC]' : 'text-[#0A1F1C]'}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#F5F5DC] dark:bg-[#0A1F1C] pt-24 px-6 md:hidden transition-colors duration-300"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href || '#'}
                  onClick={(e) => handleNavClick(e, link)}
                  className="text-2xl font-serif text-[#1C1B1A] dark:text-[#F5F5DC] border-b border-[#1C1B1A]/10 dark:border-white/10 pb-4 hover:text-[#E2725B] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  setContactModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="text-2xl font-serif text-[#1C1B1A] dark:text-[#F5F5DC] text-left border-b border-[#1C1B1A]/10 dark:border-white/10 pb-4 hover:text-[#E2725B] transition-colors"
              >
                Start a Project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </>
  );
};

export default Navbar;
