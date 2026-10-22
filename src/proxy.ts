import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Everything except /api, Next.js internals and files with an extension (e.g. favicon.ico).
  // Paths containing a dot skip locale routing, so page slugs must not contain dots.
  matcher: "/((?!api(?:/|$)|_next/|_vercel/|.*\\..*).*)",
};
