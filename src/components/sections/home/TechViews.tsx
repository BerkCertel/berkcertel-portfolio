"use client";

import { useState } from "react";

import { SectionHeading } from "@/components/common/SectionHeading";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

import { type TechView, TechViewSwitch } from "./TechViewSwitch";

/** Same breakpoint as the rest of the site's mobile layout. */
const MOBILE_QUERY = "(max-width: 760px)";

interface TechViewsProps {
  /** Heading id, referenced by the section's aria-labelledby. */
  id: string;
  title: string;
  /** Desktop views, chosen with the switch next to the heading (default: flowing lanes). */
  views: Record<TechView, React.ReactNode>;
  /** Mobile view (static list, no switch). */
  mobile: React.ReactNode;
}

/**
 * Section heading + the technology views. Desktop shows the chosen view (state is local only);
 * mobile shows the static list. Until the screen size is known (server render, hydration) both
 * are in the HTML and CSS shows the right one, so there is no layout shift and it works without
 * JS; after hydration the other one is unmounted.
 */
export function TechViews({ id, title, views, mobile }: TechViewsProps) {
  const isMobile = useMediaQuery(MOBILE_QUERY, null);
  const [view, setView] = useState<TechView>("flow");
  // The rise animation replays only after a switch, not on the first paint.
  const [switched, setSwitched] = useState(false);

  function change(next: TechView) {
    if (next === view) return;
    setView(next);
    setSwitched(true);
  }

  return (
    <>
      <SectionHeading
        id={id}
        title={title}
        action={
          isMobile !== true && (
            <TechViewSwitch value={view} onChange={change} className="max-[760px]:hidden" />
          )
        }
      />
      {isMobile !== true && (
        // Keyed by view so the newly shown view mounts again and plays its entrance.
        <div
          key={view}
          className={cn(
            "max-[760px]:hidden",
            switched && "motion-safe:animate-[rise_0.5s_var(--ease-out-soft)_both]",
          )}
        >
          {views[view]}
        </div>
      )}
      {isMobile !== false && <div className="min-[761px]:hidden">{mobile}</div>}
    </>
  );
}
