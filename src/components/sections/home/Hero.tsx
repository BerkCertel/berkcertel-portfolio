import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";

import { AppButton } from "@/components/common/AppButton";
import { AppLink } from "@/components/common/AppLink";
import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { SocialLinks } from "@/components/common/SocialLinks";
import { HERO_SOCIALS } from "@/constants/socials";

import { LayerStack } from "./LayerStack";

/** Hero copy children rise in one after another (80ms apart, 0.9s each). */
const rise = (i: number) => ({ "--i": i, "--reveal-duration": "0.9s" }) as React.CSSProperties;

/** Home hero: intro copy + CTAs + socials on the left, the 3D layer stack on the right. */
export function Hero() {
  const t = useTranslations("hero");

  return (
    <section aria-labelledby="hero-title">
      <Container className="grid grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] items-center gap-8 pt-16 pb-[88px] max-[1080px]:grid-cols-1 max-[1080px]:pt-12 max-[1080px]:pb-14 max-[760px]:gap-2 max-[760px]:pt-9 max-[760px]:pb-10">
        <Reveal className="flex flex-col gap-7 max-[760px]:gap-[22px]">
          <p className="reveal eyebrow" style={rise(0)}>
            {t("eyebrow")}
          </p>
          <h1
            id="hero-title"
            className="reveal font-display text-[clamp(46px,7.3vw,106px)] leading-[0.95] font-bold tracking-[-0.045em] text-balance"
            style={rise(1)}
          >
            {t("greeting")}
            <br />
            {t("namePrefix")} <span className="text-highlight whitespace-nowrap">{t("name")}</span>
          </h1>
          <p
            className="reveal max-w-[54ch] text-[19px] leading-[1.55] text-pretty text-subtle max-[760px]:text-[17px]"
            style={rise(2)}
          >
            {t("lead")}
          </p>
          <div className="reveal flex flex-wrap gap-3" style={rise(3)}>
            <AppButton asChild rightIcon="arrow">
              <AppLink href="/projects">{t("ctaProjects")}</AppLink>
            </AppButton>
            <AppButton
              asChild
              variant="ghost"
              leftIcon={<Mail strokeWidth={1.75} aria-hidden="true" />}
            >
              <AppLink href="/contact">{t("ctaContact")}</AppLink>
            </AppButton>
          </div>
          <div className="reveal mt-1" style={rise(4)}>
            <SocialLinks items={HERO_SOCIALS} />
          </div>
        </Reveal>
        <LayerStack />
      </Container>
    </section>
  );
}
