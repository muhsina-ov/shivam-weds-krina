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
      { title: "Dr. Shivam Mehta & Dr. Krina Morabia — Wedding Invitation | Groom Side" },
      {
        name: "description",
        content:
          "Official groom-side wedding invitation of Dr. Shivam Mehta & Dr. Krina Morabia. Celebrations from 20 to 22 November 2026. Join the Mehta & Morabia families in celebration.",
      },
      { property: "og:site_name", content: "InviteStory" },
      { property: "og:title", content: "Dr. Shivam Mehta & Dr. Krina Morabia — Wedding Invitation" },
      {
        property: "og:description",
        content:
          "Together with their families, Dr. Shivam Mehta & Dr. Krina Morabia warmly invite you to celebrate their wedding on 20, 21 & 22 November 2026.",
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
      { name: "twitter:title", content: "Dr. Shivam Mehta & Dr. Krina Morabia — Wedding Invitation" },
      {
        name: "twitter:description",
        content:
          "Official groom-side wedding invitation of Dr. Shivam Mehta & Dr. Krina Morabia. Celebrations on 20, 21 & 22 November 2026.",
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
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-deep/70 px-4 py-1.5 backdrop-blur-sm mb-3">
              <Sparkles className="h-3 w-3 text-gold" />
              <span className="text-[0.62rem] uppercase tracking-[0.4em] text-gold-soft font-medium">
                Groom Side E-Invite · Mehta Family
              </span>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <p className="text-[0.68rem] uppercase tracking-[0.5em] text-gold-soft/80">
              Together with their families
            </p>
          </Reveal>

          <Reveal delay={250}>
            <LetterH1 />
          </Reveal>

          <Reveal delay={350}>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs text-foreground/80 font-display italic">
              <span>Dr Shivam Mehta <span className="text-gold-soft font-normal">(Son of Mr Amul Mehta &amp; Mrs Sharvari Mehta)</span></span>
              <span className="text-gold">✦</span>
              <span>Dr Krina Morabia <span className="text-gold-soft font-normal">(Daughter of Mr Nitin Morabia &amp; Mrs Jyoti Morabia)</span></span>
            </div>
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
            <div className="mx-auto mt-8 w-24 gold-rule" />
            <div className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p className="text-base text-foreground/90 font-display italic">
                With the Blessings of <span className="text-gold-soft font-semibold">Mr Niranjan Mehta &amp; Mrs Asha Mehta</span>
                <br />
                <span className="text-xs text-gold-soft/75">(Grandfather &amp; Grandmother of the Groom)</span>
              </p>
              <p className="pt-2">
                We warmly invite you to join Dr Shivam Mehta, Dr Krina Morabia, and our family
                as we celebrate three days of sacred traditions, joyous music, and unconditional love.
              </p>
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

        <p className="relative mt-6 text-balance font-display text-5xl leading-none gold-text sm:text-7xl">
          Dr Shivam <span className="font-light italic text-gold-soft/55">&amp;</span> Dr Krina
        </p>

        <p className="relative mx-auto mt-5 max-w-xl font-display text-base sm:text-lg italic leading-relaxed text-foreground/80">
          “Two hearts, two families and one beautiful beginning as Shivam and Krina join hands forever.”
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
          <span>From Dr Shivam Mehta &amp; Family</span>
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
