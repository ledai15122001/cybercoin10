/**
 * Scroll-bound cyberpunk atmosphere for the page content stack.
 *
 * Replaces the old viewport-fixed Background so the content stack can act as
 * an opaque sheet that scrolls *over* the sticky reveal footer. Everything is
 * absolute (scroll-bound) + CSS-only (no canvas) for cheap 60fps, and uses
 * only transform / opacity / filter. The CRT scanline + vignette overlay is
 * applied separately in App so it stays viewport-fixed across both stacks.
 */
export default function PageAtmosphere() {
  return (
    <div className="pa-root" aria-hidden>
      <div className="pa-grid" />
      <div className="pa-blob pa-blob-magenta" />
      <div className="pa-blob pa-blob-cyan" />
      <div className="pa-blob pa-blob-yellow" />
      <div className="pa-scanline" />
      <div className="pa-binary">
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            className="pa-bin"
            style={{
              left: `${(i * 6.7) % 100}%`,
              animationDelay: `${i * 0.45}s`,
              animationDuration: `${6 + (i % 4) * 2}s`,
            }}
          />
        ))}
      </div>
      <div className="pa-noise" />
    </div>
  );
}
