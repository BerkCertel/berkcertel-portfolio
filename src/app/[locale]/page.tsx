import { useTranslations } from "next-intl";

import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";

// Skeleton only; the real content comes in a later step.
export default function HomePage() {
  const t = useTranslations("hero");

  return (
    <Section>
      <Container>
        <h1 className="font-display text-6xl font-bold tracking-[-0.045em]">
          {t("greeting")} {t("namePrefix")} {t("name")}
        </h1>
      </Container>
    </Section>
  );
}
