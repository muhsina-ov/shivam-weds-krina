import { useState } from "react";
import { Building2, Compass, ExternalLink, MapPin, Navigation, Sparkles } from "lucide-react";

const MAIN_CAMPUS_URL = "https://share.google/zhZRQMFfq9zsAmJAt";
const RESORT_MAP_QUERY = "Amartara+The+Resort";

type VenueInfo = {
  id: string;
  name: string;
  category: string;
  events: string[];
  description: string;
  badge: string;
};

const VENUES: VenueInfo[] = [
  {
    id: "campus",
    name: "Amartara The Resort",
    badge: "Main Celebration Campus",
    category: "Luxury Destination Resort",
    events: ["All wedding celebrations take place within this campus"],
    description:
      "A serene and majestic resort setting nestled in nature. All three celebration spaces — Polaris Banquet Hall, Nova Party Lawn, and Peacock Party Lawn — are situated within this grand campus.",
  },
  {
    id: "polaris",
    name: "Polaris Banquet Hall",
    badge: "Inside Amartara Campus",
    category: "Indoor Grand Ballroom",
    events: ["An Evening Together (20 Nov · 7:30 PM Onwards)"],
    description:
      "An elegant, climate-controlled banquet hall welcoming guests with royal hospitality for the opening evening reunion and dinner.",
  },
  {
    id: "nova",
    name: "Nova Party Lawn",
    badge: "Inside Amartara Campus",
    category: "Open-Air Sunshine Lawn",
    events: [
      "Haldi & Hues (21 Nov · 10:30 AM)",
      "Grahshanti & Mameru (22 Nov · 10:30 AM)",
    ],
    description:
      "Lush landscaped lawns bathed in morning sunshine, perfect for joyful haldi colors and auspicious sacred morning rituals.",
  },
  {
    id: "peacock",
    name: "Peacock Party Lawn",
    badge: "Inside Amartara Campus",
    category: "Royal Evening Lawn",
    events: [
      "The Sangeet Social (21 Nov · 7:30 PM)",
      "Hastmelap & Wedding (22 Nov · 6:15 PM)",
    ],
    description:
      "An expansive, fairy-lit celebration lawn crafted for the glamorous musical night, baarat reception, and sacred wedding mandap phere.",
  },
];

export function VenueMap() {
  const [selectedVenue, setSelectedVenue] = useState<VenueInfo>(VENUES[0]!);

  return (
    <div className="flex flex-col gap-6">
      {/* Main Campus Location Notice */}
      <div className="rounded-2xl border border-gold/40 bg-gradient-to-r from-gold/15 via-[#3f0808]/90 to-gold/15 p-4 sm:p-5 text-center shadow-lg backdrop-blur-md">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-3.5 py-1 text-[0.68rem] uppercase tracking-[0.25em] text-gold font-semibold">
          <Building2 className="h-3.5 w-3.5 text-gold" />
          Single Celebration Campus
        </div>
        <h3 className="mt-2 font-display text-2xl sm:text-3xl text-gold-soft font-normal">
          Amartara The Resort
        </h3>
        <p className="mx-auto mt-1 max-w-xl text-xs sm:text-sm text-foreground/85 font-light leading-relaxed">
          All venues — Polaris Banquet Hall, Nova Party Lawn, and Peacock Party Lawn — are located
          together within the Amartara The Resort campus.
        </p>

        <div className="mt-3.5 flex justify-center">
          <a
            href={MAIN_CAMPUS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-gold/20 px-5 py-2 text-xs uppercase tracking-[0.2em] text-gold font-medium transition-all hover:bg-gold/30 hover:scale-[1.02] shadow-[0_0_20px_rgba(225,190,120,0.3)]"
          >
            <Navigation className="h-3.5 w-3.5" />
            Navigate to Amartara The Resort (Google Maps) ↗
          </a>
        </div>
      </div>

      {/* Venue Selector Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {VENUES.map((v) => {
          const isSelected = selectedVenue.id === v.id;
          return (
            <button
              key={v.id}
              onClick={() => setSelectedVenue(v)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-wider transition-all duration-300 ${
                isSelected
                  ? "border-gold bg-gold/25 text-gold shadow-[0_0_20px_rgba(225,190,120,0.35)] font-semibold scale-105"
                  : "border-gold/25 bg-card/40 text-foreground/75 hover:border-gold/50 hover:text-gold-soft"
              }`}
            >
              <MapPin className={`h-3.5 w-3.5 ${isSelected ? "text-gold" : "text-gold/50"}`} />
              {v.name}
            </button>
          );
        })}
      </div>

      {/* Selected Venue Card & Embed */}
      <div className="overflow-hidden rounded-[1.75rem] border border-gold/35 bg-[#330505]/70 p-2 shadow-[0_30px_80px_-35px_rgba(0,0,0,0.85)] backdrop-blur-md">
        <div className="p-4 sm:p-6 border-b border-gold/15 bg-card/40 rounded-t-[1.4rem]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[0.62rem] uppercase tracking-[0.3em] text-gold-soft/80 font-medium">
                  {selectedVenue.category}
                </span>
                <span className="rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[0.58rem] uppercase tracking-wider text-gold">
                  {selectedVenue.badge}
                </span>
              </div>
              <h3 className="mt-1 font-display text-2xl sm:text-3xl text-gold-soft font-normal">
                {selectedVenue.name}
              </h3>
              <p className="mt-2 max-w-xl text-xs sm:text-sm leading-relaxed text-foreground/80 font-light">
                {selectedVenue.description}
              </p>
            </div>

            <a
              href={MAIN_CAMPUS_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-gold/60 bg-gold/15 px-4 py-2 text-[0.68rem] uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold/25"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Open in Maps
            </a>
          </div>

          {/* Celebrations here */}
          <div className="mt-5 flex flex-wrap items-center gap-2 pt-3 border-t border-gold/10">
            <span className="text-[0.65rem] uppercase tracking-wider text-gold-soft font-semibold">
              Events Hosted Here:
            </span>
            {selectedVenue.events.map((ev, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 rounded-md border border-gold/30 bg-gold/10 px-3 py-1 text-xs text-gold"
              >
                <Sparkles className="h-3 w-3 text-gold" /> {ev}
              </span>
            ))}
          </div>
        </div>

        {/* Map iframe */}
        <div className="relative overflow-hidden rounded-b-[1.4rem]">
          <iframe
            title="Amartara The Resort on Google Maps"
            src={`https://www.google.com/maps?q=${RESORT_MAP_QUERY}&output=embed`}
            className="h-80 sm:h-96 w-full border-0 grayscale-[0.1]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
