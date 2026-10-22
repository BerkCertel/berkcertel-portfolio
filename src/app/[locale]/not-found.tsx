import { useTranslations } from "next-intl";

import { AppButton } from "@/components/common/AppButton";
import { AppLink } from "@/components/common/AppLink";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";

// Skeleton only; the full design (falling planes) is built in step 06.
export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <Section>
      <Container className="flex flex-col items-start gap-6">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 className="font-display text-[clamp(96px,16vw,220px)] leading-[0.9] font-bold tracking-[-0.06em]">
          404
        </h1>
        <p className="max-w-[54ch] text-lg text-subtle">{t("lead")}</p>
        <div className="flex flex-wrap gap-2.5">
          <AppButton asChild rightIcon="arrow">
            <AppLink href="/">{t("home")}</AppLink>
          </AppButton>
          <AppButton asChild variant="ghost">
            <AppLink href="/projects">{t("projects")}</AppLink>
          </AppButton>
        </div>
      </Container>
    </Section>
  );
}
