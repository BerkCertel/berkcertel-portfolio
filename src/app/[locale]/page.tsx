import { useTranslations } from "next-intl";

import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CtaBand } from "@/components/layout/CtaBand";
import { AboutPreview } from "@/components/sections/home/AboutPreview";
import { Experience } from "@/components/sections/home/Experience";
import { Hero } from "@/components/sections/home/Hero";
import { Process } from "@/components/sections/home/Process";
import { ProjectList } from "@/components/sections/home/ProjectList";
import { ProjectsMore } from "@/components/sections/home/ProjectsMore";
import { Services } from "@/components/sections/home/Services";
import { SunflowPromo } from "@/components/sections/home/SunflowPromo";
import { TechStack } from "@/components/sections/home/TechStack";
import { PROJECTS } from "@/constants/projects";

export default function HomePage() {
  const t = useTranslations();

  return (
    <>
      <Hero />
      <AboutPreview />
      <TechStack />
      {/* Design: no own padding; the sections around it provide the gaps. */}
      <Experience className="py-0 max-[760px]:py-0" />
      <Section aria-labelledby="projects-title">
        <Container>
          <SectionHeading
            id="projects-title"
            title={t("projects.title")}
            link={{ href: "/projects", label: t("common.viewAll") }}
          />
          <ProjectList projects={PROJECTS} />
          <ProjectsMore />
        </Container>
      </Section>
      <SunflowPromo />
      <Services />
      <Process />
      {/* TODO(step 08): blog preview */}
      <CtaBand />
    </>
  );
}
