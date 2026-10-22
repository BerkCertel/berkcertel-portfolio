import { useTranslations } from "next-intl";

import { Container } from "@/components/common/Container";
import { LanguageSwitch } from "@/components/common/LanguageSwitch";
import { Logo } from "@/components/common/Logo";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

/** Sticky, blurred site header: logo, nav, language + theme switches, contact button, burger. */
export function Header() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/84 backdrop-blur-[14px]">
      <Container className="flex h-19 items-center justify-between gap-6 max-[760px]:h-17">
        <Logo />
        <NavLinks />
        <div className="flex items-center gap-2.5">
          <LanguageSwitch className="max-[900px]:hidden" />
          <ThemeToggle />
          {/* TODO(step 03): switch to AppButton */}
          <Button
            asChild
            className="h-12 rounded-full px-5.5 text-[15px] hover:bg-brand hover:text-on-brand max-[900px]:hidden [&_svg]:transition-transform [&_svg]:duration-300 [&_svg]:ease-out-soft hover:[&_svg]:translate-x-[3px]"
          >
            <Link href="/contact">
              {t("cta")}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 8h10m0 0L8.5 3.5M13 8l-4.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </Button>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
