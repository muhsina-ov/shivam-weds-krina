import { useRef } from "react";
import {
  CalendarPlus,
  Flame,
  Heart,
  MapPin,
  Music,
  PartyPopper,
  Sparkles,
  Users,
  Wine,
} from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { gsap, useGSAP, useMotionOk } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type Event = {
  name: string;
  isSangeet?: boolean;
  date: string;
  time: string;
  place: string;
  note: string;
  subnote?: string;
  tags: { label: string; icon?: string }[];
  start: string;
  end: string;
  slug: string;
  badge: string;
  image?: string;
  iconType?: "kalash" | "horse" | "fire" | "party";
  mameruDetails?: {
    title: string;
    subtitle: string;
    mamaMami: string;
    masiMasaji: string;
    time: string;
    place: string;
    note: string;
  };
};

export const CELEBRATION_EVENTS: Event[] = [
  {
    name: "An Evening Together",
    date: "20 November 2026",
    time: "7:30 PM Onwards",
    place: "Polaris Banquet Hall",
    note: "An evening of warm welcomes, heartfelt reunions and the beginning of our celebrations.",
    tags: [
      { label: "DINNER", icon: "wine" },
      { label: "MUSIC", icon: "music" },
      { label: "GOOD COMPANY", icon: "users" },
    ],
    start: "2026-11-20T19:30:00+05:30",
    end: "2026-11-20T23:30:00+05:30",
    slug: "evening-together",
    badge: "DAY 1",
    image: "/event-evening.jpg",
  },
  {
    name: "Haldi & Hues",
    date: "21 November 2026",
    time: "10:30 AM Onwards",
    place: "Nova Party Lawn",
    note: "Sunshine, laughter and a little haldi as we celebrate the bride and groom.",
    tags: [
      { label: "COLOURS", icon: "sparkles" },
      { label: "FUN", icon: "party" },
      { label: "TOGETHERNESS", icon: "infinity" },
    ],
    start: "2026-11-21T10:30:00+05:30",
    end: "2026-11-21T13:30:00+05:30",
    slug: "haldi-and-hues",
    badge: "DAY 2 · MORNING",
    image: "/event-haldi.jpg",
  },
  {
    name: "The Sangeet Social",
    isSangeet: true,
    date: "21 November 2026",
    time: "7:30 PM Onwards",
    place: "Peacock Party Lawn",
    note: "An evening of music, dance, laughter and unforgettable family moments.",
    tags: [
      { label: "MUSIC", icon: "music" },
      { label: "DANCE", icon: "dance" },
      { label: "GOOD VIBES", icon: "sparkles" },
      { label: "TOGETHERNESS", icon: "users" },
    ],
    start: "2026-11-21T19:30:00+05:30",
    end: "2026-11-21T23:59:00+05:30",
    slug: "sangeet-social",
    badge: "DAY 2 · EVENING",
    image: "/event-sangeet.jpg",
  },
  {
    name: "Grahshanti",
    date: "22 November 2026",
    time: "10:30 AM Onwards",
    place: "Nova Party Lawn",
    iconType: "kalash",
    note: "A beautiful morning of blessings, traditions and prayers for a lifetime of togetherness.",
    mameruDetails: {
      title: "Mameru",
      subtitle: "WITH LOVE & BLESSINGS",
      mamaMami: "Mrs. Vandana & Mr. Himanshu Purohit",
      masiMasaji: "Mrs. Aparna & Mr. Kumar Trivedi",
      time: "During Grahshanti",
      place: "Nova Party Lawn",
      note: "A special moment to honour our beloved Mama & Mami and Masi & Masaji, filled with love, traditions and cherished family bonds.",
    },
    tags: [
      { label: "BLESSINGS", icon: "lotus" },
      { label: "TRADITIONS", icon: "diya" },
      { label: "FAMILY", icon: "users" },
      { label: "TOGETHERNESS", icon: "infinity" },
    ],
    start: "2026-11-22T10:30:00+05:30",
    end: "2026-11-22T14:00:00+05:30",
    slug: "grahshanti-mameru",
    badge: "DAY 3 · MORNING",
    image: "/event-grahshanti.jpg",
  },
  {
    name: "Baarat",
    date: "22 November 2026",
    time: "4:00 PM Onwards",
    place: "Starts at the Entry Gate",
    iconType: "horse",
    note: "Let the beats begin as Shivam arrives with love, laughter and his baraat.",
    tags: [
      { label: "MUSIC", icon: "drum" },
      { label: "DANCE", icon: "dance" },
      { label: "CELEBRATION", icon: "users" },
      { label: "TOGETHERNESS", icon: "infinity" },
    ],
    start: "2026-11-22T16:00:00+05:30",
    end: "2026-11-22T18:00:00+05:30",
    slug: "baarat",
    badge: "DAY 3 · 4:00 PM",
    image: "/event-baarat.jpg",
  },
  {
    name: "Hastmelap & Wedding",
    date: "22 November 2026",
    time: "6:15 PM Onwards",
    place: "Peacock Party Lawn",
    iconType: "fire",
    note: "Two hearts, two families and one beautiful beginning as Shivam and Krina join hands forever.",
    tags: [
      { label: "SACRED RITUALS", icon: "fire" },
      { label: "LOVE", icon: "heart" },
      { label: "FAMILY", icon: "users" },
      { label: "TOGETHERNESS", icon: "infinity" },
    ],
    start: "2026-11-22T18:15:00+05:30",
    end: "2026-11-22T22:30:00+05:30",
    slug: "hastmelap-wedding",
    badge: "DAY 3 · 6:15 PM",
    image: "/event-hastmelap.jpg",
  },
];

