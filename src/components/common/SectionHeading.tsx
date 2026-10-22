import { cn } from "@/lib/utils";

import { AppLink } from "./AppLink";
import { ArrowIcon } from "./icons";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  /** Heading id, referenced by the section's aria-labelledby. */
  id: string;
  title: string;
  /** Optional right-aligned link, e.g. "Tümünü gör →". */
  link?: { href: React.ComponentProps<typeof AppLink>["href"]; label: string };
  className?: string;
}

/** Section h2 with the growing 44×3px brand bar and an optional "view all" link. */
export function SectionHeading({ id, title, link, className }: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "mb-12 flex items-end justify-between gap-6 max-[760px]:mb-8 max-[760px]:flex-wrap",
        className,
      )}
    >
      <h2
        id={id}
        className="reveal reveal-bar font-display text-[clamp(36px,4.6vw,60px)] leading-none font-bold tracking-[-0.045em] after:mt-3.5 after:block after:h-[3px] after:w-11 after:origin-left after:rounded-[2px] after:bg-brand"
      >
        {title}
      </h2>
      {link && (
        <AppLink
          href={link.href}
          className="group inline-flex items-center gap-2 text-[15px] font-medium text-subtle transition-colors hover:text-ink"
        >
          {link.label}
          <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-[3px]" />
        </AppLink>
      )}
    </Reveal>
  );
}
