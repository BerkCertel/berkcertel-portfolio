"use client";

import { useId } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

import { FOCUS_OUTLINE_CLASS } from "./styles";

interface AppCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  /** Label next to the box (may contain links). */
  children: React.ReactNode;
  error?: string;
  className?: string;
}

/** Checkbox with a label on the right and an error under it (design: brand fill when checked). */
export function AppCheckbox({
  checked,
  onCheckedChange,
  children,
  error,
  className,
}: AppCheckboxProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-start gap-3">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={(value) => onCheckedChange(value === true)}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "mt-0.5 size-5 rounded-md border-line bg-bg shadow-none dark:bg-bg",
            "data-[state=checked]:border-brand data-[state=checked]:bg-brand data-[state=checked]:text-on-brand",
            FOCUS_OUTLINE_CLASS,
          )}
        />
        <label htmlFor={id} className="text-sm leading-[1.5] text-subtle">
          {children}
        </label>
      </div>
      {error && (
        <p id={errorId} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
