'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', updateMousePosition);

    // Use mutation observer or delegation for dynamic elements
    const handleInteraction = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mouseover', handleInteraction);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleInteraction);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 1000,
        damping: 50,
        mass: 0.1
      }}
    >
      {/* Using mix-blend-difference so it's visible on both light and dark backgrounds */}
      <motion.div 
        className="relative flex items-center justify-center"
        animate={{
          scale: isHovering ? 3 : 1,
        }}
      >
        {/* Default Dot */}
        <div className={`w-2 h-2 bg-white rounded-full transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`} />
        
        {/* Monogram on Hover */}
        <div className={`absolute font-serif text-[8px] text-white font-bold leading-none transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
          NL
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
