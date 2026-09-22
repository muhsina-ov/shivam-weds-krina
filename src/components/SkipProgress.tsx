import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/motion";

/**
 * Circular "Skip" button whose stroke arc fills as the opening sequence
 * plays, giving guests a sense of how long remains. Click skips.
 *
 * The total duration is computed from the videos in OpeningSequence.tsx —
 * for now we use a conservative 14s (opener 8s + lotus 6s) as a fallback
 * and let the parent override `duration`.
 */
export function SkipProgress({
  onClick,
  duration = 14,
}: {
  onClick: () => void;
  duration?: number;
}) {
  const arcRef = useRef<SVGCircleElement>(null);

  useGSAP(
    () => {
      const arc = arcRef.current;
      if (!arc) return;
      const total = 2 * Math.PI * 14; // r=14
      arc.style.strokeDasharray = `${total}`;
      gsap.fromTo(
        arc,
        { strokeDashoffset: total },
        { strokeDashoffset: 0, duration, ease: "none" },
      );
      return () => {
        gsap.killTweensOf(arc);
      };
    },
    [duration],
  );

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Skip opening sequence"
      className="absolute bottom-6 right-6 grid h-12 w-12 place-items-center rounded-full border border-gold/40 bg-deep/40 backdrop-blur-sm transition-colors hover:bg-deep/70"
    >
      <svg aria-hidden className="absolute inset-0" viewBox="0 0 32 32">
        <circle
          cx="16"
          cy="16"
          r="14"
          fill="none"
          stroke="oklch(0.93 0.07 86 / 0.2)"
          strokeWidth="1.5"
        />
        <circle
          ref={arcRef}
          cx="16"
          cy="16"
          r="14"
          fill="none"
          stroke="oklch(0.93 0.07 86 / 0.95)"
          strokeWidth="1.5"
          strokeLinecap="round"
          transform="rotate(-90 16 16)"
        />
      </svg>
      <span className="relative text-[0.6rem] uppercase tracking-[0.25em] text-gold-soft/90">
        Skip
      </span>
    </button>
  );
}
