"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

/**
 * Yellow highlighter (M1 whole title / M3 key phrase) that paints left to right once it enters
 * the viewport. Styles live in globals.css (`.marker`); fully painted without JS or with reduced
 * motion. For `<mark>` in messages use `markTag` (mark-tag.tsx) with `t.rich`.
 */
export function Marker({ children, className }: { children: React.ReactNode; className?: string }) {
  const [ref, inView] = useInView<HTMLSpanElement>();

  return (
    <span ref={ref} data-in={inView ? "" : undefined} className={cn("marker", className)}>
      {children}
    </span>
  );
}
