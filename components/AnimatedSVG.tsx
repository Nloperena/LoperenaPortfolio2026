'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedSVGProps {
  src: string;
  className?: string;
  alt?: string;
}

const AnimatedSVG: React.FC<AnimatedSVGProps> = ({ src, className = '', alt = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [paths, setPaths] = useState<SVGPathElement[]>([]);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  useEffect(() => {
    // Load SVG content
    fetch(src)
      .then(res => res.text())
      .then(text => {
        setSvgContent(text);
      })
      .catch(err => console.error('Failed to load SVG:', err));
  }, [src]);

  useEffect(() => {
    if (!svgContent || !containerRef.current) return;

    // Parse and inject SVG
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
    const svgElement = svgDoc.querySelector('svg');
    
    if (!svgElement) return;

    // Find all paths and prepare for animation
    const allPaths = svgElement.querySelectorAll('path');
    const pathArray = Array.from(allPaths) as SVGPathElement[];
    
    if (pathArray.length === 0) return;

    // Set up stroke animation properties
    pathArray.forEach((path) => {
      const length = path.getTotalLength();
      path.setAttribute('stroke-dasharray', `${length}`);
      path.setAttribute('stroke-dashoffset', `${length}`);
      path.setAttribute('fill', 'transparent');
      path.setAttribute('stroke', '#111111');
      path.setAttribute('stroke-width', '1.5');
    });

    setPaths(pathArray);

    // Inject SVG into container
    const container = containerRef.current;
    container.innerHTML = '';
    container.appendChild(svgElement);
  }, [svgContent]);

  useEffect(() => {
    if (!isInView || paths.length === 0) return;

    const duration = 2000; // 2 seconds
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out animation
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      paths.forEach((path) => {
        const length = parseFloat(path.getAttribute('stroke-dasharray') || '0');
        const offset = length * (1 - easedProgress);
        path.setAttribute('stroke-dashoffset', `${offset}`);
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // After animation completes, fade in the fill
        paths.forEach((path) => {
          path.style.transition = 'fill 0.5s ease-in';
          path.setAttribute('fill', 'rgba(17, 17, 17, 0.1)');
        });
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, paths]);

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-full ${className}`}
      style={{
        filter: 'contrast(1.2) brightness(0.95)',
      }}
    >
      {/* SVG will be injected here */}
      {!svgContent && (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain opacity-20"
          style={{
            filter: 'sepia(0.3) contrast(1.2) grayscale(0.2)',
          }}
        />
      )}
    </div>
  );
};

export default AnimatedSVG;

