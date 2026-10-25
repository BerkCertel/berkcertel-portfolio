import { useTranslations } from "next-intl";
import { Suspense } from "react";

import { Container } from "@/components/common/Container";
import { PageHeader } from "@/components/common/PageHeader";
import { CtaBand } from "@/components/layout/CtaBand";
import { CommitGraph } from "@/components/sections/projects/CommitGraph";
import {
  parseProjectFilter,
  ProjectsBrowser,
} from "@/components/sections/projects/ProjectsBrowser";
import { pageMetadata } from "@/lib/seo";

export const generateMetadata = () => pageMetadata("projects", "/projects");

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
        <PageHeader
          id="projects-title"
          title={t("projects.title")}
          lead={t("projects.pageLead")}
          visual={<CommitGraph />}
        />
        {/* Static fallback = the full list, so crawlers and no-JS visitors see every project. */}
        <Suspense fallback={<ProjectsBrowser filter="all" />}>
          <FilteredProjects searchParams={searchParams} />
        </Suspense>
      </Container>
      <CtaBand />
    </>
  );
}
