import { useTranslations } from "next-intl";

import { AppButton } from "@/components/common/AppButton";
import { AppLink } from "@/components/common/AppLink";
import { Container } from "@/components/common/Container";
import { BrandIcon, LayerMark } from "@/components/common/icons";
import { SITE } from "@/constants/site";

/** Brand-blue "let's work together" block that closes Home, About and Projects. */
export function CtaBand() {
  const t = useTranslations("cta");

  return (
    <section aria-labelledby="cta-title" className="pb-30 max-[760px]:pb-20">
      <Container>
        <div className="relative grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-end gap-10 overflow-hidden rounded-[28px] bg-brand px-16 py-[72px] text-on-brand max-[1080px]:grid-cols-1 max-[760px]:gap-7 max-[760px]:rounded-[22px] max-[760px]:px-6 max-[760px]:py-11">
          <LayerMark
            size={420}
            className="pointer-events-none absolute -top-[60px] -right-10 opacity-12"
          />
          <h2
            id="cta-title"
            className="relative font-display text-[clamp(42px,6vw,88px)] leading-[0.95] font-bold tracking-[-0.045em] text-balance"
          >
            {t("title")}
          </h2>
          <div className="relative flex flex-col items-start gap-[22px]">
            <p className="max-w-[40ch] text-lg opacity-85">{t("text")}</p>
            <div className="flex flex-wrap gap-3">
              <AppButton asChild variant="inverted" rightIcon="arrow">
                <AppLink href="/contact">{t("primary")}</AppLink>
              </AppButton>
              <AppButton asChild variant="ghostInverted" leftIcon={<BrandIcon name="whatsapp" />}>
                <AppLink href={SITE.whatsappHref}>{t("whatsapp")}</AppLink>
              </AppButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
