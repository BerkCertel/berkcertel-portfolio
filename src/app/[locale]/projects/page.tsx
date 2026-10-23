import { useTranslations } from "next-intl";
import { Suspense } from "react";

import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Container } from "@/components/common/Container";
import { Marker } from "@/components/common/Marker";
import { CtaBand } from "@/components/layout/CtaBand";
import { CommitGraph } from "@/components/sections/projects/CommitGraph";
import {
  parseProjectFilter,
  ProjectsBrowser,
} from "@/components/sections/projects/ProjectsBrowser";

interface ProjectsPageProps {
  searchParams: Promise<{ filter?: string | string[] }>;
}

/** Reads `?filter=` per request; kept inside <Suspense> so the rest of the page stays static. */
async function FilteredProjects({ searchParams }: ProjectsPageProps) {
  const { filter } = await searchParams;
  return <ProjectsBrowser filter={parseProjectFilter(filter)} />;
}

export default function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const t = useTranslations();

  return (
    <>
      <Container>
        <section aria-labelledby="projects-title" className="pt-[72px] max-[760px]:pt-11">
          <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center gap-10 max-[1080px]:grid-cols-1">
            <div>
              <Breadcrumb
                items={[{ label: t("common.home"), href: "/" }, { label: t("projects.title") }]}
              />
              <h1
                id="projects-title"
                className="mt-[18px] font-display text-[clamp(56px,8vw,120px)] leading-[0.95] font-bold tracking-[-0.05em]"
              >
                <Marker>{t("projects.title")}</Marker>
              </h1>
              <p className="mt-[18px] max-w-[46ch] text-[19px] leading-[1.55] text-subtle max-[760px]:text-[17px]">
                {t("projects.pageLead")}
              </p>
            </div>
            <div className="w-full max-[1080px]:max-w-[420px]">
              <CommitGraph />
            </div>
          </div>
          {/* Static fallback = the full list, so crawlers and no-JS visitors see every project. */}
          <Suspense fallback={<ProjectsBrowser filter="all" />}>
            <FilteredProjects searchParams={searchParams} />
          </Suspense>
        </section>
      </Container>
      <CtaBand />
    </>
  );
}
