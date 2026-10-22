import { cn } from "@/lib/utils";

/** Yellow marker behind a label (same look as the hero name), used for the active page. */
export const ACTIVE_MARKER_CLASS =
  "bg-[linear-gradient(transparent_62%,var(--c-sun)_62%,var(--c-sun)_92%,transparent_92%)]";

/**
 * N3 link label: on hover of the parent `group` the label rolls up and a brand-colored copy rolls
 * in (0.4s). `active` puts the yellow marker behind it. The copy is aria-hidden, so the link's
 * accessible name stays a single label.
 */
export function RollingLabel({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <span className="block overflow-hidden">
      <span
        className={cn(
          "relative block transition-transform duration-400 ease-in-out-soft group-hover:-translate-y-full group-focus-visible:-translate-y-full",
          active && ACTIVE_MARKER_CLASS,
        )}
      >
        {label}
        <span aria-hidden="true" className="absolute top-full left-0 text-brand">
          {label}
        </span>
      </span>
    </span>
  );
}
