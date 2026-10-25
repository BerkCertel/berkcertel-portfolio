import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

import { SITE } from "@/constants/site";
import type { AppLocale } from "@/i18n/routing";
import { env } from "@/lib/env";
import { loadDisplayFont, OG_COLORS, OG_SIZE, OgMark, siteHost } from "@/lib/og";

export const alt = `${SITE.name} · ${SITE.jobTitle}`;
export const size = OG_SIZE;
export const contentType = "image/png";

/** Site-wide share image: logo, name, job title, the hero line in the page language, address. */
export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as AppLocale, namespace: "hero" });
  // The hero line marks a phrase with <mark>; the image shows it as plain text.
  const lead = t.markup("lead", { mark: (chunks) => chunks });
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
      <OgMark size={88} />
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 108, lineHeight: 1, letterSpacing: -4 }}>{SITE.name}</div>
        <div style={{ fontSize: 44, color: OG_COLORS.brand }}>{SITE.jobTitle}</div>
        <div style={{ fontSize: 32, color: OG_COLORS.muted, maxWidth: 900 }}>{lead}</div>
      </div>
      <div style={{ fontSize: 28, color: OG_COLORS.muted }}>{host}</div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Bricolage",
          data: await loadDisplayFont(`${SITE.name}${SITE.jobTitle}${lead}${host}`),
          weight: 700,
        },
      ],
    },
  );
}
