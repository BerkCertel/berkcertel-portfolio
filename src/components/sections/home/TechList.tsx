import { Reveal } from "@/components/common/Reveal";
import { TechChip } from "@/components/common/TechChip";
import { TECH_CATEGORIES } from "@/constants/tech-stack";

import { TechCategoryLabel } from "./TechCategoryLabel";

/** Mobile "Technologies": every category at once, small logo chips, nothing moves on its own. */
export function TechList() {
  return (
    <Reveal style={{ "--reveal-duration": "0.4s", "--reveal-step": "40ms" } as React.CSSProperties}>
      <ul>
        {TECH_CATEGORIES.map((category, i) => (
          <li
            key={category.key}
            style={{ "--i": i } as React.CSSProperties}
            className="reveal border-b border-line py-3.5 first:border-t"
          >
            <TechCategoryLabel category={category} compact className="mb-2.5" />
            <ul className="flex flex-wrap gap-1.5">
              {category.items.map((tech) => (
                <li key={tech.label}>
                  <TechChip
                    tech={tech}
                    iconSize={15}
                    className="gap-1.5 pr-2.5 pl-[7px] text-[12.5px]"
                  />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
