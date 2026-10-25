import { useTranslations } from "next-intl";

import { Container } from "@/components/common/Container";
import { markTag } from "@/components/common/mark-tag";
import { PageHeader } from "@/components/common/PageHeader";
import { CtaBand } from "@/components/layout/CtaBand";
import { Process } from "@/components/sections/home/Process";
import { ServiceList } from "@/components/sections/services/ServiceList";
import { ServicesFlow } from "@/components/sections/services/ServicesFlow";
import { pageMetadata } from "@/lib/seo";

export const generateMetadata = () => pageMetadata("services", "/services");

export default function ServicesPage() {
  const t = useTranslations();

  return (
    <>
      <Container>
        <PageHeader
          id="services-page-title"
          title={t("services.title")}
          lead={t.rich("services.pageLead", markTag)}
          visual={<ServicesFlow />}
        />
        <div className="pt-10 pb-30 max-[760px]:pb-20">
          <ServiceList />
        </div>
      </Container>
      <Process />
      <CtaBand />
    </>
  );
}
