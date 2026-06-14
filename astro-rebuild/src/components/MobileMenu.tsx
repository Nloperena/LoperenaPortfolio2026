import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteProfile } from '../data/site';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleContactClick = () => {
    onClose();
    // @ts-ignore
    if (typeof window !== 'undefined' && window.openContactHub) {
      // @ts-ignore
      window.openContactHub();
    }
  };

  const menuVariants = {
    hidden: { x: '100%' },
    visible: {
      x: 0,
      transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1], staggerChildren: 0.06, delayChildren: 0.1 },
    },
    exit: {
      x: '100%',
      transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 16 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] h-[100svh] w-screen bg-background text-foreground flex flex-col lg:hidden border-l-4 border-highlight"
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(to right, var(--color-highlight-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-highlight-line) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          <div className="h-16 w-full flex items-center justify-between px-4 border-b-2 border-foreground relative z-10">
            <span className="font-mono text-xs font-black tracking-tight uppercase">NICO LOPERENA</span>
            <button
              onClick={onClose}
              className="font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 h-full px-2 cursor-pointer hover:bg-highlight hover:text-foreground"
            >
              Close [X]
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center px-8 relative z-10">
            <nav className="flex flex-col gap-6">
              {[
                { href: '/work', label: 'Work', onClick: onClose },
                { href: '/about', label: 'About', onClick: onClose },
                { href: '/about#stack', label: 'Stack', onClick: onClose },
                { href: '/blog', label: 'Blog', onClick: onClose },
                { href: siteProfile.resumePath, label: 'Resume', onClick: onClose, download: siteProfile.resumeDownloadName },
              ].map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  download={item.download}
                  onClick={item.onClick}
                  variants={itemVariants}
                  className="font-mono text-4xl sm:text-5xl font-black uppercase tracking-tighter hover:bg-highlight hover:text-foreground px-2 -mx-2"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </div>

          <motion.div variants={itemVariants} className="w-full relative z-10 border-t-2 border-foreground">
            <button
              onClick={handleContactClick}
              className="w-full h-20 bg-highlight text-foreground hover:bg-foreground hover:text-background transition-none flex items-center justify-between px-8 border-none outline-none cursor-pointer"
            >
              <span className="font-mono text-xs font-bold uppercase tracking-widest">Let&apos;s talk</span>
              <span className="font-mono text-xl">↗</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
