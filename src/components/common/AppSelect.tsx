"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { useFieldControlProps } from "./AppField";
import { FIELD_CONTROL_CLASS } from "./styles";

export interface AppSelectOption {
  value: string;
  label: string;
}

type AppSelectProps = Omit<React.ComponentProps<typeof Select>, "children"> & {
  options: AppSelectOption[];
  placeholder?: string;
  className?: string;
};

/**
 * shadcn Select in the field style. Use inside AppField; with react-hook-form wire it through
 * `<Controller render={({ field }) => <AppSelect value={field.value} onValueChange={field.onChange} … />} />`.
 */
export function AppSelect({ options, placeholder, className, ...props }: AppSelectProps) {
  const controlProps = useFieldControlProps();

  return (
    <Select {...props}>
      <SelectTrigger
        {...controlProps}
        className={cn(
          FIELD_CONTROL_CLASS,
          "w-full cursor-pointer data-[placeholder]:text-subtle data-[size=default]:h-[50px]",
          className,
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="rounded-xl border-line bg-surface">
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="cursor-pointer rounded-lg py-2.5"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
