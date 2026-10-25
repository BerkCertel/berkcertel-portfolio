import { useTranslations } from "next-intl";

import { AppButton } from "@/components/common/AppButton";
import { AppLink } from "@/components/common/AppLink";
import type { PostMeta } from "@/types/blog";

/** Dark "code tree" art of the featured post (the miChat repo layout, from the design). */
function CodeTreeArt() {
  return (
    <div
      aria-hidden="true"
      className="min-h-[300px] overflow-hidden rounded-2xl bg-deep p-7 font-mono text-sm leading-[1.8] whitespace-pre text-on-deep max-[760px]:min-h-[220px] max-[760px]:p-5 max-[760px]:text-xs"
    >
      <div className="text-deep-muted">{"// miChat-app"}</div>
      <div className="text-code-kw">apps/</div>
      <div>
        {"  web/ "}
        <span className="text-deep-muted">— Next.js</span>
      </div>
      <div>{"  server/"}</div>
      <div>
        {"    "}
        <span className="text-sun">api-gateway/</span>
      </div>
      <div>{"    user/ · chat/ · mail/"}</div>
      <div className="text-code-kw">packages/</div>
      <div>{"  auth/ · cache/ · database/"}</div>
      <div>
        <span className="text-code-kw">infra/</span> docker-compose.yaml
      </div>
    </div>
  );
}

/** Large card for the featured post: code-tree art + label, title, summary, "Read the post". */
export function FeaturedPost({ post }: { post: PostMeta }) {
  const t = useTranslations("blog");

  return (
    <AppLink
      href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
      className="group grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-stretch gap-10 rounded-3xl border border-line bg-surface p-10 max-[1080px]:grid-cols-1 max-[760px]:gap-6 max-[760px]:p-5"
    >
      <CodeTreeArt />
      <div className="flex flex-col justify-center gap-[18px]">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-[26px] items-center rounded-md bg-sunk px-2.5 font-mono text-xs font-medium text-subtle">
            {t("featured")}
          </span>
          <span className="eyebrow">
            {t(`categories.${post.category}`)} ·{" "}
            {t("readingTime", { minutes: post.readingMinutes })}
          </span>
        </div>
        <h2 className="font-display text-[clamp(30px,3.3vw,46px)] leading-[1.05] font-bold tracking-[-0.045em]">
          {post.title}
        </h2>
        <p className="text-subtle">{post.summary}</p>
        <AppButton asChild rightIcon="arrow" className="self-start">
          <span>{t("readPost")}</span>
        </AppButton>
      </div>
    </AppLink>
  );
}
