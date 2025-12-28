import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    { name: 'Lineage', href: '#heritage' },
    { name: 'Archive', href: '#selected-works' },
    { name: 'Specification', href: '#tech-stack' },
    { name: 'Correspondence', href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-[#FAF9F6] py-3 shadow-[0_4px_20px_rgba(0,0,0,0.1)] border-b-2 border-double border-[#8C7A5E]/40' 
            : 'bg-transparent py-6 md:py-10'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 relative">
          
          {/* Logo / Brand - Centered on mobile, left on desktop */}
          <a href="/" className="group flex items-center gap-4">
            <div className={`relative w-12 h-12 md:w-16 md:h-16 flex-shrink-0 transition-all duration-500 ${
              scrolled ? 'opacity-100 scale-90' : 'opacity-100'
            }`}>
              <img
                src="/family-crest-illustration.png"
                alt="Loperena Family Crest"
                className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col">
              <div className={`font-serif text-lg md:text-2xl tracking-[0.3em] transition-colors duration-500 font-bold ${
                scrolled ? 'text-[#4A1010]' : 'text-[#1C1B1A]'
              }`}>
                LOPERENA
              </div>
              <div className={`font-mono text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-bold text-[#8C7A5E] flex items-center gap-2`}>
                Architect of Intelligent Systems
                <span className="opacity-40 font-serif italic tracking-normal normal-case ml-1 md:ml-2">Est. 1732</span>
              </div>
            </div>
          </a>

          {/* Desktop Nav - Centered navigation links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={`font-serif text-[11px] font-bold uppercase tracking-[0.3em] transition-all duration-300 hover:text-[#8C7A5E] relative group py-1 ${
                  scrolled ? 'text-[#4A1010]' : 'text-[#1C1B1A]'
                }`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#8C7A5E] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            
            <div className="h-6 w-px bg-[#8C7A5E]/30 mx-2"></div>

            <button
                onClick={toggleDarkMode}
                className={`p-2 transition-all duration-300 rounded-full hover:bg-[#8C7A5E]/10 ${
                    scrolled ? 'text-[#4A1010]' : 'text-[#1C1B1A]'
                }`}
                aria-label="Toggle Theme"
            >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center gap-4">
              <button
                  onClick={toggleDarkMode}
                  className={scrolled ? 'text-[#1C1B1A] dark:text-[#FAF9F6]' : 'text-[#1A2F28]'}
              >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button 
                className={scrolled ? 'text-[#1C1B1A] dark:text-[#FAF9F6]' : 'text-[#1A2F28]'}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#FAF9F6] dark:bg-[#1A2F28] pt-24 px-6 md:hidden transition-colors duration-300"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl font-serif text-[#1C1B1A] dark:text-[#FAF9F6] border-b border-[#1C1B1A]/10 dark:border-white/10 pb-4 uppercase tracking-widest font-bold"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
