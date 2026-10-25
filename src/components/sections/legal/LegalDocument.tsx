import { useFormatter, useTranslations } from "next-intl";

import { AppLink } from "@/components/common/AppLink";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Container } from "@/components/common/Container";
import type { LegalSection } from "@/types/content";

interface LegalDocumentProps {
  /** Message namespace with `title`, `updated` and `sections` (privacy, cookies). */
  namespace: "privacy" | "cookies";
  /** ISO date of the current version. */
  updated: string;
}

/** Legal pages a paragraph can link to with <privacy>…</privacy> or <cookies>…</cookies>. */
const LEGAL_LINKS = { privacy: "/privacy", cookies: "/cookies" } as const;

/** A paragraph with its <privacy> / <cookies> tags turned into links. */
function Paragraph({ text }: { text: string }) {
  const parts = text.split(/<(privacy|cookies)>(.*?)<\/\1>/);
  return (
    <p>
      {parts.map((part, i) => {
        // split() puts the captured tag name at i % 3 === 1 and its label at i % 3 === 2.
        if (i % 3 === 1) return null;
        if (i % 3 === 2) {
          const page = parts[i - 1] as keyof typeof LEGAL_LINKS;
          return (
            <AppLink
              key={i}
              href={LEGAL_LINKS[page]}
              className="text-ink underline underline-offset-4 hover:text-brand"
            >
              {part}
            </AppLink>
          );
        }
        return part;
      })}
    </p>
  );
}

/** Plain text page: breadcrumb, h1, last-updated date, then h2 sections (paragraphs + list). */
export function LegalDocument({ namespace, updated }: LegalDocumentProps) {
  const t = useTranslations();
  const format = useFormatter();
  const sections = t.raw(`${namespace}.sections`) as LegalSection[];

  return (
    <Container>
      <article className="max-w-[70ch] pt-[72px] pb-30 max-[760px]:pt-11 max-[760px]:pb-20">
        <Breadcrumb
          items={[{ label: t("common.home"), href: "/" }, { label: t(`${namespace}.title`) }]}
        />
        <h1 className="mt-[18px] font-display text-[clamp(44px,6vw,80px)] leading-[0.95] font-bold tracking-[-0.045em] text-balance">
          {t(`${namespace}.title`)}
        </h1>
        <p className="mt-5 font-mono text-[13px] text-subtle">
          {t(`${namespace}.updated`, {
            date: format.dateTime(new Date(updated), { dateStyle: "long" }),
          })}
        </p>
        {sections.map((section) => (
          <section key={section.title} className="mt-12">
            <h2 className="font-display text-[26px] leading-[1.15] font-bold tracking-[-0.035em]">
              {section.title}
            </h2>
            <div className="mt-4 flex flex-col gap-3 text-lg leading-[1.65] text-subtle max-[760px]:text-[17px]">
              {section.body.map((paragraph) => (
                <Paragraph key={paragraph} text={paragraph} />
              ))}
              {section.list && (
                <ul className="flex flex-col gap-2.5">
                  {section.list.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 before:mt-3 before:size-1.5 before:flex-none before:rounded-[2px] before:bg-brand before:content-['']"
                    >
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}
      </article>
    </Container>
  );
}
