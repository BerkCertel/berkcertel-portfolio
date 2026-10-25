import { expect, test } from "@playwright/test";

import { PAGES, turkishPosts } from "./pages";

const LOCALES = Object.keys(PAGES) as (keyof typeof PAGES)[];

test.describe("pages", () => {
  for (const locale of LOCALES) {
    for (const url of PAGES[locale]) {
      test(`${url} renders in ${locale}`, async ({ page }) => {
        const response = await page.goto(url);
        expect(response?.status()).toBe(200);
        await expect(page.locator("html")).toHaveAttribute("lang", locale);
        await expect(page.locator("h1")).toHaveCount(1);
      });
    }
  }

  test("a published blog post renders", async ({ page }) => {
    const [slug] = turkishPosts().published;
    test.skip(!slug, "no published post yet");
    const response = await page.goto(`/blog/${slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
  });
});

test("the language switch opens the same page in the other language", async ({ page }) => {
  await page.goto("/projeler");
  await page.getByRole("group", { name: "Dil" }).getByRole("button", { name: "en" }).click();
  await expect(page).toHaveURL(/\/en\/projects$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("the theme toggle switches .dark and keeps it after a reload", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const html = page.locator("html");
  await expect(html).not.toHaveClass(/\bdark\b/);

  await page.getByRole("button", { name: "Temayı değiştir" }).click();
  await expect(html).toHaveClass(/\bdark\b/);

  await page.reload();
  await expect(html).toHaveClass(/\bdark\b/);
});

test("the projects filter shows only mobile projects", async ({ page }) => {
  await page.goto("/projeler?filter=mobile");
  const projects = page.getByRole("main").getByRole("article");
  await expect(projects).toHaveCount(1);
  await expect(projects.getByRole("heading", { level: 2 })).toHaveText("Spotlight");
});

test("an unknown path shows the 404 page", async ({ page }) => {
  await page.goto("/boyle-bir-sayfa-yok");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("404");
});

test("a scheduled blog post shows the 404 page", async ({ page }) => {
  const [slug] = turkishPosts().scheduled;
  test.skip(!slug, "no scheduled post right now");
  await page.goto(`/blog/${slug}`);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("404");
  await expect(page.locator('meta[name="robots"][content*="noindex"]').first()).toBeAttached();
});
