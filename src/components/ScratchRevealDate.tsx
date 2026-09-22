import { useCallback, useEffect, useRef, useState } from "react";

import { Sparkles } from "lucide-react";

const REVEAL_THRESHOLD = 0.42;

export function ScratchRevealDate() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const distance = useRef(0);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [started, setStarted] = useState(false);

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
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "#b87327");
    gradient.addColorStop(0.35, "#f2cf7a");
    gradient.addColorStop(0.62, "#9d581e");
    gradient.addColorStop(1, "#e4b85f");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.globalAlpha = 0.24;
    ctx.fillStyle = "#fff5cf";
    for (let x = -rect.height; x < rect.width; x += 14) {
      ctx.fillRect(x, 0, 1, rect.height);
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#55230d";
    ctx.font = "500 11px Marcellus, serif";
    ctx.textAlign = "center";
    ctx.fillText("SCRATCH TO REVEAL", rect.width / 2, rect.height / 2 + 4);
  }, [revealed]);

  useEffect(() => {
    paintCover();
    const resize = new ResizeObserver(paintCover);
    if (canvasRef.current) resize.observe(canvasRef.current);
    return () => resize.disconnect();
  }, [paintCover]);

  const reveal = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    setRevealed(true);
    drawing.current = false;
  }, []);

  const scratch = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || revealed) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    const ratio = canvas.width / rect.width;
    const point = { x: (event.clientX - rect.left) * ratio, y: (event.clientY - rect.top) * ratio };
    const previous = lastPoint.current ?? point;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 34 * ratio;
    ctx.beginPath();
    ctx.moveTo(previous.x, previous.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    distance.current += Math.hypot(point.x - previous.x, point.y - previous.y) / ratio;
    lastPoint.current = point;
    setStarted(true);
    if (distance.current / Math.max(rect.width * 3.4, 1) > REVEAL_THRESHOLD) reveal();
  };

  return (
    <div className="mt-7 flex flex-col items-center">
      <div
        className={`scratch-card relative w-[min(92vw,44rem)] overflow-hidden rounded-[1.75rem] border border-gold/40 transition-all duration-700 ${revealed ? "scratch-card-revealed" : ""}`}
      >
        <div className="relative grid min-h-36 place-items-center bg-deep/75 px-8 py-8 text-center sm:min-h-44">
          <Sparkles
            className={`absolute left-5 top-5 h-3.5 w-3.5 text-gold transition-all duration-700 ${revealed ? "rotate-12 scale-125 opacity-100" : "opacity-0"}`}
          />
          <div>
            <p className="font-display text-3xl tracking-[0.12em] text-gold-soft sm:text-5xl">
              20 · 21 · 22 Nov 2026
            </p>
            <p className="mt-2 text-[0.62rem] uppercase tracking-[0.4em] text-gold/85">
              Wedding Celebrations · Groom Side
            </p>
          </div>
        </div>
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full touch-none cursor-crosshair transition-opacity duration-700 ${revealed ? "pointer-events-none opacity-0" : "opacity-100"}`}
          onPointerDown={(event) => {
            drawing.current = true;
            lastPoint.current = null;
            event.currentTarget.setPointerCapture(event.pointerId);
            scratch(event);
          }}
          onPointerMove={scratch}
          onPointerUp={() => {
            drawing.current = false;
            lastPoint.current = null;
          }}
          onPointerCancel={() => {
            drawing.current = false;
            lastPoint.current = null;
          }}
          aria-label="Scratch the gold surface to reveal the wedding date"
        />
      </div>
      <button
        type="button"
        onClick={reveal}
        className={`mt-3 text-[0.56rem] uppercase tracking-[0.3em] text-gold-soft/60 transition-all hover:text-gold-soft focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold ${revealed ? "pointer-events-none translate-y-1 opacity-0" : "opacity-100"}`}
      >
        {started ? "keep going" : "or tap to reveal"}
      </button>
    </div>
  );
}
