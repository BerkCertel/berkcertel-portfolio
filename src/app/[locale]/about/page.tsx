import { useTranslations } from "next-intl";

import { Breadcrumb } from "@/components/common/Breadcrumb";
import { CodeCard } from "@/components/common/CodeCard";
import { Container } from "@/components/common/Container";
import { CvLinks } from "@/components/common/CvLinks";
import { Marker } from "@/components/common/Marker";
import { StartupCard } from "@/components/common/StartupCard";
import { PROSE_CLASS } from "@/components/common/styles";
import { CtaBand } from "@/components/layout/CtaBand";
import { Experience } from "@/components/sections/home/Experience";
import { pageMetadata } from "@/lib/seo";

export const generateMetadata = () => pageMetadata("about", "/about");

export default function AboutPage() {
  const t = useTranslations();

  return (
    <>
      <Container>
        <section className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-14 border-b border-line py-20 max-[1080px]:grid-cols-1 max-[760px]:gap-9 max-[760px]:py-12">
          <div className="flex flex-col gap-7">
            <Breadcrumb
              items={[{ label: t("common.home"), href: "/" }, { label: t("about.title") }]}
            />
            <h1 className="font-display text-[clamp(48px,7vw,100px)] leading-[0.95] font-bold tracking-[-0.045em]">
              <Marker>{t("about.title")}</Marker>
            </h1>
            <div className={PROSE_CLASS}>
              <p>{t("about.page.p1")}</p>
              <p>{t("about.page.p2")}</p>
              <p>{t("about.page.p3")}</p>
            </div>
            <StartupCard />
            <CvLinks />
            <p className="font-mono text-[13px] leading-[1.6] font-medium whitespace-pre-wrap text-subtle">
              {t("about.languagesLine")}
            </p>
          </div>
          <CodeCard />
        </section>
      </Container>
      <Experience />
      <CtaBand />
    </>
  );
}
