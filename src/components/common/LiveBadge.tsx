import { cn } from "@/lib/utils";

/** Green pulsing dot + text, e.g. "4 otelde canlı". */
export function LiveBadge({ className, children, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn("inline-flex items-center gap-2 text-[13px] text-subtle", className)}
      {...props}
    >
      <span aria-hidden="true" className="size-2 flex-none animate-pulse-dot rounded-full bg-ok" />
      {children}
    </span>
  );
}
