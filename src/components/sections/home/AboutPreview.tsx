import { Download, Rocket } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { AppButton } from "@/components/common/AppButton";
import { AppLink } from "@/components/common/AppLink";
import { CodeCard } from "@/components/common/CodeCard";
import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SITE } from "@/constants/site";
import { routing } from "@/i18n/routing";

const SUNFLOW_HOST = new URL(SITE.sunflowUrl).host;

/** Home "About" summary: intro, startup card, CV links, and the berk.ts code card. */
export function AboutPreview() {
  const t = useTranslations();
  const locale = useLocale();
  const otherLocale = routing.locales.find((code) => code !== locale) ?? routing.defaultLocale;

  return (
    <section aria-labelledby="about-title">
      <Container>
        <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center gap-16 border-t border-line pt-[104px] pb-6 max-[1080px]:grid-cols-1 max-[1080px]:gap-10 max-[760px]:pt-16 max-[760px]:pb-2">
          <Reveal className="flex flex-col gap-[26px]">
            <SectionHeading
              id="about-title"
              title={t("about.title")}
              link={{ href: "/about", label: t("common.readMore") }}
              className="mb-1.5"
            />
            <p
              className="reveal max-w-[52ch] text-[22px] leading-[1.55] text-pretty text-ink max-[760px]:text-[19px]"
              style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
            >
              {t("about.paragraph1")}
            </p>
            <p
              className="reveal max-w-[56ch] text-[17px] text-subtle"
              style={{ "--reveal-delay": "0.18s" } as React.CSSProperties}
            >
              {t("about.homeSummary")}
            </p>

            <AppLink
              href={SITE.sunflowUrl}
              className="group flex max-w-[520px] items-center gap-4 rounded-2xl border border-line bg-surface py-4 pr-4 pl-[18px] transition-[border-color,translate] duration-300 hover:-translate-y-[3px] hover:border-brand max-[760px]:flex-wrap"
            >
              <span className="grid size-10 flex-none place-items-center rounded-[9px] bg-sun text-on-sun">
                <Rocket className="size-4" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="flex flex-1 flex-col text-sm text-subtle">
                {t("about.startupLabel")}
                <b className="mt-1 font-display text-xl font-bold tracking-[-0.03em] text-ink">
                  Sunflow
                </b>
              </span>
              {/* Looks like a mini ghost button; the whole card is the link. */}
              <AppButton
                asChild
                variant="ghost"
                size="mini"
                rightIcon="external"
                className="group-hover:border-ink max-[760px]:w-full"
              >
                <span>{SUNFLOW_HOST}</span>
              </AppButton>
            </AppLink>

            <div className="flex flex-wrap items-center gap-[18px]">
              {/* Static PDFs: plain links (localized Link would prefix /en). */}
              <AppButton asChild leftIcon={<Download strokeWidth={1.75} aria-hidden="true" />}>
                <a href={SITE.cv[locale]} download>
                  {t("common.downloadCv")}
                </a>
              </AppButton>
              <a
                href={SITE.cv[otherLocale]}
                hrefLang={otherLocale}
                download
                className="border-b border-line pb-0.5 text-sm text-subtle transition-colors hover:border-ink hover:text-ink"
              >
                {t("common.otherCv")}
              </a>
            </div>
          </Reveal>
          <CodeCard className="rotate-[1.2deg] transition-[rotate] duration-500 ease-out-soft hover:rotate-0 max-[1080px]:rotate-0" />
        </div>
      </Container>
    </section>
  );
}
