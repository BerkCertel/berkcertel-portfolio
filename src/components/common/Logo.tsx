import { useTranslations } from "next-intl";

import { SITE } from "@/constants/site";
import { cn } from "@/lib/utils";

import { AppLink } from "./AppLink";

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
      <svg
        width="30"
        height="30"
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="flex-none transition-transform duration-500 ease-out-soft group-hover:-translate-y-0.5 group-hover:-rotate-6"
      >
        <path d="M3 21.5L5.6 20.2L16 25.4L26.4 20.2L29 21.5L16 28Z" fill="currentColor" />
        <path d="M3 15.5L5.6 14.2L16 19.4L26.4 14.2L29 15.5L16 22Z" fill="currentColor" />
        <path d="M16 3L29 9.5L16 16L3 9.5Z" className="fill-brand" />
      </svg>
      <span>
        {FIRST_NAME}
        <span className="text-subtle">{LAST_NAME}</span>
      </span>
    </AppLink>
  );
}
