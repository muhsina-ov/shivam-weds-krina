import { useRef } from "react";
import { gsap } from "gsap";

import { SectionHeader } from "@/components/sections/SectionHeader";
import { ScrollTrigger, useGSAP, useMotionOk } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Milestone = {
  year: string;
  title: string;
  text: string;
  photo?: { src: string; alt: string };
};

const STORY: Milestone[] = [
  {
    year: "The Beginning",
    title: "Two Paths Cross",
    text: "Two dedicated doctors whose worlds aligned with mutual respect, warmth, and an effortless bond that felt like home from the very start.",
    photo: {
      src: "/story-1.jpg",
      alt: "Two dedicated doctors whose worlds aligned with mutual respect and warmth",
    },
  },
  {
    year: "The Connection",
    title: "Shared Values & Smiles",
    text: "Beyond busy schedules and medicine, countless conversations, laughter, and an unspoken harmony that grew deeper with every passing day.",
    photo: {
      src: "/story-2.jpg",
      alt: "Countless conversations, laughter and unspoken harmony outside Tea Post",
    },
  },
  {
    year: "The Promise",
    title: "A Golden Chapter",
    text: "With the warmest blessings of both families and hearts full of certainty, promising to walk side-by-side through all of life's seasons.",
    photo: {
      src: "/story-3.jpg",
      alt: "Shivam and Krina receiving the warmest blessings of both families",
    },
  },
  {
    year: "November 2026",
    title: "Forever Begins",
    text: "Two hearts, two families, and one sacred union. Surrounded by our beloved elders, parents, siblings, and loved ones as Shivam and Krina begin their forever.",
  },
];

export function StoryTimeline() {
  const listRef = useRef<HTMLDivElement>(null);
  const ok = useMotionOk();

  useGSAP(
    () => {
      if (!ok || !listRef.current) return;
      const items = listRef.current.querySelectorAll<HTMLElement>("[data-story-item]");
      items.forEach((item) => {
        const marker = item.querySelector<HTMLElement>("[data-story-marker]");
        const content = item.querySelector<HTMLElement>("[data-story-content]");
        const img = item.querySelector<HTMLImageElement>("img");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            once: true,
          },
        });

        if (marker) {
          tl.fromTo(
            marker,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" },
          );
        }
        if (content) {
          tl.fromTo(
            content,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
            "-=0.3",
          );
        }
        if (img) {
          tl.fromTo(
            img,
            { opacity: 0, scale: 0.96 },
            { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
            "-=0.4",
          );
        }
      });
    },
    [ok],
  );

  return (
    <section data-section="story" className="relative px-6 py-28 sm:py-32">
      <SectionHeader
        eyebrow="Our Story"
        title="Two Doctors, Two Families, One Sacred Bond"
        className="mx-auto max-w-2xl text-center"
      />

      <div ref={listRef} className="relative mx-auto mt-16 max-w-xl">
        {/* Continuous gold spine */}
        <div
          aria-hidden
          className="absolute left-4 sm:left-5 top-3 bottom-4 w-px bg-gradient-to-b from-gold/15 via-gold/45 to-gold/15"
        />

        <div className="space-y-16 sm:space-y-20">
          {STORY.map((m) => (
            <div key={m.title} data-story-item className="relative flex items-start">
              {/* Marker node */}
              <div
                data-story-marker
                aria-hidden
                className="absolute left-4 sm:left-5 top-1 -translate-x-1/2 z-10 grid h-6 w-6 place-items-center rounded-full border border-gold/70 bg-[#3a0808] shadow-[0_0_12px_rgba(225,190,120,0.45)]"
              >
                <span className="h-2 w-2 rounded-full bg-gold" />
              </div>

              {/* Content card */}
              <div data-story-content className="ml-10 sm:ml-12 w-full">
                <span className="text-[0.68rem] uppercase tracking-[0.35em] text-gold-soft font-medium">
                  {m.year}
                </span>
                <h3 className="mt-1 font-display text-2xl text-gold-soft sm:text-3xl font-normal">
                  {m.title}
                </h3>
                <div className="mt-2.5 w-12 h-px bg-gold/40" />
                <p className="mt-3 text-sm leading-relaxed text-foreground/80 sm:text-base font-light">
                  {m.text}
                </p>

                {m.photo && (
                  <div className="mt-5 overflow-hidden rounded-2xl border border-gold/30 bg-[#300606]/60 shadow-xl transition-all duration-500 hover:border-gold/60">
                    <img
                      src={m.photo.src}
                      alt={m.photo.alt}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
