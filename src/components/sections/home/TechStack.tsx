import { useTranslations } from "next-intl";

import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { TechTile } from "@/components/common/TechTile";
import { TECH_CATEGORIES } from "@/constants/tech-stack";
import { cn } from "@/lib/utils";

/** Each lane needs enough tiles to fill the track; the list is then doubled for the -50% loop. */
const MIN_TILES = 8;

/**
 * "Technologies" (T3): one endlessly scrolling lane per category, alternating direction,
 * paused on hover. With reduced motion the lane stops and wraps its tiles instead.
 */
export function TechStack() {
  const t = useTranslations("tech");

  return (
    <Section aria-labelledby="stack-title">
      <Container>
        <SectionHeading id="stack-title" title={t("title")} />
        <ul>
          {TECH_CATEGORIES.map(({ key, icon: Icon, items }, lane) => {
            const copies = Math.max(2, Math.ceil(MIN_TILES / items.length)) * 2;
            return (
              <li
                key={key}
                className="group grid grid-cols-[230px_minmax(0,1fr)] items-center gap-4 border-b border-line py-3.5 first:border-t max-[760px]:grid-cols-1"
              >
                <h3 className="flex items-center gap-2.5 font-semibold">
                  <span className="grid size-8 flex-none place-items-center rounded-[9px] bg-ink text-bg">
                    <Icon className="size-[17px]" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  {t(`categories.${key}`)}
                  <span className="mr-3 ml-auto font-mono text-xs leading-none font-medium text-subtle">
                    {String(items.length).padStart(2, "0")}
                  </span>
                </h3>
                <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)] motion-reduce:[mask-image:none]">
                  <ul
                    className={cn(
                      "flex w-max animate-[marquee_var(--dur)_linear_infinite] gap-2.5 group-hover:[animation-play-state:paused]",
                      "motion-reduce:w-auto motion-reduce:animate-none motion-reduce:flex-wrap",
                      lane % 2 === 1 && "[animation-direction:reverse]",
                    )}
                    style={{ "--dur": `${18 + items.length * 2}s` } as React.CSSProperties}
                  >
                    {Array.from({ length: copies }, (_, copy) =>
                      items.map((tech) => (
                        <li
                          key={`${copy}-${tech.label}`}
                          // Only the first copy is real content; the rest just keep the loop full.
                          aria-hidden={copy > 0 || undefined}
                          className={cn(copy > 0 && "motion-reduce:hidden")}
                        >
                          <TechTile tech={tech} />
                        </li>
                      )),
                    )}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
