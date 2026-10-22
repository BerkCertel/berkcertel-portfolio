import { z } from "zod";

/** Treats empty values (`KEY=` in .env files) as "not set" so defaults and optionals apply. */
export const emptyToUndefined = (value: unknown) => (value === "" ? undefined : value);

const publicEnvSchema = z.object({
  /** Public site URL without trailing slash (canonical URLs, sitemap, Open Graph). */
  NEXT_PUBLIC_SITE_URL: z.preprocess(emptyToUndefined, z.url().default("https://berkcertel.com")),
  /** Required by the contact form widget; checked where it is used so the build never breaks. */
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.preprocess(emptyToUndefined, z.string().optional()),
  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: z.preprocess(emptyToUndefined, z.string().optional()),
});

/**
 * Public (client-safe) environment variables.
 * Each NEXT_PUBLIC_* value is referenced explicitly because Next.js inlines them at build time.
 * Server-only secrets live in `env.server.ts`.
 */
export const env = publicEnvSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
});
