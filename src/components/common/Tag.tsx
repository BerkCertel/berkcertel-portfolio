import { cn } from "@/lib/utils";

/** Small mono label on a sunk background (service tags, meta). */
export function Tag({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex h-[26px] items-center rounded-md bg-sunk px-2.5 font-mono text-xs leading-none font-medium text-subtle",
        className,
      )}
      {...props}
    />
  );
}
