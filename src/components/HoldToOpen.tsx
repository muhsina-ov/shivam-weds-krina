import { useRef, useState } from "react";

import { gsap, useGSAP, useMotionOk } from "@/lib/motion";
import { usePointerFine } from "@/hooks/use-pointer-fine";
import { cn } from "@/lib/utils";

/**
 * Wraps the cover button. On devices with a fine pointer (mouse / trackpad),
 * requires a 600 ms long-press to open. While held, a gold arc fills around
 * the cursor. On touch devices, behaves as a normal tap (no arc).
 *
 * Reports each click's screen coordinates for the parent to render a ripple.
 */
export function HoldToOpen({
  onActivate,
  onTap,
  children,
  className,
}: {
  onActivate: () => void;
  onTap: (x: number, y: number) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const fine = usePointerFine();
  const ok = useMotionOk();
  const arcRef = useRef<SVGCircleElement>(null);
  const holdFired = useRef(false);
  const [holding, setHolding] = useState(false);

  // GSAP progress arc fill.
  useGSAP(
    () => {
      if (!fine || !ok || !arcRef.current) return;
      const arc = arcRef.current;
      const total = 2 * Math.PI * 36; // r=36
      arc.style.strokeDasharray = `${total}`;
      arc.style.strokeDashoffset = `${total}`;
      return () => {
        gsap.killTweensOf(arc);
      };
    },
    [fine, ok],
  );

  const begin = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!fine) {
      // Touch path — let the click handler fire normally.
      return;
    }
    holdFired.current = false;
    setHolding(true);
    onTap(e.clientX, e.clientY);
    if (!arcRef.current) return;
    gsap.killTweensOf(arcRef.current);
    const total = 2 * Math.PI * 36;
    gsap.fromTo(
      arcRef.current,
      { strokeDashoffset: total },
      {
        strokeDashoffset: 0,
        duration: 0.6,
        ease: "none",
        onComplete: () => {
          holdFired.current = true;
          setHolding(false);
          onActivate();
        },
      },
    );
  };

  const cancel = () => {
    if (!fine) return;
    setHolding(false);
    if (arcRef.current) gsap.killTweensOf(arcRef.current);
    if (arcRef.current) {
      const total = 2 * Math.PI * 36;
      gsap.to(arcRef.current, {
        strokeDashoffset: total,
        duration: 0.18,
        ease: "power2.out",
      });
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Touch devices only — fine-pointer path uses the long-press callback.
    if (!fine) {
      onTap(e.clientX, e.clientY);
      onActivate();
    } else if (!holdFired.current) {
      // Short click on desktop → still open, but show ripple.
      onTap(e.clientX, e.clientY);
      onActivate();
    }
    holdFired.current = false;
  };

  return (
    <button
      type="button"
      onPointerDown={begin}
      onPointerUp={cancel}
      onPointerCancel={cancel}
      onPointerLeave={cancel}
      onClick={handleClick}
      className={cn("relative", className)}
      aria-label="Tap or hold to open the invitation"
    >
      {children}
      {fine && ok && (
        <svg
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 m-auto h-20 w-20 transition-opacity",
            holding ? "opacity-100" : "opacity-0",
          )}
          viewBox="0 0 80 80"
        >
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="oklch(0.93 0.07 86 / 0.25)"
            strokeWidth="2"
          />
          <circle
            ref={arcRef}
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="oklch(0.93 0.07 86 / 0.95)"
            strokeWidth="2"
            strokeLinecap="round"
            transform="rotate(-90 40 40)"
          />
        </svg>
      )}
    </button>
  );
}
