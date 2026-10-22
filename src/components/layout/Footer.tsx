import { cacheLife } from "next/cache";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/common/Container";
import { Logo } from "@/components/common/Logo";
import { SocialLinks } from "@/components/common/SocialLinks";
import { NAV_ITEMS } from "@/constants/navigation";
import { SITE } from "@/constants/site";
import { ALL_SOCIALS } from "@/constants/socials";
import { Link } from "@/i18n/navigation";
import { navHref } from "@/lib/nav";

/** Current year. Cached because Cache Components does not allow reading the clock in a prerender. */
async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

/** Simple footer: logo + footer nav, dashed rule, copyright, email, all social profiles. */
export async function Footer() {
  const [t, year] = await Promise.all([getTranslations(), getCurrentYear()]);

  return (
    <footer className="border-t border-line bg-bg pt-12 pb-8">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-7">
          <Logo />
          <nav aria-label={t("nav.footer")}>
            <ul className="flex flex-wrap gap-x-6.5 gap-y-3.5 text-[15px] text-subtle max-[760px]:gap-x-5">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <Link href={navHref(item)} className="transition-colors hover:text-ink">
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-dashed border-line pt-6 font-mono text-[12.5px] leading-[1.4] text-subtle">
          <p>{t("footer.copyright", { year })}</p>
          <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-ink">
            {SITE.email}
          </a>
          <SocialLinks items={ALL_SOCIALS} size="sm" />
        </div>
      </Container>
    </footer>
  );
}
