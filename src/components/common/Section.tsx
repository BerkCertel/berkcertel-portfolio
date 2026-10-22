import { cn } from "@/lib/utils";

/** Vertical rhythm for page sections: 120px desktop, 80px ≤760px. */
export function Section({ className, ...props }: React.ComponentProps<"section">) {
  return <section className={cn("py-30 max-[760px]:py-20", className)} {...props} />;
}
