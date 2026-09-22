import { useRef } from "react";

import { gsap } from "gsap";

import frameAsset from "@/assets/last_frame.jpeg.asset.json";
import { useGSAP, useMotionOk } from "@/lib/motion";

/**
 * Two stacked images of `https://media.invitestory.in/diya-haveli/last_frame.jpeg` translating in opposite directions
 * as the user scrolls. Adds depth without breaking the existing aesthetic.
 * The bottom layer is at 25 % opacity so the layered effect stays subtle.
 *
 * Driven by a ScrollTrigger `scrub` so the motion is tied directly to scroll
 * position, not to component state.
 */
export function HeroParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLImageElement>(null);
  const bottomRef = useRef<HTMLImageElement>(null);
  const ok = useMotionOk();

  useGSAP(
    () => {
      if (!ok || !ref.current || !topRef.current || !bottomRef.current) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      tl.to(topRef.current, { yPercent: -12, scale: 1.06 }, 0);
      tl.to(bottomRef.current, { yPercent: 18, scale: 1.12 }, 0);
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    [ok],
  );

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <img
        ref={bottomRef}
        src={frameAsset.url}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-25"
        style={{ transform: "scale(1.06)" }}
      />
      <img
        ref={topRef}
        src={frameAsset.url}
        alt="Bride and groom standing together, framed by golden lotus motifs"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ transform: "scale(1.06)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-deep/10 via-transparent to-deep/85" />
    </div>
  );
}
