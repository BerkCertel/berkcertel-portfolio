import "server-only";

import { SITE } from "@/constants/site";
import { ALL_SOCIALS, SOCIALS } from "@/constants/socials";
import type { AppLocale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { env } from "@/lib/env";
import type { PostMeta } from "@/types/blog";

import { absoluteUrl, type Href } from "./seo";

// schema.org builders for the JsonLd component. Values come from constants and posts, never from
// user input.

/** Main technologies for Person.knowsAbout. */
const KNOWS_ABOUT = ["Next.js", "React", "React Native", "Node.js", "TypeScript", "PostgreSQL"];

/** Berk as a schema.org Person (also the author of every post). */
export function personSchema() {
  return {
    "@type": "Person",
    name: SITE.fullName,
    alternateName: SITE.name,
    jobTitle: SITE.jobTitle,
    url: env.NEXT_PUBLIC_SITE_URL,
    email: SITE.email,
    sameAs: ALL_SOCIALS.map((key) => SOCIALS[key].href),
    worksFor: { "@type": "Organization", name: "ROCR Digital" },
    knowsAbout: KNOWS_ABOUT,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.location.city,
      addressCountry: "TR",
    },
  };
}

/** Home page: the person and the bilingual website. */
export function homeSchema(locale: AppLocale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personSchema(),
      {
        "@type": "WebSite",
        name: SITE.name,
        url: absoluteUrl(locale, "/"),
        inLanguage: [...routing.locales],
      },
    ],
  };
}

/** A blog post with its author. */
export function blogPostingSchema(post: PostMeta) {
  const url = absoluteUrl(post.locale, { pathname: "/blog/[slug]", params: { slug: post.slug } });
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    author: personSchema(),
    inLanguage: post.locale,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

/** Breadcrumb trail of an inner page; the current page (last item) has no link. */
export function breadcrumbSchema(locale: AppLocale, items: { label: string; href?: Href }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href && { item: absoluteUrl(locale, item.href) }),
    })),
  };
}

/** miChat's public repository; the app is still in development. */
export function michatSchema(locale: AppLocale, description: string, repository: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: "miChat",
    description,
    url: absoluteUrl(locale, "/projects/michat"),
    codeRepository: repository,
    programmingLanguage: "TypeScript",
    creativeWorkStatus: "In progress",
    author: personSchema(),
  };
}
