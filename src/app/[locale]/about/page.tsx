import type { Locale } from "next-intl";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";

// Skeleton only; the real content comes in a later step.
export default function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);
  const t = useTranslations("about");

  return (
    <Section>
      <Container>
        <h1 className="font-display text-6xl font-bold tracking-[-0.045em]">{t("title")}</h1>
      </Container>
    </Section>
  );
}
