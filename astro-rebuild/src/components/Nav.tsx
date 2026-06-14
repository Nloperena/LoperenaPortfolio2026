import React, { useEffect, useState } from 'react';
import { track } from '../utils/analytics';
import { siteProfile } from '../data/site';
import { MobileMenu } from './MobileMenu';

const NavLink = ({ href, label, onClick }: { href?: string; label: string; onClick?: () => void }) => {
  const handleClick = () => {
    track('nav_click', { link: label.toLowerCase() });
    onClick?.();
  };

  const className =
    'relative flex items-center justify-center h-full w-full px-2 lg:px-3 border-none bg-transparent cursor-pointer font-mono text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.18em] text-foreground hover:bg-highlight hover:text-foreground transition-none';

  if (onClick) {
    return (
      <button type="button" onClick={handleClick} className={className}>
        {label}
      </button>
    );
  }

  return (
    <a href={href} onClick={() => track('nav_click', { link: label.toLowerCase() })} className={className}>
      {label}
    </a>
  );
};

export const Nav = () => {
  const [time, setTime] = useState('00:00:00 EST');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options = {
        timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      } as const;
      setTime(`${new Intl.DateTimeFormat('en-US', options).format(now)} EST`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleContactClick = () => {
    track('contact_click', { source: 'nav' });
    // @ts-ignore
    if (typeof window !== 'undefined' && window.openContactHub) {
      // @ts-ignore
      window.openContactHub();
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 h-16 bg-background border-b-2 border-foreground">
        <div className="grid grid-cols-12 h-full w-full max-w-[100vw]">
          <div className="col-span-8 lg:col-span-3 flex items-center px-4 lg:px-6 border-r-2 border-foreground h-full min-w-0">
            <a href="/" className="flex items-baseline gap-2 min-w-0">
              <span className="font-mono text-[10px] lg:text-xs font-black tracking-tight uppercase truncate">
                NICO LOPERENA
              </span>
              <span className="font-mono text-[8px] lg:text-[9px] font-bold tracking-widest hidden xl:inline shrink-0">
                // ENG
              </span>
            </a>
          </div>

          <div className="col-span-4 flex lg:hidden items-center justify-end px-4 h-full border-l-2 border-foreground">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex flex-col gap-1.5 justify-center items-center w-10 h-10 bg-transparent border-2 border-foreground"
              aria-label="Open mobile menu"
            >
              <div className="w-5 h-0.5 bg-foreground" />
              <div className="w-5 h-0.5 bg-foreground" />
            </button>
          </div>

          <div className="hidden lg:flex lg:col-span-3 flex-col xl:flex-row items-center justify-center xl:justify-between px-4 border-r-2 border-foreground h-full gap-1">
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-secondary truncate hidden sm:inline">
              {siteProfile.locationShort}
            </span>
            <span className="font-mono text-[10px] font-bold tracking-widest whitespace-nowrap hidden xl:block bg-concrete border border-foreground px-2 py-1">
              {time}
            </span>
          </div>

          <div className="hidden lg:grid lg:col-span-4 grid-cols-5 h-full border-r-2 border-foreground divide-x-2 divide-foreground">
            <NavLink href="/work" label="WORK" />
            <NavLink href="/about" label="ABOUT" />
            <NavLink href="/blog" label="BLOG" />
            <NavLink href={siteProfile.resumePath} label="RESUME" />
            <NavLink href="/about#stack" label="STACK" />
          </div>

          <button
            type="button"
            onClick={handleContactClick}
            className="hidden lg:flex lg:col-span-2 h-full bg-foreground text-background hover:bg-highlight hover:text-foreground items-center justify-center cursor-pointer border-none font-mono text-[10px] font-bold uppercase tracking-widest transition-none"
          >
            LET&apos;S TALK ↗
          </button>
        </div>
      </nav>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};
