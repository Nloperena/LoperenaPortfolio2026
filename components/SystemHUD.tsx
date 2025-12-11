'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';

const SystemHUD = () => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  
  // Convert velocity to a display string
  const [velocity, setVelocity] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toISOString().split('T')[1].slice(0, 12)); // HH:mm:ss.ms
    };
    const timer = setInterval(updateTime, 50);
    updateTime();
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    return smoothVelocity.on("change", (latest) => {
      setVelocity(Math.abs(Math.round(latest)));
    });
  }, [smoothVelocity]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none font-mono text-[10px] uppercase tracking-widest text-zinc-400 select-none hidden md:block">
      
      {/* Top Left: Corner Marker */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-zinc-300"></div>
      
      {/* Top Right: Corner Marker + Time */}
      <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-zinc-300"></div>
      <div className="absolute top-4 right-10">
        SYS_TIME: <span className="text-[#1a1a1a]">{time}</span>
      </div>

      {/* Bottom Left: Corner Marker + Velocity */}
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-zinc-300"></div>
      <div className="absolute bottom-4 left-10 flex gap-4">
        <span>VEL: <span className="text-[#8B2E2E]">{velocity} px/s</span></span>
        <span>POS: <span className="text-[#1a1a1a]">Y:{Math.round(scrollY.get())}</span></span>
      </div>

      {/* Bottom Right: Corner Marker + Coordinates */}
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-zinc-300"></div>
      <div className="absolute bottom-4 right-10">
        COORD: <span className="text-[#1a1a1a]">X:{mousePos.x} Y:{mousePos.y}</span>
      </div>

      {/* Center Crosshair (Optional, maybe too much clutter, kept subtle) */}
      <div className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 opacity-20">
         <div className="absolute top-0 left-1/2 h-full w-px bg-zinc-400"></div>
         <div className="absolute left-0 top-1/2 w-full h-px bg-zinc-400"></div>
      </div>

    </div>
  );
};

export default SystemHUD;
















