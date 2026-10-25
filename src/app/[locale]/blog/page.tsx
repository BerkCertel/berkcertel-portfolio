import { getLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";

import { Container } from "@/components/common/Container";
import { PageHeader } from "@/components/common/PageHeader";
import { BlogBrowser, parseBlogFilter } from "@/components/sections/blog/BlogBrowser";
import { DeviceSync } from "@/components/sections/blog/DeviceSync";
import type { AppLocale } from "@/i18n/routing";
import { getAllPosts } from "@/lib/blog";
import type { PostMeta } from "@/types/blog";
import { pageMetadata } from "@/lib/seo";

export const generateMetadata = () => pageMetadata("blog", "/blog");

interface BlogPageProps {
  searchParams: Promise<{ category?: string | string[] }>;
}

/** Reads `?category=` per request; kept inside <Suspense> so the rest of the page stays static. */
async function FilteredPosts({ posts, searchParams }: BlogPageProps & { posts: PostMeta[] }) {
  const { category } = await searchParams;
  return <BlogBrowser posts={posts} filter={parseBlogFilter(category)} />;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const t = await getTranslations("blog");
  const posts = await getAllPosts((await getLocale()) as AppLocale);

  return (
    <Container>
      <PageHeader id="blog-title" title={t("title")} lead={t("pageLead")} visual={<DeviceSync />} />
      {/* Static fallback = every post, so crawlers and no-JS visitors see the full list. */}
      <Suspense fallback={<BlogBrowser posts={posts} filter="all" />}>
        <FilteredPosts posts={posts} searchParams={searchParams} />
      </Suspense>
    </Container>
  );
}
