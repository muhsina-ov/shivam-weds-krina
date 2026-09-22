import { useEffect, useState } from "react";

/**
 * Renders a small gold-soft radial ripple at the click position, then
 * removes itself. Pure CSS — no GSAP needed for a single ephemeral element.
 *
 * The parent listens for the cover <button>'s click and reports the
 * coordinates via the `tap` prop.
 */
export function TapRipple({ tap }: { tap: { x: number; y: number; id: number } | null }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!tap) return;
    setVisible(true);
    const id = window.setTimeout(() => setVisible(false), 720);
    return () => window.clearTimeout(id);
  }, [tap]);

  if (!tap || !visible) return null;

  return (
    <span
      key={tap.id}
      aria-hidden
      className="ripple-anim pointer-events-none fixed left-0 top-0 z-30 h-24 w-24 rounded-full border border-gold-soft/60 bg-gold-soft/10"
      style={{
        left: tap.x,
        top: tap.y,
      }}
    />
  );
}
