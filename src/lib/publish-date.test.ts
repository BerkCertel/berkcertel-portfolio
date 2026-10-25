import { describe, expect, it } from "vitest";

import { isPublished, todayInTurkey } from "./publish-date";

describe("todayInTurkey", () => {
  it("uses the Istanbul date, not UTC", () => {
    // 22:30 UTC on Oct 31 is already Nov 1 in Istanbul (UTC+3).
    expect(todayInTurkey(new Date("2026-10-31T22:30:00Z"))).toBe("2026-11-01");
    expect(todayInTurkey(new Date("2026-10-31T20:30:00Z"))).toBe("2026-10-31");
  });
});

describe("isPublished", () => {
  const now = new Date("2026-11-08T09:00:00Z");

  it("publishes posts dated today or earlier", () => {
    expect(isPublished("2026-11-01", now)).toBe(true);
    expect(isPublished("2026-11-08", now)).toBe(true);
  });

  it("hides posts dated in the future", () => {
    expect(isPublished("2026-11-09", now)).toBe(false);
  });
});
