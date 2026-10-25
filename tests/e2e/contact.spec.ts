import { expect, test } from "@playwright/test";

// Client-side validation only: these tests never reach the Server Action, so no mail is sent.

test("an empty form shows the field errors", async ({ page }) => {
  await page.goto("/iletisim");
  await page.getByRole("button", { name: "Mesajı gönder" }).click();

  await expect(page.getByText("Adını yaz.")).toBeVisible();
  await expect(page.getByText("Geçerli bir e-posta adresi yaz.")).toBeVisible();
  await expect(page.getByText("Mesaj en az 10 karakter olmalı.")).toBeVisible();
  await expect(page.getByText("Formu göndermek için onay kutusunu işaretle.")).toBeVisible();
});

test("the form cannot be sent without explicit consent", async ({ page }) => {
  await page.goto("/iletisim");
  await page.getByRole("textbox", { name: "Ad", exact: true }).fill("Ayşe");
  await page.getByRole("textbox", { name: "E-posta", exact: true }).fill("ayse@example.com");
  await page
    .getByRole("textbox", { name: "Mesaj", exact: true })
    .fill("Merhaba, bir proje için yazıyorum.");

  const consent = page.getByRole("checkbox");
  await expect(consent).not.toBeChecked();
  await page.getByRole("button", { name: "Mesajı gönder" }).click();

  await expect(page.getByText("Formu göndermek için onay kutusunu işaretle.")).toBeVisible();
  await expect(consent).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByText(/Teşekkürler/)).toHaveCount(0);
});
