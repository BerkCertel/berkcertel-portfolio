"use client";

import { useLayoutEffect } from "react";

import { applyTheme, THEME_SCRIPT } from "@/lib/theme";

/**
 * Pre-paint theme script for the root layout.
 *
 * - Server HTML: a normal inline script, so `.dark` / `.js` are set before first paint.
 * - Client render (e.g. the root layout remounting on a locale switch, or a dev 404): a script
 *   created by React never executes, and React rewrites <html className>, dropping `.dark` / `.js`.
 *   So it renders an inert `type="text/plain"` block (React only warns about executable scripts)
 *   and re-applies the theme in a layout effect, still before paint.
 */
export function ThemeScript() {
  const isServer = typeof window === "undefined";

  useLayoutEffect(() => {
    applyTheme();
  }, []);

  return (
    <script
      // `type` differs between server and client on purpose; see above.
      type={isServer ? undefined : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }}
    />
  );
}
