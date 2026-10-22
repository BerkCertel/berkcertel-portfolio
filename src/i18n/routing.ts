import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  // TR lives at "/", EN at "/en"
  localePrefix: "as-needed",
  // The URL alone decides the language (no Accept-Language / cookie redirects);
  // it only changes through the TR / EN switch.
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/about": { tr: "/hakkimda", en: "/about" },
    "/projects": { tr: "/projeler", en: "/projects" },
    "/projects/michat": { tr: "/projeler/michat", en: "/projects/michat" },
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/contact": { tr: "/iletisim", en: "/contact" },
    "/services": { tr: "/hizmetler", en: "/services" },
    "/privacy": { tr: "/gizlilik", en: "/privacy" },
  },
});

export type AppLocale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
