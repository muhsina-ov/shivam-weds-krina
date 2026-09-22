import { useState } from "react";

import { cn } from "@/lib/utils";

const TABS = [
  {
    id: "air",
    label: "Air",
    rows: [
      ["Airport", "Jaipur International (JAI)"],
      ["Distance", "11 km · 25 min"],
      ["Transfer", "Hotel car or prepaid taxi"],
      ["Note", "Direct flights from Delhi, Mumbai, Bengaluru, Dubai"],
    ],
  },
  {
    id: "train",
    label: "Train",
    rows: [
      ["Station", "Jaipur Junction (JP)"],
      ["Distance", "5 km · 15 min"],
      ["Transfer", "Auto-rickshaw or hotel car"],
      ["Note", "Shatabdi & Vande Bharat from Delhi daily"],
    ],
  },
  {
    id: "car",
    label: "Car",
    rows: [
      ["From Delhi", "260 km · 5 h via NH48"],
      ["From Udaipur", "395 km · 6.5 h via NH48"],
      ["Parking", "Valet at Gate 2"],
      ["Note", "Shuttles from hotel lobby every 20 min from 5:00 PM"],
    ],
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

/**
 * Editorial tabs. No bordered pill, no background. Active tab indicated by a
 * thin gold underline sliding under the active word. The label "ARRIVING BY"
 * sits above and acts as a quiet caption.
 */
export function TravelTabs() {
  const [active, setActive] = useState<TabId>("air");
  const current = TABS.find((t) => t.id === active) ?? TABS[0];

  return (
    <div role="tablist" aria-label="Arriving by" className="w-full">
      <p className="mb-4 text-[0.6rem] uppercase tracking-[0.4em] text-gold-soft/70">Arriving by</p>

      <div className="flex items-baseline gap-6 border-b border-gold/20 pb-3">
        {TABS.map((t) => {
          const isActive = t.id === active;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(t.id)}
              className={cn(
                "relative pb-1 text-[0.7rem] uppercase tracking-[0.3em] transition-colors",
                isActive ? "text-gold" : "text-gold-soft/60 hover:text-gold-soft",
              )}
            >
              {t.label}
              {isActive && (
                <span aria-hidden className="absolute inset-x-0 -bottom-[13px] h-px bg-gold" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        {current.rows.map(([k, v], i) => (
          <div
            key={k}
            className={cn("flex items-baseline gap-6 py-3", i !== 0 && "border-t border-gold/15")}
          >
            <span className="w-24 shrink-0 text-[0.6rem] uppercase tracking-[0.3em] text-gold-soft/70">
              {k}
            </span>
            <span className="font-display text-base text-foreground/90">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
