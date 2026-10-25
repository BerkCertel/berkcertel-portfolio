import "server-only";

import fs from "node:fs";
import path from "node:path";

import { cacheLife } from "next/cache";

import type { AppLocale } from "@/i18n/routing";
import type { PostFrontmatter, PostMeta } from "@/types/blog";

import { isPublished } from "./publish-date";
import { slugify } from "./slugify";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

interface PostModule {
  default: React.ComponentType;
  metadata: PostFrontmatter;
}

const importPost = (locale: AppLocale, slug: string): Promise<PostModule> =>
  import(`../../content/blog/${locale}/${slug}.mdx`);

/** Slugs of every post of a locale, scheduled ones included (files in content/blog/{locale}). */
export function getAllSlugs(locale: AppLocale) {
  return fs
    .readdirSync(path.join(CONTENT_DIR, locale))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/**
 * Published posts of a locale (from content/blog/{locale}/*.mdx), newest first. Build/server only.
 * Posts dated in the future stay hidden everywhere (list, home, static params, language switch)
 * until their day; the daily cache lifetime makes them appear without a new deploy.
 */
export async function getAllPosts(locale: AppLocale): Promise<PostMeta[]> {
  "use cache";
  cacheLife("days");
  const posts = await Promise.all(
    getAllSlugs(locale).map(async (slug) => ({ ...(await importPost(locale, slug)).metadata, slug, locale })),
  );
  return posts
    .filter((post) => isPublished(post.date))
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** One post's metadata, or undefined for an unknown slug. */
export async function getPost(locale: AppLocale, slug: string) {
  return (await getAllPosts(locale)).find((post) => post.slug === slug);
}

/** Slug of the same post in the other language (linked by `translationKey`). */
export async function getAlternateSlug(translationKey: string, otherLocale: AppLocale) {
  return (await getAllPosts(otherLocale)).find((post) => post.translationKey === translationKey)
    ?.slug;
}

/** Slug → slug of the same post in the other language, for both directions (LanguageSwitch). */
export async function getTranslatedSlugs(): Promise<Record<string, string>> {
  const [tr, en] = await Promise.all([getAllPosts("tr"), getAllPosts("en")]);
  const pairs = tr.flatMap((post) => {
    const other = en.find((candidate) => candidate.translationKey === post.translationKey);
    return other ? [[post.slug, other.slug], [other.slug, post.slug]] : [];
  });
  return Object.fromEntries(pairs);
}

/** The MDX body of a known post (call getPost first; slugs come from the file list). */
export async function getPostContent(locale: AppLocale, slug: string) {
  return (await importPost(locale, slug)).default;
}

/** `##` headings of a post for the table of contents (ids match the MDX h2 anchors). */
export function getHeadings(locale: AppLocale, slug: string) {
  const source = fs.readFileSync(path.join(CONTENT_DIR, locale, `${slug}.mdx`), "utf8");
  // Ignore "## …" lines inside fenced code blocks.
  const prose = source.replace(/```[\s\S]*?```/g, "");
  return [...prose.matchAll(/^## (.+)$/gm)].map(([, text]) => ({
    id: slugify(text!.trim()),
    text: text!.trim(),
  }));
}
