import { describe, expect, it } from "vitest";

import { slugify } from "./slugify";

describe("slugify", () => {
  it("simplifies Turkish characters", () => {
    expect(slugify("Tek kapı: gateway")).toBe("tek-kapi-gateway");
    expect(slugify("Çok dilli ŞİŞLİ Öğütücü")).toBe("cok-dilli-sisli-ogutucu");
  });

  it("drops punctuation and extra dashes", () => {
    expect(slugify("  Better Auth, Clerk ya da düz JWT?  ")).toBe("better-auth-clerk-ya-da-duz-jwt");
  });
});
