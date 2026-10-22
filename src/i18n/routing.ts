import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  // TR lives at "/", EN at "/en"
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/about": { tr: "/hakkimda", en: "/about" },
    "/projects": { tr: "/projeler", en: "/projects" },
    "/projects/michat": { tr: "/projeler/michat", en: "/projects/michat" },
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/contact": { tr: "/iletisim", en: "/contact" },
  },
});

export type AppLocale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
