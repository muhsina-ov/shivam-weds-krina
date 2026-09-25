import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Music, Sparkles } from "lucide-react";

import { OpeningSequence } from "@/components/OpeningSequence";
import { InteractivePortrait } from "@/components/InteractivePortrait";
import { PalaceReveal } from "@/components/PalaceReveal";
import { Reveal } from "@/components/Reveal";
import { ScratchRevealDate } from "@/components/ScratchRevealDate";
import { AudioToggle } from "@/components/AudioToggle";
import { CursorFlecks } from "@/components/CursorFlecks";
import { RichPetals } from "@/components/RichPetals";
import { SectionScrubber, type SectionDef } from "@/components/SectionScrubber";
import { Breather } from "@/components/sections/Breather";
import { Celebrations } from "@/components/sections/Celebrations";
import { CountdownGreeting } from "@/components/sections/CountdownGreeting";
import { DiyaCeremony } from "@/components/sections/DiyaCeremony";
import { FamilyTies } from "@/components/sections/FamilyTies";
import { FlipCountdown } from "@/components/sections/FlipCountdown";
import { FloatingMotif } from "@/components/sections/FloatingMotif";
import { HeroParallax } from "@/components/sections/HeroParallax";
import { LetterH1 } from "@/components/sections/LetterH1";
import { QuoteScrub } from "@/components/sections/QuoteScrub";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { StoryTimeline } from "@/components/sections/StoryTimeline";
import { VenueMap } from "@/components/sections/VenueMap";
import { ScrollTrigger, useGSAP } from "@/lib/motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. Shivam & Dr. Krina — Wedding Invitation" },
      {
        name: "description",
        content:
          "Wedding invitation of Dr. Shivam Mehta & Dr. Krina Morabia. Celebrations on 20–22 Nov 2026. Join the Mehta & Morabia families.",
      },
      { property: "og:site_name", content: "InviteStory" },
      { property: "og:title", content: "Dr. Shivam & Dr. Krina — Wedding Invitation" },
      {
        property: "og:description",
        content:
          "Together with families, Dr. Shivam & Dr. Krina invite you to their wedding celebrations on 20–22 Nov 2026.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://shivan-weds-krina.invitingyou.top/" },
      { property: "og:image", content: "https://shivan-weds-krina.invitingyou.top/og-image.jpg" },
      { property: "og:image:secure_url", content: "https://shivan-weds-krina.invitingyou.top/og-image.jpg" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Dr. Shivam Mehta & Dr. Krina Morabia Wedding Invitation — 20 to 22 November 2026",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Dr. Shivam & Dr. Krina — Wedding Invitation" },
      {
        name: "twitter:description",
        content:
          "Together with families, Dr. Shivam & Dr. Krina invite you to their wedding celebrations on 20–22 Nov 2026.",
      },
      { name: "twitter:image", content: "https://shivan-weds-krina.invitingyou.top/og-image.jpg" },
    ],
  }),
  component: Invitation,
});

/** Start of celebrations: 20 November 2026 at 7:30 PM IST */
const WEDDING_DATE = "2026-11-20T19:30:00+05:30";

const SECTIONS: SectionDef[] = [
  { id: "hero", label: "Welcome" },
  { id: "blessing", label: "Blessings" },
  { id: "family", label: "Family" },
  { id: "countdown", label: "Countdown" },
  { id: "story", label: "Story" },
  { id: "celebrations", label: "Events" },
  { id: "venue", label: "Venues" },
];

