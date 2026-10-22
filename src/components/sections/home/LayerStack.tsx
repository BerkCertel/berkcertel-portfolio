import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import styles from "./LayerStack.module.css";

/**
 * Hero visual (H3 "live system"): three isometric layers — data rows, service boxes, interface —
 * that float, with a cursor clicking the UI button, services lighting up and rows "querying".
 * Decorative; exposed to assistive tech as one labelled image.
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
        </div>
        <div className={cn(styles.lay, styles.l2)}>
          <div className={styles.svcs}>
            <b className={styles.gw} />
            {Array.from({ length: 6 }, (_, i) => (
              <b key={i} />
            ))}
          </div>
        </div>
        <div className={cn(styles.lay, styles.l3)}>
          <div className={styles.ui}>
            <div className={styles.hd} />
            <div className={styles.ln} />
            <div className={styles.btn} />
            <div className={styles.cd} />
            <div className={styles.c2} />
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
