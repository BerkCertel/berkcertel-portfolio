import { useTranslations } from "next-intl";

import { SITE } from "@/constants/site";
import { cn } from "@/lib/utils";

import { AppLink } from "./AppLink";
import { LayerMark } from "./icons";

const [FIRST_NAME = "", LAST_NAME = ""] = SITE.name.split(" ");

const LAYER_MOTION = "transition-transform duration-500 ease-out-soft";

/**
 * Layer mark + "Berk" (ink) + "Certel" (muted), linking home. Hover: the top layer lifts, the
 * bottom layer drops, and the name waves letter by letter while "Certel" turns ink.
 */
export function Logo({ className }: { className?: string }) {
  const t = useTranslations("common");
  const letters = [...FIRST_NAME]
    .map((char) => ({ char, muted: false }))
    .concat([...LAST_NAME].map((char) => ({ char, muted: true })));

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
        className="flex-none"
        topClassName={cn("fill-brand group-hover:-translate-y-[3px]", LAYER_MOTION)}
        bottomClassName={cn("group-hover:translate-y-[2.5px]", LAYER_MOTION)}
      />
      <span aria-hidden="true" className="inline-flex">
        {letters.map(({ char, muted }, i) => (
          <i
            key={i}
            style={{ transitionDelay: `${i * 35}ms` }}
            className={cn(
              "inline-block not-italic transition-[translate,color] duration-450 ease-out-soft group-hover:-translate-y-1",
              muted && "text-subtle group-hover:text-ink",
            )}
          >
            {char}
          </i>
        ))}
      </span>
    </AppLink>
  );
}
