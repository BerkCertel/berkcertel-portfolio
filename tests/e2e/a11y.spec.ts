import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { PAGES } from "./pages";

// Reduced motion: entrance animations are off, so axe sees the final colors and states.
test.use({ reducedMotion: "reduce" });

for (const url of [...PAGES.tr, ...PAGES.en]) {
  test(`${url} has no serious accessibility violations`, async ({ page }) => {
    await page.goto(url);
    const results = await new AxeBuilder({ page })
      // Third-party spam-check widget (Cloudflare Turnstile) is outside this site's control.
      .exclude('iframe[src*="challenges.cloudflare.com"]')
      .analyze();

    const serious = results.violations
      .filter((violation) => violation.impact === "serious" || violation.impact === "critical")
      .map(
        (violation) => `${violation.id}: ${violation.nodes.map((node) => node.target).join(", ")}`,
      );
    expect(serious).toEqual([]);
  });
}
