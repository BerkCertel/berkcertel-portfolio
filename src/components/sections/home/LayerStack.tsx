import { useTranslations } from "next-intl";

import { STACK_LAYERS } from "@/constants/tech-stack";

import styles from "./LayerStack.module.css";

/** Connector lines on the services plane (positions from the design). */
const WIRES: React.CSSProperties[] = [
  { left: 165, top: 70, width: 1, height: 70 },
  { left: 65, top: 120, width: 200, height: 1 },
  { left: 65, top: 120, width: 1, height: 20 },
  { left: 265, top: 120, width: 1, height: 20 },
  { left: 165, top: 180, width: 1, height: 60 },
];

const LEGEND_CLASS = { ui: styles.lg3, services: styles.lg2, data: styles.lg1 };

/**
 * Decorative isometric stack (L1 data, L2 services, L3 interface) that tilts in, separates and
 * floats, with a legend card below. Exposed to assistive tech as one labelled image.
 */
export function LayerStack() {
  const t = useTranslations("hero");
  const label = (level: string, key: (typeof STACK_LAYERS)[number]["key"]) =>
    `${level} · ${t(`layers.${key}`)}`;

  return (
    <div role="img" aria-label={t("stackLabel")} className={styles.wrap}>
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.floaty}>
          <div className={styles.stk}>
            <div className={`${styles.pl} ${styles.pl1}`}>
              <div className={styles.rows}>
                {Array.from({ length: 13 }, (_, i) => (
                  <i key={i} />
                ))}
              </div>
              <span className={styles.plLab}>{label("L1", "data")}</span>
            </div>
            <div className={`${styles.pl} ${styles.pl2}`}>
              {WIRES.map((style, i) => (
                <div key={i} className={styles.wire} style={style} />
              ))}
              <div className={`${styles.svc} ${styles.gw}`}>gateway</div>
              <div className={`${styles.svc} ${styles.s1}`}>user</div>
              <div className={`${styles.svc} ${styles.s2}`}>chat</div>
              <div className={`${styles.svc} ${styles.s3}`}>mail</div>
              <div className={`${styles.svc} ${styles.q}`}>queue · cache</div>
              <span className={styles.plLab}>{label("L2", "services")}</span>
            </div>
            <div className={`${styles.pl} ${styles.pl3}`}>
              <div className={styles.uiBar}>
                <i />
                <i />
                <i />
                <b />
              </div>
              <div className={styles.uiH} />
              <div className={styles.uiS} />
              <div className={styles.uiBtn} />
              <div className={styles.uiC1} />
              <div className={styles.uiC2} />
              <span className={styles.plLab}>{label("L3", "ui")}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.legend}>
        {STACK_LAYERS.map((layer) => (
          <div key={layer.key} className={`${styles.lg} ${LEGEND_CLASS[layer.key]}`}>
            <b>{layer.level}</b>
            <strong>{t(`layers.${layer.key}`)}</strong>
            <span>{layer.items.join(" · ")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
