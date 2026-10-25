import { useFormatter, useTranslations } from "next-intl";

import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Container } from "@/components/common/Container";
import { PRIVACY_UPDATED } from "@/constants/site";
import { pageMetadata } from "@/lib/seo";

interface PrivacySection {
  title: string;
  body: string[];
}

export const generateMetadata = () => pageMetadata("privacy", "/privacy");

/** Privacy notice (KVKK): plain title, last-updated date, then the sections from messages. */
export default function PrivacyPage() {
  const t = useTranslations();
  const format = useFormatter();
  const sections = t.raw("privacy.sections") as PrivacySection[];

  return (
    <Container>
      <article className="max-w-[70ch] pt-[72px] pb-30 max-[760px]:pt-11 max-[760px]:pb-20">
        <Breadcrumb
          items={[{ label: t("common.home"), href: "/" }, { label: t("privacy.title") }]}
        />
        <h1 className="mt-[18px] font-display text-[clamp(44px,6vw,80px)] leading-[0.95] font-bold tracking-[-0.045em]">
          {t("privacy.title")}
        </h1>
        <p className="mt-5 font-mono text-[13px] text-subtle">
          {t("privacy.updated", {
            date: format.dateTime(new Date(PRIVACY_UPDATED), { dateStyle: "long" }),
          })}
        </p>
        {sections.map((section) => (
          <section key={section.title} className="mt-12">
            <h2 className="font-display text-[26px] leading-[1.15] font-bold tracking-[-0.035em]">
              {section.title}
            </h2>
            <div className="mt-4 flex flex-col gap-3 text-lg leading-[1.65] text-subtle max-[760px]:text-[17px]">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </article>
    </Container>
  );
}
