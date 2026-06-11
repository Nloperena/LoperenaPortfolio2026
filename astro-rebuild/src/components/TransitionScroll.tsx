import { useEffect } from 'react';

/** Resets scroll position after Astro view-transition swaps. */
export const TransitionScroll = () => {
  useEffect(() => {
    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    document.addEventListener('astro:after-swap', resetScroll);
    return () => document.removeEventListener('astro:after-swap', resetScroll);
  }, []);

  return null;
};
