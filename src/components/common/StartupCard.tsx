import { Rocket } from "lucide-react";
import { useTranslations } from "next-intl";

import { SITE } from "@/constants/site";

import { AppButton } from "./AppButton";
import { AppLink } from "./AppLink";

const SUNFLOW_HOST = new URL(SITE.sunflowUrl).host;

/** "My startup: Sunflow" card linking to sunflowapp.com (Home about summary, About page). */
export function StartupCard() {
  const t = useTranslations("about");

  return (
    <AppLink
      href={SITE.sunflowUrl}
      className="group flex max-w-[520px] items-center gap-4 rounded-2xl border border-line bg-surface py-4 pr-4 pl-[18px] transition-[border-color,translate] duration-300 hover:-translate-y-[3px] hover:border-brand max-[760px]:flex-wrap"
    >
      <span className="grid size-10 flex-none place-items-center rounded-[9px] bg-sun text-on-sun">
        <Rocket className="size-4" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <span className="flex flex-1 flex-col text-sm text-subtle">
        {t("startupLabel")}
        <b className="mt-1 font-display text-xl font-bold tracking-[-0.03em] text-ink">Sunflow</b>
      </span>
      {/* Looks like a mini ghost button; the whole card is the link. */}
      <AppButton
        asChild
        variant="ghost"
        size="mini"
        rightIcon="external"
        className="group-hover:border-ink max-[760px]:w-full"
      >
        <span>{SUNFLOW_HOST}</span>
      </AppButton>
    </AppLink>
  );
}
