import type { AppLocale } from "@/i18n/routing";

export type BlogCategory = "engineering" | "guides" | "tourism";

/** Exported as `metadata` from every MDX post in content/blog/{locale}/{slug}.mdx */
export interface PostFrontmatter {
  title: string;
  summary: string;
  category: BlogCategory;
  /** ISO date, e.g. "2026-11-01". */
  date: string;
  readingMinutes: number;
  featured?: boolean;
  /** Same id in both languages; links the TR and EN versions of a post. */
  translationKey: string;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  locale: AppLocale;
}
