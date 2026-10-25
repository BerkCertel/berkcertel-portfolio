"use server";

import { headers } from "next/headers";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";

import { PRIVACY_UPDATED, SITE_TIME_ZONE } from "@/constants/site";
import { routing } from "@/i18n/routing";
import { sendContactMail } from "@/lib/mail";
import { verifyTurnstile } from "@/lib/turnstile";
import { contactSchema, type ContactErrorKey } from "@/schemas/contact";

export type ContactResult = { ok: true } | { ok: false; error: ContactErrorKey };

/** Client IP for Turnstile (first entry of the proxy chain). */
async function getClientIp() {
  const list = await headers();
  return (
    list.get("cf-connecting-ip") ??
    list.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    list.get("x-real-ip") ??
    undefined
  );
}

/**
 * Contact form Server Action: re-validates the input, silently "succeeds" for bots that fill the
 * honeypot, verifies Turnstile, then emails the owner. Never returns or logs secrets.
 */
export async function sendContact(input: unknown, locale: string): Promise<ContactResult> {
  // Honeypot first: bots get a normal-looking success and nothing is sent.
  if (typeof input === "object" && input && "website" in input && input.website) {
    return { ok: true };
  }

  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: (parsed.error.issues[0]?.message as ContactErrorKey) ?? "generic" };
  }
  const data = parsed.data;

  if (!(await verifyTurnstile(data.turnstileToken, await getClientIp()))) {
    return { ok: false, error: "turnstile" };
  }

  try {
    // The mail is for the owner, so it is written in the default language.
    const t = await getTranslations({ locale: routing.defaultLocale, namespace: "contact" });
    const senderLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
    const subject = t(`form.subjects.${data.subject}`);

    await sendContactMail({
      subject: `[berkcertel.com] ${t("mail.subjectPrefix")}: ${subject} — ${data.name}`,
      replyTo: data.email,
      fields: [
        { label: t("form.name"), value: data.name },
        { label: t("form.email"), value: data.email },
        { label: t("form.subject"), value: subject },
        { label: t("form.timeline"), value: t(`form.timelines.${data.timeline}`) },
        { label: t("mail.language"), value: senderLocale.toUpperCase() },
      ],
      message: { label: t("form.message"), value: data.message },
      // Record of the explicit consent (the schema only lets the form through when it is given).
      footer: t("mail.consentLine", {
        date: new Intl.DateTimeFormat("tr-TR", {
          dateStyle: "short",
          timeStyle: "short",
          timeZone: SITE_TIME_ZONE,
        }).format(new Date()),
        version: PRIVACY_UPDATED,
      }),
    });
    return { ok: true };
  } catch {
    // Deliberately no details: SMTP errors can contain credentials or server info.
    return { ok: false, error: "generic" };
  }
}