function Invitation() {
  const [opened, setOpened] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setProgress(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 80);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <OpeningSequence onFinish={() => setOpened(true)} />

      {/* Ambient layers */}
      <CursorFlecks />
      <SectionScrubber sections={SECTIONS} />
      <AudioToggle visible={opened} />

      {/* Scroll progress */}
      <div
        className="fixed inset-x-0 top-0 z-40 h-[2px] origin-left bg-gold/80 transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden
      />

      {/* Hero / First Page */}
      <section
        data-section="hero"
        className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden pt-10 pb-12"
      >
        <HeroParallax />

        {/* Start & Top of 1st Page: Auspicious Shree Ganesha */}
        <div className="relative z-10 w-full pt-2 px-6 text-center flex flex-col items-center">
          <Reveal>
            <div className="flex flex-col items-center group">
              <div className="relative">
                {/* Divine golden halo aura */}
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-gold/40 via-amber-300/30 to-gold/40 blur-md opacity-80 group-hover:opacity-100 transition duration-700" />
                <div className="relative overflow-hidden rounded-2xl border-2 border-gold/70 shadow-[0_12px_40px_rgba(225,190,120,0.4)] bg-deep/85 p-1.5 backdrop-blur-md transition-transform duration-500 group-hover:scale-105">
                  <img
                    src="/__local/ganesha.png"
                    alt="Lord Ganesha - Shree Ganeshay Namah"
                    className="h-24 w-auto sm:h-28 md:h-32 object-contain rounded-xl"
                  />
                </div>
              </div>
              <p className="mt-3.5 font-display text-lg sm:text-xl md:text-2xl tracking-[0.25em] gold-text font-bold">
                ॥ श्री गणेशाय नमः ॥
              </p>
              <div className="mt-1.5 h-px w-24 bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
            </div>
          </Reveal>
        </div>

        {/* Main Hero Names & Celebrations */}
        <div className="relative z-10 my-auto px-6 text-center max-w-4xl">
          <Reveal delay={100}>
            <div className="inline-flex flex-col items-center gap-1.5 rounded-full border border-gold/40 bg-deep/70 px-7 py-2.5 backdrop-blur-sm mb-3">
              <span className="flex items-center gap-3 text-[0.66rem] sm:text-xs uppercase tracking-[0.4em] text-gold-soft font-medium">
                <Sparkles className="h-3 w-3 shrink-0 text-gold" />
                Mehta Family
                <Sparkles className="h-3 w-3 shrink-0 text-gold" />
              </span>
              <span className="text-[0.6rem] uppercase tracking-[0.5em] text-gold-soft/85">
                Welcomes You
              </span>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mx-auto mt-4 w-32 gold-rule" />
            <p className="mt-3 text-[0.68rem] uppercase tracking-[0.5em] text-gold-soft/85">
              For the wedding celebrations of
            </p>
          </Reveal>

          <Reveal delay={250}>
            <LetterH1 />
          </Reveal>

          <Reveal delay={450}>
            <ScratchRevealDate />
          </Reveal>

          <Reveal delay={600}>
            <div className="mt-8 text-[0.6rem] uppercase tracking-[0.4em] text-gold-soft/60">
              scroll to explore
              <div className="mx-auto mt-2 h-8 w-px shimmer-line" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Blessing */}
      <section data-section="blessing" className="relative px-6 py-28">
        {opened && <RichPetals type="petals" count={7} />}
        <div className="relative mx-auto max-w-2xl text-center">
          <QuoteScrub text="“Where two hearts align in love and purpose, families unite and every step becomes blessed.”" />
          <Reveal delay={200}>
            <div className="mt-8 space-y-6 text-sm leading-relaxed">
              {/* Grandparents Blessing */}
              <div className="space-y-1.5">
                <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-gold-soft/85 font-medium">
                  With the Blessings of
                </p>
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-gold-soft font-semibold tracking-wide drop-shadow-[0_2px_15px_rgba(225,190,120,0.35)]">
                  Mr Niranjan Mehta <span className="font-light italic text-gold/70">&amp;</span> Mrs Asha Mehta
                </h3>
                <p className="text-xs sm:text-sm italic text-foreground/75">
                  (Grandfather &amp; Grandmother of the Groom)
                </p>
              </div>

              {/* Decorative separator */}
              <div className="mx-auto flex w-28 items-center gap-2">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/50" />
                <span className="text-[0.65rem] text-gold/80" aria-hidden>✦</span>
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/50" />
              </div>

              {/* Parents Invitation */}
              <div className="space-y-2.5">
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl gold-text font-semibold tracking-wide drop-shadow-[0_2px_15px_rgba(225,190,120,0.35)]">
                  Mr Amul Mehta <span className="font-light italic text-gold/70">&amp;</span> Mrs Sharvari Mehta
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-foreground/85 max-w-xl mx-auto">
                  warmly invite you to join{" "}
                  <strong className="font-medium text-gold-soft">Dr Shivam Mehta</strong>,{" "}
                  <strong className="font-medium text-gold-soft">Dr Krina Morabia</strong>, and our family
                  as we celebrate three days of sacred traditions, joyous music, and unconditional love.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
        <FloatingMotif />
      </section>

      {/* Family Showcase */}
      <FamilyTies />

      {/* Countdown */}
      <section data-section="countdown" className="relative px-6 pb-28">
        <SectionHeader
          eyebrow="The Countdown"
          title="Until the Celebrations Begin"
          className="mx-auto max-w-2xl text-center"
        />
        <div className="mt-10">
          <CountdownGreeting />
          <Reveal>
            <p className="mb-8 text-center text-[0.65rem] uppercase tracking-[0.45em] text-gold-soft/70">
              The festivities commence on 20 November 2026
            </p>
          </Reveal>
          <Reveal delay={150}>
            <FlipCountdown target={WEDDING_DATE} />
          </Reveal>

          {/* Attire reminder message below the countdown */}
          <Reveal delay={300}>
            <div className="mx-auto mt-14 flex max-w-2xl flex-col items-center text-center">
              <div className="flex items-center justify-center gap-5 sm:gap-8">
                {/* Sherwani (groom) line-art */}
                <svg
                  aria-hidden
                  viewBox="0 0 56 88"
                  className="h-16 w-auto shrink-0 text-gold/75 sm:h-20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 11 L28 18 L39 11 L47 20 L43.5 33 L43.5 75 Q28 79.5 12.5 75 L12.5 33 L9 20 Z" />
                  <path d="M28 18 L28 77" />
                  <path d="M17 11 L22.5 21 L28 18 M39 11 L33.5 21 L28 18" />
                  <circle cx="24" cy="30" r="1" />
                  <circle cx="24" cy="40" r="1" />
                  <circle cx="24" cy="50" r="1" />
                  <circle cx="24" cy="60" r="1" />
                  <path d="M14 84 h28" opacity="0.5" />
                </svg>

                <p className="max-w-xs font-display text-lg italic leading-snug text-foreground/90 sm:text-xl">
                  Are you ready for the{" "}
                  <span className="gold-text">festivities</span> &amp; your best wedding attires?
                </p>

                {/* Lehenga (bride) line-art */}
                <svg
                  aria-hidden
                  viewBox="0 0 80 88"
                  className="h-16 w-auto shrink-0 text-gold/75 sm:h-20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M28 13 h24" />
                  <path d="M29 13 L14 69 Q40 79 66 69 L51 13" />
                  <path d="M16.5 63 Q40 72.5 63.5 63" opacity="0.7" />
                  <path d="M33 17 Q41 32 47 17" opacity="0.8" />
                  <path d="M35 14 Q53 27 63 15" />
                  <path d="M26 84 h28" opacity="0.5" />
                </svg>
              </div>

              <div className="mt-6 w-40 gold-rule" />

              <p className="mt-4 font-display text-base italic text-gold-soft/85">
                Beautiful days, brighter memories await!
              </p>
              <span className="mt-2 text-xl text-gold/70" aria-hidden>
                ♡
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story — gold thread + selective photos */}
      <StoryTimeline />

      <InteractivePortrait />

      {/* Diya ritual — auspicious traditional lighting */}
      <DiyaCeremony />

      {/* Events / Celebrations */}
      <Celebrations />

      {/* Breather between celebrations and venue */}
      <Breather>A beautiful celebration of love, culture, and memories to treasure forever.</Breather>

      <PalaceReveal />

      {/* Venue Section */}
      <section data-section="venue" className="relative px-6 py-32">
        <SectionHeader
          eyebrow="The Venues"
          title="Where Memories Will Be Made"
          className="mx-auto max-w-2xl text-center"
        />

        <Reveal>
          <div className="mx-auto mt-6 max-w-xl text-center">
            <p className="font-display text-lg italic leading-relaxed text-foreground/85">
              We look forward to welcoming you across our celebration venues: Polaris Banquet Hall,
              Nova Party Lawn, and Peacock Party Lawn.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mx-auto mt-12 max-w-3xl">
            <VenueMap />
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="relative mt-20 overflow-hidden border-t border-gold/20 px-6 pb-14 pt-28 text-center bg-deep/40">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 mx-auto h-72 max-w-4xl bg-[radial-gradient(ellipse_at_top,oklch(0.86_0.12_84/0.18),transparent_68%)]"
        />

        <p className="relative text-[0.62rem] uppercase tracking-[0.55em] text-gold-soft/80">
          With Love, Respect, and Joy
        </p>

        <p className="relative mt-6 text-balance font-display text-3xl leading-tight gold-text sm:text-5xl md:text-6xl">
          Mr Amul Mehta <span className="font-light italic text-gold-soft/55">&amp;</span> Mrs Sharvari Mehta
        </p>

        <p className="relative mx-auto mt-5 max-w-xl font-display text-base sm:text-lg italic leading-relaxed text-foreground/85">
          “We eagerly await your gracious presence and heartfelt blessings,<br className="hidden sm:inline" />
          as we celebrate the wedding of our beloved children, Shivam &amp; Krina.”
        </p>

        {/* Music Note Badge */}
        <div className="relative mx-auto mt-8 inline-flex flex-wrap items-center justify-center gap-2.5 rounded-full border border-gold/30 bg-gold/5 px-5 py-2.5 backdrop-blur-sm">
          <Music className="h-4 w-4 text-gold" />
          <span className="text-xs text-gold-soft">
            Wedding Soundtrack: <strong className="text-foreground">Gehra Hua</strong> (Yalina’s Entry Version — Slow Sargam)
          </span>
          <a
            href="https://youtu.be/-tYvlst2scE?si=0bmr-NFFYFJKjsQ0"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 text-[0.65rem] uppercase tracking-wider text-gold hover:bg-gold/20 transition-colors"
          >
            YouTube ↗
          </a>
        </div>

        <div className="relative mx-auto mt-10 flex max-w-2xl items-center gap-5">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/45" />
          <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/35 font-display text-xl text-gold-soft">
            ✦
          </span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/45" />
        </div>

        <div className="relative mx-auto mt-8 flex max-w-2xl flex-col items-center justify-between gap-4 border-t border-gold/10 pt-6 text-[0.65rem] uppercase tracking-[0.25em] text-foreground/60 sm:flex-row">
          <span>20–22 November 2026</span>
          <span>From Mr Amul Mehta, Mrs Sharvari Mehta &amp; Family</span>
          <span>#ShivamWedsKrina</span>
        </div>

        <a
          href="https://www.instagram.com/invitestory.in/"
          target="_blank"
          rel="noreferrer"
          className="relative mt-8 inline-block text-[0.52rem] uppercase tracking-[0.3em] text-foreground/40 transition-colors hover:text-gold-soft"
        >
          Designed with ❤️ for Shivam &amp; Krina by InviteStory
        </a>
      </footer>
    </main>
  );
}
