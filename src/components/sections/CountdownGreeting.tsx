import { useEffect, useRef, useState } from "react";

import { gsap } from "gsap";

import { useGSAP, useMotionOk } from "@/lib/motion";

function greeting(hour: number) {
  if (hour < 5) return "Good night, dear guest";
  if (hour < 12) return "Good morning, dear guest";
  if (hour < 17) return "Good afternoon, dear guest";
  if (hour < 21) return "Good evening, dear guest";
  return "Good night, dear guest";
}

/** A small greeting that fades in once on mount, then updates on the hour. */
export function CountdownGreeting() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [text, setText] = useState("");
  const ok = useMotionOk();

  useEffect(() => {
    if (typeof window === "undefined") return;
    setText(greeting(new Date().getHours()));
    const id = window.setInterval(() => setText(greeting(new Date().getHours())), 60_000);
    return () => window.clearInterval(id);
  }, []);

  useGSAP(
    () => {
      if (!ok || !ref.current) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.3 },
      );
      return () => {
        if (ref.current) gsap.killTweensOf(ref.current);
      };
    },
    [ok, text],
  );

  if (!text) return null;

  return (
    <p ref={ref} className="mb-3 text-center font-display text-base italic text-gold-soft/80">
      {text}
    </p>
  );
}
