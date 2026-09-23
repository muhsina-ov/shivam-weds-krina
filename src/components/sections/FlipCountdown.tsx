import { useEffect, useRef, useState } from "react";

import { gsap } from "gsap";

import { useGSAP, useMotionOk } from "@/lib/motion";
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
 * Each unit always renders its current value in a static base layer, so the
 * digits can never be blank — even if an animation never runs (reduced
 * motion, background tab throttling, mid-flight unmount).
 *
 * On every change the new value rolls in from just above (CSS `flip-in`) while
 * a ghost of the previous value rolls out below it (CSS `flip-out`). Pure CSS
 * keyframes keep the once-per-second seconds tick buttery smooth without JS
 * driving the transform each frame.
 *
 * Renders nothing meaningful on SSR — the first paint after mount shows the
 * real current values so time-based output cannot disagree with hydration.
 */
export function FlipCountdown({ target }: { target: string }) {
  const t = new Date(target).getTime();
  const [values, setValues] = useState<number[] | null>(null);
  const prev = useRef<number[]>([0, 0, 0, 0]);
  const ok = useMotionOk();

  useEffect(() => {
    const first = diff(t);
    prev.current = first;
    setValues(first);
    const id = window.setInterval(() => {
      setValues((cur) => {
        if (cur) prev.current = cur;
        return diff(t);
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [t]);

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
  const changed = animate && value !== prev;

  // Highlight pulse: only runs once on mount if already inside the threshold.
  useGSAP(
    () => {
      if (!highlight || !boxRef.current) return;
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
    [highlight],
  );

  return (
    <div
      ref={boxRef}
      className={cn(
        "flip-stack rounded-lg border border-gold/25 bg-card/50 px-2 py-4 text-center backdrop-blur-sm",
      )}
    >
      <div className="relative h-9 overflow-hidden">
        {/* Outgoing ghost of the previous value — rolls down and fades out */}
        {changed && (
          <span
            key={`prev-${value}`}
            aria-hidden
            className="flip-digit-out font-display absolute inset-0 grid place-items-center text-3xl gold-text tabular-nums"
          >
            {pad(prev)}
          </span>
        )}
        {/* Current value — always present, rolls in from above on change */}
        <span
          key={`value-${value}`}
          className={cn(
            "flip-digit font-display absolute inset-0 grid place-items-center text-3xl gold-text tabular-nums",
            changed && "flip-digit-in",
          )}
        >
          {pad(value)}
        </span>
      </div>
      <div className="mt-1 text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
