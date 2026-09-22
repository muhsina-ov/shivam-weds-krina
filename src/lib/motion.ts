/**
 * Centralised GSAP wiring.
 *
 * Every component that animates with GSAP imports its primitives from here
 * rather than from `gsap` / `@gsap/react` directly. This guarantees:
 *   - `ScrollTrigger` is registered exactly once (at module load).
 *   - `useMotionOk()` is the single a11y gate for reduced motion.
 *   - Easing presets are consistent across the whole site.
 *
 * All GSAP calls MUST run inside `useGSAP(() => ..., { scope })` so that
 * tweens are cleaned up on unmount / HMR (no leaks, no stale ScrollTriggers).
 */

import { useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger and useGSAP once, at module load.
gsap.registerPlugin(ScrollTrigger, useGSAP);

// Cubic-bezier mirrors the existing `cubic-bezier(0.22, 1, 0.36, 1)` in styles.css.
export const EASE_OUT_EXPO = gsap.parseEase("cubic-bezier(0.16, 1, 0.3, 1)");
export const EASE_IN_OUT_QUART = gsap.parseEase("cubic-bezier(0.76, 0, 0.24, 1)");

/**
 * `true` when the viewer has not requested reduced motion. All GSAP components
 * should early-return to a static render when this is `false`. Subscribes via
 * `matchMedia` so it updates live when the OS setting changes.
 */
export function useMotionOk(): boolean {
  return useSyncExternalStore(
    (cb) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => {
      if (typeof window === "undefined") return false;
      return window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    },
    () => false,
  );
}

export { gsap, ScrollTrigger, useGSAP };
