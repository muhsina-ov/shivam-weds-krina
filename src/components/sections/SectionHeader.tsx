import { cn } from "@/lib/utils";

/**
 * Editorial section heading used across Story, Celebrations and Venue.
 *
 *   EYEBROW        (uppercase tracked, gold-soft)
 *   The Title.     (display serif, gold-text gradient)
 *   ──────         (thin gold rule)
 *
 * Pass `align="left"` for left-aligned headers in two-column sections; the
 * default is centred.
 */
export function SectionHeader({
  eyebrow,
  title,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <header
      className={cn(
        "flex flex-col gap-4",
        align === "left" ? "items-start text-left" : "items-center text-center",
        className,
      )}
    >
      <p className="text-[0.65rem] uppercase tracking-[0.5em] text-gold-soft/80">{eyebrow}</p>
      <h2 className="font-display text-4xl leading-tight gold-text sm:text-5xl">{title}</h2>
      <div
        className={cn(
          "h-px w-16 bg-gradient-to-r from-transparent via-gold/70 to-transparent",
          align === "left" ? "origin-left" : "origin-center",
        )}
      />
    </header>
  );
}
