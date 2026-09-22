import { cn } from "@/lib/utils";

/**
 * A quiet transitional moment between sections — small ornament + one
 * italic editorial line. Gives the page room to breathe between dense
 * chapters.
 *
 *   ✦
 *   Every journey has a place.
 */
export function Breather({
  ornament = "✦",
  children,
  className,
}: {
  ornament?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      aria-hidden
      className={cn("flex flex-col items-center gap-3 px-6 py-20 text-center", className)}
    >
      <span className="font-display text-2xl gold-text">{ornament}</span>
      <p className="max-w-md font-display text-base italic text-gold-soft/80">{children}</p>
    </section>
  );
}
