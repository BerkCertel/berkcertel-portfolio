import { useTranslations } from "next-intl";

import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/common/Section";
import { TechChip } from "@/components/common/TechChip";
import { TECH_BANDS, TECH_CATEGORIES } from "@/constants/tech-stack";
import { cn } from "@/lib/utils";
import type { TechBand, TechItem } from "@/types/tech";

/** Band chips in TECH_CATEGORIES order, each technology once (by label). */
function bandItems({ categories }: TechBand) {
  const items = new Map<string, TechItem>();
  for (const category of TECH_CATEGORIES) {
    if (!categories.includes(category.key)) continue;
    for (const tech of category.items) if (!items.has(tech.label)) items.set(tech.label, tech);
  }
  return [...items.values()];
}

/**
 * About page "Technologies I use" (A3): layers like the hero stack, slightly tilted back;
 * a band straightens and picks up the accent border and glow on hover.
 */
export function TechBands() {
  const t = useTranslations();

  return (
    <Section aria-labelledby="tech-bands-title" className="pb-0 max-[760px]:pb-0">
      <Container>
        <h2
          id="tech-bands-title"
          className="mb-[22px] font-display text-[30px] leading-none font-bold tracking-[-0.04em]"
        >
          {t("about.tech.title")}
        </h2>
        <Reveal
          style={{ "--reveal-duration": "0.5s" } as React.CSSProperties}
          className="flex flex-col gap-3"
        >
          {TECH_BANDS.map((band, i) => (
            <div
              key={band.key}
              style={{ "--i": i } as React.CSSProperties}
              className={cn(
                "reveal grid origin-bottom grid-cols-[200px_minmax(0,1fr)] items-center gap-5 rounded-[20px] border px-[22px] py-[18px] max-[860px]:grid-cols-1",
                // Hover uses `transform`; the entrance animation holds the `translate` property.
                "[transform:perspective(1200px)_rotateX(7deg)] [transition:transform_0.5s_var(--ease-out-soft),box-shadow_0.4s,border-color_0.4s] hover:transform-none hover:border-brand hover:shadow-[0_22px_40px_-26px_var(--c-accent)]",
                band.dark
                  ? "border-deep-line bg-deep text-on-deep [&_.fill-ink]:fill-on-deep"
                  : "border-line bg-surface",
              )}
            >
              <div>
                <h3 className="font-display text-[22px] leading-none font-bold tracking-[-0.03em]">
                  {t(`about.tech.bands.${band.key}`)}
                </h3>
                <p
                  className={cn(
                    "mt-2 font-mono text-[11px] leading-[1.3] font-medium tracking-[0.06em] uppercase",
                    band.dark ? "text-deep-muted" : "text-subtle",
                  )}
                >
                  {band.categories.map((key) => t(`tech.categories.${key}`)).join(" · ")}
                </p>
              </div>
              <ul className="flex flex-wrap gap-[7px]">
                {bandItems(band).map((tech) => (
                  <li key={tech.label}>
                    <TechChip
                      tech={tech}
                      iconSize={15}
                      className={cn(
                        "pr-[11px] pl-2 transition-[border-color,translate] duration-250 ease-out-soft hover:-translate-y-0.5 hover:border-(--c)",
                        band.dark ? "border-deep-line bg-on-deep/6 text-on-deep" : "bg-bg",
                      )}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
