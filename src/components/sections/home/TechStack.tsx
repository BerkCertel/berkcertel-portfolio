import { useTranslations } from "next-intl";

import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";

import { TechGrid } from "./TechGrid";
import { TechLanes } from "./TechLanes";
import { TechList } from "./TechList";
import { TechViews } from "./TechViews";

/**
 * "Technologies": above 760px flowing lanes or the static grid (view switch next to the heading),
 * at 760px and below the static list. All views read TECH_CATEGORIES.
 */
export function TechStack() {
  const t = useTranslations("tech");

  return (
    <Section aria-labelledby="stack-title">
      <Container>
        <TechViews
          id="stack-title"
          title={t("title")}
          views={{ flow: <TechLanes />, grid: <TechGrid /> }}
          mobile={<TechList />}
        />
      </Container>
    </Section>
  );
}
