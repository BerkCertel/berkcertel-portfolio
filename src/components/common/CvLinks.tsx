import { Download } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { SITE } from "@/constants/site";
import { routing } from "@/i18n/routing";

import { AppButton } from "./AppButton";

/** "Download CV" (current locale's PDF) + a text link to the other language's CV. */
export function CvLinks() {
  const t = useTranslations("common");
  const locale = useLocale();
  const otherLocale = routing.locales.find((code) => code !== locale) ?? routing.defaultLocale;

  return (
    <div className="flex flex-wrap items-center gap-[18px]">
      {/* Static PDFs: plain links (the localized Link would prefix /en). */}
      <AppButton asChild leftIcon={<Download strokeWidth={1.75} aria-hidden="true" />}>
        <a href={SITE.cv[locale]} download>
          {t("downloadCv")}
        </a>
      </AppButton>
      <a
        href={SITE.cv[otherLocale]}
        hrefLang={otherLocale}
        download
        className="border-b border-line pb-0.5 text-sm text-subtle transition-colors hover:border-ink hover:text-ink"
      >
        {t("otherCv")}
      </a>
    </div>
  );
}
