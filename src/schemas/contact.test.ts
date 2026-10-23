import { describe, expect, it } from "vitest";

import { contactSchema } from "./contact";

const valid = {
  name: "Ayşe",
  email: "ayse@example.com",
  subject: "webApp",
  timeline: "asap",
  message: "Merhaba, bir proje için yazıyorum.",
  turnstileToken: "token",
  website: "",
};

const errorsOf = (input: object) => {
  const result = contactSchema.safeParse(input);
  return result.success ? [] : result.error.issues.map((issue) => issue.message);
};

describe("contactSchema", () => {
  it("accepts a valid message", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("returns translation keys for invalid fields", () => {
    expect(errorsOf({ ...valid, name: "  " })).toEqual(["nameRequired"]);
    expect(errorsOf({ ...valid, email: "not-an-email" })).toEqual(["emailInvalid"]);
    expect(errorsOf({ ...valid, message: "short" })).toEqual(["messageShort"]);
    expect(errorsOf({ ...valid, message: "x".repeat(2001) })).toEqual(["messageLong"]);
    expect(errorsOf({ ...valid, turnstileToken: "" })).toEqual(["turnstile"]);
  });

  it("rejects unknown subjects and timelines", () => {
    expect(contactSchema.safeParse({ ...valid, subject: "spam" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, timeline: "never" }).success).toBe(false);
  });

  it("rejects a filled honeypot", () => {
    expect(contactSchema.safeParse({ ...valid, website: "https://spam.example" }).success).toBe(
      false,
    );
  });
});
