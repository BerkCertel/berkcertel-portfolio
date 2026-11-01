import { cn } from "@/lib/utils";
import type { TechItem } from "@/types/tech";

import { techColor, TechIcon } from "./TechIcon";

interface TechChipProps {
  tech: TechItem;
  /** Logo size in px (design: 14 in project rows, 15 in the tech lists). */
  iconSize?: number;
  className?: string;
}

/**
 * Small logo + label chip (project rows, mobile tech list, About bands).
 * Exposes the brand color as `--c` for hover styles added via `className`.
 */
export function TechChip({ tech, iconSize = 14, className }: TechChipProps) {
  return (
    <span
      style={{ "--c": techColor(tech.key) } as React.CSSProperties}
      className={cn(
        "inline-flex h-8 items-center gap-[7px] rounded-[9px] border border-line bg-surface pr-3 pl-2.5 text-[13px] font-medium",
        className,
      )}
    >
      <TechIcon tech={tech.key} label={tech.label} size={iconSize} />
      {tech.label}
    </span>
  );
}
