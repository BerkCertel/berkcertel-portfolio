"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { useFieldControlProps } from "./AppField";
import { FIELD_CONTROL_CLASS } from "./styles";

/** Text input in the design style. Use inside AppField; works with `{...register("name")}`. */
export function AppInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  const controlProps = useFieldControlProps();

  return (
    <Input
      className={cn(FIELD_CONTROL_CLASS, "h-[50px] md:text-base", className)}
      {...controlProps}
      {...props}
    />
  );
}
