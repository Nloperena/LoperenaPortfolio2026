import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { brandedCursors, type BrandedCursorState } from '../data/cursors';

const INTERACTIVE =
  'a, button, [role="button"], label[for], select, summary, input[type="submit"], input[type="button"], .cursor-pointer';
const TEXT =
  'input:not([type="submit"]):not([type="button"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="file"]), textarea, [contenteditable="true"]';

function resolveCursorState(target: EventTarget | null): BrandedCursorState {
  if (!(target instanceof Element)) return 'default';

  const disabled = target.closest(':disabled, [aria-disabled="true"], .cursor-not-allowed');
  if (disabled) return 'not-allowed';

  if (target.closest('[aria-busy="true"]')) return 'wait';

  const style = window.getComputedStyle(target);
  const cssCursor = style.cursor;

  if (cssCursor.includes('grabbing')) return 'grabbing';
  if (cssCursor.includes('grab')) return 'grab';
  if (cssCursor.includes('ew-resize')) return 'ew-resize';
  if (cssCursor.includes('ns-resize')) return 'ns-resize';
  if (cssCursor.includes('nwse-resize')) return 'nwse-resize';
  if (cssCursor.includes('nesw-resize')) return 'nesw-resize';
  if (cssCursor.includes('crosshair')) return 'crosshair';
  if (cssCursor.includes('move')) return 'move';
  if (cssCursor.includes('help')) return 'help';
  if (cssCursor.includes('progress')) return 'progress';
  if (cssCursor.includes('wait')) return 'wait';
  if (cssCursor.includes('text') || target.closest(TEXT)) return 'text';
  if (target.closest(INTERACTIVE)) return 'pointer';

  return 'default';
}

export const CustomCursor = () => {
  const reduceMotion = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [state, setState] = useState<BrandedCursorState>('default');
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    const desktop = window.matchMedia('(min-width: 768px)');

    const syncEnabled = () => {
      const active = finePointer.matches && desktop.matches && !reduceMotion;
      setEnabled(active);
      document.documentElement.classList.toggle('branded-cursor-active', active);
    };

    syncEnabled();
    finePointer.addEventListener('change', syncEnabled);
    desktop.addEventListener('change', syncEnabled);

    return () => {
      finePointer.removeEventListener('change', syncEnabled);
      desktop.removeEventListener('change', syncEnabled);
      document.documentElement.classList.remove('branded-cursor-active');
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setState(resolveCursorState(e.target));
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => setState(resolveCursorState(e.target));
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, [enabled, visible]);

  if (!enabled || !visible) return null;

  const spec = brandedCursors[state];
  const isPointer = state === 'pointer';

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
      aria-hidden
      animate={{ x: pos.x - spec.x, y: pos.y - spec.y }}
      transition={{ type: 'spring', stiffness: 1200, damping: 55, mass: 0.12 }}
    >
      <motion.img
        src={spec.src}
        alt=""
        width={spec.size}
        height={spec.size}
        draggable={false}
        className="select-none"
        animate={{
          scale: isPointer ? 1.12 : state === 'not-allowed' ? 0.95 : 1,
          rotate: state === 'wait' || state === 'progress' ? 360 : 0,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 500, damping: 28 },
          rotate: state === 'wait' || state === 'progress' ? { duration: 1.2, repeat: Infinity, ease: 'linear' } : { duration: 0 },
        }}
      />
    </motion.div>
  );
};
