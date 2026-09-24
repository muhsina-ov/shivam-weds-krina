/**
 * Global Audio Controller for Wedding Invitation Soundtrack.
 *
 * Ensures flawless audio playback across mobile devices (iPhone iOS Safari,
 * iPad, Android) and desktop browsers by maintaining a persistent singleton
 * audio element and triggering playback on direct user gestures (such as scratching the card).
 */

type AudioListener = (playing: boolean) => void;

class AudioController {
  private audio: HTMLAudioElement | null = null;
  private listeners = new Set<AudioListener>();
  private _isPlaying = false;
  private _isInitialized = false;

  public get isPlaying(): boolean {
    return this._isPlaying;
  }

  private init() {
    if (typeof window === "undefined" || this._isInitialized) return;
    this._isInitialized = true;

    const a = new Audio();
    a.loop = true;
    a.preload = "auto";
    a.volume = 0.85;

    // Use MP3 directly for guaranteed compatibility on iOS Safari (iPhone/iPad) & Android
    a.src = "/__local/audio.mp3";

    a.addEventListener("play", () => {
      this._isPlaying = true;
      this.notify();
    });

    a.addEventListener("pause", () => {
      this._isPlaying = false;
      this.notify();
    });

    a.addEventListener("ended", () => {
      this._isPlaying = false;
      this.notify();
    });

    a.addEventListener("error", () => {
      // Fallback to webm if mp3 fails
      if (a.src.endsWith(".mp3")) {
        a.src = "/__local/audio.webm";
        a.load();
      }
    });

    this.audio = a;
  }

  public subscribe(listener: AudioListener): () => void {
    this.listeners.add(listener);
    listener(this._isPlaying);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => {
      try {
        fn(this._isPlaying);
      } catch {
        // Ignore subscriber errors
      }
    });
  }

  /**
   * Play audio. Best called synchronously inside a user gesture handler (pointerdown/click/touchstart)
   * to satisfy strict iOS Safari and mobile autoplay policies.
   */
  public play(): Promise<void> {
    this.init();
    if (!this.audio) return Promise.resolve();
    if (this._isPlaying && !this.audio.paused) return Promise.resolve();

    return this.audio
      .play()
      .then(() => {
        this._isPlaying = true;
        this.notify();
      })
      .catch((err) => {
        // Silently catch autoplay rejections (e.g. if called without gesture)
        this._isPlaying = false;
        this.notify();
        throw err;
      });
  }

  public pause() {
    if (this.audio) {
      this.audio.pause();
      this._isPlaying = false;
      this.notify();
    }
  }

  public toggle(): Promise<void> {
    if (this._isPlaying) {
      this.pause();
      return Promise.resolve();
    } else {
      return this.play();
    }
  }
}

export const audioController = new AudioController();
