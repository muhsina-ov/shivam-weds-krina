import { useEffect, useState } from "react";
import { Music, VolumeX, Youtube } from "lucide-react";

import { cn } from "@/lib/utils";
import { audioController } from "@/lib/audioController";

/**
 * Floating audio mute/unmute toggle.
 * Plays the official wedding soundtrack:
 * "Gehra Hua (Yalina’s Entry Version)" - https://youtu.be/-tYvlst2scE
 */
export function AudioToggle({ visible }: { visible: boolean }) {
  const [playing, setPlaying] = useState(audioController.isPlaying);
  const [showNote, setShowNote] = useState(false);

  useEffect(() => {
    return audioController.subscribe((isPlaying) => {
      setPlaying(isPlaying);
    });
  }, []);

  const toggle = () => {
    void audioController.toggle().catch(() => {
      setShowNote(true);
    });
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 left-5 z-40 flex items-center gap-3">
      <button
        type="button"
        onClick={toggle}
        onMouseEnter={() => setShowNote(true)}
        aria-label={playing ? "Mute background music" : "Play background music"}
        className={cn(
          "relative grid h-12 w-12 place-items-center rounded-full shadow-2xl transition-all duration-300",
          playing
            ? "border border-gold bg-deep/95 text-gold shadow-[0_0_25px_rgba(225,190,120,0.45)] ring-2 ring-gold/30 scale-105"
            : "border border-gold/35 bg-deep/80 text-gold-soft/80 backdrop-blur-md hover:border-gold hover:text-gold-soft hover:scale-105",
        )}
      >
        {playing ? (
          <div className="flex items-end justify-center gap-0.5 h-4 w-4">
            <span className="w-1 bg-gold rounded-full animate-[bounce_0.8s_infinite_ease-in-out]" />
            <span className="w-1 bg-gold rounded-full animate-[bounce_1.1s_infinite_ease-in-out_0.2s]" />
            <span className="w-1 bg-gold rounded-full animate-[bounce_0.9s_infinite_ease-in-out_0.4s]" />
          </div>
        ) : (
          <VolumeX className="h-4 w-4" />
        )}

        {/* Outer subtle pulse when playing */}
        {playing && (
          <span className="absolute -inset-1 rounded-full border border-gold/40 animate-ping pointer-events-none opacity-40" />
        )}
      </button>

      {/* Music Note Tooltip Badge */}
      <div
        className={cn(
          "max-w-xs rounded-2xl border border-gold/35 bg-deep/95 px-4 py-2.5 text-left backdrop-blur-lg shadow-2xl transition-all duration-300",
          showNote
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 -translate-x-2 pointer-events-none md:pointer-events-auto md:opacity-90",
        )}
        onMouseLeave={() => setShowNote(false)}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[0.62rem] uppercase tracking-wider text-gold font-medium">
            <Music className="h-3 w-3" />
            <span>Background Music</span>
          </div>
          <a
            href="https://youtu.be/-tYvlst2scE?si=0bmr-NFFYFJKjsQ0"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-[0.58rem] text-gold-soft/75 hover:text-gold transition-colors"
            title="Listen on YouTube"
          >
            <Youtube className="h-3 w-3 text-red-400" />
            <span>YouTube</span>
          </a>
        </div>

        <p className="font-display text-sm gold-text font-medium leading-tight mt-1">
          Gehra Hua
        </p>
        <p className="text-[0.68rem] text-muted-foreground mt-0.5">
          Yalina’s Entry Version · <span className="italic text-gold-soft/85">“Ga Ma Pa Sa” Sargam</span>
        </p>
      </div>
    </div>
  );
}
