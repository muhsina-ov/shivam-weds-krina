import { Letters } from "@/hooks/use-letters";

/**
 * Static "Dr Shivam & Dr Krina" headline.
 */
export function LetterH1() {
  return (
    <h1
      className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-display text-4xl leading-tight gold-text sm:text-6xl md:text-7xl lg:text-8xl"
      style={{ opacity: 1 }}
    >
      <Letters text="Dr Shivam" />
      <span className="font-light italic text-gold-soft/70 text-3xl sm:text-4xl md:text-5xl">
        weds
      </span>
      <Letters text="Dr Krina" />
    </h1>
  );
}
