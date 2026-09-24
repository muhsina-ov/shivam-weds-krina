import { useCallback, useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { PartyPopper, Sparkles } from "lucide-react";

import { audioController } from "@/lib/audioController";

const REVEAL_THRESHOLD = 0.38;

interface SparkleParticle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
  color: string;
}

export function ScratchRevealDate() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const drawing = useRef(false);
  const distance = useRef(0);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [started, setStarted] = useState(false);
  const sparklesRef = useRef<SparkleParticle[]>([]);
  const hasTriggeredConfetti = useRef(false);

  const triggerCelebration = useCallback(() => {
    if (hasTriggeredConfetti.current) return;
    hasTriggeredConfetti.current = true;

    // Haptic vibration on mobile devices
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate([60, 40, 80, 50, 100]);
      } catch {
        // Ignore vibration errors
      }
    }

    const rect = containerRef.current?.getBoundingClientRect();
    const originX = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5;
    const originY = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.5;

    // Royal Indian Wedding Confetti Colors
    const weddingColors = [
      "#FFD700", // Gold
      "#E1BE78", // Soft Gold
      "#F5DF9E", // Champagne
      "#C28434", // Royal Bronze
      "#E05D5D", // Vermilion / Rose
      "#FFFFFF", // Diamond White
      "#FFA07A", // Marigold / Light Salmon
    ];

    // 1. Initial explosive celebratory burst from the card
    confetti({
      particleCount: 90,
      spread: 110,
      startVelocity: 38,
      origin: { x: originX, y: originY },
      colors: weddingColors,
      shapes: ["circle", "star"],
      scalar: 1.15,
      ticks: 280,
    });

    // 2. Coordinated left & right festive cannons
    window.setTimeout(() => {
      confetti({
        particleCount: 55,
        angle: 60,
        spread: 65,
        startVelocity: 44,
        origin: { x: 0.12, y: Math.min(0.8, originY + 0.15) },
        colors: weddingColors,
        shapes: ["circle", "star"],
      });
      confetti({
        particleCount: 55,
        angle: 120,
        spread: 65,
        startVelocity: 44,
        origin: { x: 0.88, y: Math.min(0.8, originY + 0.15) },
        colors: weddingColors,
        shapes: ["circle", "star"],
      });
    }, 220);

    // 3. Cascading golden shimmer shower
    window.setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 140,
        startVelocity: 25,
        gravity: 0.7,
        origin: { x: originX, y: Math.max(0.15, originY - 0.18) },
        colors: ["#FFD700", "#F5DF9E", "#FFFFFF", "#E1BE78"],
        shapes: ["star"],
        scalar: 1.25,
      });
    }, 480);
  }, []);

  const paintCover = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(ratio, ratio);
    if (revealed) return;

    // Metallic gold foil gradient
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "#b87327");
    gradient.addColorStop(0.35, "#f2cf7a");
    gradient.addColorStop(0.62, "#9d581e");
    gradient.addColorStop(1, "#e4b85f");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Micro metallic hatch texture
    ctx.globalAlpha = 0.24;
    ctx.fillStyle = "#fff5cf";
    for (let x = -rect.height; x < rect.width; x += 14) {
      ctx.fillRect(x, 0, 1, rect.height);
    }

    // Elegant text banner
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#55230d";
    ctx.font = "600 12px Marcellus, serif";
    ctx.textAlign = "center";
    ctx.letterSpacing = "0.2em";
    ctx.fillText("✨ SCRATCH TO REVEAL DATE ✨", rect.width / 2, rect.height / 2 - 2);

    ctx.fillStyle = "#743515";
    ctx.font = "400 9px system-ui, sans-serif";
    ctx.fillText("TOUCH & DRAG TO UNVEIL & PLAY MUSIC", rect.width / 2, rect.height / 2 + 16);
  }, [revealed]);

  useEffect(() => {
    paintCover();
    const resize = new ResizeObserver(paintCover);
    if (canvasRef.current) resize.observe(canvasRef.current);
    return () => resize.disconnect();
  }, [paintCover]);

  const reveal = useCallback(() => {
    // Autoplay music seamlessly on reveal
    void audioController.play().catch(() => {});

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    setRevealed(true);
    drawing.current = false;

    // Launch celebratory fireworks & confetti
    triggerCelebration();
  }, [triggerCelebration]);

  const startScratching = (event: React.PointerEvent<HTMLCanvasElement>) => {
    // Autoplay music immediately on the direct user gesture (essential for iOS Safari on iPhone)
    void audioController.play().catch(() => {});

    drawing.current = true;
    lastPoint.current = null;
    event.currentTarget.setPointerCapture(event.pointerId);
    scratch(event);
  };

  const scratch = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || revealed) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    const ratio = canvas.width / rect.width;
    const point = { x: (event.clientX - rect.left) * ratio, y: (event.clientY - rect.top) * ratio };
    const previous = lastPoint.current ?? point;

    // Erase gold scratch surface
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 38 * ratio;
    ctx.beginPath();
    ctx.moveTo(previous.x, previous.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();

    distance.current += Math.hypot(point.x - previous.x, point.y - previous.y) / ratio;
    lastPoint.current = point;
    setStarted(true);

    // Make sure music plays as user scratches
    void audioController.play().catch(() => {});

    if (distance.current / Math.max(rect.width * 3.2, 1) > REVEAL_THRESHOLD) {
      reveal();
    }
  };

  return (
    <div ref={containerRef} className="mt-7 flex flex-col items-center">
      {/* Outer celebratory halo aura that glows when revealed */}
      <div className="relative group">
        <div
          className={`absolute -inset-3 rounded-[2.25rem] bg-gradient-to-r from-gold/30 via-amber-300/35 to-gold/30 blur-xl transition-all duration-1000 ${
            revealed ? "opacity-100 scale-105" : "opacity-0 scale-95"
          }`}
          aria-hidden
        />

        <div
          className={`scratch-card relative w-[min(92vw,44rem)] overflow-hidden rounded-[1.75rem] border transition-all duration-700 ${
            revealed
              ? "scratch-card-revealed border-gold shadow-[0_0_50px_rgba(225,190,120,0.45)] ring-2 ring-gold/40"
              : "border-gold/40"
          }`}
        >
          {/* Revealed Card Content */}
          <div className="relative grid min-h-36 place-items-center bg-deep/85 px-8 py-8 text-center sm:min-h-48 backdrop-blur-md">
            {/* Celebratory Corner Sparkles */}
            <Sparkles
              className={`absolute left-5 top-5 h-5 w-5 text-gold transition-all duration-700 ${
                revealed ? "rotate-45 scale-125 opacity-100 animate-spin-slow" : "opacity-0"
              }`}
            />
            <Sparkles
              className={`absolute right-5 top-5 h-5 w-5 text-gold transition-all duration-700 ${
                revealed ? "-rotate-45 scale-125 opacity-100 animate-pulse" : "opacity-0"
              }`}
            />

            {/* Auspicious Revealed Festive Ribbon */}
            <div
              className={`flex items-center gap-2 mb-2 transition-all duration-700 ${
                revealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <PartyPopper className="h-4 w-4 text-gold animate-bounce" />
              <span className="text-[0.62rem] sm:text-[0.7rem] uppercase tracking-[0.35em] text-gold font-medium">
                ✦ Auspicious Dates Revealed ✦
              </span>
              <PartyPopper className="h-4 w-4 text-gold -scale-x-100 animate-bounce" />
            </div>

            <div>
              <p className="font-display text-3xl leading-tight tracking-[0.12em] text-gold-soft sm:text-5xl drop-shadow-[0_2px_15px_rgba(225,190,120,0.3)]">
                20 · 21 · 22 Nov
              </p>
              <p className="font-display text-3xl leading-tight tracking-[0.12em] text-gold-soft sm:text-5xl">
                2026
              </p>
              <div className="mx-auto mt-3 flex w-36 items-center gap-2">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/60" />
                <span className="text-[0.7rem] text-gold animate-pulse" aria-hidden>
                  ✿
                </span>
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/60" />
              </div>
              <p className="mt-3 text-[0.62rem] uppercase tracking-[0.4em] text-gold/85">
                Amartara The Resort, Abu Road
              </p>
            </div>
          </div>

          {/* Interactive Scratch Canvas */}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 h-full w-full touch-none cursor-crosshair transition-opacity duration-700 ${
              revealed ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
            onPointerDown={startScratching}
            onPointerMove={scratch}
            onPointerUp={() => {
              drawing.current = false;
              lastPoint.current = null;
            }}
            onPointerCancel={() => {
              drawing.current = false;
              lastPoint.current = null;
            }}
            aria-label="Scratch the gold surface to reveal the wedding date and play music"
          />
        </div>
      </div>

      {/* Tap fallback button */}
      <button
        type="button"
        onClick={reveal}
        className={`mt-3 text-[0.58rem] sm:text-[0.65rem] uppercase tracking-[0.3em] text-gold-soft/75 transition-all hover:text-gold hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold ${
          revealed ? "pointer-events-none translate-y-1 opacity-0" : "opacity-100"
        }`}
      >
        {started ? "✨ keep scratching to reveal ✨" : "✨ or tap here to reveal date & play music ✨"}
      </button>
    </div>
  );
}
