import { useLocale, useMessages, useTranslations } from "next-intl";

import { AppButton } from "@/components/common/AppButton";
import { AppLink } from "@/components/common/AppLink";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Container } from "@/components/common/Container";
import { ArrowIcon, BrandIcon } from "@/components/common/icons";
import { JsonLd } from "@/components/common/JsonLd";
import { PROSE_CLASS } from "@/components/common/styles";
import { TechChip } from "@/components/common/TechChip";
import { MichatDiagram } from "@/components/sections/projects/MichatDiagram";
import { PROJECTS } from "@/constants/projects";
import { SITE } from "@/constants/site";
import type { AppLocale } from "@/i18n/routing";
import { michatSchema } from "@/lib/json-ld";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

export const generateMetadata = () => pageMetadata("michat", "/projects/michat");

const MICHAT = PROJECTS.find((project) => project.key === "michat")!;
const GITHUB_URL = MICHAT.links.find((link) => link.type === "github")!.href as `https://${string}`;

const META_KEYS = ["role", "type", "stack", "setup"] as const;

/** Text block with a mono label on the left ("01 · Amaç") and prose on the right. */
function WriteUp({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-14 border-b border-line py-[72px] last:border-b-0 max-[1080px]:grid-cols-1 max-[760px]:gap-5 max-[760px]:py-12">
      <p className="eyebrow">{label}</p>
      <div className={PROSE_CLASS}>{children}</div>
    </div>
  );
}

export default function MichatPage() {
  const t = useTranslations();
  // Array messages (build.list) are read raw; next-intl's t() only returns strings.
  const buildList = useMessages().michat.build.list;
  const locale = useLocale() as AppLocale;

  return (
    <Container>
      <JsonLd data={michatSchema(locale, t("metadata.pages.michat.description"), GITHUB_URL)} />
      <section className="flex flex-col gap-[22px] pt-[72px] pb-10 max-[760px]:pt-11">
        <Breadcrumb
          items={[
            { label: t("common.home"), href: "/" },
            { label: t("projects.title"), href: "/projects" },
            { label: MICHAT.name },
          ]}
        />
        <h1 className="font-display text-[clamp(56px,10vw,150px)] leading-[0.95] font-bold tracking-[-0.045em]">
          {MICHAT.name}
        </h1>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <p className="max-w-[54ch] text-[22px] leading-[1.55] text-pretty text-ink max-[760px]:text-[19px]">
            {t("michat.lead")}
          </p>
          <AppButton asChild leftIcon={<BrandIcon name="github" />} rightIcon="external">
            <AppLink href={GITHUB_URL}>{t("projects.actions.github")}</AppLink>
          </AppButton>
        </div>
        <ul className="flex flex-wrap gap-2">
          {MICHAT.tech.map((tech) => (
            <li key={tech.label}>
              <TechChip tech={tech} />
            </li>
          ))}
        </ul>
      </section>

      <dl className="grid grid-cols-4 border-y border-line max-[760px]:grid-cols-2">
        {META_KEYS.map((key, i) => (
          <div
            key={key}
            className={cn(
              "flex flex-col gap-2 pt-[22px] pr-[22px] pb-6",
              i > 0 && "border-l border-line pl-[22px]",
              // 2 columns on phones: the third cell starts a new row.
              "max-[760px]:nth-3:border-l-0 max-[760px]:nth-3:pl-0 max-[760px]:nth-[n+3]:border-t max-[760px]:nth-[n+3]:border-line",
            )}
          >
            <dt className="eyebrow">{t(`michat.meta.${key}`)}</dt>
            <dd className="font-medium">{t(`michat.meta.${key}Value`)}</dd>
          </div>
        ))}
      </dl>

      <section className="pt-14">
        <MichatDiagram />
      </section>

      <section>
        <WriteUp label={t("michat.goal.label")}>
          <p>{t("michat.goal.p1")}</p>
          <p>{t("michat.goal.p2")}</p>
        </WriteUp>
        <WriteUp label={t("michat.build.label")}>
          <p>{t("michat.build.p1")}</p>
          <ul>
            {buildList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </WriteUp>
      </section>

      <AppLink
        href={SITE.sunflowUrl}
        className="group flex items-center justify-between gap-6 border-t border-line py-14"
      >
        <div>
          <p className="eyebrow mb-3">{t("michat.next")}</p>
          <p className="font-display text-[clamp(40px,6vw,84px)] leading-[0.95] font-bold tracking-[-0.045em] transition-colors duration-300 group-hover:text-brand">
            Sunflow
          </p>
        </div>
        <span
          aria-hidden="true"
          className="grid size-[72px] flex-none place-items-center rounded-full border border-line transition-all duration-300 group-hover:-rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-bg"
        >
          <ArrowIcon className="size-6" />
        </span>
      </AppLink>
    </Container>
  );
}
