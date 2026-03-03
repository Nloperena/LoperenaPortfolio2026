import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const NavLink = ({ href, label, onClick }: { href?: string, label: string, onClick?: () => void }) => {
  if (onClick) {
    return (
      <motion.button 
        onClick={onClick}
        className="relative flex items-center justify-center h-full px-2 lg:px-4 w-full cursor-pointer bg-transparent border-none"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        <span className="text-[9px] lg:text-xs font-mono font-bold uppercase tracking-[0.2em] text-foreground/80 group-hover:text-foreground transition-colors relative z-10">
          {label}
        </span>
        {/* Underline slides in from left to right */}
        <motion.div 
          className="absolute bottom-[35%] left-[15%] right-[15%] h-px bg-foreground"
          variants={{
            rest: { scaleX: 0, originX: 0, opacity: 0 },
            hover: { scaleX: 1, originX: 0, opacity: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }
          }}
        />
      </motion.button>
    );
  }

  return (
    <motion.a 
      href={href} 
      className="relative flex items-center justify-center h-full px-2 lg:px-4 w-full"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <span className="text-[9px] lg:text-xs font-mono font-bold uppercase tracking-[0.2em] text-foreground/80 group-hover:text-foreground transition-colors relative z-10">
        {label}
      </span>
      {/* Underline slides in from left to right */}
      <motion.div 
        className="absolute bottom-[35%] left-[15%] right-[15%] h-px bg-foreground"
        variants={{
          rest: { scaleX: 0, originX: 0, opacity: 0 },
          hover: { scaleX: 1, originX: 0, opacity: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }
        }}
      />
    </motion.a>
  );
};

export const Nav = () => {
  const [time, setTime] = useState("LOCAL: 00:00:00 EST");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options = { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false } as const;
      const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
      setTime(`LOCAL: ${timeString} EST`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleContactClick = () => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.openContactHub) {
      // @ts-ignore
      window.openContactHub();
    }
  };

  const toggleStackRibbon = () => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.toggleStackRibbonState) {
      // @ts-ignore
      window.toggleStackRibbonState();
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 h-16 bg-[#f4f4f0]/80 backdrop-blur-md border-b border-gray-300">
      <div className="grid grid-cols-12 h-full w-full">
        
        {/* Zone 1: The Identity */}
        <div className="col-span-4 lg:col-span-3 flex items-center px-4 lg:px-8 border-r border-gray-300 h-full">
          <a href="/" className="flex items-baseline gap-2">
            <span className="font-sans text-xs lg:text-sm font-black tracking-tighter uppercase text-foreground leading-none">
              NICO LOPERENA
            </span>
            <span className="font-mono text-[8px] lg:text-[10px] text-foreground/40 font-bold tracking-widest hidden xl:inline-block leading-none">
              // DEVELOPER
            </span>
          </a>
        </div>

        {/* Zone 2: Live System Status */}
        <div className="col-span-4 lg:col-span-4 flex flex-col xl:flex-row items-center justify-center xl:justify-between px-2 lg:px-8 border-r border-gray-300 h-full gap-1 xl:gap-4">
          <div className="flex items-center gap-2 lg:gap-3">
            <span className="font-mono text-[8px] lg:text-[10px] font-bold uppercase tracking-widest text-foreground/70 hidden sm:inline-block truncate">
              BASED IN ORLANDO, FL
            </span>
          </div>
          <div className="font-mono text-[9px] lg:text-[11px] font-bold text-foreground/80 tracking-widest whitespace-nowrap">
            {time}
          </div>
        </div>

        {/* Zone 3: Navigation Links */}
        <div className="col-span-3 lg:col-span-3 flex items-center justify-between px-2 lg:px-6 border-r border-gray-300 h-full">
          <NavLink href="/work" label="WORK" />
          <NavLink href="/about" label="ABOUT" />
          <NavLink label="SKILLS" onClick={toggleStackRibbon} />
        </div>

        {/* Zone 4: The Action Grid Cell */}
        <button 
          onClick={handleContactClick}
          className="col-span-1 lg:col-span-2 h-full bg-neutral-900 text-white hover:bg-white hover:text-neutral-900 transition-colors duration-0 flex items-center justify-center group cursor-pointer border-none outline-none"
        >
          <span className="font-mono text-[10px] lg:text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="hidden lg:inline-block">LET'S TALK</span>
            <span className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300">↗</span>
          </span>
        </button>

      </div>
    </nav>
  );
};