import { useTranslations } from "next-intl";

import { CodeCard } from "@/components/common/CodeCard";
import { CvLinks } from "@/components/common/CvLinks";
import { markTag } from "@/components/common/mark-tag";
import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";

/** Home "About" summary: two short paragraphs, CV links, and the berk.ts code card. */
export function AboutPreview() {
  const t = useTranslations();

  return (
    <section aria-labelledby="about-title">
      <Container>
        <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center gap-16 border-t border-line pt-[104px] pb-6 max-[1080px]:grid-cols-1 max-[1080px]:gap-10 max-[760px]:pt-16 max-[760px]:pb-2">
          <Reveal className="flex flex-col gap-[26px]">
            <SectionHeading
              id="about-title"
              title={t("about.title")}
              link={{ href: "/about", label: t("common.readMore") }}
              className="mb-1.5"
            />
            <p
              className="reveal max-w-[52ch] text-[22px] leading-[1.55] text-pretty text-ink max-[760px]:text-[19px]"
              style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
            >
              {t.rich("about.home.p1", markTag)}
            </p>
            <p
              className="reveal max-w-[56ch] text-[17px] text-subtle"
              style={{ "--reveal-delay": "0.18s" } as React.CSSProperties}
            >
              {t("about.home.p2")}
            </p>

            <CvLinks />
          </Reveal>
          <CodeCard className="rotate-[1.2deg] transition-[rotate] duration-500 ease-out-soft hover:rotate-0 max-[1080px]:rotate-0" />
        </div>
      </Container>
    </section>
  );
}
