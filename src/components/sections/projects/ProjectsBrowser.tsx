import { useTranslations } from "next-intl";

import { ProjectList } from "@/components/sections/home/ProjectList";
import { ProjectsMore } from "@/components/sections/home/ProjectsMore";
import { PROJECT_FILTERS, PROJECTS } from "@/constants/projects";
import type { ProjectFilter } from "@/types/project";

import { ProjectFilters } from "./ProjectFilters";

/** Unknown or missing `?filter=` values fall back to "all". */
export function parseProjectFilter(value: string | string[] | undefined): ProjectFilter {
  return PROJECT_FILTERS.find((filter) => filter === value) ?? "all";
}

/** Filter bar + count + the filtered project list. */
export function ProjectsBrowser({ filter }: { filter: ProjectFilter }) {
  const t = useTranslations("projects");
  const projects =
    filter === "all" ? PROJECTS : PROJECTS.filter((project) => project.filters.includes(filter));

  return (
    <>
      <div className="mt-[22px] flex flex-wrap items-end justify-between gap-8 border-b border-line pb-14 max-[760px]:pb-9">
        <ProjectFilters active={filter} />
        <span className="font-mono text-[13px] text-subtle" aria-live="polite">
          {t("count", { count: projects.length })}
        </span>
      </div>
      <div className="pt-12 pb-30 max-[760px]:pb-20">
        <ProjectList projects={projects} heading="h2" />
        <ProjectsMore />
      </div>
    </>
  );
}
