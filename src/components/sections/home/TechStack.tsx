import { useTranslations } from "next-intl";

import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { TechTile } from "@/components/common/TechTile";
import { TECH_CATEGORIES } from "@/constants/tech-stack";
import { cn } from "@/lib/utils";

import { Marquee } from "./Marquee";

/** Desktop column span per card (3-column grid); 2 columns ≤1080px, 1 column ≤760px. */
const SPAN_CLASS = {
  1: "col-span-1",
  2: "col-span-2 max-[760px]:col-span-1",
  3: "col-span-3 max-[1080px]:col-span-2 max-[760px]:col-span-1",
} as const;

/** Marquee strip + "Technologies": category cards with brand-colored tech tiles. */
export function TechStack() {
  const t = useTranslations("tech");

  return (
    <section aria-labelledby="stack-title">
      <Marquee />
      <div className="py-30 max-[760px]:py-20">
        <Container>
          <SectionHeading id="stack-title" title={t("title")} />
          <Reveal className="grid grid-cols-3 gap-5 max-[1080px]:grid-cols-2 max-[760px]:grid-cols-1">
            {TECH_CATEGORIES.map(({ key, icon: Icon, span, items }, card) => (
              <div
                key={key}
                className={cn(
                  "reveal rounded-[20px] border border-line bg-surface p-6 transition-colors duration-300 hover:border-[color-mix(in_srgb,var(--c-ink)_35%,var(--c-line))] max-[760px]:p-5",
                  SPAN_CLASS[span],
                )}
                style={{ "--i": card } as React.CSSProperties}
              >
                <div className="mb-[18px] flex items-center gap-2.5">
                  <span className="grid size-8 place-items-center rounded-[9px] bg-ink text-bg">
                    <Icon className="size-[17px]" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="flex-1 font-mono text-xs leading-none font-medium tracking-[0.09em] text-subtle uppercase">
                    {t(`categories.${key}`)}
                  </h3>
                  <span className="rounded-md border border-line px-2 py-1.5 font-mono text-xs leading-none font-medium text-subtle">
                    {String(items.length).padStart(2, "0")}
                  </span>
                </div>
                <ul className="flex flex-wrap gap-2.5">
                  {items.map((tech, i) => (
                    <li key={tech.label}>
                      <TechTile
                        tech={tech}
                        className="reveal"
                        style={
                          {
                            "--i": i,
                            "--reveal-delay": `${card * 80 + 150}ms`,
                            "--reveal-step": "35ms",
                            "--reveal-duration": "0.6s",
                          } as React.CSSProperties
                        }
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
