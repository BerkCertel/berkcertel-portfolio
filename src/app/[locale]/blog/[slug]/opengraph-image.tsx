import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

import { SITE } from "@/constants/site";
import type { AppLocale } from "@/i18n/routing";
import { getPost } from "@/lib/blog";
import { env } from "@/lib/env";
import { loadDisplayFont, OG_COLORS, OG_SIZE, OgMark, siteHost } from "@/lib/og";

export const alt = SITE.name;
export const size = OG_SIZE;
export const contentType = "image/png";

/** Share image of a post: category, title, author and address. Scheduled posts have none. */
export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getPost(locale as AppLocale, slug);
  if (!post) notFound();

  const t = await getTranslations({ locale: locale as AppLocale, namespace: "blog" });
  // Locale-aware uppercase: "Mühendislik" → "MÜHENDİSLİK" in Turkish.
  const category = t(`categories.${post.category}`).toLocaleUpperCase(locale);
  const host = siteHost(env.NEXT_PUBLIC_SITE_URL);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: OG_COLORS.bg,
        color: OG_COLORS.ink,
        fontFamily: "Bricolage",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <OgMark size={64} />
        <div
          style={{
            fontSize: 30,
            color: OG_COLORS.brand,

            letterSpacing: 2,
          }}
        >
          {category}
        </div>
      </div>
      <div style={{ fontSize: 72, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>
        {post.title}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 28,
          color: OG_COLORS.muted,
        }}
      >
        <span>{SITE.name}</span>
        <span>{host}</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Bricolage",
          data: await loadDisplayFont(`${category}${post.title}${SITE.name}${host}`),
          weight: 700,
        },
      ],
    },
  );
}
