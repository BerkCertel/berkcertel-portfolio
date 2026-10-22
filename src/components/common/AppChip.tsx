import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { FOCUS_OUTLINE_CLASS } from "./styles";

type AppChipProps = Omit<
  React.ComponentProps<typeof Button>,
  "type" | "aria-pressed" | "variant" | "size" | "asChild"
> & {
  /** Selected state (filter / topic); rendered as aria-pressed with an ink background. */
  pressed: boolean;
};

/** Pill toggle for filters and topic selection. */
export function AppChip({ pressed, className, ...props }: AppChipProps) {
  return (
    <Button
      type="button"
      aria-pressed={pressed}
      className={cn(
        "h-auto min-h-8 cursor-pointer gap-2 rounded-full border border-line bg-transparent px-[13px] font-mono text-xs leading-none font-medium tracking-[0.02em] text-subtle transition-colors",
        FOCUS_OUTLINE_CLASS,
        "py-0 hover:border-ink hover:bg-transparent hover:text-ink",
        "aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-bg aria-pressed:hover:bg-ink aria-pressed:hover:text-bg",
        className,
      )}
      {...props}
    />
  );
}

type ChipGroupProps = React.ComponentProps<"div"> & {
  /** Accessible name of the group, e.g. "Filter projects". */
  label: string;
};

/** Labelled row of AppChips. */
export function ChipGroup({ label, className, ...props }: ChipGroupProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn("flex flex-wrap gap-2", className)}
      {...props}
    />
  );
}
