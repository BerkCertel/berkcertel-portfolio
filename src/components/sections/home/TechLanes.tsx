import { TechTile } from "@/components/common/TechTile";
import { TECH_CATEGORIES } from "@/constants/tech-stack";
import { cn } from "@/lib/utils";

import { TechCategoryLabel } from "./TechCategoryLabel";

/** Each lane needs enough tiles to fill the track; the list is then doubled for the -50% loop. */
const MIN_TILES = 8;

/** Lane speed: the reference duration (18s + 2s per tile) stretched for a calmer scroll. */
const SLOWDOWN = 1.6;

/**
 * Desktop "Technologies" (T3): one endlessly scrolling lane per category, alternating direction,
 * paused on hover. With reduced motion the lane stops and wraps its tiles instead.
 */
export function TechLanes() {
  return (
    <ul>
      {TECH_CATEGORIES.map((category, lane) => {
        const { key, items } = category;
        const copies = Math.max(2, Math.ceil(MIN_TILES / items.length)) * 2;
        return (
          <li
            key={key}
            className="group grid grid-cols-[240px_minmax(0,1fr)] items-center gap-4 border-b border-line py-3.5 first:border-t"
          >
            <TechCategoryLabel category={category} className="*:last:mr-3" />
            {/* Vertical padding (cancelled by negative margin) leaves room for the hover lift and glow. */}
            <div className="-my-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)] py-6 motion-reduce:[mask-image:none]">
              <ul
                className={cn(
                  "flex w-max animate-[marquee_var(--dur)_linear_infinite] gap-2.5 group-hover:[animation-play-state:paused]",
                  "motion-reduce:w-auto motion-reduce:animate-none motion-reduce:flex-wrap",
                  lane % 2 === 1 && "[animation-direction:reverse]",
                )}
                style={{ "--dur": `${(18 + items.length * 2) * SLOWDOWN}s` } as React.CSSProperties}
              >
                {Array.from({ length: copies }, (_, copy) =>
                  items.map((tech) => (
                    <li
                      key={`${copy}-${tech.label}`}
                      // Only the first copy is real content; the rest just keep the loop full.
                      aria-hidden={copy > 0 || undefined}
                      className={cn(copy > 0 && "motion-reduce:hidden")}
                    >
                      <TechTile tech={tech} />
                    </li>
                  )),
                )}
              </ul>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
