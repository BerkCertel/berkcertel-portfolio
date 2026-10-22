import { useTranslations } from "next-intl";

import { AppButton } from "@/components/common/AppButton";
import { AppLink } from "@/components/common/AppLink";
import { BrandIcon } from "@/components/common/icons";
import { SOCIALS } from "@/constants/socials";

/** Note under the project list pointing to the GitHub profile (Home and Projects page). */
export function ProjectsMore() {
  const t = useTranslations("projects");

  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
      <p className="max-w-[60ch] text-subtle">{t("moreNote")}</p>
      <AppButton
        asChild
        variant="ghost"
        leftIcon={<BrandIcon name="github" />}
        rightIcon="external"
      >
        <AppLink href={SOCIALS.github.href}>{t("moreCta")}</AppLink>
      </AppButton>
    </div>
  );
}
