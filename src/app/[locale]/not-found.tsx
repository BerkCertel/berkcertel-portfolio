import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import { AppButton } from "@/components/common/AppButton";
import { AppLink } from "@/components/common/AppLink";
import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils";

import styles from "./not-found.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.pages.notFound");
  return { title: t("title"), robots: { index: false, follow: true } };
}

/** Localized 404 for unknown paths and notFound() calls (via the [...rest] catch-all). */
export default function NotFound() {
  const t = useTranslations();
  const layer = (n: 1 | 2 | 3) =>
    `L${n} · ${n === 3 ? t("notFound.missing") : t(`notFound.layers.${n === 1 ? "data" : "services"}`)}`;

  return (
    <Container className="grid min-h-[760px] grid-cols-2 items-center gap-10 py-14 max-[1080px]:grid-cols-1 max-[760px]:min-h-0 max-[760px]:pt-10 max-[760px]:pb-[72px]">
      <div className="flex flex-col gap-[26px]">
        <p className="eyebrow">{t("notFound.eyebrow")}</p>
        <h1 className="font-display text-[clamp(120px,22vw,300px)] leading-[0.8] font-bold tracking-[-0.045em]">
          404
        </h1>
        <p className="max-w-[54ch] text-[19px] leading-[1.55] text-pretty text-subtle max-[760px]:text-[17px]">
          {t("notFound.lead")}
        </p>
        <div className="flex flex-wrap gap-3">
          <AppButton asChild rightIcon="arrow">
            <AppLink href="/">{t("notFound.home")}</AppLink>
          </AppButton>
          <AppButton asChild variant="ghost">
            <AppLink href="/projects">{t("notFound.projects")}</AppLink>
          </AppButton>
        </div>
      </div>
      <div className={styles.fall} aria-hidden="true">
        {([1, 2, 3] as const).map((n) => (
          <div key={n} className={cn(styles.plane, styles[`p${n}`])}>
            <span className={styles.label}>{layer(n)}</span>
          </div>
        ))}
      </div>
    </Container>
  );
}
