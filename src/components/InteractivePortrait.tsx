import { useRef } from "react";

const handsImage = "/__local/wedding-hands.jpg";

export function InteractivePortrait() {
  const frame = useRef<HTMLElement>(null);

  const move = (event: React.PointerEvent<HTMLElement>) => {
    const element = frame.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    element.style.setProperty("--tilt-x", `${y * -5}deg`);
    element.style.setProperty("--tilt-y", `${x * 7}deg`);
    element.style.setProperty("--light-x", `${(x + 0.5) * 100}%`);
    element.style.setProperty("--light-y", `${(y + 0.5) * 100}%`);
  };

  return (
    <section className="relative overflow-hidden px-6 py-36">
      <div className="mx-auto grid max-w-5xl items-center gap-14 md:grid-cols-[0.8fr_1.2fr]">
        <div className="relative z-10 md:translate-y-14">
          <p className="font-display text-2xl italic text-gold-soft/75">One small distance.</p>
          <h2 className="mt-3 text-balance font-display text-5xl leading-[0.95] text-gold-soft sm:text-7xl">
            Then, a lifetime within reach.
          </h2>
          <p className="mt-7 max-w-sm text-sm leading-7 text-foreground/65">
            Move across the photograph. The light follows the moment before two paths become one.
          </p>
        </div>
        <article
          ref={frame}
          onPointerMove={move}
          onPointerLeave={() => {
            frame.current?.style.setProperty("--tilt-x", "0deg");
            frame.current?.style.setProperty("--tilt-y", "0deg");
          }}
          className="portrait-lens relative mx-auto aspect-[2/3] w-full max-w-md overflow-hidden rounded-[45%_45%_1.5rem_1.5rem] border border-gold/30"
        >
          <img
            src={handsImage}
            alt="Bride and groom reaching toward one another over a glowing diya"
            className="h-full w-full object-cover"
          />
          <div className="portrait-light pointer-events-none absolute inset-0" />
          <span className="absolute bottom-5 right-5 text-[0.52rem] uppercase tracking-[0.35em] text-gold-soft/70">
            follow the light
          </span>
        </article>
      </div>
    </section>
  );
}
