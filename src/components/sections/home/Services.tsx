import { useTranslations } from "next-intl";

import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SERVICES } from "@/constants/services";

/** Home services: 2×2 grid with hairline gaps and a link to the services page. */
export function Services() {
  const t = useTranslations("services");

  return (
    <Section aria-labelledby="services-title" className="pt-0 max-[760px]:pt-0">
      <Container>
        <SectionHeading
          id="services-title"
          title={t("title")}
          link={{ href: "/services", label: t("viewAll") }}
        />
        <Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-[22px] border border-line bg-line max-[760px]:grid-cols-1 max-[760px]:rounded-[18px]">
          {SERVICES.map(({ key, icon: Icon }, i) => (
            <div
              key={key}
              className="reveal group flex min-h-[280px] flex-col gap-4 bg-bg p-9 transition-colors duration-300 hover:bg-surface max-[760px]:min-h-0 max-[760px]:p-[26px]"
              style={{ "--i": i } as React.CSSProperties}
            >
              <div className="flex items-center justify-between">
                <span className="grid size-[52px] place-items-center rounded-[14px] bg-ink text-bg transition-[transform,background-color,color] duration-500 ease-out-soft group-hover:transform-[rotate(-8deg)_scale(1.06)] group-hover:bg-brand group-hover:text-on-brand">
                  <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="eyebrow">{t(`items.${key}.eyebrow`)}</span>
              </div>
              <h3 className="font-display text-[28px] leading-[1.05] font-bold tracking-[-0.04em] max-[760px]:text-[26px]">
                {t(`items.${key}.title`)}
              </h3>
              <p className="max-w-[44ch] text-subtle">{t(`items.${key}.description`)}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
