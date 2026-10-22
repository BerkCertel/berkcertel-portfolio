import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { THEME_SCRIPT } from "@/lib/theme";

import { fontVariables } from "./fonts";
import "./globals.css";

/**
 * Fallback for requests that never reach a locale (e.g. a missing file excluded by the proxy).
 * Localized 404s are rendered by src/app/[locale]/not-found.tsx. Plain next/link here: this page
 * renders outside the next-intl provider.
 */
export default async function RootNotFound() {
  const locale = routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "notFound" });

  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="grid min-h-dvh place-items-center px-5">
        <main className="flex flex-col items-start gap-5">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h1 className="font-display text-8xl font-bold tracking-[-0.045em]">404</h1>
          <p className="text-subtle">{t("lead")}</p>
          <Link href="/" className="font-medium underline underline-offset-4 hover:text-brand">
            {t("home")}
          </Link>
        </main>
      </body>
    </html>
  );
}
