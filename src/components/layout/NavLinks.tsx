"use client";

import { useTranslations } from "next-intl";

import { NAV_ITEMS } from "@/constants/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import { isNavActive, navHref } from "@/lib/nav";

/** Desktop header navigation with the current page highlighted (ink text + brand dot). */
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
              className="relative block rounded-full px-3.5 py-2.5 text-[15px] font-medium whitespace-nowrap text-subtle transition-colors hover:bg-sunk hover:text-ink aria-[current=page]:text-ink aria-[current=page]:after:absolute aria-[current=page]:after:bottom-[3px] aria-[current=page]:after:left-1/2 aria-[current=page]:after:-ml-0.5 aria-[current=page]:after:size-1 aria-[current=page]:after:rounded-full aria-[current=page]:after:bg-brand"
            >
              {t(item.key)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
