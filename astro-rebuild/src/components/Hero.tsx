import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const HERO_VIDEO_SRC = '/Still-motion_of_me.webm';
const HERO_IMAGE_WEBP = '/professional-photo.webp';
const HERO_IMAGE_FALLBACK = '/professional-photo.jpg';

export const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleContactClick = () => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.openContactHub) {
      // @ts-ignore
      window.openContactHub();
    }
  };

  // --- Parallax setup for Deep Background (Layer 1) ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const bgX = useTransform(smoothX, [-1, 1], [20, -20]);
  const bgY = useTransform(smoothY, [-1, 1], [20, -20]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // --- Animation Variants for "Drafting" Sequence ---
  const gridContainer = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const drawLineX = {
    hidden: { scaleX: 0, originX: 0, opacity: 0 },
    show: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: "circOut" } }
  };

  const drawLineY = {
    hidden: { scaleY: 0, originY: 0, opacity: 0 },
    show: { scaleY: 1, opacity: 1, transition: { duration: 0.8, ease: "circOut" } }
  };

  const contentReveal = {
    hidden: { y: "100%" },
    show: { y: "0%", transition: { type: "spring", stiffness: 100, damping: 20, mass: 1 } }
  };

  return (
    <section 
      className="relative w-full min-h-screen bg-background pt-32 pb-24 px-4 md:px-8 lg:px-12 z-10"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* LAYER 1: Deep Background (Fixed to Viewport) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          className="absolute inset-[-50%] opacity-[0.03]"
          style={{
            x: bgX,
            y: bgY,
            backgroundImage: 'linear-gradient(to right, #7D6B5D 1px, transparent 1px), linear-gradient(to bottom, #7D6B5D 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
          animate={mounted ? { x: ["0px", "-40px"], y: ["0px", "-40px"] } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* LAYER 2 & 3: The Blueprint Grid & Foreground Content */}
      <motion.div
        className="relative z-10 w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 bg-background/95 backdrop-blur-sm shadow-2xl shadow-accent/5"
        variants={gridContainer}
        initial="hidden"
        animate="show"
      >
        <motion.div className="absolute top-0 left-0 right-0 h-px bg-accent/20 z-20" variants={drawLineX} />
        <motion.div className="absolute bottom-0 left-0 right-0 h-px bg-accent/20 z-20" variants={drawLineX} />
        <motion.div className="absolute top-0 bottom-0 left-0 w-px bg-accent/20 z-20" variants={drawLineY} />
        <motion.div className="absolute top-0 bottom-0 right-0 w-px bg-accent/20 z-20" variants={drawLineY} />

        {/* Row 1 */}
        <div className="lg:col-span-8 p-6 md:p-8 flex justify-between items-center relative bg-white/30 border-b border-accent/20">
          <div className="overflow-hidden">
            <motion.div variants={contentReveal} className="flex items-center justify-between w-full">
              <span className="font-mono text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-accent">
                Senior Software Architect
              </span>
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-accent/60 hidden sm:block ml-auto">
                Orlando, FL / Global
              </span>
            </motion.div>
          </div>
        </div>
        <div className="hidden lg:block lg:col-span-4 p-6 md:p-8 relative bg-white/30 border-b border-accent/20"></div>

        {/* Row 2 */}
        <div className="lg:col-span-8 flex flex-col relative bg-accent/[0.01] border-r-0 lg:border-r border-accent/20">
          <div className="flex-1 p-6 md:px-12 relative flex items-center justify-start min-h-[120px] md:min-h-[160px] border-b border-accent/10">
            <div className="overflow-hidden w-full">
              <motion.h1
                variants={contentReveal}
                className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[6.5rem] xl:text-[8rem] font-sans font-black tracking-tighter leading-none uppercase text-foreground"
                style={{ fontStretch: 'ultra-condensed' }}
              >
                SCALABLE
              </motion.h1>
            </div>
          </div>
          <div className="flex-1 p-6 md:px-12 relative flex items-center justify-start min-h-[120px] md:min-h-[160px] border-b border-accent/10">
            <div className="overflow-hidden w-full">
              <motion.h1
                variants={contentReveal}
                className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[6.5rem] xl:text-[8rem] font-sans font-black tracking-tighter leading-none uppercase text-accent"
                style={{ fontStretch: 'ultra-condensed' }}
              >
                DIGITAL
              </motion.h1>
            </div>
          </div>
          <div className="flex-1 p-6 md:px-12 relative flex items-center justify-start min-h-[120px] md:min-h-[160px]">
            <div className="overflow-hidden w-full">
              <motion.h1
                variants={contentReveal}
                className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[6.5rem] xl:text-[8rem] font-sans font-black tracking-tighter leading-none uppercase text-foreground"
                style={{ fontStretch: 'ultra-condensed' }}
              >
                SYSTEMS
              </motion.h1>
            </div>
          </div>
        </div>

        {/* Right side: still-motion video with photo fallback — fills entire cell */}
        <div className="lg:col-span-4 lg:row-span-2 lg:col-start-9 lg:row-start-2 relative border-b lg:border-b-0 border-accent/20 bg-white/20 min-h-[420px] overflow-hidden">
          <motion.div variants={contentReveal} className="absolute inset-0 w-full h-full">
            {!videoReady && (
              <img
                src={HERO_IMAGE_WEBP}
                alt="Nico Loperena"
                loading="eager"
                className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 bg-background"
                onError={(e) => {
                  const el = e.currentTarget;
                  if (el.src.endsWith('.webp')) {
                    el.src = HERO_IMAGE_FALLBACK;
                  }
                }}
              />
            )}
            <video
              ref={videoRef}
              src={HERO_VIDEO_SRC}
              poster={HERO_IMAGE_WEBP}
              muted
              loop
              playsInline
              autoPlay
              preload="auto"
              className={`absolute inset-0 w-full h-full object-cover grayscale contrast-125 bg-background ${videoReady ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              onCanPlay={() => setVideoReady(true)}
              onLoadedData={() => setVideoReady(true)}
              onError={() => setVideoReady(false)}
            />
          </motion.div>
        </div>

        {/* Row 3: merged single bottom cell */}
        <div className="lg:col-span-8 p-6 md:p-10 relative bg-white/30 border-t border-accent/20">
          <div className="overflow-hidden">
            <motion.div variants={contentReveal} className="w-full flex flex-col gap-8">
              <p className="font-serif italic text-lg md:text-xl text-foreground/80 leading-relaxed m-0 max-w-4xl">
                I engineer high-performance websites, integrate AI solutions, and design cloud infrastructure to help brands operate faster and convert more qualified leads.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
                <button
                  onClick={handleContactClick}
                  className="group relative bg-foreground text-background py-5 px-7 font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-highlight hover:text-foreground transition-all duration-300 shadow-none rounded-none border border-foreground"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Start a Project
                    <span className="font-mono text-lg transition-transform duration-300 group-hover:translate-x-1.5 leading-none -mt-0.5">
                      →
                    </span>
                  </span>
                </button>

                <a
                  href="/about"
                  className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-accent hover:text-foreground transition-colors whitespace-nowrap"
                >
                  View Career Samples
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};