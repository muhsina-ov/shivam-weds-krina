/**
 * Ambient falling-petals overlay with three variants.
 *
 *   type="petals"  — default, gold-soft rounded slivers. Used around
 *                    emotional transitions (Blessing, Story).
 *   type="stars"   — 4 tiny serif glyphs (✦). Used sparingly on breathers
 *                    and section heading edges.
 *   type="thread"  — 1 slow-drifting gold filament. Used once on the Story
 *                    section to tie the timeline together.
 *
 * Particle counts are deliberately low. The page establishes three
 * signature motifs (gold thread / lotus petal / tiny star) and uses each
 * once, not throughout.
 */
export type PetalType = "petals" | "stars" | "thread";

export function RichPetals({ type = "petals", count = 9 }: { type?: PetalType; count?: number }) {
  if (type === "thread") return <GoldThread />;
  if (type === "stars") return <Stars count={count} />;
  return <Petals count={count} />;
}

function Petals({ count }: { count: number }) {
  const items = Array.from({ length: count }, (_, i) => i);
  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden>
      {items.map((i) => {
        const left = `${(i * 97) % 100}%`;
        const drift = `${((i % 5) - 2) * 32}px`;
        const duration = `${22 + (i % 5) * 4}s`;
        const delay = `${i * 1.9}s`;
        return (
          <span
            key={i}
            className="absolute top-0 block h-2 w-1 rounded-[100%_0_100%_0] bg-gold/35"
            style={{
              left,
              ["--drift" as string]: drift,
              animation: `petal-fall ${duration} linear ${delay} infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

function Stars({ count }: { count: number }) {
  const items = Array.from({ length: count }, (_, i) => i);
  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden>
      {items.map((i) => {
        const left = `${10 + ((i * 23 + 7) % 80)}%`;
        const top = `${15 + ((i * 31) % 70)}%`;
        return (
          <span
            key={i}
            className="absolute font-display text-gold-soft/50"
            style={{
              left,
              top,
              fontSize: `${10 + (i % 3) * 2}px`,
              animation: `soft-float ${6 + (i % 3) * 2}s ease-in-out ${i * 0.7}s infinite`,
            }}
          >
            ✦
          </span>
        );
      })}
    </div>
  );
}

function GoldThread() {
  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden>
      <svg
        className="absolute -top-20 left-1/2 h-[140vh] w-px -translate-x-1/2"
        viewBox="0 0 1 1400"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="thread" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.93 0.07 86 / 0)" />
            <stop offset="20%" stopColor="oklch(0.93 0.07 86 / 0.4)" />
            <stop offset="80%" stopColor="oklch(0.93 0.07 86 / 0.4)" />
            <stop offset="100%" stopColor="oklch(0.93 0.07 86 / 0)" />
          </linearGradient>
        </defs>
        <line x1="0.5" y1="0" x2="0.5" y2="1400" stroke="url(#thread)" strokeWidth="1" />
      </svg>
    </div>
  );
}
