/**
 * Splits a string into per-letter <span> wrappers so GSAP can animate each
 * character independently. Keeps the JSX out of every consuming component.
 *
 * Whitespace is preserved as a real space inside the span so layout is
 * identical to the un-split text. Non-letter glyphs ("&", "·", "—", ".")
 * are kept as their own spans so the reveal cadence reads naturally.
 */
export function Letters({ text, className = "" }: { text: string; className?: string }) {
  const chars = Array.from(text);
  return (
    <span aria-label={text} className={className}>
      {chars.map((c, i) => (
        <span
          key={i}
          data-letter={c === " " ? " " : c}
          className="inline-block"
          style={{ whiteSpace: c === " " ? "pre" : "normal" }}
        >
          {c}
        </span>
      ))}
    </span>
  );
}
