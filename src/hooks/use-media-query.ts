"use client";

import { useSyncExternalStore } from "react";

/**
 * Live `matchMedia` result. On the server and during hydration it returns `serverValue`
 * (`false` by default; pass `null` to tell "not known yet" apart from "no match").
 */
export function useMediaQuery<T extends boolean | null = false>(query: string, serverValue?: T) {
  return useSyncExternalStore<boolean | T>(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => (serverValue === undefined ? false : serverValue) as T,
  );
}
