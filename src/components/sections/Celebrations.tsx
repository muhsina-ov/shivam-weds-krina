import { useRef, useState } from "react";
import { CalendarPlus, Heart, MapPin, Sparkles } from "lucide-react";

import frameAsset from "@/assets/r1.png.asset.json";
import coupleAsset from "@/assets/r2.png.asset.json";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { gsap, useGSAP, useMotionOk } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type Event = {
  name: string;
  date: string;
  time: string;
  place: string;
  note: string;
  subnote?: string;
  start: string;
  end: string;
  slug: string;
  badge?: string;
};

export const CELEBRATION_EVENTS: Event[] = [
  {
    name: "Welcome Party",
    date: "20 November 2026",
    time: "7:30 PM onwards",
    place: "Polaris Banquet Hall",
    note: "An evening of warm welcomes, happy hearts and the beginning of our celebrations.",
    start: "2026-11-20T19:30:00+05:30",
    end: "2026-11-20T23:30:00+05:30",
    slug: "welcome-party",
    badge: "Day 1",
  },
  {
    name: "Haldi Ceremony",
    date: "21 November 2026",
    time: "10:30 AM onwards",
    place: "Nova Party Lawn",
    note: "Sunshine, laughter and a little haldi as we celebrate the bride and groom.",
    start: "2026-11-21T10:30:00+05:30",
    end: "2026-11-21T13:30:00+05:30",
    slug: "haldi",
    badge: "Day 2 · Morning",
  },
  {
    name: "Sangeet Night",
    date: "21 November 2026",
    time: "7:30 PM onwards",
    place: "Peacock Party Lawn",
    note: "An evening of music, dance, laughter and unforgettable family moments.",
    subnote: "With love from: Mrs Tanvi Patel & Mr Parthav Patel (Sister & Brother-in-law of the Groom)",
    start: "2026-11-21T19:30:00+05:30",
    end: "2026-11-21T23:59:00+05:30",
    slug: "sangeet",
    badge: "Day 2 · Evening",
  },
  {
    name: "Grahshanti",
    date: "22 November 2026",
    time: "10:30 AM onwards",
    place: "Nova Party Lawn",
    note: "A beautiful morning of blessings, traditions and prayers for a lifetime of togetherness.",
    start: "2026-11-22T10:30:00+05:30",
    end: "2026-11-22T13:00:00+05:30",
    slug: "grahshanti",
    badge: "Day 3 · Morning",
  },
  {
    name: "Mameru",
    date: "22 November 2026",
    time: "Traditional Ceremony",
    place: "Nova Party Lawn",
    note: "For our beloved Mama & Mami and Masi & Masaji — a little tradition, a lot of love, and memories to cherish forever. ❤️",
    subnote: "Mr Himanshu Purohit & Mrs Vandana Purohit (Mama & Mami) · Mr Kumar Trivedi & Mrs Aparna Trivedi (Masi & Masaji)",
    start: "2026-11-22T13:00:00+05:30",
    end: "2026-11-22T15:30:00+05:30",
    slug: "mameru",
    badge: "Day 3 · Afternoon",
  },
  {
    name: "Baarat",
    date: "22 November 2026",
    time: "4:00 PM",
    place: "Starts at the Entry Gate",
    note: "Let the beats begin as Shivam arrives with love, laughter and his baraat.",
    start: "2026-11-22T16:00:00+05:30",
    end: "2026-11-22T18:00:00+05:30",
    slug: "baarat",
    badge: "Day 3 · 4:00 PM",
  },
  {
    name: "Hastmelap & Wedding",
    date: "22 November 2026",
    time: "6:15 PM",
    place: "Peacock Party Lawn",
    note: "Two hearts, two families and one beautiful beginning as Shivam and Krina join hands forever.",
    subnote: "🥰 With Excitement From: Aarush & Raavika (Excited to celebrate the wedding of their Mama! ❤️)",
    start: "2026-11-22T18:15:00+05:30",
    end: "2026-11-22T21:30:00+05:30",
    slug: "hastmelap-wedding",
    badge: "Main Ceremony",
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
    `DESCRIPTION:${e.note}${e.subnote ? " " + e.subnote : ""}`,
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
      className="relative bg-cover bg-center bg-no-repeat px-6 py-32"
      style={{ backgroundImage: `url(${frameAsset.url})` }}
    >
      <div
        aria-hidden
        className="ken-burns-bg absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${frameAsset.url})` }}
      />
      <div className="absolute inset-0 bg-deep/80 backdrop-blur-[2px]" />

      <div className="relative mx-auto max-w-5xl">
        <SectionHeader
          eyebrow="Wedding Celebrations"
          title="Seven Celebrations, One Sacred Journey"
          className="mx-auto max-w-2xl text-center"
        />

        <p className="mx-auto mt-4 max-w-xl text-center text-sm font-light text-gold-soft/80">
          From warm welcomes to the sacred phere, each moment is crafted with love, music, and
          family blessings.
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {CELEBRATION_EVENTS.map((e, i) => (
            <Reveal key={e.name} delay={i * 90}>
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
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      if (!ok || !cardRef.current) return;
      const card = cardRef.current;
      const onMove = (e: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotateX: -y * 3.5,
          rotateY: x * 4.5,
          transformPerspective: 800,
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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          ref={cardRef}
          className={cn(
            "group relative flex h-full flex-col justify-between cursor-pointer rounded-2xl border p-7 paper transition-all duration-500",
            isFeatured
              ? "border-gold/60 shadow-[0_20px_50px_-15px_rgba(225,190,120,0.35)] md:col-span-2 md:max-w-2xl md:mx-auto w-full"
              : "border-gold/25 hover:border-gold/50 hover:shadow-[0_25px_50px_-20px_rgba(225,190,120,0.35)]",
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <img
                  src={coupleAsset.url}
                  alt=""
                  aria-hidden
                  className="h-6 w-6 rounded-full object-cover ring-1 ring-gold/50"
                />
                <h3 className="font-display text-2xl sm:text-3xl gold-text">{event.name}</h3>
              </div>
              {event.badge && (
                <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[0.6rem] font-medium tracking-wider text-gold-soft uppercase">
                  {event.badge}
                </span>
              )}
            </div>

            <div className="mt-3 w-12 gold-rule transition-all duration-500 group-hover:w-28" />

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm tracking-[0.18em] text-gold-soft">
              <span className="font-medium">{event.date}</span>
              <span className="text-gold/50">·</span>
              <span className="font-light">{event.time}</span>
            </div>

            <div className="mt-2 flex items-center gap-1.5 text-sm text-foreground/90">
              <MapPin className="h-3.5 w-3.5 text-gold-soft shrink-0" />
              <span>{event.place}</span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{event.note}</p>

            {event.subnote && (
              <div className="mt-4 rounded-lg border border-gold/20 bg-gold/5 p-3 text-xs leading-relaxed text-gold-soft/90 italic">
                {event.subnote}
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between pt-3 border-t border-gold/10 text-[0.62rem] uppercase tracking-widest text-gold-soft/75 group-hover:text-gold-soft">
            <span className="flex items-center gap-1">
              <CalendarPlus className="h-3 w-3" /> Save to Calendar
            </span>
            <span>Tap for details ↗</span>
          </div>
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-80 border-gold/40 bg-card/95 backdrop-blur-md p-5 text-foreground shadow-2xl">
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-gold-soft">
            <Sparkles className="h-4 w-4" />
            <p className="font-display text-lg gold-text">{event.name}</p>
          </div>
          <p className="text-xs text-gold-soft/90">
            {event.date} · {event.time}
          </p>
          <p className="text-xs text-foreground/80 flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-gold" /> {event.place}
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">{event.note}</p>
          {event.subnote && (
            <p className="text-[0.75rem] text-gold-soft/90 border-l-2 border-gold/40 pl-2 italic">
              {event.subnote}
            </p>
          )}

          <div className="pt-2">
            <a
              href={icsHref(event)}
              download={`shivam-krina-${event.slug}.ics`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/60 bg-gold/10 py-2.5 text-[0.68rem] uppercase tracking-[0.25em] text-gold-soft transition-colors hover:bg-gold/20"
            >
              <CalendarPlus className="h-3.5 w-3.5" />
              Add to Calendar (.ics)
            </a>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
