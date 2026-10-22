import { useTranslations } from "next-intl";

import { AppButton } from "@/components/common/AppButton";
import { AppLink } from "@/components/common/AppLink";
import { Container } from "@/components/common/Container";
import { LanguageSwitch } from "@/components/common/LanguageSwitch";
import { Logo } from "@/components/common/Logo";
import { ThemeToggle } from "@/components/common/ThemeToggle";

import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

/** Sticky, blurred site header: logo, nav, language + theme switches, contact button, burger. */
export function Header() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/84 backdrop-blur-[14px]">
      <Container className="flex h-19 items-center justify-between gap-6 max-[760px]:h-17">
        <Logo className="shrink-0" />
        <NavLinks />
        <div className="flex shrink-0 items-center gap-2.5">
          <LanguageSwitch className="shrink-0 max-[1080px]:hidden" />
          <ThemeToggle />
          <AppButton asChild rightIcon="arrow" className="shrink-0 max-[1080px]:hidden">
            <AppLink href="/contact">{t("cta")}</AppLink>
          </AppButton>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
