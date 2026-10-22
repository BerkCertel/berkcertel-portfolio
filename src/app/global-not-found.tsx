import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { THEME_SCRIPT } from "@/lib/theme";

import { fontVariables } from "./fonts";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: routing.defaultLocale, namespace: "metadata" });
  return { title: t("pages.notFound.title") };
}

/**
 * Global 404 for URLs that match no route (e.g. a missing file excluded by the proxy). It is a
 * standalone document (no root layout), so it brings its own fonts, styles and theme script;
 * the plain <script> is fine here because this page is never rendered on the client.
 * Localized 404s inside the site are rendered by src/app/[locale]/not-found.tsx.
 */
export default async function GlobalNotFound() {
  const locale = routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "notFound" });

  return (
    <html
      lang={locale}
      className={fontVariables}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
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
