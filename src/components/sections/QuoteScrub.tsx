import { useRef } from "react";

import { gsap } from "gsap";

import { useGSAP, useMotionOk } from "@/lib/motion";

/**
 * Scrubs the opacity of each word in a quote as the user scrolls past it.
 * Starts at 0.15, reaches 1.0, returns to 0.15 as the user continues. Tied
 * directly to scroll position via `scrub: 0.6`.
 *
 * Renders each word as a <span> with whitespace pre-wrap preserved.
 */
export function QuoteScrub({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const ok = useMotionOk();

  useGSAP(
    () => {
      if (!ok || !ref.current) return;
      const words = ref.current.querySelectorAll<HTMLElement>("[data-word]");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
          end: "bottom 60%",
          scrub: 0.6,
        },
      });
      tl.fromTo(words, { opacity: 0.15 }, { opacity: 1, stagger: 0.04, ease: "power1.out" }, 0);
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    [ok],
  );

  const words = text.split(" ");

  return (
    <p ref={ref} className="font-display text-2xl leading-relaxed text-foreground/90 sm:text-3xl">
      {words.map((w, i) => (
        <span key={i} data-word className="inline-block">
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
