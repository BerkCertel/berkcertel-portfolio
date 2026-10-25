import type { BlogCategory } from "@/types/blog";

/** Category chips on the blog page ("all" + every category). */
export const BLOG_FILTERS: ("all" | BlogCategory)[] = ["all", "engineering", "guides", "tourism"];

/** Number of posts in the home preview and in "more posts" under an article. */
export const BLOG_PREVIEW_COUNT = 3;
