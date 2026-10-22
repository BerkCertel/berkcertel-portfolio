import { cn } from "@/lib/utils";

/** Page-width wrapper: max 1280px, 48px side padding (20px ≤760px). */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("mx-auto w-full max-w-site px-12 max-[760px]:px-5", className)} {...props} />
  );
}
