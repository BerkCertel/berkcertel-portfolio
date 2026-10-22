import { useTranslations } from "next-intl";

import { Container } from "@/components/common/Container";
import { Marker } from "@/components/common/Marker";
import { Section } from "@/components/common/Section";

// Skeleton only; the real content comes in a later step.
export default function BlogPage() {
  const t = useTranslations("blog");

  return (
    <Section>
      <Container>
        <h1 className="font-display text-6xl font-bold tracking-[-0.045em]">
          <Marker>{t("title")}</Marker>
        </h1>
      </Container>
    </Section>
  );
}
