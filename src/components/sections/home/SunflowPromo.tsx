import { useTranslations } from "next-intl";

import { AppButton } from "@/components/common/AppButton";
import { AppLink } from "@/components/common/AppLink";
import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SITE } from "@/constants/site";

/** Languages Sunflow serves guests in (shown as chips on the art panel). */
const SUNFLOW_LANGUAGES = ["TR", "EN", "DE", "FR", "RU"];

/** "My startup": heading + two-column Sunflow card (dark art panel with a floating ticket, pitch). */
export function SunflowPromo() {
  const t = useTranslations("sunflow");

  return (
    <section aria-labelledby="startup-title" className="pb-30 max-[760px]:pb-20">
      <Container>
        <SectionHeading id="startup-title" title={t("title")} />
        <Reveal
          className="reveal grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] overflow-hidden rounded-[28px] border border-line bg-surface max-[1080px]:grid-cols-1"
          index={0}
        >
          {/* Decorative art: drifting light, floating ticket, language chips. */}
          <div
            aria-hidden="true"
            className="relative grid min-h-[400px] place-items-center overflow-hidden bg-deep before:absolute before:inset-0 before:animate-[drift_14s_ease-in-out_infinite_alternate] before:bg-[radial-gradient(circle_at_30%_20%,color-mix(in_srgb,var(--c-sun)_22%,transparent),transparent_55%),radial-gradient(circle_at_80%_90%,color-mix(in_srgb,var(--c-accent)_30%,transparent),transparent_55%)] before:content-[''] max-[1080px]:min-h-[340px]"
          >
            <div className="grid w-full animate-float place-items-center">
              <div className="flex w-[min(64%,320px)] -rotate-4 flex-col gap-3 rounded-2xl bg-surface p-[18px] text-ink shadow-[0_30px_60px_-30px_color-mix(in_srgb,black_60%,transparent)] max-[760px]:gap-2 max-[760px]:p-3.5">
                <div className="flex items-center justify-between font-mono text-[11px] leading-none font-medium tracking-[0.06em] text-subtle uppercase">
                  <span>{t("ticket.place")}</span>
                  <span>TR</span>
                </div>
                <div className="font-display text-[22px] font-bold tracking-[-0.03em] max-[760px]:text-lg">
                  {t("ticket.title")}
                </div>
                {(["item1", "item2"] as const).map((item) => (
                  <div
                    key={item}
                    className="flex justify-between border-t border-dashed border-line py-2 text-sm"
                  >
                    <span>{t(`ticket.${item}`)}</span>
                    <span className="font-mono">×1</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 font-mono text-xs leading-none font-medium text-ok">
                  <span className="size-2 flex-none animate-pulse-dot rounded-full bg-ok" />
                  {t("ticket.status")}
                </div>
              </div>
            </div>
            <div className="absolute bottom-[22px] left-6 flex gap-1.5">
              {SUNFLOW_LANGUAGES.map((code) => (
                <span
                  key={code}
                  className="rounded-md border border-deep-line px-[9px] py-[7px] font-mono text-[11px] leading-none font-medium text-on-deep"
                >
                  {code}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center gap-5 p-14 max-[760px]:px-[22px] max-[760px]:py-7">
            <h3 className="font-display text-[clamp(40px,4.6vw,64px)] leading-[0.95] font-bold tracking-[-0.05em]">
              Sunflow
            </h3>
            <p className="max-w-[42ch] text-lg text-subtle">{t("description")}</p>
            <AppButton asChild rightIcon="external" className="self-start">
              <AppLink href={SITE.sunflowUrl}>{t("cta")}</AppLink>
            </AppButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
