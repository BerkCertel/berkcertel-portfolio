import { VISUAL_CELL_CLASS } from "@/components/common/styles";
import { cn } from "@/lib/utils";

import styles from "./CommitGraph.module.css";

/** Commits on main and on a feature branch: [x, y, branch, pop-in delay in seconds]. */
const COMMITS: [number, number, "main" | "feature", number][] = [
  [40, 150, "main", 0.1],
  [120, 150, "main", 0.4],
  [190, 70, "feature", 1.2],
  [260, 70, "feature", 1.6],
  [330, 70, "feature", 2.0],
  [250, 150, "main", 1.4],
  [430, 150, "main", 2.8],
  [500, 150, "main", 3.2],
];

/** Branch names on the graph (git terms, not translated): [text, x, y]. */
const LABELS: [string, number, number][] = [
  ["main", 20, 182],
  ["feature/blog", 190, 50],
  ["merge", 402, 182],
];

/** V3 "commit graph": main line draws, a feature branch draws and merges back (7s loop). */
export function CommitGraph() {
  return (
    <div className={VISUAL_CELL_CLASS} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 540 230">
        <path className={cn(styles.seg, styles.main)} d="M20 150 H520" />
        <path
          className={cn(styles.seg, styles.feature)}
          d="M120 150 C150 150,150 70,190 70 H360 C400 70,400 150,430 150"
          style={{ animationDelay: "0.6s" }}
        />
        {COMMITS.map(([cx, cy, branch, delay]) => (
          <circle
            key={`${cx}-${cy}`}
            className={cn(styles.dot, branch === "main" ? styles.main : styles.feature)}
            cx={cx}
            cy={cy}
            r="7"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
        {LABELS.map(([text, x, y]) => (
          <text key={text} className={styles.label} x={x} y={y}>
            {text}
          </text>
        ))}
      </svg>
    </div>
  );
}
