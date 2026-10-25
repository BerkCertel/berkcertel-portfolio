import { useTranslations } from "next-intl";

import { Container } from "@/components/common/Container";
import { PageHeader } from "@/components/common/PageHeader";
import { ContactChannels } from "@/components/sections/contact/ContactChannels";
import { ContactNetwork } from "@/components/sections/contact/ContactNetwork";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { pageMetadata } from "@/lib/seo";

export const generateMetadata = () => pageMetadata("contact", "/contact");

export default function ContactPage() {
  const t = useTranslations();

  return (
    <Container>
      <PageHeader
        id="contact-title"
        title={t("contact.title")}
        crumb={t("nav.contact")}
        lead={t("contact.lead")}
        visual={<ContactNetwork />}
        visualClassName="max-[1080px]:mx-auto max-[1080px]:max-w-[460px]"
      />
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] gap-14 pt-16 pb-28 max-[1080px]:grid-cols-1 max-[760px]:gap-10 max-[760px]:pt-10 max-[760px]:pb-[72px]">
        <ContactChannels />
        <ContactForm />
      </div>
    </Container>
  );
}
