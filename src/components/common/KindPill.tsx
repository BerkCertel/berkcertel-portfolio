import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import type { ProjectKind } from "@/types/project";

/** Project kind label (mono, uppercase); the startup kind is highlighted in sun yellow. */
export function KindPill({ kind, className }: { kind: ProjectKind; className?: string }) {
  const t = useTranslations("projects.kinds");

  return (
    <span
      className={cn(
        "inline-block rounded-full border px-2.5 py-1.5 font-mono text-[11px] leading-none font-medium tracking-[0.08em] uppercase",
        kind === "startup" ? "border-transparent bg-sun text-on-sun" : "border-line text-subtle",
        className,
      )}
    >
      {t(kind)}
    </span>
  );
}
