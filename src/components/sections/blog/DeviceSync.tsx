import { VISUAL_CELL_CLASS } from "@/components/common/styles";
import { cn } from "@/lib/utils";

import styles from "./DeviceSync.module.css";

/** V4 "web + mobile sync": a browser and a phone; a highlighted card appears in both (4s loop). */
export function DeviceSync() {
  return (
    <div className={VISUAL_CELL_CLASS} aria-hidden="true">
      <div className={styles.devices}>
        <div className={styles.browser}>
          <div className={styles.toolbar}>
            <i />
            <i />
            <i />
          </div>
          <div className={styles.screen}>
            <span className={styles.row} />
            <span className={cn(styles.row, styles.short)} />
            <span className={styles.card} />
            <span className={styles.row} />
          </div>
        </div>
        <div className={styles.phone}>
          <div className={styles.screen}>
            <span className={styles.row} />
            <span className={styles.card} />
            <span className={cn(styles.row, styles.short)} />
          </div>
        </div>
      </div>
    </div>
  );
}
