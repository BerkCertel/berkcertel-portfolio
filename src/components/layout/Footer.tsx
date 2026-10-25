import { cacheLife } from "next/cache";
import { getTranslations } from "next-intl/server";

import { AppLink } from "@/components/common/AppLink";
import { Container } from "@/components/common/Container";
import { Logo } from "@/components/common/Logo";
import { SocialLinks } from "@/components/common/SocialLinks";
import { RollingLabel } from "@/components/common/RollingLabel";
import { FOOTER_NAV_ITEMS } from "@/constants/navigation";
import { SITE } from "@/constants/site";
import { ALL_SOCIALS } from "@/constants/socials";
import { navHref } from "@/lib/nav";

/** Current year. Cached because Cache Components does not allow reading the clock in a prerender. */
async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

/** Footer: logo + footer nav, dashed rule, copyright, email, legal links, social profiles. */
export async function Footer() {
  const [t, year] = await Promise.all([getTranslations(), getCurrentYear()]);

  return (
    <footer className="border-t border-line bg-bg pt-12 pb-8">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-7">
          <Logo />
          <nav aria-label={t("nav.footer")}>
            <ul className="flex flex-wrap gap-x-6.5 gap-y-3.5 text-[15px] text-subtle max-[760px]:gap-x-5">
              {FOOTER_NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <AppLink
                    href={navHref(item)}
                    className="group block transition-colors hover:text-ink"
                  >
                    <RollingLabel label={t(`nav.${item.key}`)} />
                  </AppLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-dashed border-line pt-6 font-mono text-[12.5px] leading-[1.4] text-subtle">
          <p>{t("footer.copyright", { year })}</p>
          <AppLink href={`mailto:${SITE.email}`} className="transition-colors hover:text-ink">
            {SITE.email}
          </AppLink>
          <AppLink href="/privacy" className="transition-colors hover:text-ink">
            {t("footer.privacy")}
          </AppLink>
          <AppLink href="/cookies" className="transition-colors hover:text-ink">
            {t("footer.cookies")}
          </AppLink>
          <SocialLinks items={ALL_SOCIALS} size="sm" />
        </div>
      </Container>
    </footer>
  );
}
