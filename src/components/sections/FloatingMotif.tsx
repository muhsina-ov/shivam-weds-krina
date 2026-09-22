import frameAsset from "@/assets/r1.png.asset.json";

/**
 * A small https://media.invitestory.in/diya-haveli/r1.png thumbnail drifting in the bottom-right of the section.
 * Pure CSS — uses the existing `float-slow` keyframe from styles.css.
 */
export function FloatingMotif() {
  return (
    <img
      src={frameAsset.url}
      alt=""
      aria-hidden
      className="float-slow pointer-events-none absolute bottom-12 right-6 h-16 w-16 rounded-full object-cover opacity-50 ring-1 ring-gold/30 sm:h-20 sm:w-20"
    />
  );
}
