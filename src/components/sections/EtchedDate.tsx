import { useRef } from "react";

import { gsap } from "gsap";

import { Letters } from "@/hooks/use-letters";
import { useGSAP, useMotionOk } from "@/lib/motion";

/**
 * "20 · 21 · 22 NOVEMBER 2026" rendered with a typewriter cascade and a
 * gold rule that grows from the centre as the section scrolls into view.
 */
export function EtchedDate() {
  const ref = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const ok = useMotionOk();

  useGSAP(
    () => {
      if (!ok || !ref.current) return;
      const chars = ref.current.querySelectorAll<HTMLElement>("span[data-letter]");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          once: true,
        },
      });
      tl.fromTo(chars, { opacity: 0 }, { opacity: 1, duration: 0.04, stagger: 0.03, ease: "none" });
      if (ruleRef.current) {
        tl.fromTo(
          ruleRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: "power3.out" },
          "-=0.4",
        );
      }
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    [ok],
  );

  return (
    <div className="mt-5 flex flex-col items-center gap-2">
      <div
        ref={ruleRef}
        aria-hidden
        className="h-px w-24 origin-center bg-gold/70"
        style={{ transform: "scaleX(0)" }}
      />
      <p ref={ref} className="text-sm tracking-[0.3em] text-gold-soft/90">
        <Letters text="20 · 21 · 22 NOVEMBER 2026" />
      </p>
    </div>
  );
}
