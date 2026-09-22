import { useEffect, useState } from "react";

const units = ["Days", "Hours", "Minutes", "Seconds"] as const;

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return [
    Math.floor(ms / 86400000),
    Math.floor(ms / 3600000) % 24,
    Math.floor(ms / 60000) % 60,
    Math.floor(ms / 1000) % 60,
  ];
}

export function Countdown({ target }: { target: string }) {
  const t = new Date(target).getTime();
  const [values, setValues] = useState<number[]>(() => diff(t));

  useEffect(() => {
    const id = window.setInterval(() => setValues(diff(t)), 1000);
    return () => window.clearInterval(id);
  }, [t]);

  return (
    <div className="mx-auto grid max-w-md grid-cols-4 gap-3">
      {units.map((u, i) => (
        <div
          key={u}
          className="rounded-lg border border-gold/25 bg-card/50 px-2 py-4 text-center backdrop-blur-sm"
        >
          <div className="font-display text-3xl gold-text tabular-nums">
            {String(values[i] ?? 0).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">
            {u}
          </div>
        </div>
      ))}
    </div>
  );
}
