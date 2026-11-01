import { TechTile } from "@/components/common/TechTile";
import { TECH_CATEGORIES } from "@/constants/tech-stack";

import { TechCategoryLabel } from "./TechCategoryLabel";

/** Entrance stagger (s): rows, and tiles within the whole list. */
const ROW_STEP = 0.05;
const TILE_STEP = 0.025;

/**
 * Desktop static view (G1): the lane rows, but every tile is visible and wraps.
 * Mounted only when the visitor switches to it, so the rise animation plays right away.
 */
export function TechGrid() {
  return (
    <ul>
      {TECH_CATEGORIES.map((category, row) => (
        <li
          key={category.key}
          style={{ animationDelay: `${row * ROW_STEP}s` }}
          className="grid grid-cols-[260px_minmax(0,1fr)] items-start gap-6 border-b border-line py-[22px] first:border-t motion-safe:animate-[rise_0.5s_var(--ease-out-soft)_both]"
        >
          <TechCategoryLabel category={category} className="pt-[7px] *:last:mr-2" />
          <ul className="flex flex-wrap gap-2.5">
            {category.items.map((tech, i) => (
              <li key={tech.label}>
                <TechTile
                  tech={tech}
                  style={{ animationDelay: `${row * ROW_STEP + i * TILE_STEP}s` }}
                  className="motion-safe:animate-[rise_0.45s_var(--ease-out-soft)_both]"
                />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
