"use client";

import { useTranslations } from "next-intl";
import { useTransition } from "react";

import { AppChip, ChipGroup } from "@/components/common/AppChip";
import { PROJECT_FILTERS } from "@/constants/projects";
import { useRouter } from "@/i18n/navigation";
import type { ProjectFilter } from "@/types/project";

/** Filter chips; the active filter lives in the URL (?filter=web) so it can be shared. */
export function ProjectFilters({ active }: { active: ProjectFilter }) {
  const t = useTranslations("projects");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function select(filter: ProjectFilter) {
    if (filter === active) return;
    startTransition(() => {
      router.replace(
        { pathname: "/projects", query: filter === "all" ? {} : { filter } },
        { scroll: false },
      );
    });
  }

  return (
    <ChipGroup label={t("filterLabel")} aria-busy={isPending}>
      {PROJECT_FILTERS.map((filter) => (
        <AppChip key={filter} pressed={filter === active} onClick={() => select(filter)}>
          {t(`filters.${filter}`)}
        </AppChip>
      ))}
    </ChipGroup>
  );
}
