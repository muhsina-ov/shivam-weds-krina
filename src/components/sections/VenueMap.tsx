import { useState } from "react";
import { Building2, Compass, ExternalLink, MapPin, Sparkles } from "lucide-react";

type VenueInfo = {
  id: string;
  name: string;
  category: string;
  events: string[];
  description: string;
  mapQuery: string;
};

const VENUES: VenueInfo[] = [
  {
    id: "polaris",
    name: "Polaris Banquet Hall",
    category: "Indoor Grand Ballroom",
    events: ["Welcome Party (20 Nov · 7:30 PM)"],
    description: "An elegant, climate-controlled banquet hall welcoming guests for the opening evening celebration.",
    mapQuery: "Polaris+Banquet+Hall",
  },
  {
    id: "nova",
    name: "Nova Party Lawn",
    category: "Open-Air Garden Lawn",
    events: [
      "Haldi (21 Nov · 10:30 AM)",
      "Grahshanti (22 Nov · 10:30 AM)",
      "Mameru Ceremony (22 Nov · Afternoon)",
    ],
    description: "Lush green lawns bathed in natural sunshine, perfect for sacred rituals and vibrant daytime festivities.",
    mapQuery: "Nova+Party+Lawn",
  },
  {
    id: "peacock",
    name: "Peacock Party Lawn",
    category: "Royal Evening Lawn",
    events: [
      "Sangeet Night (21 Nov · 7:30 PM)",
      "Hastmelap & Wedding (22 Nov · 6:15 PM)",
    ],
    description: "An expansive, illuminated party lawn designed for musical nights, baraat welcome, and the auspicious mandap ceremony.",
    mapQuery: "Peacock+Party+Lawn",
  },
];

export function VenueMap() {
  const [selectedVenue, setSelectedVenue] = useState<VenueInfo>(VENUES[0]!);

  return (
    <div className="flex flex-col gap-6">
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
                  ? "border-gold bg-gold/20 text-gold-soft shadow-[0_0_20px_rgba(225,190,120,0.25)] font-medium"
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
      <div className="overflow-hidden rounded-[1.75rem] border border-gold/30 bg-deep/50 p-2 shadow-[0_30px_80px_-35px_oklch(0.2_0.1_30/0.9)] backdrop-blur-md">
        <div className="p-4 sm:p-6 border-b border-gold/15 bg-card/30 rounded-t-[1.4rem]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-gold-soft/80">
                {selectedVenue.category}
              </span>
              <h3 className="mt-1 font-display text-2xl sm:text-3xl gold-text">
                {selectedVenue.name}
              </h3>
              <p className="mt-2 max-w-xl text-xs sm:text-sm leading-relaxed text-muted-foreground">
                {selectedVenue.description}
              </p>
            </div>

            <a
              href={`https://maps.google.com/?q=${selectedVenue.mapQuery}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-gold/10 px-4 py-2 text-[0.65rem] uppercase tracking-[0.25em] text-gold-soft transition-colors hover:bg-gold/20"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Open Maps
            </a>
          </div>

          {/* Celebrations here */}
          <div className="mt-5 flex flex-wrap items-center gap-2 pt-3 border-t border-gold/10">
            <span className="text-[0.62rem] uppercase tracking-wider text-gold-soft font-semibold">
              Events Hosted Here:
            </span>
            {selectedVenue.events.map((ev, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 rounded-md border border-gold/25 bg-gold/5 px-2.5 py-1 text-[0.7rem] text-gold-soft"
              >
                <Sparkles className="h-2.5 w-2.5 text-gold" /> {ev}
              </span>
            ))}
          </div>
        </div>

        {/* Map iframe */}
        <div className="relative overflow-hidden rounded-b-[1.4rem]">
          <iframe
            title={`${selectedVenue.name} on Google Maps`}
            src={`https://www.google.com/maps?q=${selectedVenue.mapQuery}&output=embed`}
            className="h-80 sm:h-96 w-full border-0 grayscale-[0.15]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
