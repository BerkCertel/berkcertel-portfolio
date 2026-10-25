import type { MetadataRoute } from "next";

import { env } from "@/lib/env";

/** Everything is crawlable; points to the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", env.NEXT_PUBLIC_SITE_URL).toString(),
    host: env.NEXT_PUBLIC_SITE_URL,
  };
}
