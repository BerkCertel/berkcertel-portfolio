import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 } });

test("the mobile menu opens and closes with Escape", async ({ page }) => {
  await page.goto("/");
  const burger = page.getByRole("button", { name: "Menüyü aç" });
  await burger.click();

  const menu = page.getByRole("navigation", { name: "Mobil menü" });
  await expect(menu).toBeVisible();
  await expect(page.getByRole("button", { name: "Menüyü kapat" })).toHaveAttribute(
    "aria-expanded",
    "true",
  );

  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  // Focus returns to the burger.
  await expect(page.getByRole("button", { name: "Menüyü aç" })).toBeFocused();
});
