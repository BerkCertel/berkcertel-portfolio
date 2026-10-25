import type { MetadataRoute } from "next";
import { cacheLife } from "next/cache";

import { PRIVACY_UPDATED } from "@/constants/site";
import { type AppLocale, routing } from "@/i18n/routing";
import { getAllPosts } from "@/lib/blog";
import type { StaticPathname } from "@/lib/nav";
import { absoluteUrl, type Href, languageAlternates } from "@/lib/seo";

/** Static pages in the sitemap (both languages each). */
const PAGES: StaticPathname[] = [
  "/",
  "/about",
  "/projects",
  "/projects/michat",
  "/services",
  "/blog",
  "/contact",
  "/privacy",
];

/** Every page and published post in both languages, with hreflang alternates. Refreshed daily. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  cacheLife("days");

  const pages = routing.locales.flatMap((locale) =>
    PAGES.map((pathname) => ({
      url: absoluteUrl(locale, pathname),
      alternates: { languages: languageAlternates({ tr: pathname, en: pathname }) },
      // The privacy notice is indexable but not a page worth promoting.
      ...(pathname === "/privacy" && { lastModified: PRIVACY_UPDATED, priority: 0.3 }),
    })),
  );

  // Scheduled posts are already left out by getAllPosts.
  const postsByLocale = await Promise.all(routing.locales.map((locale) => getAllPosts(locale)));
  const allPosts = postsByLocale.flat();
  const posts = allPosts.map((post) => {
    const hrefs: Partial<Record<AppLocale, Href>> = {};
    for (const translation of allPosts.filter((p) => p.translationKey === post.translationKey)) {
      hrefs[translation.locale] = { pathname: "/blog/[slug]", params: { slug: translation.slug } };
    }
    return {
      url: absoluteUrl(post.locale, { pathname: "/blog/[slug]", params: { slug: post.slug } }),
      lastModified: post.date,
      alternates: { languages: languageAlternates(hrefs) },
    };
  });

  return [...pages, ...posts];
}
