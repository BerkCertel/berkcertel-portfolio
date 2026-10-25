import "server-only";

import { z } from "zod";

import { emptyToUndefined } from "./env";

/**
 * Server-only secrets. Everything is optional at load time so `next build` works without them;
 * the getters below enforce the values only when mail is actually sent / a token is verified.
 * Values that ARE set must still be well-formed.
 */
const serverEnvSchema = z.object({
  /** Site URL without trailing slash (canonical URLs, hreflang, sitemap, Open Graph). */
  SITE_URL: z.preprocess(emptyToUndefined, z.url().default("https://berkcertel.com")),
  SMTP_HOST: z.preprocess(emptyToUndefined, z.string().default("smtp.gmail.com")),
  SMTP_PORT: z.preprocess(emptyToUndefined, z.coerce.number().int().positive().default(465)),
  SMTP_SECURE: z.preprocess(emptyToUndefined, z.stringbool().default(true)),
  SMTP_USER: z.preprocess(emptyToUndefined, z.email().optional()),
  SMTP_PASS: z.preprocess(emptyToUndefined, z.string().optional()),
  CONTACT_TO_EMAIL: z.preprocess(emptyToUndefined, z.email().optional()),
  TURNSTILE_SECRET_KEY: z.preprocess(emptyToUndefined, z.string().optional()),
});

const serverEnv = serverEnvSchema.parse(process.env);

/** Site URL, e.g. "https://berkcertel.com" (server only; defaults to the live address). */
export const siteUrl = serverEnv.SITE_URL;

/** Reads a value that is optional at build time but required at runtime. */
function required<K extends keyof typeof serverEnv>(key: K): NonNullable<(typeof serverEnv)[K]> {
  const value = serverEnv[key];
  if (value === undefined) throw new Error(`Missing environment variable: ${key}`);
  return value as NonNullable<(typeof serverEnv)[K]>;
}

/** SMTP settings + recipient for the contact form. Throws if a required value is missing. */
export function getMailEnv() {
  return {
    host: serverEnv.SMTP_HOST,
    port: serverEnv.SMTP_PORT,
    secure: serverEnv.SMTP_SECURE,
    user: required("SMTP_USER"),
    pass: required("SMTP_PASS"),
    to: required("CONTACT_TO_EMAIL"),
  };
}

/** Cloudflare Turnstile secret for server-side token verification. */
export function getTurnstileSecret() {
  return required("TURNSTILE_SECRET_KEY");
}
