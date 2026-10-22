import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

import { routing } from "./src/i18n/routing";

// First path segments that must never be rewritten to the default locale.
const RESERVED_SEGMENTS = [...routing.locales, "_next", "api"].join("|");

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // app/global-not-found.tsx: the root layout lives under [locale], so unmatched URLs need it.
    globalNotFound: true,
  },
  async rewrites() {
    return {
      // Missing file-like URLs (e.g. /foo.png) skip the proxy and would match [locale] with an
      // invalid locale. afterFiles runs after public/ and static app files are served, so only
      // truly missing files land here; they go to the localized catch-all 404 instead.
      afterFiles: [
        {
          source: `/:path((?!(?:${RESERVED_SEGMENTS})(?:/|$)).*\\..*)`,
          destination: `/${routing.defaultLocale}/:path`,
        },
      ],
    };
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
