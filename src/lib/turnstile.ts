import "server-only";

import { getTurnstileSecret } from "./env.server";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** Verifies a Turnstile token with Cloudflare. Any network or API failure counts as "not human". */
export async function verifyTurnstile(token: string, remoteIp?: string) {
  const body = new URLSearchParams({ secret: getTurnstileSecret(), response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const response = await fetch(VERIFY_URL, { method: "POST", body });
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch {
    return false;
  }
}
