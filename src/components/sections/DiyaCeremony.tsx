import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Sparkles } from "lucide-react";

import { gsap } from "gsap";
import { useMotionOk } from "@/lib/motion";
import { cn } from "@/lib/utils";

const HOLD_MS = 1100;
const LANTERN_COUNT = 14;
const EMBER_COUNT = 24;

interface FireworkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  decay: number;
  size: number;
  trail: { x: number; y: number }[];
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  exploded: boolean;
  trail: { x: number; y: number }[];
}

export function DiyaCeremony() {
  const [lit, setLit] = useState(false);
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const ok = useMotionOk();
  const progressRef = useRef<SVGCircleElement>(null);
  const holdFired = useRef(false);
  const progressTween = useRef<gsap.core.Tween | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const embers = useMemo(
    () =>
      Array.from({ length: EMBER_COUNT }, (_, i) => ({
        x: ((i * 47) % 170) - 85,
        y: 50 + ((i * 31) % 110),
        delay: ((i * 0.04) % 0.6).toFixed(2),
        size: 2 + (i % 3.5),
      })),
    [],
  );

  const lanterns = useMemo(
    () =>
      Array.from({ length: LANTERN_COUNT }, (_, i) => ({
        delay: ((i * 0.28) % 1.5).toFixed(2),
        depth: (0.55 + ((i * 0.43) % 1) * 1.1).toFixed(2),
        drift: (((i * 57) % 220) - 110).toFixed(0),
        blur: (((i * 0.27) % 1) * 2.2).toFixed(2),
        alpha: (0.6 + ((i * 0.19) % 1) * 0.4).toFixed(2),
      })),
    [],
  );

  // Fireworks Animation Engine on Canvas
  useEffect(() => {
    if (!lit || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isRunning = true;

    // High-DPI Crisp Retina Canvas Sizing
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 3) : 1;
    let cssW = 0;
    let cssH = 0;

    const updateSize = () => {
      if (!canvas) return;
      cssW = canvas.offsetWidth;
      cssH = canvas.offsetHeight;
      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    updateSize();

    const colors = [
      "#ffd700", // radiant gold
      "#fff2a8", // champagne shimmer
      "#ff5722", // sacred vermilion
      "#ff7675", // rose coral
      "#ffffff", // diamond sparkle
      "#f9ca24", // bright marigold
      "#e056fd", // royal violet sparkle
    ];

    const rockets: Rocket[] = [];
    const particles: FireworkParticle[] = [];

    // Launch a series of firecrackers over time
    const launchRocket = (startX: number, targetX: number, targetY: number) => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const dy = targetY - (cssH - 20);
      const dx = targetX - startX;
      const speed = 13 + Math.random() * 3.5;
      const angle = Math.atan2(dy, dx);
      rockets.push({
        x: startX,
        y: cssH - 20,
        targetY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        exploded: false,
        trail: [],
      });
    };

    const explode = (x: number, y: number, baseColor: string) => {
      const particleCount = 50 + Math.floor(Math.random() * 30);
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 6.5;
        const color =
          Math.random() > 0.35
            ? baseColor
            : colors[Math.floor(Math.random() * colors.length)];
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          alpha: 1,
          decay: 0.01 + Math.random() * 0.012,
          size: 1.8 + Math.random() * 2.2,
          trail: [],
        });
      }
    };

    // Staggered firework launches across the night sky
    const w = cssW;
    const h = cssH;
    const launchSequence = [
      { delay: 80, x: w * 0.5, tx: w * 0.3, ty: h * 0.28 },
      { delay: 350, x: w * 0.52, tx: w * 0.72, ty: h * 0.22 },
      { delay: 780, x: w * 0.48, tx: w * 0.46, ty: h * 0.15 },
      { delay: 1250, x: w * 0.5, tx: w * 0.18, ty: h * 0.33 },
      { delay: 1700, x: w * 0.51, tx: w * 0.82, ty: h * 0.25 },
      { delay: 2200, x: w * 0.49, tx: w * 0.58, ty: h * 0.17 },
      { delay: 2750, x: w * 0.5, tx: w * 0.36, ty: h * 0.23 },
    ];

    launchSequence.forEach(({ delay, x, tx, ty }) => {
      setTimeout(() => {
        if (isRunning) launchRocket(x, tx, ty);
      }, delay);
    });

    const render = () => {
      ctx.clearRect(0, 0, cssW, cssH);

      // Render rockets shooting into the sky
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 7) r.trail.shift();

        r.x += r.vx;
        r.y += r.vy;

        // Glowing streak trail
        ctx.save();
        ctx.beginPath();
        for (let j = 0; j < r.trail.length; j++) {
          const pt = r.trail[j];
          ctx.strokeStyle = r.color;
          ctx.lineWidth = 2.2;
          ctx.globalAlpha = j / r.trail.length;
          ctx.shadowColor = r.color;
          ctx.shadowBlur = 8;
          if (j === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
        ctx.restore();

        // Apex explosion
        if (r.y <= r.targetY || r.vy >= 0) {
          explode(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // Render radiant firecracker sparks
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 5) p.trail.shift();

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.052; // smooth gravity
        p.vx *= 0.978; // air drag
        p.vy *= 0.978;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 7;

        // Draw glittering diamond sparkle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Shimmer glint for larger particles
        if (p.size > 2.5 && p.alpha > 0.4) {
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x - p.size * 1.5, p.y);
          ctx.lineTo(p.x + p.size * 1.5, p.y);
          ctx.moveTo(p.x, p.y - p.size * 1.5);
          ctx.lineTo(p.x, p.y + p.size * 1.5);
          ctx.stroke();
        }

        ctx.restore();
      }

      if (isRunning) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    // End fireworks loop after 6.5s to free CPU
    const timer = setTimeout(() => {
      isRunning = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 6500);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
      clearTimeout(timer);
    };
  }, [lit]);

  const ignite = useCallback(() => {
    if (holdFired.current) return;
    holdFired.current = true;
    setHolding(false);
    setProgress(100);
    setLit(true);
    if ("vibrate" in navigator) navigator.vibrate?.([30, 45, 60]);
  }, []);

  const startHold = useCallback(() => {
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
  }, [lit, holding, ok, ignite]);

  const endHold = useCallback(() => {
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
      duration: 0.25,
      ease: "power2.out",
    });
  }, [lit]);

  return (
    <section
      data-section="diya"
      className={cn(
        "diya-stage relative isolate overflow-hidden px-6 py-28 sm:py-36 text-center select-none",
        lit && "diya-stage-lit",
      )}
      style={{
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
      }}
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-1000",
          lit
            ? "bg-[radial-gradient(ellipse_at_center,rgba(255,160,50,0.28)_0%,rgba(140,20,20,0.15)_60%,transparent_85%)] opacity-100"
            : "bg-[radial-gradient(ellipse_at_center,rgba(200,60,30,0.12)_0%,transparent_70%)] opacity-60",
        )}
      />

      {/* Celebratory Fireworks Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 h-full w-full"
      />

      <p className="font-display text-[0.68rem] uppercase tracking-[0.45em] text-gold-soft/80 font-medium">
        The Ritual
      </p>

      {/* Main Diya Interactive Widget */}
      <div className={cn("relative mx-auto mt-8 h-60 w-60 select-none", holding && "diya-holding")}>
        {/* Expanding radiant light bloom when ignited */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute -inset-16 rounded-full transition-all duration-1000",
            lit
              ? "opacity-100 scale-125 diya-bloom"
              : holding
                ? "opacity-60 scale-105"
                : "opacity-20 scale-95",
          )}
          style={{
            background:
              "radial-gradient(circle, rgba(255, 215, 120, 0.5) 0%, rgba(255, 130, 40, 0.25) 45%, transparent 70%)",
          }}
        />

        {/* Pulsing wick touch aura to guide the user */}
        {!lit && (
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute right-[34px] top-[46px] h-14 w-14 rounded-full transition-opacity duration-300",
              holding
                ? "scale-125 bg-gold/30 animate-pulse"
                : "scale-100 bg-gold/15 animate-ping",
            )}
            style={{ animationDuration: holding ? "0.6s" : "2.2s" }}
          />
        )}

        <button
          type="button"
          aria-label={lit ? "The diya is lit" : "Touch and hold to light the diya"}
          aria-pressed={lit}
          tabIndex={0}
          onContextMenu={(e) => {
            e.preventDefault();
            return false;
          }}
          onPointerDown={(e) => {
            e.preventDefault();
            e.currentTarget.setPointerCapture(e.pointerId);
            startHold();
          }}
          onPointerUp={(e) => {
            e.preventDefault();
            endHold();
          }}
          onPointerCancel={(e) => {
            e.preventDefault();
            endHold();
          }}
          onKeyDown={(e) => {
            if ((e.key === " " || e.key === "Enter") && !e.repeat) {
              e.preventDefault();
              startHold();
            }
          }}
          onKeyUp={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              endHold();
            }
          }}
          className={cn(
            "group absolute inset-0 grid place-items-center rounded-full outline-none select-none",
            "transition-transform duration-300 active:scale-[0.98] focus-visible:ring-1 focus-visible:ring-gold/80",
            lit ? "cursor-default" : "cursor-pointer",
          )}
          style={{
            touchAction: "none",
            WebkitTouchCallout: "none",
            WebkitUserSelect: "none",
            userSelect: "none",
          }}
        >
          <svg
            viewBox="0 0 120 120"
            className="h-44 w-44 drop-shadow-[0_20px_25px_rgba(42,12,4,0.65)] select-none pointer-events-none"
            aria-hidden
          >
            <defs>
              <linearGradient id="brass" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.74 0.09 68)" />
                <stop offset="60%" stopColor="oklch(0.58 0.08 58)" />
                <stop offset="100%" stopColor="oklch(0.40 0.06 50)" />
              </linearGradient>
              <radialGradient id="flame-outer" cx="50%" cy="60%" r="50%">
                <stop offset="0%" stopColor="oklch(0.96 0.14 82)" />
                <stop offset="60%" stopColor="oklch(0.78 0.22 55)" />
                <stop offset="100%" stopColor="oklch(0.55 0.18 40 / 0)" />
              </radialGradient>
              <radialGradient id="flame-mid" cx="50%" cy="60%" r="50%">
                <stop offset="0%" stopColor="oklch(0.99 0.09 95)" />
                <stop offset="100%" stopColor="oklch(0.88 0.16 78 / 0)" />
              </radialGradient>
            </defs>

            {/* Diya bowl — wide traditional brass */}
            <ellipse cx="60" cy="86" rx="46" ry="10" fill="url(#brass)" />
            <ellipse cx="60" cy="80" rx="46" ry="10" fill="oklch(0.78 0.1 65)" opacity="0.55" />
            <path d="M 14 80 Q 14 96 60 96 Q 106 96 106 80" fill="url(#brass)" />

            {/* Spout on the right */}
            <path
              d="M 100 78 Q 108 74 110 70 L 106 70 Q 102 76 100 78 Z"
              fill="oklch(0.62 0.08 58)"
            />

            {/* Wick & Flame */}
            {lit ? (
              <g className="diya-flame">
                <g className="diya-flicker" style={{ transformOrigin: "106px 70px" }}>
                  <path
                    d="M 106 70 Q 100 56 106 44 Q 112 52 110 60 Q 110 64 106 70 Z"
                    fill="url(#flame-outer)"
                    opacity="0.9"
                  />
                  <path
                    d="M 106 70 Q 103 60 106 50 Q 109 56 108 62 Q 108 66 106 70 Z"
                    fill="url(#flame-mid)"
                    opacity="0.98"
                  />
                  <ellipse cx="106" cy="64" rx="1.8" ry="3.5" fill="oklch(1 0.01 98)" />
                </g>
              </g>
            ) : (
              <line
                x1="106"
                y1="78"
                x2="106"
                y2="70"
                stroke="oklch(0.3 0.05 50)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            )}
          </svg>

          {/* Golden Progress Arc while holding */}
          {!lit && (
            <svg
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-2 transition-opacity",
                holding ? "opacity-100" : "opacity-40",
              )}
              viewBox="0 0 80 80"
            >
              <circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="oklch(0.93 0.07 86 / 0.2)"
                strokeWidth="1.8"
              />
              <circle
                ref={progressRef}
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="oklch(0.93 0.12 85)"
                strokeWidth="2.2"
                strokeLinecap="round"
                transform="rotate(-90 40 40)"
                style={{
                  strokeDasharray: 2 * Math.PI * 36,
                  strokeDashoffset: 2 * Math.PI * 36,
                }}
              />
            </svg>
          )}

          {!lit && holding && (
            <span className="absolute -bottom-2 font-display text-sm tracking-wider font-medium text-gold">
              {progress}%
            </span>
          )}
        </button>

        {/* Rising glowing embers on ignition */}
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

      {/* Prominent, crystal-clear instructions & feedback */}
      <div className="mt-8 select-none">
        {lit ? (
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/70 bg-gradient-to-r from-gold/15 via-gold/25 to-gold/15 px-6 py-2 backdrop-blur-md shadow-[0_0_20px_rgba(225,190,120,0.35)]">
              <Sparkles className="h-4 w-4 text-gold animate-spin" style={{ animationDuration: "3s" }} />
              <span className="font-display text-xs sm:text-sm tracking-[0.2em] uppercase text-gold font-semibold">
                The Sacred Light is Offered
              </span>
            </div>
            <p className="font-display italic text-base sm:text-lg text-gold-soft/90 max-w-md mx-auto leading-relaxed">
              “May your heartfelt blessings illuminate Shivam &amp; Krina’s path for a lifetime of togetherness.”
            </p>
          </div>
        ) : holding ? (
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-gold/15 px-5 py-1.5 shadow-[0_0_15px_rgba(225,190,120,0.25)]">
              <span className="h-2 w-2 rounded-full bg-gold animate-ping" />
              <span className="font-display text-xs sm:text-sm tracking-[0.18em] uppercase text-gold font-medium">
                {progress > 70 ? "Almost there — keep holding..." : "Stay with the flame..."}
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-gold/50 bg-gold/10 px-5 py-2 backdrop-blur-sm shadow-[0_0_15px_rgba(225,190,120,0.2)] hover:bg-gold/20 transition-all cursor-pointer">
              <span className="h-2 w-2 rounded-full bg-gold animate-ping" />
              <span className="font-display text-xs sm:text-sm tracking-[0.22em] uppercase text-gold font-medium">
                Press &amp; Hold Wick to Offer a Light
              </span>
            </div>
            <p className="text-[0.65rem] uppercase tracking-[0.32em] text-gold-soft/65 font-light">
              Hold for one breath to ignite the flame
            </p>
          </div>
        )}
      </div>

      {/* Floating lanterns drifting into the night sky */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[80vh] overflow-hidden"
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
