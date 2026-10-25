import "server-only";

import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { getPathname } from "@/i18n/navigation";
import { type AppLocale, routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/env.server";
import { OG_SIZE } from "@/lib/og";
import type { StaticPathname } from "@/lib/nav";

/** Internal href as next-intl understands it ("/about" or { pathname, params }). */
export type Href = Parameters<typeof getPathname>[0]["href"];

/** Pages with a title and description in messages.metadata.pages. */
export type SeoPage =
  | "home"
  | "about"
  | "projects"
  | "michat"
  | "blog"
  | "contact"
  | "services"
  | "privacy"
  | "cookies";

/** Open Graph locale names. */
export const OG_LOCALES: Record<AppLocale, string> = { tr: "tr_TR", en: "en_US" };

/** Absolute URL of an internal page in a locale, e.g. ("en", "/about") → https://berkcertel.com/en/about. */
export function absoluteUrl(locale: AppLocale, href: Href) {
  return new URL(getPathname({ href, locale }), siteUrl).toString();
}

/** hreflang map (tr, en, x-default → tr) for the locales a page exists in. */
export function languageAlternates(hrefs: Partial<Record<AppLocale, Href>>) {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    const href = hrefs[locale];
    if (href) languages[locale] = absoluteUrl(locale, href);
  }
  const fallback = hrefs[routing.defaultLocale];
  if (fallback) languages["x-default"] = absoluteUrl(routing.defaultLocale, fallback);
  return languages;
}

/**
 * Share image (opengraph-image / twitter-image route) under a localized page URL. Built by hand
 * because the generated URLs carry a "/tr" prefix that the proxy would redirect.
 */
function shareImage(pageUrl: string, file: "opengraph-image" | "twitter-image", alt: string) {
  return { url: `${pageUrl.replace(/\/$/, "")}/${file}`, ...OG_SIZE, alt };
}

interface BuildMetadataOptions {
  locale: AppLocale;
  /** Static page: title and description come from messages.metadata.pages[page]. */
  page?: SeoPage;
  /** Static pages have the same pathname in every locale. */
  pathname?: StaticPathname;
  /** Per-locale hrefs when they differ (blog posts have a localized slug); overrides `pathname`. */
  hrefs?: Partial<Record<AppLocale, Href>>;
  /** Overrides for pages whose copy is not in messages (blog posts). */
  title?: string;
  description?: string;
  type?: "website" | "article";
  /** ISO date of an article. */
  publishedTime?: string;
  /** The page has its own opengraph-image / twitter-image files (blog posts); else the site's. */
  ownImage?: boolean;
}

/**
 * Page metadata: title, description, canonical + hreflang, Open Graph and Twitter card.
 * Images: the site share image (src/app/[locale]/opengraph-image.tsx), or the page's own one.
 */
export async function buildMetadata({
  locale,
  page,
  pathname,
  hrefs = pathname && { tr: pathname, en: pathname },
  title: titleOverride,
  description: descriptionOverride,
  type = "website",
  publishedTime,
  ownImage = false,
}: BuildMetadataOptions): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const title = titleOverride ?? (page ? t(`pages.${page}.title`) : t("defaultTitle"));
  const description =
    descriptionOverride ?? (page ? t(`pages.${page}.description`) : t("description"));
  // The home title is already complete ("Berk Certel · Full-Stack Developer").
  const fullTitle = page === "home" ? title : t("titleTemplate").replace("%s", title);
  const url = hrefs?.[locale] && absoluteUrl(locale, hrefs[locale]);
  const imageBase = (ownImage && url) || absoluteUrl(locale, "/");

  return {
    title: page === "home" ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages: hrefs && languageAlternates(hrefs) },
    openGraph: {
      type,
      siteName: t("siteName"),
      title: fullTitle,
      description,
      url,
      locale: OG_LOCALES[locale],
      alternateLocale: routing.locales
        .filter((other) => other !== locale)
        .map((other) => OG_LOCALES[other]),
      images: shareImage(imageBase, "opengraph-image", fullTitle),
      ...(publishedTime && { publishedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: shareImage(imageBase, "twitter-image", fullTitle),
    },
    robots: { index: true, follow: true },
  };
}

/** generateMetadata of a static page in the current locale (copy from metadata.pages[page]). */
export async function pageMetadata(page: SeoPage, pathname: StaticPathname) {
  return buildMetadata({ locale: (await getLocale()) as AppLocale, page, pathname });
}
