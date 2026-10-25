import { useTranslations } from "next-intl";

import { BLOG_FILTERS } from "@/constants/blog";
import type { PostMeta } from "@/types/blog";

import { BlogFilters } from "./BlogFilters";
import { FeaturedPost } from "./FeaturedPost";
import { PostGrid } from "./PostGrid";

type BlogFilter = (typeof BLOG_FILTERS)[number];

/** Unknown or missing `?category=` values fall back to "all". */
export function parseBlogFilter(value: string | string[] | undefined): BlogFilter {
  return BLOG_FILTERS.find((filter) => filter === value) ?? "all";
}

/** Category chips, the featured post and the grid of the other posts in that category. */
export function BlogBrowser({ posts, filter }: { posts: PostMeta[]; filter: BlogFilter }) {
  const t = useTranslations("blog");
  const visible = filter === "all" ? posts : posts.filter((post) => post.category === filter);
  const featured = visible.find((post) => post.featured);
  const rest = visible.filter((post) => post !== featured);

  return (
    <>
      <div className="mt-10">
        <BlogFilters active={filter} />
      </div>
      <div className="flex flex-col gap-10 pt-12 pb-30 max-[760px]:pb-20">
        {featured && <FeaturedPost post={featured} />}
        {rest.length > 0 && <PostGrid posts={rest} />}
        {visible.length === 0 && <p className="text-subtle">{t("empty")}</p>}
      </div>
    </>
  );
}
