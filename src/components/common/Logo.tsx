import { useTranslations } from "next-intl";

import { SITE } from "@/constants/site";
import { cn } from "@/lib/utils";

import { AppLink } from "./AppLink";
import { LayerMark } from "./icons";

const [FIRST_NAME, LAST_NAME] = SITE.name.split(" ");

/** Layer mark + "Berk" (ink) + "Certel" (muted), linking to the home page. */
export function Logo({ className }: { className?: string }) {
  const t = useTranslations("common");

  return (
    <AppLink
      href="/"
      aria-label={`${SITE.name}, ${t("home")}`}
      className={cn(
        "group inline-flex items-center gap-2.5 font-display text-[21px] font-bold tracking-[-0.045em] text-ink",
        className,
      )}
    >
      <LayerMark
        size={30}
        topClassName="fill-brand"
        className="flex-none transition-transform duration-500 ease-out-soft group-hover:-translate-y-0.5 group-hover:-rotate-6"
      />
      <span>
        {FIRST_NAME}
        <span className="text-subtle">{LAST_NAME}</span>
      </span>
    </AppLink>
  );
}
