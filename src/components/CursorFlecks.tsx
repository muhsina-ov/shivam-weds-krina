import { useEffect, useRef, useState } from "react";

import { usePointerFine } from "@/hooks/use-pointer-fine";

/**
 * A single gold-soft dot that lerps toward the cursor. Pure RAF — no GSAP.
 * Mounts only on devices with a fine pointer (mouse / trackpad).
 */
export function CursorFlecks() {
  const fine = usePointerFine();
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const raf = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!fine) return;
    setMounted(true);

    const onMove = (e: PointerEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const tick = () => {
      // 200 ms ease-out lerp
      const ease = 0.18;
      current.current.x += (target.current.x - current.current.x) * ease;
      current.current.y += (target.current.y - current.current.y) * ease;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf.current != null) cancelAnimationFrame(raf.current);
    };
  }, [fine]);

  if (!fine || !mounted) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 h-2 w-2 rounded-full bg-gold-soft/70 mix-blend-screen"
      style={{ filter: "blur(0.5px)" }}
    />
  );
}
