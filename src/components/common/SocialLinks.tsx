import { SOCIALS } from "@/constants/socials";
import { SOCIAL_ICON_PATHS } from "@/constants/tech-icons";
import { cn } from "@/lib/utils";
import type { SocialKey } from "@/types/content";

import { AppLink } from "./AppLink";

interface SocialLinksProps {
  /** Which profiles to show, in order (e.g. HERO_SOCIALS, ALL_SOCIALS). */
  items: SocialKey[];
  /** `sm` = 40px buttons (footer), `md` = 44px (default). */
  size?: "sm" | "md";
  className?: string;
}

/** Row of square icon buttons linking to social / freelance profiles. */
export function SocialLinks({ items, size = "md", className }: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-2.5", className)}>
      {items.map((key) => {
        const { label, href } = SOCIALS[key];
        return (
          <li key={key}>
            <AppLink
              href={href}
              className={cn(
                "grid place-items-center rounded-xl border border-line text-subtle transition-[color,border-color,translate] duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-ink hover:text-ink",
                size === "sm" ? "size-10" : "size-11",
              )}
            >
              {key === "bionluk" ? (
                // Bionluk has no brand icon: "bi" monogram as in the design.
                <span
                  aria-hidden="true"
                  className="font-display text-[13px] leading-none font-bold tracking-[-0.03em]"
                >
                  bi
                </span>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d={SOCIAL_ICON_PATHS[key]} />
                </svg>
              )}
              <span className="sr-only">{label}</span>
            </AppLink>
          </li>
        );
      })}
    </ul>
  );
}
