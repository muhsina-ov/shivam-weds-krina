import { useCallback, useMemo, useRef, useState } from "react";

import { gsap } from "gsap";

import { cn } from "@/lib/utils";
import { useMotionOk } from "@/lib/motion";

const HOLD_MS = 1100;
const LANTERN_COUNT = 12;
const EMBER_COUNT = 18;

/**
 * Touch-and-hold to light a brass diya. While held, a thin gold arc fills
 * around the diya. On completion, the wick ignites, the flame flickers, and
 * twelve floating lanterns drift upward with depth (varying scale / blur /
 * opacity) over ~5 s before fading. Replaces the first Breather between
 * Story and Celebrations.
 */
export function DiyaCeremony() {
  const [lit, setLit] = useState(false);
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const ok = useMotionOk();
  const progressRef = useRef<SVGCircleElement>(null);
  const holdFired = useRef(false);
  const progressTween = useRef<gsap.core.Tween | null>(null);

  const embers = useMemo(
    () =>
      Array.from({ length: EMBER_COUNT }, (_, i) => ({
        x: ((i * 47) % 150) - 75,
        y: 55 + ((i * 31) % 95),
        delay: ((i * 0.045) % 0.5).toFixed(2),
        size: 2 + (i % 3),
      })),
    [],
  );

  // Deterministic per-index params so SSR and client agree and the lanterns
  // don't re-randomise between hydration and animation start.
  const lanterns = useMemo(
    () =>
      Array.from({ length: LANTERN_COUNT }, (_, i) => ({
        delay: ((i * 0.31) % 1.4).toFixed(2),
        depth: (0.55 + ((i * 0.43) % 1) * 1.05).toFixed(2),
        drift: (((i * 53) % 200) - 100).toFixed(0),
        blur: (((i * 0.27) % 1) * 2.4).toFixed(2),
        alpha: (0.55 + ((i * 0.19) % 1) * 0.4).toFixed(2),
      })),
    [],
  );

  const ignite = useCallback(() => {
    if (holdFired.current) return;
    holdFired.current = true;
    setHolding(false);
    setProgress(100);
    setLit(true);
    if ("vibrate" in navigator) navigator.vibrate?.([20, 35, 45]);
  }, []);

  const startHold = () => {
    if (lit || holding) return;
    if (!ok) {
      ignite();
      return;
    }
    holdFired.current = false;
    setHolding(true);
    setProgress(0);
    if (!progressRef.current) return;
    const arc = progressRef.current;
    const total = 2 * Math.PI * 36;
    arc.style.strokeDasharray = `${total}`;
    gsap.killTweensOf(arc);
    const meter = { value: 0 };
    progressTween.current = gsap.to(meter, {
      value: 100,
      duration: HOLD_MS / 1000,
      ease: "none",
      onUpdate: () => setProgress(Math.round(meter.value)),
      onComplete: ignite,
    });
    gsap.fromTo(
      arc,
      { strokeDashoffset: total },
      {
        strokeDashoffset: 0,
        duration: HOLD_MS / 1000,
        ease: "none",
      },
    );
  };

  const endHold = () => {
    if (lit) return;
    setHolding(false);
    progressTween.current?.kill();
    progressTween.current = null;
    setProgress(0);
    if (!progressRef.current) return;
    const arc = progressRef.current;
    gsap.killTweensOf(arc);
    const total = 2 * Math.PI * 36;
    gsap.to(arc, {
      strokeDashoffset: total,
      duration: 0.22,
      ease: "power2.out",
    });
  };

  return (
    <section
      data-section="diya"
      className={cn(
        "diya-stage relative isolate overflow-hidden px-6 py-32 text-center",
        lit && "diya-stage-lit",
      )}
    >
      <div aria-hidden className="diya-ambient absolute inset-0 -z-10 opacity-0" />
      <p className="font-display text-[0.6rem] uppercase tracking-[0.4em] text-gold-soft/70">
        The Ritual
      </p>

      <div className={cn("relative mx-auto mt-8 h-56 w-56", holding && "diya-holding")}>
        {/* Soft glow behind the diya */}
        <div
          aria-hidden
          className={cn(
            "absolute -inset-10 rounded-full",
            lit ? "diya-glow opacity-100" : holding ? "opacity-45" : "opacity-0",
          )}
          style={{
            background: "radial-gradient(circle, oklch(0.93 0.07 86 / 0.45) 0%, transparent 65%)",
            transition: "opacity 800ms ease-out",
          }}
        />

        <button
          type="button"
          aria-label={lit ? "The diya is lit" : "Touch and hold to light the diya"}
          aria-pressed={lit}
          onContextMenu={(event) => event.preventDefault()}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            startHold();
          }}
          onPointerUp={endHold}
          onPointerCancel={endHold}
          onKeyDown={(event) => {
            if ((event.key === " " || event.key === "Enter") && !event.repeat) {
              event.preventDefault();
              startHold();
            }
          }}
          onKeyUp={(event) => {
            if (event.key === " " || event.key === "Enter") endHold();
          }}
          className={cn(
            "group absolute inset-0 grid touch-none place-items-center rounded-full outline-none",
            "transition-transform duration-300 active:scale-[0.97] focus-visible:ring-1 focus-visible:ring-gold/80",
            lit ? "cursor-default" : "cursor-pointer",
          )}
        >
          <span
            aria-hidden
            className={cn(
              "wick-aura absolute right-[38px] top-[50px] h-12 w-12 rounded-full",
              holding && "wick-aura-active",
            )}
          />
          <svg
            viewBox="0 0 120 120"
            className="h-40 w-40 drop-shadow-[0_18px_18px_rgba(42,12,4,0.55)]"
            aria-hidden
          >
            <defs>
              <linearGradient id="brass" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.72 0.08 65)" />
                <stop offset="60%" stopColor="oklch(0.55 0.07 55)" />
                <stop offset="100%" stopColor="oklch(0.38 0.05 50)" />
              </linearGradient>
              <radialGradient id="flame-outer" cx="50%" cy="60%" r="50%">
                <stop offset="0%" stopColor="oklch(0.95 0.12 80)" />
                <stop offset="60%" stopColor="oklch(0.75 0.2 55)" />
                <stop offset="100%" stopColor="oklch(0.55 0.18 40 / 0)" />
              </radialGradient>
              <radialGradient id="flame-mid" cx="50%" cy="60%" r="50%">
                <stop offset="0%" stopColor="oklch(0.98 0.08 92)" />
                <stop offset="100%" stopColor="oklch(0.85 0.15 75 / 0)" />
              </radialGradient>
            </defs>

            {/* Diya bowl — wide flat brass */}
            <ellipse cx="60" cy="86" rx="46" ry="10" fill="url(#brass)" />
            <ellipse cx="60" cy="80" rx="46" ry="10" fill="oklch(0.78 0.1 65)" opacity="0.5" />
            <path d="M 14 80 Q 14 96 60 96 Q 106 96 106 80" fill="url(#brass)" />

            {/* Spout on the right */}
            <path
              d="M 100 78 Q 108 74 110 70 L 106 70 Q 102 76 100 78 Z"
              fill="oklch(0.6 0.07 55)"
            />

            {/* Wick */}
            {lit ? (
              <g className="diya-flame">
                <g className="diya-flicker" style={{ transformOrigin: "106px 70px" }}>
                  {/* Outer */}
                  <path
                    d="M 106 70 Q 100 56 106 44 Q 112 52 110 60 Q 110 64 106 70 Z"
                    fill="url(#flame-outer)"
                    opacity="0.85"
                  />
                  {/* Mid */}
                  <path
                    d="M 106 70 Q 103 60 106 50 Q 109 56 108 62 Q 108 66 106 70 Z"
                    fill="url(#flame-mid)"
                    opacity="0.95"
                  />
                  {/* Inner core */}
                  <ellipse cx="106" cy="64" rx="1.6" ry="3" fill="oklch(0.99 0.02 95)" />
                </g>
              </g>
            ) : (
              <line
                x1="106"
                y1="78"
                x2="106"
                y2="70"
                stroke="oklch(0.3 0.05 50)"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            )}
          </svg>

          {/* Progress arc — only when not lit */}
          {!lit && (
            <svg
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-2 transition-opacity",
                holding ? "opacity-100" : "opacity-45",
              )}
              viewBox="0 0 80 80"
            >
              <circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="oklch(0.93 0.07 86 / 0.18)"
                strokeWidth="1.5"
              />
              <circle
                ref={progressRef}
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="oklch(0.93 0.07 86 / 0.95)"
                strokeWidth="1.5"
                strokeLinecap="round"
                transform="rotate(-90 40 40)"
                style={{
                  strokeDasharray: 2 * Math.PI * 36,
                  strokeDashoffset: 2 * Math.PI * 36,
                }}
              />
            </svg>
          )}

          {!lit && (
            <span
              className={cn(
                "absolute -bottom-1 font-display text-sm italic text-gold-soft/65 transition-opacity",
                holding ? "opacity-100" : "opacity-0",
              )}
            >
              {progress}%
            </span>
          )}
        </button>

        {lit && (
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-[43%]">
            {embers.map((ember, i) => (
              <i
                key={i}
                className="diya-ember absolute rounded-full bg-gold-soft"
                style={{
                  width: ember.size,
                  height: ember.size,
                  animationDelay: `${ember.delay}s`,
                  ["--ember-x" as string]: `${ember.x}px`,
                  ["--ember-y" as string]: `${ember.y}px`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      <p
        className={cn(
          "mx-auto mt-8 max-w-md font-display italic transition-opacity duration-700",
          lit
            ? "text-gold-soft/90 opacity-100"
            : holding
              ? "text-gold-soft opacity-100"
              : "text-gold-soft/70 opacity-100",
        )}
      >
        {lit
          ? "The light is yours. Let the celebrations begin."
          : holding
            ? progress > 72
              ? "Almost there — keep holding."
              : "Stay with the flame."
            : "Press and hold the wick to offer a light."}
      </p>
      {!lit && !holding && (
        <p className="mt-2 text-[0.52rem] uppercase tracking-[0.32em] text-gold-soft/40">
          hold for one breath
        </p>
      )}

      {/* Lantern release — pre-rendered, hidden until lit, then animated via CSS */}
      <div
        aria-hidden
        className={cn("pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[80vh]")}
      >
        {lit &&
          lanterns.map((p, i) => (
            <span
              key={i}
              className="lantern"
              style={{
                left: `calc(50% + ${p.drift}px)`,
                animationDelay: `${p.delay}s`,
                ["--depth" as string]: p.depth,
                ["--blur" as string]: `${p.blur}px`,
                ["--drift" as string]: `${p.drift}px`,
                ["--alpha" as string]: p.alpha,
              }}
            />
          ))}
      </div>
    </section>
  );
}
