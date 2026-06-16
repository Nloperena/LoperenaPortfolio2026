/** Branded NL cursor assets — keep SVGs in public/cursors/ in sync. */
export type BrandedCursorState =
  | 'default'
  | 'pointer'
  | 'text'
  | 'not-allowed'
  | 'wait'
  | 'progress'
  | 'grab'
  | 'grabbing'
  | 'help'
  | 'move'
  | 'crosshair'
  | 'ew-resize'
  | 'ns-resize'
  | 'nwse-resize'
  | 'nesw-resize';

export interface BrandedCursorSpec {
  src: string;
  /** Hotspot X (px from left) */
  x: number;
  /** Hotspot Y (px from top) */
  y: number;
  /** Render size for animated overlay */
  size: number;
}

export const brandedCursors: Record<BrandedCursorState, BrandedCursorSpec> = {
  default: { src: '/cursors/default.svg', x: 12, y: 12, size: 24 },
  pointer: { src: '/cursors/pointer.svg', x: 6, y: 4, size: 32 },
  text: { src: '/cursors/text.svg', x: 10, y: 14, size: 20 },
  'not-allowed': { src: '/cursors/not-allowed.svg', x: 14, y: 14, size: 28 },
  wait: { src: '/cursors/wait.svg', x: 12, y: 12, size: 24 },
  progress: { src: '/cursors/progress.svg', x: 12, y: 12, size: 24 },
  grab: { src: '/cursors/grab.svg', x: 14, y: 14, size: 28 },
  grabbing: { src: '/cursors/grabbing.svg', x: 14, y: 14, size: 28 },
  help: { src: '/cursors/help.svg', x: 14, y: 14, size: 28 },
  move: { src: '/cursors/move.svg', x: 14, y: 14, size: 28 },
  crosshair: { src: '/cursors/crosshair.svg', x: 14, y: 14, size: 28 },
  'ew-resize': { src: '/cursors/ew-resize.svg', x: 14, y: 14, size: 28 },
  'ns-resize': { src: '/cursors/ns-resize.svg', x: 14, y: 14, size: 28 },
  'nwse-resize': { src: '/cursors/nwse-resize.svg', x: 14, y: 14, size: 28 },
  'nesw-resize': { src: '/cursors/nesw-resize.svg', x: 14, y: 14, size: 28 },
};

export function cursorCssUrl(state: BrandedCursorState, fallback: string): string {
  const { src, x, y } = brandedCursors[state];
  return `url('${src}') ${x} ${y}, ${fallback}`;
}
