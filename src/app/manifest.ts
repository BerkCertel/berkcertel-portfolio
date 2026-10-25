import type { MetadataRoute } from "next";

import { getTranslations } from "next-intl/server";

import { SITE } from "@/constants/site";
import { routing } from "@/i18n/routing";

/** PWA manifest (default language copy; colors are the light theme background). */
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations({ locale: routing.defaultLocale, namespace: "metadata" });

  return {
    name: t("defaultTitle"),
    short_name: SITE.name,
    description: t("description"),
    start_url: "/",
    display: "standalone",
    background_color: "#F1F3F6",
    theme_color: "#F1F3F6",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
