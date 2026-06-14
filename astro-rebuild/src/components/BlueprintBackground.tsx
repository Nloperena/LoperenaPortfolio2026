/** Static brutalist grid — no motion, no blur. */
export const BlueprintBackground = () => (
  <div
    className="fixed inset-0 pointer-events-none z-0"
    aria-hidden
    style={{
      backgroundImage: `
        linear-gradient(to right, rgba(13, 13, 13, 0.12) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(13, 13, 13, 0.12) 1px, transparent 1px)
      `,
      backgroundSize: '48px 48px',
    }}
  />
);
