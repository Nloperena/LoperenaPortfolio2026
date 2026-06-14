export const VIEWPORT_ONCE = { once: true, amount: 0.2 };

export const BLUEPRINT_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const sectionSequence = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
} as const;

export const drawLineX = {
  hidden: { scaleX: 0, originX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.6, ease: BLUEPRINT_EASE },
  },
} as const;

export const drawLineY = {
  hidden: { scaleY: 0, originY: 0 },
  show: {
    scaleY: 1,
    transition: { duration: 0.6, ease: BLUEPRINT_EASE },
  },
} as const;

export const stampUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: BLUEPRINT_EASE },
  },
} as const;

export const arrowIn = {
  rest: { x: -10, opacity: 0 },
  hover: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.15, ease: BLUEPRINT_EASE },
  },
} as const;
