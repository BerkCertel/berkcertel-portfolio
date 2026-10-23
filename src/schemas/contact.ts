import { z } from "zod";

import { CONTACT_LIMITS, CONTACT_SUBJECTS, CONTACT_TIMELINES } from "@/constants/contact";
import type messages from "../../messages/tr.json";

/** Error messages are keys of `contact.errors`; the client translates them. */
export type ContactErrorKey = keyof (typeof messages)["contact"]["errors"];

const error = (key: ContactErrorKey) => ({ error: key });

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, error("nameRequired"))
    .max(CONTACT_LIMITS.nameMax, error("nameRequired")),
  email: z.email(error("emailInvalid")),
  subject: z.enum(CONTACT_SUBJECTS, error("generic")),
  timeline: z.enum(CONTACT_TIMELINES, error("generic")),
  message: z
    .string()
    .trim()
    .min(CONTACT_LIMITS.messageMin, error("messageShort"))
    .max(CONTACT_LIMITS.messageMax, error("messageLong")),
  turnstileToken: z.string().min(1, error("turnstile")),
  /** Honeypot: hidden from people, so it must stay empty. */
  website: z.string().max(0, error("generic")),
});

export type ContactInput = z.infer<typeof contactSchema>;
