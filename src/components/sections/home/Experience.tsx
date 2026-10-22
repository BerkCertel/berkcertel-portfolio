import { useTranslations } from "next-intl";

import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/common/Section";
import { EXPERIENCE } from "@/constants/experience";
import { cn } from "@/lib/utils";

/**
 * Work history: sticky title on the left, vertical timeline on the right (current roles have a
 * filled brand dot with a halo). Page-independent: used on Home and About.
 */
export function Experience({ className }: { className?: string }) {
  const t = useTranslations("experience");

  return (
    <Section aria-labelledby="experience-title" className={className}>
      <Container className="grid grid-cols-[minmax(0,320px)_minmax(0,1fr)] gap-16 max-[1080px]:grid-cols-1 max-[1080px]:gap-8">
        <div className="sticky top-30 self-start max-[1080px]:static">
          <h2
            id="experience-title"
            className="font-display text-[clamp(36px,4.6vw,60px)] leading-none font-bold tracking-[-0.045em]"
          >
            {t("title")}
          </h2>
        </div>
        <Reveal>
          <ol className="relative before:absolute before:top-2.5 before:bottom-2.5 before:left-1.5 before:w-0.5 before:bg-[linear-gradient(var(--c-accent)_0_38%,var(--c-line)_38%)]">
            {EXPERIENCE.map(({ key, current }, i) => (
              <li
                key={key}
                className="reveal relative pb-11 pl-[42px] last:pb-0"
                style={{ "--i": i, "--reveal-step": "0.1s" } as React.CSSProperties}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-[7px] left-0 size-3.5 rounded-full border-2",
                    current
                      ? "border-brand bg-brand shadow-[0_0_0_6px_color-mix(in_srgb,var(--c-accent)_18%,transparent)]"
                      : "border-subtle bg-bg",
                  )}
                />
                <span className="font-mono text-[12.5px] leading-none font-medium tracking-[0.02em] text-brand">
                  {t(`items.${key}.period`)}
                </span>
                <h3 className="mt-2.5 mb-2 font-display text-[26px] leading-[1.15] font-bold tracking-[-0.035em] max-[760px]:text-[22px]">
                  {t(`items.${key}.role`)}{" "}
                  <span className="font-semibold text-subtle">· {t(`items.${key}.company`)}</span>
                </h3>
                <p className="max-w-[62ch] text-subtle">{t(`items.${key}.description`)}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </Section>
  );
}
