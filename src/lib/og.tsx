import "server-only";

import { cacheLife } from "next/cache";

// Shared pieces of the generated Open Graph images (1200×630, dark).

export const OG_SIZE = { width: 1200, height: 630 };

/** Image colors: ImageResponse cannot read CSS variables, so these mirror the dark theme tokens. */
export const OG_COLORS = {
  bg: "#070A12",
  ink: "#E8ECF6",
  muted: "#9AA3B8",
  brand: "#8096FF",
  sun: "#FFD05C",
  line: "#212A3C",
};

/**
 * Bricolage Grotesque (700) from Google Fonts, subset to `text`. The CSS API serves a TTF to
 * clients without a modern user agent, which is what ImageResponse needs.
 */
export async function loadDisplayFont(text: string) {
  "use cache";
  cacheLife("max");
  const query = new URLSearchParams({ family: "Bricolage Grotesque:wght@700", text });
  const css = await fetch(`https://fonts.googleapis.com/css2?${query}`).then((res) => res.text());
  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error("Could not load Bricolage Grotesque for the OG image");
  return fetch(url).then((res) => res.arrayBuffer());
}

/** The three-layer logo mark (same paths as public/brand/mark-dark.svg). */
export function OgMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <path d="M3 21.5L5.6 20.2L16 25.4L26.4 20.2L29 21.5L16 28Z" fill={OG_COLORS.ink} />
      <path d="M3 15.5L5.6 14.2L16 19.4L26.4 14.2L29 15.5L16 22Z" fill={OG_COLORS.ink} />
      <path d="M16 3L29 9.5L16 16L3 9.5Z" fill={OG_COLORS.brand} />
    </svg>
  );
}

/** Site address shown at the bottom of the images, e.g. "berkcertel.com". */
export const siteHost = (siteUrl: string) => new URL(siteUrl).host;
