'use client'

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface ParallaxImageSectionProps {
  imageUrl?: string;
  height?: string;
}

const ParallaxImageSection: React.FC<ParallaxImageSectionProps> = ({
  imageUrl = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80', // Default tech/architecture image
  height = '100vh'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Parallax effect: image moves slower than scroll, creating depth
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 0.9]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#f5f5f0]"
      style={{ height: '150vh' }} // Extra height for scroll effect
    >
      {/* Sticky container - image stays in viewport */}
      <div className="sticky top-0 w-full h-screen">
        {/* Parallax image layer - moves slower creating depth */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            y,
            scale,
            opacity
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={imageUrl}
              alt="Decorative parallax image"
              fill
              priority={false}
              className="object-cover"
              style={{
                objectPosition: 'center center'
              }}
            />
            {/* Gradient overlays for depth and seamless blending */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#f5f5f0] via-transparent to-[#f5f5f0]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#f5f5f0]/60 via-transparent to-transparent" />
          </div>
        </motion.div>

        {/* Additional depth layer - subtle texture */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 0])
          }}
        >
          <div className="w-full h-full bg-[#1a4d3a]/5" />
        </motion.div>
      </div>
    </div>
  );
};

export default ParallaxImageSection;
