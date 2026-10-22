import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Container } from "@/components/common/Container";
import { markTag } from "@/components/common/mark-tag";
import { Marker } from "@/components/common/Marker";
import { CtaBand } from "@/components/layout/CtaBand";
import { Process } from "@/components/sections/home/Process";
import { ServiceList } from "@/components/sections/services/ServiceList";
import { ServicesFlow } from "@/components/sections/services/ServicesFlow";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.pages.services");
  return { title: t("title"), description: t("description") };
}

export default function ServicesPage() {
  const t = useTranslations();

  return (
    <>
      <Container>
        <section
          aria-labelledby="services-page-title"
          className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center gap-10 pt-[72px] max-[1080px]:grid-cols-1 max-[760px]:pt-11"
        >
          <div>
            <Breadcrumb
              items={[{ label: t("common.home"), href: "/" }, { label: t("services.title") }]}
            />
            <h1
              id="services-page-title"
              className="mt-[18px] font-display text-[clamp(56px,8vw,120px)] leading-[0.95] font-bold tracking-[-0.05em]"
            >
              <Marker>{t("services.title")}</Marker>
            </h1>
            <p className="mt-[18px] max-w-[46ch] text-[19px] leading-[1.55] text-subtle max-[760px]:text-[17px]">
              {t.rich("services.pageLead", markTag)}
            </p>
          </div>
          <div className="w-full max-[1080px]:max-w-[420px]">
            <ServicesFlow />
          </div>
        </section>
        <div className="pt-10 pb-30 max-[760px]:pb-20">
          <ServiceList />
        </div>
      </Container>
      <Process />
      <CtaBand />
    </>
  );
}
