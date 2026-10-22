"use client";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import { useFieldControlProps } from "./AppField";
import { FIELD_CONTROL_CLASS } from "./styles";

/** Multi-line input in the design style (min 140px, vertical resize). Use inside AppField. */
export function AppTextarea({ className, ...props }: React.ComponentProps<typeof Textarea>) {
  const controlProps = useFieldControlProps();

  return (
    <Textarea
      className={cn(
        FIELD_CONTROL_CLASS,
        "field-sizing-fixed min-h-[140px] resize-y md:text-base",
        className,
      )}
      {...controlProps}
      {...props}
    />
  );
}
