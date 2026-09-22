import { useEffect, useRef, useState } from "react";

import { gsap } from "gsap";

import { EASE_OUT_EXPO, useGSAP, useMotionOk } from "@/lib/motion";
import { cn } from "@/lib/utils";

const UNITS = ["Days", "Hours", "Minutes", "Seconds"] as const;

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return [
    Math.floor(ms / 86400000),
    Math.floor(ms / 3600000) % 24,
    Math.floor(ms / 60000) % 60,
    Math.floor(ms / 1000) % 60,
  ];
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/**
 * Each unit is a small 3D "flip clock" — two faces stacked inside a
 * perspective container. When the value changes, the previous face slides
 * down and out while the new face slides down and in. Static fallback when
 * reduced motion is requested.
 *
 * Renders nothing on SSR and on the first client render so the time-based
 * value cannot disagree with hydration. The first paint after mount shows
 * the current values.
 */
export function FlipCountdown({ target }: { target: string }) {
  const t = new Date(target).getTime();
  const [values, setValues] = useState<number[] | null>(null);
  const prev = useRef<number[]>([0, 0, 0, 0]);
  const ok = useMotionOk();

  useEffect(() => {
    setValues(diff(t));
    const id = window.setInterval(() => {
      setValues((cur) => {
        if (cur) prev.current = cur;
        return diff(t);
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [t]);

  // Reserve vertical space so layout doesn't jump when the digits appear.
  return (
    <div className="mx-auto grid max-w-md grid-cols-4 gap-3" suppressHydrationWarning>
      {UNITS.map((u, i) =>
        values ? (
          <FlipUnit
            key={u}
            label={u}
            value={values[i] ?? 0}
            prev={prev.current[i] ?? values[i] ?? 0}
            animate={ok}
            highlight={
              (u === "Days" && (values[0] ?? 0) <= 7) || (u === "Hours" && (values[1] ?? 0) <= 6)
            }
          />
        ) : (
          <FlipUnit key={u} label={u} value={0} prev={0} animate={false} highlight={false} />
        ),
      )}
    </div>
  );
}

function FlipUnit({
  label,
  value,
  prev,
  animate,
  highlight,
}: {
  label: string;
  value: number;
  prev: number;
  animate: boolean;
  highlight: boolean;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLDivElement>(null);
  const previousRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Highlight pulse: only runs once on mount if already inside the threshold.
  useGSAP(
    () => {
      if (!animate || !highlight || !boxRef.current) return;
      gsap.fromTo(
        boxRef.current,
        { boxShadow: "0 0 0 0 rgba(0,0,0,0)" },
        {
          boxShadow: "0 0 0 8px rgba(225, 190, 120, 0.35)",
          duration: 0.8,
          yoyo: true,
          repeat: 1,
          ease: "sine.inOut",
        },
      );
    },
    [animate, highlight],
  );

  // Animate when value changes.
  useGSAP(
    () => {
      if (!animate || !currentRef.current || !previousRef.current) return;
      if (!mounted) {
        setMounted(true);
        return;
      }
      if (value === prev) return;
      const tl = gsap.timeline();
      tl.fromTo(
        currentRef.current,
        { yPercent: -100 },
        { yPercent: 0, duration: 0.55, ease: EASE_OUT_EXPO },
        0,
      );
      tl.fromTo(
        previousRef.current,
        { yPercent: 0 },
        { yPercent: 100, duration: 0.55, ease: EASE_OUT_EXPO },
        0,
      );
      return () => tl.kill();
    },
    [animate, value],
  );

  return (
    <div
      ref={boxRef}
      className={cn(
        "flip-stack rounded-lg border border-gold/25 bg-card/50 px-2 py-4 text-center backdrop-blur-sm",
      )}
    >
      <div className="relative h-9 overflow-hidden">
        {/* Previous digit (slides out downward) */}
        <div
          ref={previousRef}
          aria-hidden
          className="flip-face font-display absolute inset-0 grid text-3xl gold-text tabular-nums"
          style={{
            transform: animate ? "translateY(0)" : "translateY(-100%)",
          }}
        >
          <span>{pad(prev)}</span>
        </div>
        {/* Current digit (slides in from the top) */}
        <div
          ref={currentRef}
          className="flip-face font-display absolute inset-0 grid text-3xl gold-text tabular-nums"
          style={{
            transform: animate ? "translateY(-100%)" : "translateY(0)",
          }}
        >
          <span>{pad(value)}</span>
        </div>
      </div>
      <div className="mt-1 text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
