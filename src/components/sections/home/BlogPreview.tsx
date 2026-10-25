import { getLocale, getTranslations } from "next-intl/server";

import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { PostGrid } from "@/components/sections/blog/PostGrid";
import { BLOG_PREVIEW_COUNT } from "@/constants/blog";
import type { AppLocale } from "@/i18n/routing";
import { getAllPosts } from "@/lib/blog";

/** Home "Blog" section: heading + "All posts →" and the newest posts; hidden while none is live. */
export async function BlogPreview() {
  const t = await getTranslations("blog");
  const posts = (await getAllPosts((await getLocale()) as AppLocale)).slice(0, BLOG_PREVIEW_COUNT);

  if (posts.length === 0) return null;

  return (
    <Section aria-labelledby="blog-title">
      <Container>
        <SectionHeading
          id="blog-title"
          title={t("title")}
          link={{ href: "/blog", label: t("viewAll") }}
        />
        <PostGrid posts={posts} />
      </Container>
    </Section>
  );
}
