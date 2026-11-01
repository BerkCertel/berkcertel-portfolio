import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import type { TechCategory } from "@/types/tech";

interface TechCategoryLabelProps {
  category: TechCategory;
  /** Mobile list size (26px icon tile, 14px name, smaller count). */
  compact?: boolean;
  className?: string;
}

/** Category heading of a tech row: dark icon tile, name, two-digit count badge. */
export function TechCategoryLabel({
  category: { key, icon: Icon, items },
  compact,
  className,
}: TechCategoryLabelProps) {
  const t = useTranslations("tech.categories");

  return (
    <h3
      className={cn(
        "flex items-center font-semibold",
        compact ? "gap-2.5 text-sm" : "gap-3 leading-[1.2]",
        className,
      )}
    >
      <span
        className={cn(
          "grid flex-none place-items-center bg-ink text-bg",
          compact ? "size-[26px] rounded-lg" : "size-[34px] rounded-[10px]",
        )}
      >
        <Icon className="size-4" strokeWidth={1.9} aria-hidden="true" />
      </span>
      {t(key)}
      <span
        className={cn(
          "ml-auto rounded-md border border-line font-mono leading-none font-medium text-subtle",
          compact ? "px-1.5 py-1 text-[11px]" : "px-2 py-1.5 text-xs",
        )}
      >
        {String(items.length).padStart(2, "0")}
      </span>
    </h3>
  );
}
