"use client";

import { useTranslations } from "next-intl";

import { RollingLabel } from "@/components/common/RollingLabel";
import { NAV_ITEMS } from "@/constants/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import { isNavActive, navHref } from "@/lib/nav";

/** Desktop header navigation: N3 rolling labels, the current page gets the yellow marker. */
export function NavLinks() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <nav aria-label={t("main")} className="max-[1080px]:hidden">
      <ul className="flex gap-0.5">
        {NAV_ITEMS.map((item) => (
          <li key={item.key}>
            <Link
              href={navHref(item)}
              aria-current={isNavActive(item, pathname) ? "page" : undefined}
              className="group relative block rounded-full px-[15px] py-2.5 text-[15px] font-medium whitespace-nowrap text-subtle transition-colors duration-250 hover:text-ink aria-[current=page]:text-ink"
            >
              <RollingLabel label={t(item.key)} active={isNavActive(item, pathname)} />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
