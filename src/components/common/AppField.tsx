"use client";

import { createContext, useContext, useId } from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FieldContextValue {
  id: string;
  invalid: boolean;
  /** Id of the error message, set only while there is an error. */
  describedBy?: string;
}

const FieldContext = createContext<FieldContextValue | null>(null);

/** Props AppInput / AppTextarea / AppSelect spread onto their control to link it to the field. */
export function useFieldControlProps() {
  const field = useContext(FieldContext);
  if (!field) return {};
  return {
    id: field.id,
    "aria-invalid": field.invalid || undefined,
    "aria-describedby": field.describedBy,
  };
}

interface AppFieldProps {
  label: string;
  /** Error text (e.g. `errors.name?.message` from react-hook-form). */
  error?: string;
  className?: string;
  children: React.ReactNode;
}

/** Label + control + error message, wired with htmlFor / aria-invalid / aria-describedby. */
export function AppField({ label, error, className, children }: AppFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <FieldContext.Provider
      value={{ id, invalid: Boolean(error), describedBy: error ? errorId : undefined }}
    >
      <div className={cn("flex min-w-0 flex-col gap-2", className)}>
        <Label
          htmlFor={id}
          className="font-mono text-xs leading-none font-medium tracking-[0.06em] text-subtle uppercase"
        >
          {label}
        </Label>
        {children}
        {error && (
          <p id={errorId} className="text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    </FieldContext.Provider>
  );
}
