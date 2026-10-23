import { useTranslations } from "next-intl";

import { HERO_SERVICES } from "@/constants/tech-stack";
import { cn } from "@/lib/utils";

import styles from "./LayerStack.module.css";

/**
 * Hero visual (H3 "live system"): three isometric layers — database rows, API + service boxes,
 * interface — that float, with a cursor clicking the UI button, services lighting up and rows
 * "querying". Small mono labels sit on the layers. Decorative; exposed as one labelled image.
 */
export function LayerStack() {
  const t = useTranslations("hero");

  return (
    <div role="img" aria-label={t("stackLabel")} className={styles.stage}>
      <div className={styles.iso} aria-hidden="true">
        <div className={cn(styles.lay, styles.l1)}>
          <div className={styles.rows}>
            {Array.from({ length: 10 }, (_, i) => (
              <i key={i} />
            ))}
          </div>
          <span className={cn(styles.tag, styles.dbTag)}>{t("layers.db")}</span>
        </div>
        <div className={cn(styles.lay, styles.l2)}>
          <div className={styles.svcs}>
            <b className={styles.gw}>{t("layers.api")}</b>
            {HERO_SERVICES.map((name) => (
              <b key={name}>{name}</b>
            ))}
          </div>
        </div>
        <div className={cn(styles.lay, styles.l3)}>
          <div className={styles.ui}>
            <div className={styles.hd} />
            <div className={styles.ln} />
            <div className={styles.btn} />
            <div className={styles.cd} />
            <div className={styles.c2}>
              <span className={styles.tag}>{t("layers.ui")}</span>
            </div>
            <span className={styles.cursor}>
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path
                  d="M4 2l16 9-7 2-3 7z"
                  fill="var(--c-ink)"
                  stroke="var(--c-surface)"
                  strokeWidth="1.5"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
