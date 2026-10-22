import { TECH_ICONS } from "@/constants/tech-icons";
import { cn } from "@/lib/utils";
import type { TechKey } from "@/types/tech";

/** WCAG relative luminance of a "#RRGGBB" color (0 = black, 1 = white). */
function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const channel = parseInt(hex.slice(i, i + 2), 16) / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
}

/**
 * Near-black (and near-white, e.g. Better Auth) brand colors disappear in one of the themes,
 * so those logos use the theme ink color instead.
 */
const isMonochrome = (hex: string) => {
  const value = luminance(hex);
  return value < 0.05 || value > 0.9;
};

/** Brand color for hover glows (`--c`): the brand hex, or ink for monochrome brands. */
export function techColor(tech: TechKey) {
  const icon = TECH_ICONS[tech];
  return icon && !isMonochrome(icon.hex) ? icon.hex : "var(--c-ink)";
}

interface TechIconProps {
  tech: TechKey;
  /** Visible label of the technology; its first two letters form the fallback monogram. */
  label: string;
  /** Pixel size (design: 14 in chips, 24 in tiles). */
  size?: number;
  className?: string;
}

/** Brand logo from TECH_ICONS, or a monogram badge when there is no official icon. */
export function TechIcon({ tech, label, size = 24, className }: TechIconProps) {
  const icon = TECH_ICONS[tech];

  if (!icon) {
    return (
      <span
        aria-hidden="true"
        data-testid="tech-monogram"
        style={{ width: size, height: size, fontSize: size <= 16 ? 8 : 9 }}
        className={cn(
          "inline-grid flex-none place-items-center rounded-md bg-sunk font-mono leading-none font-semibold text-ink",
          className,
        )}
      >
        {label.slice(0, 2)}
      </span>
    );
  }

  const monochrome = isMonochrome(icon.hex);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={monochrome ? undefined : icon.hex}
      aria-hidden="true"
      className={cn("block flex-none", monochrome && "fill-ink", className)}
    >
      <path d={icon.path} />
    </svg>
  );
}
