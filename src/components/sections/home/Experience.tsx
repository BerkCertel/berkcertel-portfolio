import { useTranslations } from "next-intl";

import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { EXPERIENCE } from "@/constants/experience";

import { ExperienceTimeline } from "./ExperienceTimeline";

/**
 * Work history: sticky title on the left, scroll-progress timeline on the right.
 * Page-independent: used on Home and About.
 */
export function Experience({ className }: { className?: string }) {
  const t = useTranslations("experience");
  const items = EXPERIENCE.map(({ key }) => ({
    key,
    period: t(`items.${key}.period`),
    role: t(`items.${key}.role`),
    company: t(`items.${key}.company`),
    description: t(`items.${key}.description`),
  }));

  return (
    <Section aria-labelledby="experience-title" className={className}>
      {/* Title column grows with the heading ("Experience" is wider than "Deneyim"), never under it. */}
      <Container className="grid grid-cols-[minmax(240px,max-content)_minmax(0,1fr)] gap-12 max-[1080px]:grid-cols-1 max-[1080px]:gap-8">
        <div className="sticky top-25 self-start max-[1080px]:static">
          <h2
            id="experience-title"
            className="font-display text-[clamp(36px,4.6vw,60px)] leading-none font-bold tracking-[-0.045em]"
          >
            {t("title")}
          </h2>
        </div>
        <ExperienceTimeline items={items} />
      </Container>
    </Section>
  );
}
