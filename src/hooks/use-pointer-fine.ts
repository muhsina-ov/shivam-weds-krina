import { useSyncExternalStore } from "react";

/**
 * `true` only on devices with a fine pointer (mouse / trackpad) and hover.
 * Used to gate cursor-driven effects so they don't appear on touch screens.
 */
export function usePointerFine(): boolean {
  return useSyncExternalStore(
    (cb) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia("(pointer: fine) and (hover: hover)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => {
      if (typeof window === "undefined") return false;
      return window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    },
    () => false,
  );
}
