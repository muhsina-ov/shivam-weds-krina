import { useEffect, useRef } from "react";

import { gsap } from "gsap";

const beginningImage = "/__local/story-beginning.jpg";
const firstMeetingImage = "/__local/story-first-meeting.jpg";
const questionImage = "/__local/story-question.jpg";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ScrollTrigger, useGSAP, useMotionOk } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Milestone = {
  year: string;
  title: string;
  text: string;
  photo?: { src: string; alt: string; placement: "left" | "right" | "below" };
};

const STORY: Milestone[] = [
  {
    year: "The Beginning",
    title: "Two Paths Cross",
    text: "Two dedicated doctors whose worlds aligned with mutual respect, warmth, and an effortless bond that felt like home from the very start.",
    photo: {
      src: firstMeetingImage,
      alt: "Dr Shivam and Dr Krina sharing a radiant moment together",
      placement: "right",
    },
  },
  {
    year: "The Connection",
    title: "Shared Values & Smiles",
    text: "Beyond busy schedules and medicine, countless conversations, laughter, and an unspoken harmony that grew deeper with every passing day.",
  },
  {
    year: "The Promise",
    title: "A Golden Chapter",
    text: "With the warmest blessings of both families and hearts full of certainty, promising to walk side-by-side through all of life's seasons.",
    photo: {
      src: questionImage,
      alt: "The couple celebrating their commitment with family blessings",
      placement: "below",
    },
  },
  {
    year: "November 2026",
    title: "Forever Begins",
    text: "Two hearts, two families, and one sacred union. Surrounded by our beloved elders, parents, siblings, and loved ones as Shivam weds Krina.",
    photo: {
      src: beginningImage,
      alt: "Dr Shivam Mehta and Dr Krina Morabia taking their auspicious first steps",
      placement: "left",
    },
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
            { opacity: 0, scale: 0.94 },
            { opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" },
            "-=0.5",
          );
        }
      });
    },
    [ok],
  );

  return (
    <section data-section="story" className="relative px-6 py-32">
      <SectionHeader
        eyebrow="Our Story"
        title="Two Doctors, Two Families, One Sacred Bond"
        className="mx-auto max-w-2xl text-center"
      />

      <div ref={listRef} className="relative mx-auto mt-20 max-w-2xl">
        {/* Continuous gold spine */}
        <div
          aria-hidden
          className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent sm:left-1/2 sm:-translate-x-1/2"
        />

        <div className="space-y-16 sm:space-y-24">
          {STORY.map((m, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={m.title}
                data-story-item
                className={cn(
                  "relative flex flex-col sm:flex-row sm:items-start",
                  isEven ? "sm:flex-row-reverse" : "",
                )}
              >
                {/* Marker */}
                <div
                  data-story-marker
                  aria-hidden
                  className="absolute left-4 top-1.5 -translate-x-1/2 sm:left-1/2 sm:-translate-x-1/2 z-10 grid h-7 w-7 place-items-center rounded-full border border-gold/70 bg-deep shadow-[0_0_12px_rgba(225,190,120,0.5)]"
                >
                  <span className="h-2 w-2 rounded-full bg-gold" />
                </div>

                {/* Content card */}
                <div
                  data-story-content
                  className={cn(
                    "ml-12 sm:ml-0 sm:w-1/2",
                    isEven ? "sm:pr-12 sm:text-right" : "sm:pl-12 sm:text-left",
                  )}
                >
                  <span className="text-[0.62rem] uppercase tracking-[0.35em] text-gold-soft">
                    {m.year}
                  </span>
                  <h3 className="mt-1 font-display text-2xl gold-text sm:text-3xl">{m.title}</h3>
                  <div
                    className={cn(
                      "mt-2.5 w-10 gold-rule",
                      isEven ? "sm:ml-auto" : "",
                    )}
                  />
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.text}</p>

                  {m.photo && (
                    <div
                      className={cn(
                        "mt-5 overflow-hidden rounded-xl border border-gold/30 bg-deep/40 shadow-lg paper",
                        m.photo.placement === "below" ? "max-w-md" : "max-w-xs",
                        isEven ? "sm:ml-auto" : "",
                      )}
                    >
                      <img
                        src={m.photo.src}
                        alt={m.photo.alt}
                        className="aspect-[4/3] w-full object-cover grayscale-[0.1] transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
