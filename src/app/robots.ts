import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/env.server";

/** Everything is crawlable; points to the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
    host: siteUrl,
  };
}
