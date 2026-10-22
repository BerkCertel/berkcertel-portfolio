import { Fragment } from "react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { PROCESS_STAGGER, PROCESS_STEPS } from "@/constants/process";

/** The endless highlight starts 1s after the last card has risen in; steps are 1.2s apart. */
const GLOW_START = (PROCESS_STEPS.length - 1) * PROCESS_STAGGER + 1;

/**
 * Five step cards with arrows in between. Entrance (per step i): card rises at i × stagger,
 * text opens +0.25s, the arrow after it draws +0.5s, its head shows +0.9s. Afterwards the steps
 * light up in turn forever. All of it waits for the section to be in view (`reveal-wait`).
 */
export function Process() {
  const t = useTranslations("process");

  return (
    <Section aria-labelledby="process-title" className="pt-0 max-[760px]:pt-0">
      <Container>
        <SectionHeading id="process-title" title={t("title")} />
        <Reveal>
          <ol className="flex items-stretch max-[1080px]:flex-wrap max-[1080px]:gap-4 max-[760px]:flex-col max-[760px]:gap-0">
            {PROCESS_STEPS.map(({ key, icon: Icon }, i) => {
              const vars = {
                "--i": i,
                "--stagger": `${PROCESS_STAGGER}s`,
                "--glow-start": `${GLOW_START}s`,
              } as React.CSSProperties;

              return (
                <Fragment key={key}>
                  <li
                    className="min-w-0 flex-1 max-[1080px]:basis-[calc(50%-8px)] max-[1080px]:last:basis-full max-[760px]:flex-none"
                    style={vars}
                  >
                    <div className="reveal-wait relative h-full animate-[rise_0.6s_var(--ease-out-soft)_both] overflow-hidden rounded-[18px] border border-line bg-surface p-[22px] transition-[border-color,transform] duration-300 [animation-delay:calc(var(--i)*var(--stagger))] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:origin-left after:scale-x-0 after:animate-[step-bar_6s_ease-in-out_infinite] after:bg-brand after:content-[''] after:[animation-delay:calc(var(--glow-start)+var(--i)*1.2s)] hover:transform-[translateY(-3px)] hover:border-brand">
                      <div className="mb-[18px] flex items-center justify-between">
                        <span className="font-mono text-xs leading-none font-medium text-brand">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="reveal-wait grid size-10 animate-[step-glow_6s_ease-in-out_infinite] place-items-center rounded-[11px] bg-ink text-bg [animation-delay:calc(var(--glow-start)+var(--i)*1.2s)]">
                          <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="font-display text-[22px] leading-[1.1] font-bold tracking-[-0.035em]">
                        {t(`steps.${key}.title`)}
                      </h3>
                      <p className="reveal-wait mt-2 animate-[open-text_0.6s_var(--ease-out-soft)_both] overflow-hidden text-[14.5px] text-subtle [animation-delay:calc(var(--i)*var(--stagger)+0.25s)]">
                        {t(`steps.${key}.description`)}
                      </p>
                    </div>
                  </li>
                  {i < PROCESS_STEPS.length - 1 && (
                    <li
                      aria-hidden="true"
                      className="flex w-[52px] flex-none items-center pb-9 text-brand max-[1080px]:hidden max-[760px]:flex max-[760px]:h-10 max-[760px]:w-auto max-[760px]:pb-0 max-[760px]:pl-[30px]"
                      style={vars}
                    >
                      <svg
                        viewBox="0 0 64 16"
                        preserveAspectRatio="none"
                        className="h-4 w-full overflow-visible fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round] max-[760px]:h-9 max-[760px]:w-4 max-[760px]:rotate-90"
                      >
                        <path
                          d="M0 8 H56"
                          className="reveal-wait animate-[draw-line_0.45s_ease_both] [animation-delay:calc(var(--i)*var(--stagger)+0.5s)] [stroke-dasharray:60]"
                        />
                        <path
                          d="M50 2 L58 8 L50 14"
                          className="reveal-wait animate-[fade-in_0.2s_ease_both] [animation-delay:calc(var(--i)*var(--stagger)+0.9s)]"
                        />
                      </svg>
                    </li>
                  )}
                </Fragment>
              );
            })}
          </ol>
        </Reveal>
      </Container>
    </Section>
  );
}
