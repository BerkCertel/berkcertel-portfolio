import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { locale as rootLocale } from "next/root-params";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";

import { ThemeScript } from "@/components/common/ThemeScript";
import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Toasts } from "@/components/layout/Toasts";
import { SITE } from "@/constants/site";
import { routing } from "@/i18n/routing";
import { env } from "@/lib/env";
import { siteUrl } from "@/lib/env.server";
import { ThemeProvider } from "@/providers/theme-provider";

import { fontVariables } from "../fonts";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    metadataBase: new URL(siteUrl),
    title: { default: t("defaultTitle"), template: t("titleTemplate") },
    description: t("description"),
    applicationName: t("siteName"),
    authors: [{ name: SITE.fullName, url: siteUrl }],
    creator: SITE.fullName,
    ...(env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
      verification: { google: env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
    }),
  };
}

/** Browser UI color per theme (the page background: --c-bg light / dark). */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F1F3F6" },
    { media: "(prefers-color-scheme: dark)", color: "#070A12" },
  ],
};

// Root layout. The locale is a root param (next/root-params), not read from `params`, so every
// page keeps a static, locale-specific App Shell (no URL data outside <Suspense>).
export default async function LocaleLayout({ children }: { children: React.ReactNode }) {
  const locale = await rootLocale();
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations("common");

  return (
    // `dark` / `js` classes are set by ThemeScript before paint.
    <html
      lang={locale}
      className={fontVariables}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only rounded-full bg-ink px-5 py-3 text-sm font-medium text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
        >
          {t("skipToContent")}
        </a>
        <NextIntlClientProvider>
          <ThemeProvider>
            <Header />
            <main id="main" tabIndex={-1} className="flex-1 outline-none">
              {children}
            </main>
            <Footer />
            <BackToTop />
            <Toasts />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
