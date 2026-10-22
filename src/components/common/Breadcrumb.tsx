import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { AppLink } from "./AppLink";

export interface BreadcrumbItem {
  label: string;
  /** Omit for the current page (always the last item). */
  href?: React.ComponentProps<typeof AppLink>["href"];
}

/** Mono uppercase trail: "Ana sayfa / Projeler / miChat"; the last item is the current page. */
export function Breadcrumb({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  const t = useTranslations("common");

  return (
    <nav aria-label={t("breadcrumb")} className={className}>
      <ol className="flex flex-wrap items-center gap-2 font-mono text-xs leading-none font-medium tracking-[0.06em] text-subtle uppercase">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {item.href && !isLast ? (
                <AppLink href={item.href} className="transition-colors hover:text-ink">
                  {item.label}
                </AppLink>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn(isLast && "text-ink")}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
