import { useRef } from "react";

import { gsap, useGSAP, useMotionOk } from "@/lib/motion";

/**
 * Wraps the cover <img> with a slow Ken Burns zoom. Pauses on tap (parent
 * passes `paused`) and resumes after the opening sequence finishes.
 */
export function CoverZoom({ src, alt, paused }: { src: string; alt: string; paused: boolean }) {
  const ref = useRef<HTMLImageElement>(null);
  const ok = useMotionOk();

  useGSAP(
    () => {
      if (!ok || !ref.current) return;
      const tween = gsap.to(ref.current, {
        scale: 1.08,
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      return () => {
        tween.kill();
      };
    },
    [ok],
  );

  // When paused, hold the resting scale instantly.
  if (paused && ref.current) {
    ref.current.style.transform = "scale(1)";
  }

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className="h-full w-full object-cover"
      style={{ willChange: "transform" }}
    />
  );
}
