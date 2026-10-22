import { SOCIAL_ICON_PATHS } from "@/constants/tech-icons";

// Small inline icons from the design that lucide does not match exactly.

/** Right arrow used on buttons and "view all" links (16×16, from the design). */
export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3 8h10m0 0L8.5 3.5M13 8l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** ↗ arrow for links that leave the site. */
export function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

/** The three-layer brand mark (two ink layers + top layer). Top layer color via `topClassName`. */
export function LayerMark({
  size,
  className,
  topClassName,
}: {
  size: number;
  className?: string;
  topClassName?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <path d="M3 21.5L5.6 20.2L16 25.4L26.4 20.2L29 21.5L16 28Z" fill="currentColor" />
      <path d="M3 15.5L5.6 14.2L16 19.4L26.4 14.2L29 15.5L16 22Z" fill="currentColor" />
      <path d="M16 3L29 9.5L16 16L3 9.5Z" fill="currentColor" className={topClassName} />
    </svg>
  );
}

/** Brand logo from SOCIAL_ICON_PATHS (GitHub, WhatsApp …) at button-icon size. */
export function BrandIcon({ name }: { name: keyof typeof SOCIAL_ICON_PATHS }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={SOCIAL_ICON_PATHS[name]} />
    </svg>
  );
}
