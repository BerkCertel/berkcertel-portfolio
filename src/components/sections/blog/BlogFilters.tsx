"use client";

import { useTranslations } from "next-intl";
import { useTransition } from "react";

import { AppChip, ChipGroup } from "@/components/common/AppChip";
import { BLOG_FILTERS } from "@/constants/blog";
import { useRouter } from "@/i18n/navigation";

type BlogFilter = (typeof BLOG_FILTERS)[number];

/** Category chips; the active category lives in the URL (?category=guides). */
export function BlogFilters({ active }: { active: BlogFilter }) {
  const t = useTranslations("blog");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function select(category: BlogFilter) {
    if (category === active) return;
    startTransition(() => {
      router.replace(
        { pathname: "/blog", query: category === "all" ? {} : { category } },
        { scroll: false },
      );
    });
  }

  return (
    <ChipGroup label={t("filterLabel")} aria-busy={isPending}>
      {BLOG_FILTERS.map((category) => (
        <AppChip key={category} pressed={category === active} onClick={() => select(category)}>
          {t(`categories.${category}`)}
        </AppChip>
      ))}
    </ChipGroup>
  );
}
