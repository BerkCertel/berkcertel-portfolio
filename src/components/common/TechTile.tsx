import { cn } from "@/lib/utils";
import type { TechItem } from "@/types/tech";

import { techColor, TechIcon } from "./TechIcon";

type TechTileProps = React.ComponentProps<"div"> & { tech: TechItem };

/**
 * Large logo + label tile (tech stack section). On hover it lifts and picks up the brand color
 * (`--c`) as border, glow and faint tint; the logo scales and tilts.
 * Add `className="reveal"` + `--i` to stagger it in inside a Reveal.
 */
export function TechTile({ tech, className, style, ...props }: TechTileProps) {
  return (
    <div
      style={{ ...style, "--c": techColor(tech.key) } as React.CSSProperties}
      className={cn(
        "group relative flex h-12 items-center gap-2.5 overflow-hidden rounded-xl border border-line bg-bg pr-4 pl-3 text-[15px] font-medium max-[760px]:h-11 max-[760px]:text-sm",
        // Hover lift uses `transform`: the entrance animation holds the `translate` property.
        "transition-[transform,border-color,box-shadow] duration-300 ease-out-soft hover:transform-[translateY(-3px)] hover:border-(--c) hover:shadow-[0_14px_26px_-18px_var(--c)]",
        "before:absolute before:inset-0 before:bg-(--c) before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-8",
        className,
      )}
      {...props}
    >
      <TechIcon
        tech={tech.key}
        label={tech.label}
        className="relative transition-[scale,rotate] duration-350 ease-out-soft group-hover:scale-112 group-hover:-rotate-6"
      />
      <span className="relative">{tech.label}</span>
    </div>
  );
}