function fmtIcsStamp(iso: string) {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);
  if (!m) return iso;
  return `${m[1]}${m[2]}${m[3]}T${m[4]}${m[5]}${m[6]}`;
}

function buildIcs(e: Event) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Dr Shivam & Dr Krina//Wedding//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${e.slug}@shivam-krina-2026.invite`,
    `DTSTAMP:${fmtIcsStamp(new Date().toISOString())}`,
    `DTSTART:${fmtIcsStamp(e.start)}`,
    `DTEND:${fmtIcsStamp(e.end)}`,
    `SUMMARY:Dr Shivam & Dr Krina — ${e.name}`,
    `LOCATION:${e.place}`,
    `DESCRIPTION:${e.note}${e.mameruDetails ? " " + e.mameruDetails.note : ""}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

function icsHref(e: Event) {
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(buildIcs(e))}`;
}

export function Celebrations() {
  return (
    <section
      data-section="celebrations"
      className="relative px-6 py-16 sm:py-20 bg-gradient-to-b from-[#2a0404] via-[#380606] to-[#250303]"
    >
      {/* Subtle radial ambient warmth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(180,40,40,0.18),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-4xl">
        <SectionHeader
          eyebrow="Wedding Celebrations"
          title="Seven Celebrations, One Sacred Journey"
          className="mx-auto max-w-2xl text-center"
        />

        <p className="mx-auto mt-3 max-w-xl text-center text-xs sm:text-sm font-light text-gold-soft/80">
          From warm welcomes to the sacred phere, each moment is crafted with love, music, and
          family blessings.
        </p>

        <div className="mt-8 sm:mt-10 space-y-4 sm:space-y-5">
          {CELEBRATION_EVENTS.map((e, i) => (
            <Reveal key={e.slug} delay={i * 80}>
              <EventCard event={e} isFeatured={e.slug === "hastmelap-wedding"} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventCard({ event, isFeatured }: { event: Event; isFeatured?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const ok = useMotionOk();

  useGSAP(
    () => {
      if (!ok || !cardRef.current) return;
      const card = cardRef.current;
      const onMove = (e: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotateX: -y * 2.5,
          rotateY: x * 3,
          transformPerspective: 900,
          duration: 0.45,
          ease: "power3.out",
          overwrite: "auto",
        });
      };
      const onLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      };
      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
      return () => {
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
      };
    },
    [ok],
  );

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative overflow-hidden rounded-xl sm:rounded-2xl border transition-all duration-500",
        "bg-gradient-to-br from-[#4d0c0c] via-[#3a0707] to-[#280404]",
        isFeatured
          ? "border-gold/60 shadow-[0_20px_50px_-15px_rgba(225,190,120,0.35)]"
          : "border-gold/30 hover:border-gold/55 shadow-[0_15px_40px_-18px_rgba(0,0,0,0.6)]",
      )}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative flex flex-col sm:flex-row items-stretch">
        {/* Left Side: Content */}
        <div
          className={cn(
            "p-4 sm:p-6 flex flex-col justify-between z-10",
            event.image ? "sm:w-[60%] w-full" : "w-full",
          )}
        >
          <div>
            {/* Eyebrow & Badge */}
            <span className="text-[0.62rem] sm:text-[0.66rem] uppercase tracking-[0.25em] text-gold-soft font-semibold">
              {event.badge}
            </span>

            {/* Title with optional icon badge */}
            <div className="mt-1 flex items-center gap-2.5">
              {event.iconType && (
                <div className="h-8 w-8 sm:h-10 sm:w-10 shrink-0 rounded-full border border-gold/40 bg-gold/10 p-1.5 flex items-center justify-center text-gold shadow-[0_0_12px_rgba(225,190,120,0.25)]">
                  {event.iconType === "kalash" && (
                    <span className="text-base sm:text-lg" title="Sacred Kalash">
                      🪔
                    </span>
                  )}
                  {event.iconType === "horse" && (
                    <span className="text-base sm:text-lg" title="Royal Baarat">
                      🐎
                    </span>
                  )}
                  {event.iconType === "fire" && <Flame className="h-4 w-4 sm:h-5 sm:w-5 text-gold" />}
                </div>
              )}

              {event.isSangeet ? (
                <div>
                  <span className="text-[0.62rem] uppercase tracking-[0.22em] text-gold-soft/80 block">
                    The
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl text-gold-soft font-normal tracking-wide">
                    Sangeet{" "}
                    <span className="font-display italic text-2xl sm:text-3xl text-gold font-light">
                      Social
                    </span>
                  </h3>
                </div>
              ) : (
                <h3 className="font-display text-xl sm:text-2xl text-gold-soft font-normal tracking-wide">
                  {event.name}
                </h3>
              )}
            </div>

            {/* Gold rule */}
            <div className="mt-1.5 w-10 h-px bg-gold/40 group-hover:w-20 transition-all duration-500" />

            {/* Date & Time */}
            <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs sm:text-[0.82rem] uppercase tracking-[0.14em] text-gold-soft/90 font-medium">
              <span>{event.date}</span>
              <span className="text-gold/40">·</span>
              <span className="text-gold-soft/80">{event.time}</span>
            </div>

            {/* Venue Location */}
            <div className="mt-1 flex items-center gap-1.5 text-xs sm:text-[0.82rem] text-foreground/90">
              <MapPin className="h-3.5 w-3.5 text-gold shrink-0" />
              <span>{event.place}</span>
            </div>

            {/* Description */}
            <p className="mt-1.5 text-xs sm:text-[0.82rem] leading-relaxed text-foreground/75 font-light">
              {event.note}
            </p>

            {/* Nested Mameru Card (Inside Grahshanti) */}
            {event.mameruDetails && (
              <div className="mt-3.5 rounded-xl border border-gold/40 bg-gradient-to-b from-[#3a0808]/95 to-[#2c0505]/95 p-3 sm:p-4 shadow-lg relative overflow-hidden backdrop-blur-md">
                <div className="flex items-center justify-between gap-2 border-b border-gold/20 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl" role="img" aria-label="Mameru Kalash">
                      🏺
                    </span>
                    <div>
                      <h4 className="font-display text-lg sm:text-xl text-gold-soft font-semibold tracking-wide">
                        {event.mameruDetails.title}
                      </h4>
                      <span className="text-[0.62rem] uppercase tracking-[0.2em] text-gold/85 font-medium block">
                        {event.mameruDetails.subtitle}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="inline-block rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[0.62rem] sm:text-xs uppercase tracking-wider text-gold-soft font-medium">
                      🕒 {event.mameruDetails.time}
                    </span>
                  </div>
                </div>

                {/* Clear, Prominent Mama-Mami and Masi-Masaji Cards */}
                <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
                  {/* Mama & Mami */}
                  <div className="rounded-lg border border-gold/35 bg-gold/[0.08] p-2 sm:p-2.5 text-left transition-all hover:border-gold/60">
                    <p className="text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.18em] text-gold font-semibold">
                      Mama &amp; Mami
                    </p>
                    <p className="mt-0.5 font-display text-xs sm:text-sm text-foreground font-medium leading-snug">
                      {event.mameruDetails.mamaMami}
                    </p>
                  </div>

                  {/* Masi & Masaji */}
                  <div className="rounded-lg border border-gold/35 bg-gold/[0.08] p-2 sm:p-2.5 text-left transition-all hover:border-gold/60">
                    <p className="text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.18em] text-gold font-semibold">
                      Masi &amp; Masaji
                    </p>
                    <p className="mt-0.5 font-display text-xs sm:text-sm text-foreground font-medium leading-snug">
                      {event.mameruDetails.masiMasaji}
                    </p>
                  </div>
                </div>

                {/* Warm Heartfelt Note & Venue */}
                <div className="mt-2 flex flex-wrap items-center justify-between gap-1.5 pt-2 border-t border-gold/15 text-[0.7rem] sm:text-xs text-foreground/85">
                  <p className="italic text-[0.7rem] sm:text-xs text-foreground/80 leading-relaxed max-w-sm">
                    {event.mameruDetails.note}
                  </p>
                  <span className="shrink-0 text-[0.62rem] sm:text-xs uppercase tracking-wider text-gold-soft font-medium">
                    📍 {event.mameruDetails.place}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Bar: Tags & Direct Save to Calendar */}
          <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-gold/15">
            <div className="flex flex-wrap items-center gap-2 text-[0.6rem] sm:text-[0.68rem] uppercase tracking-[0.14em] text-gold-soft/80 font-medium">
              {event.tags.map((tag, idx) => (
                <span key={idx} className="inline-flex items-center gap-1">
                  {tag.icon === "wine" && <Wine className="h-3 w-3 text-gold-soft/90" />}
                  {tag.icon === "music" && <Music className="h-3 w-3 text-gold-soft/90" />}
                  {tag.icon === "users" && <Users className="h-3 w-3 text-gold-soft/90" />}
                  {tag.icon === "sparkles" && <Sparkles className="h-3 w-3 text-gold-soft/90" />}
                  {tag.icon === "party" && <PartyPopper className="h-3 w-3 text-gold-soft/90" />}
                  {tag.icon === "fire" && <Flame className="h-3 w-3 text-gold-soft/90" />}
                  {tag.icon === "heart" && <Heart className="h-3 w-3 text-gold-soft/90" />}
                  {tag.icon === "lotus" && <span>🪷</span>}
                  {tag.icon === "diya" && <span>🪔</span>}
                  {tag.icon === "drum" && <span>🥁</span>}
                  {tag.icon === "dance" && <span>🥂</span>}
                  {tag.icon === "infinity" && <span>♾️</span>}
                  <span>{tag.label}</span>
                  {idx < event.tags.length - 1 && <span className="text-gold/30">|</span>}
                </span>
              ))}
            </div>

            <a
              href={icsHref(event)}
              download={`shivam-krina-${event.slug}.ics`}
              className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 text-[0.62rem] sm:text-xs uppercase tracking-wider text-gold-soft transition-all duration-300 hover:bg-gold/25 hover:text-gold hover:border-gold/70"
            >
              <CalendarPlus className="h-3.5 w-3.5 text-gold" />
              <span>Save to Calendar</span>
            </a>
          </div>
        </div>

        {/* Right Side: Photo with smooth gradient fade into crimson base */}
        {event.image && (
          <div className="relative sm:w-[40%] w-full h-44 sm:h-auto sm:min-h-full overflow-hidden order-first sm:order-last shrink-0">
            <img
              src={event.image}
              alt={event.name}
              className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            {/* Desktop Left-to-Right gradient fade */}
            <div
              aria-hidden
              className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#4d0c0c] via-transparent to-transparent pointer-events-none"
            />
            {/* Mobile Top-to-Bottom gradient fade */}
            <div
              aria-hidden
              className="sm:hidden absolute inset-0 bg-gradient-to-t from-[#4d0c0c] via-transparent to-transparent pointer-events-none"
            />
          </div>
        )}
      </div>
    </div>
  );
}
