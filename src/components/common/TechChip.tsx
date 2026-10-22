import { cn } from "@/lib/utils";
import type { TechItem } from "@/types/tech";

import { TechIcon } from "./TechIcon";

/** Small logo + label chip (project rows, project page). */
export function TechChip({ tech, className }: { tech: TechItem; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-8 items-center gap-[7px] rounded-[9px] border border-line bg-surface pr-3 pl-2.5 text-[13px] font-medium",
        className,
      )}
    >
      <TechIcon tech={tech.key} label={tech.label} size={14} />
      {tech.label}
    </span>
  );
}
