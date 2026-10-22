import { Code, Globe } from "lucide-react";
import { useTranslations } from "next-intl";

import { AppButton } from "@/components/common/AppButton";
import { AppLink } from "@/components/common/AppLink";
import { BrandIcon } from "@/components/common/icons";
import { KindPill } from "@/components/common/KindPill";
import { LiveBadge } from "@/components/common/LiveBadge";
import { TechChip } from "@/components/common/TechChip";
import { PROJECT_VISIBLE_TECH } from "@/constants/projects";
import type { Project, ProjectLink } from "@/types/project";

type AppLinkHref = React.ComponentProps<typeof AppLink>["href"];

const ACTION_ICON = { size: "size-4", strokeWidth: 1.75 } as const;

/** Button look per link type: site/demo/details = primary, github = ghost. */
function ProjectAction({ link, label }: { link: ProjectLink; label: string }) {
  const leftIcon = {
    site: <Globe className={ACTION_ICON.size} strokeWidth={ACTION_ICON.strokeWidth} />,
    demo: <Globe className={ACTION_ICON.size} strokeWidth={ACTION_ICON.strokeWidth} />,
    github: <BrandIcon name="github" />,
    details: <Code className={ACTION_ICON.size} strokeWidth={ACTION_ICON.strokeWidth} />,
  }[link.type];

  return (
    <AppButton
      asChild
      variant={link.type === "github" ? "ghost" : "primary"}
      leftIcon={leftIcon}
      rightIcon={link.type === "details" ? "arrow" : "external"}
      className="h-[42px] px-4 text-sm"
    >
      {/* Kit data types hrefs as plain strings: external URLs, or an internal pathname for details. */}
      <AppLink href={link.href as AppLinkHref}>{label}</AppLink>
    </AppButton>
  );
}

/** One project in the list: index, kind/live, name, description, tech chips, actions. */
export function ProjectRow({ project, index }: { project: Project; index: number }) {
  const t = useTranslations("projects");
  const visible = project.tech.slice(0, PROJECT_VISIBLE_TECH);
  const rest = project.tech.slice(PROJECT_VISIBLE_TECH).map((tech) => tech.label);

  return (
    <article className="group relative grid grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-7 border-b border-line px-3 py-8 transition-[background] duration-300 before:absolute before:-top-px before:left-0 before:h-0.5 before:w-0 before:bg-brand before:transition-[width] before:duration-550 before:ease-out-soft hover:bg-[linear-gradient(90deg,color-mix(in_srgb,var(--c-accent)_7%,transparent),transparent_70%)] hover:before:w-full max-[760px]:grid-cols-1 max-[760px]:gap-[18px] max-[760px]:px-0 max-[760px]:py-7 max-[760px]:hover:bg-none">
      <span className="self-start pt-2 font-mono text-[13px] leading-none font-medium text-subtle transition-colors duration-300 group-hover:text-brand max-[760px]:pt-0">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div>
        <div className="mb-2.5 flex flex-wrap items-center gap-2.5">
          <KindPill kind={project.kind} />
          {project.live && <LiveBadge>{t("live")}</LiveBadge>}
        </div>
        <h3 className="font-display text-[clamp(28px,3vw,40px)] leading-none font-bold tracking-[-0.045em]">
          {project.name}
        </h3>
        <p className="mt-2 max-w-[58ch] text-subtle">{t(`items.${project.key}`)}</p>
        <ul className="mt-[18px] flex flex-wrap gap-2">
          {visible.map((tech) => (
            <li key={tech.label}>
              <TechChip tech={tech} />
            </li>
          ))}
          {rest.length > 0 && (
            <li>
              <span
                title={rest.join(", ")}
                className="inline-flex h-8 items-center rounded-[9px] border border-line bg-surface px-[11px] font-mono text-[13px] font-medium text-subtle"
              >
                <span aria-hidden="true">+{rest.length}</span>
                <span className="sr-only">
                  {t("moreTech", { count: rest.length })}: {rest.join(", ")}
                </span>
              </span>
            </li>
          )}
        </ul>
      </div>

      <div className="flex min-w-[196px] flex-col gap-2 max-[760px]:min-w-0 max-[760px]:flex-row max-[760px]:flex-wrap">
        {project.links.map((link) => (
          <ProjectAction key={link.type} link={link} label={t(`actions.${link.type}`)} />
        ))}
      </div>
    </article>
  );
}
