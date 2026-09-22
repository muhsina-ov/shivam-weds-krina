import { useEffect, useRef, useState } from "react";

import { gsap, ScrollTrigger, useGSAP, useMotionOk } from "@/lib/motion";
import { usePointerFine } from "@/hooks/use-pointer-fine";
import { cn } from "@/lib/utils";

export type SectionDef = { id: string; label: string };

/**
 * Right-edge vertical dot list, one per named section. Click to scroll.
 * Active dot is filled via ScrollTrigger. Desktop-only (fine pointer).
 *
 * Sections are looked up by `data-section="<id>"` attributes mounted in
 * routes/index.tsx. We resolve the elements lazily on mount to handle
 * routes that hydrate after SSR.
 */
export function SectionScrubber({ sections }: { sections: SectionDef[] }) {
  const fine = usePointerFine();
  const ok = useMotionOk();
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useGSAP(
    () => {
      if (!fine || !ok) return;
      const triggers: ScrollTrigger[] = [];
      sections.forEach(({ id }) => {
        const el = document.querySelector<HTMLElement>(`[data-section="${id}"]`);
        if (!el) return;
        const t = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top center",
            end: "bottom center",
            onToggle: (self: { isActive: boolean }) => {
              if (self.isActive) setActive(id);
            },
          },
        });
        if (t.scrollTrigger) triggers.push(t.scrollTrigger);
      });
      return () => {
        triggers.forEach((t) => t.kill());
      };
    },
    [fine, ok, sections],
  );

  const goTo = (id: string) => {
    const el = document.querySelector<HTMLElement>(`[data-section="${id}"]`);
    if (!el) return;
    gsap.to(window, {
      duration: 1.0,
      ease: "power3.inOut",
      scrollTo: { y: el, autoKill: false, offsetY: 60 },
    });
  };

  useEffect(() => {
    if (!fine) return;
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 50);
    return () => window.clearTimeout(id);
  }, [fine]);

  if (!fine || !ok) return null;

  return (
    <div
      ref={containerRef}
      className="fixed right-3 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 md:flex"
      aria-label="Section navigation"
    >
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(s.id)}
            aria-label={`Jump to ${s.label}`}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "group flex items-center gap-3 transition-opacity",
              isActive ? "opacity-100" : "opacity-50 hover:opacity-90",
            )}
          >
            <span
              className={cn(
                "hidden text-[0.55rem] uppercase tracking-[0.3em] text-gold-soft/80 transition-opacity lg:block",
                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60",
              )}
            >
              {s.label}
            </span>
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-all duration-500",
                isActive ? "scale-[2] bg-gold" : "bg-gold-soft/60 group-hover:bg-gold-soft",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
