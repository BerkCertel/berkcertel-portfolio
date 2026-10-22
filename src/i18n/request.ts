import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { locale as rootLocale } from "next/root-params";

import { routing } from "./routing";

/**
 * The locale comes from the `[locale]` root param (next/root-params), so pages never read
 * `params` and stay part of the static App Shell. An explicit override like
 * `getTranslations({ locale })` (e.g. in global-not-found) takes precedence.
 */
export default getRequestConfig(async ({ locale: override }) => {
  const requested = override ?? (await rootLocale());
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    // Fixed zone so formatted dates match between server and client (and no dev warning).
    timeZone: "Europe/Istanbul",
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
