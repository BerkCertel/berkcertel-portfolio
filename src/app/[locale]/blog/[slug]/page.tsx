import { notFound } from "next/navigation";
import { getFormatter, getLocale, getTranslations } from "next-intl/server";

import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Container } from "@/components/common/Container";
import { PostGrid } from "@/components/sections/blog/PostGrid";
import { TableOfContents } from "@/components/sections/blog/TableOfContents";
import { BLOG_PREVIEW_COUNT } from "@/constants/blog";
import type { AppLocale } from "@/i18n/routing";
import { getAllPosts, getHeadings, getPost, getPostContent } from "@/lib/blog";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

/** Every post of each locale, under its own (localized) slug. */
export async function generateStaticParams({ params }: { params: { locale: string } }) {
  return (await getAllPosts(params.locale as AppLocale)).map(({ slug }) => ({ slug }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const locale = (await getLocale()) as AppLocale;
  const post = await getPost(locale, slug);
  if (!post) notFound();

  const [t, format, Content, allPosts] = await Promise.all([
    getTranslations(),
    getFormatter(),
    getPostContent(locale, slug),
    getAllPosts(locale),
  ]);
  const headings = getHeadings(locale, slug);
  const others = allPosts.filter((other) => other.slug !== slug).slice(0, BLOG_PREVIEW_COUNT);

  return (
    <>
      <article>
        <Container>
          <header className="flex max-w-[900px] flex-col gap-6 pt-16 pb-12 max-[760px]:pt-10 max-[760px]:pb-8">
            <Breadcrumb
              items={[
                { label: t("common.home"), href: "/" },
                { label: t("blog.title"), href: "/blog" },
                { label: t(`blog.categories.${post.category}`) },
              ]}
            />
            <h1 className="font-display text-[clamp(42px,6.4vw,84px)] leading-[0.98] font-bold tracking-[-0.045em] text-balance">
              {post.title}
            </h1>
            <p className="max-w-[60ch] text-[19px] leading-[1.55] text-subtle max-[760px]:text-[17px]">
              {post.summary}
            </p>
            <p className="flex flex-wrap items-center gap-[18px] font-mono text-[13px] leading-none font-medium text-subtle">
              <span>Berk Certel</span>
              <span aria-hidden="true">·</span>
              <span>{t("blog.readingTimeLong", { minutes: post.readingMinutes })}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>
                {format.dateTime(new Date(post.date), { dateStyle: "long" })}
              </time>
            </p>
          </header>
          <div className="grid grid-cols-[220px_minmax(0,1fr)] gap-18 border-t border-line pt-14 pb-24 max-[1080px]:grid-cols-1 max-[760px]:pt-10 max-[760px]:pb-16">
            <TableOfContents headings={headings} />
            <div className="flex max-w-[68ch] flex-col gap-[22px] text-[19px] leading-[1.7] max-[760px]:text-[17px]">
              <Content />
              <hr className="mt-6 border-line" />
              <div className="flex flex-col gap-1">
                <span className="eyebrow">{t("blog.writtenBy")}</span>
                <span className="font-semibold">{t("blog.authorLine")}</span>
              </div>
            </div>
          </div>
        </Container>
      </article>
      {others.length > 0 && (
        <section aria-labelledby="more-posts-title" className="pb-30 max-[760px]:pb-20">
          <Container>
            <h2
              id="more-posts-title"
              className="mb-8 font-display text-[40px] leading-none font-bold tracking-[-0.045em]"
            >
              {t("blog.morePosts")}
            </h2>
            <PostGrid posts={others} />
          </Container>
        </section>
      )}
    </>
  );
}
