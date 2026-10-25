import { useTranslations } from "next-intl";

import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";

import { TechLanes } from "./TechLanes";
import { TechTabs } from "./TechTabs";
import { TechViews } from "./TechViews";

/**
 * "Technologies": scrolling lanes above 760px, category tabs + grid at 760px and below.
 * Both views read TECH_CATEGORIES; only the one that fits the screen stays rendered.
 */
export function TechStack() {
  const t = useTranslations("tech");

  return (
    <Section aria-labelledby="stack-title">
      <Container>
        <SectionHeading id="stack-title" title={t("title")} />
        <TechViews desktop={<TechLanes />} mobile={<TechTabs />} />
      </Container>
    </Section>
  );
}
