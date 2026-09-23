import { useEffect, useRef, useState } from "react";
import { Music, Volume2, VolumeX, Youtube } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Floating audio mute/unmute toggle.
 * Plays the official wedding soundtrack:
 * "Gehra Hua (Yalina’s Entry Version)" - https://youtu.be/-tYvlst2scE
 */
export function AudioToggle({ visible }: { visible: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wantsPlay = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [broken, setBroken] = useState(false);
  const [showNote, setShowNote] = useState(false);

  useEffect(() => {
    // Prefer the real WebM/Opus file; fall back to MP3 for browsers
    // without WebM support (e.g. older Safari).
    const a = new Audio();
    a.loop = true;
    a.preload = "auto";
    a.volume = 0.85;

    // NOTE: the codecs parameter must be quoted per spec —
    // canPlayType('audio/webm; codecs=opus') without quotes returns ""
    // even in browsers that can play it, which previously forced every
    // browser onto the mp3 fallback.
    const webmOk =
      a.canPlayType('audio/webm; codecs="opus"') || a.canPlayType("audio/webm");
    a.src = webmOk ? "/__local/audio.webm" : "/__local/audio.mp3";

    const onError = () => {
      // Try fallback to mp3 if webm fails — and actually retry playback,
      // the previous version only swapped src without load()/play().
      if (a.src.endsWith(".webm")) {
        a.src = "/__local/audio.mp3";
        a.load();
        // Only auto-retry if we were already trying to play (autoplay or
        // an explicit toggle); otherwise the next toggle click plays it.
        if (wantsPlay.current) {
          void a.play().catch(() => setPlaying(false));
        }
        return;
      }
      setBroken(true);
    };
    a.addEventListener("error", onError);

    audioRef.current = a;

    return () => {
      a.pause();
      audioRef.current = null;
    };
  }, []);

  // When the invite is opened by the user, attempt smooth auto-play.
  // Browsers block audible autoplay once transient activation expires
  // (the opener films run for several seconds after the tap), so also
  // retry on the next explicit user gesture.
  useEffect(() => {
    if (!visible) return;
    const a = audioRef.current;
    if (!a) return;

    wantsPlay.current = true;
    const tryPlay = () => {
      const p = a.play();
      if (p !== undefined) {
        p.then(() => {
          setPlaying(true);
        }).catch(() => {
          // Autoplay was prevented by browser policy until explicit click; user will click the toggle
          setPlaying(false);
        });
      }
    };
    tryPlay();

    const onGesture = () => {
      const el = audioRef.current;
      if (!el || !el.paused) return;
      tryPlay();
    };
    window.addEventListener("pointerdown", onGesture);
    window.addEventListener("keydown", onGesture);
    return () => {
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
    };
  }, [visible]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;

    if (playing) {
      wantsPlay.current = false;
      a.pause();
      setPlaying(false);
    } else {
      wantsPlay.current = true;
      a.load();
      a.play()
        .then(() => {
          setPlaying(true);
          setBroken(false);
        })
        .catch(() => {
          setBroken(true);
          setShowNote(true);
        });
    }
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
