import { useTranslations } from "next-intl";

import { AppLink } from "@/components/common/AppLink";
import { ArrowIcon } from "@/components/common/icons";
import { cn } from "@/lib/utils";
import type { PostMeta } from "@/types/blog";

/** Post teaser: category, reading time, title, summary, "Read the post →". */
export function PostCard({
  post,
  className,
  style,
}: {
  post: PostMeta;
  className?: string;
  style?: React.CSSProperties;
}) {
  const t = useTranslations("blog");

  return (
    <AppLink
      href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
      style={style}
      className={cn(
        "group flex min-h-[260px] flex-col gap-4 rounded-[20px] border border-line bg-surface p-[26px] transition-[transform,border-color] duration-500 ease-out-soft hover:transform-[translateY(-4px)] hover:border-ink max-[760px]:min-h-0",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="eyebrow">{t(`categories.${post.category}`)}</span>
        <span className="font-mono text-xs text-subtle">
          {t("readingTime", { minutes: post.readingMinutes })}
        </span>
      </div>
      <h3 className="font-display text-[26px] leading-[1.1] font-bold tracking-[-0.035em] text-balance">
        {post.title}
      </h3>
      <p className="text-[15px] text-subtle">{post.summary}</p>
      <span className="mt-auto flex items-center gap-2 text-sm font-medium">
        {t("readPost")}
        <ArrowIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </AppLink>
  );
}
