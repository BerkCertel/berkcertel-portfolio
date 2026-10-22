import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

type BoxTone = "dark" | "accent" | "plain" | "dashed";

/** Architecture rows, top to bottom; labels are code names, descriptions come from messages. */
const ROWS: { name: string; key: string; tone: BoxTone }[][] = [
  [{ name: "apps/web", key: "web", tone: "dark" }],
  [{ name: "api-gateway", key: "gateway", tone: "accent" }],
  [
    { name: "user", key: "user", tone: "plain" },
    { name: "chat", key: "chat", tone: "plain" },
    { name: "mail", key: "mail", tone: "plain" },
  ],
  [
    { name: "packages/auth", key: "auth", tone: "dashed" },
    { name: "packages/cache", key: "cache", tone: "dashed" },
    { name: "packages/database", key: "database", tone: "dashed" },
  ],
];

const TONE_CLASS: Record<BoxTone, { box: string; note: string }> = {
  dark: { box: "border-ink bg-ink text-bg", note: "text-bg/65" },
  accent: { box: "border-brand bg-brand text-on-brand", note: "text-on-brand/75" },
  plain: { box: "border-line bg-bg", note: "text-subtle" },
  dashed: { box: "border-dashed border-line bg-transparent", note: "text-subtle" },
};

const CAPTION_CLASS =
  "relative font-mono text-[11px] leading-none font-medium tracking-[0.08em] text-subtle uppercase";

/** miChat architecture: web → gateway → services → shared packages, drawn with CSS boxes. */
export function MichatDiagram() {
  const t = useTranslations("michat.diagram");

  return (
    <figure
      aria-label={t("label")}
      className="relative flex flex-col items-center gap-[22px] overflow-hidden rounded-3xl border border-line bg-surface p-12 before:absolute before:inset-0 before:bg-[radial-gradient(var(--c-line)_1px,transparent_1px)] before:bg-size-[22px_22px] before:opacity-70 before:content-[''] max-[760px]:px-4 max-[760px]:py-7"
    >
      <span className={CAPTION_CLASS}>{t("caption")}</span>
      {ROWS.map((row, i) => (
        <div key={row[0]!.key} className="contents">
          {i > 0 && (
            <div
              aria-hidden="true"
              className="relative h-7 w-px bg-subtle after:absolute after:-bottom-px after:-left-1 after:border-4 after:border-b-0 after:border-transparent after:border-t-subtle after:content-['']"
            />
          )}
          <div className="relative flex flex-wrap justify-center gap-[18px]">
            {row.map(({ name, key, tone }) => (
              <div
                key={key}
                className={cn(
                  "relative flex min-w-[170px] flex-col gap-1 rounded-[14px] border px-[18px] py-3.5 max-[760px]:min-w-0 max-[760px]:flex-[1_1_130px]",
                  TONE_CLASS[tone].box,
                )}
              >
                <b className="font-mono text-sm leading-[1.2] font-semibold">{name}</b>
                <span className={cn("text-[13px]", TONE_CLASS[tone].note)}>{t(key as "web")}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <span className={CAPTION_CLASS}>{t("infra")}</span>
    </figure>
  );
}
