import { useTranslations } from "next-intl";

import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

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
        {/* TODO(step 03): switch to AppButton */}
        <div className="flex flex-wrap gap-2.5">
          <Button asChild className="h-12 rounded-full px-5.5 text-[15px]">
            <Link href="/">{t("home")}</Link>
          </Button>
          <Button asChild variant="outline" className="h-12 rounded-full px-5.5 text-[15px]">
            <Link href="/projects">{t("projects")}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
