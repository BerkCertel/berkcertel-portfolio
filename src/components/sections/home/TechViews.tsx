"use client";

import { useMediaQuery } from "@/hooks/use-media-query";

/** Same breakpoint as the rest of the site's mobile layout. */
const MOBILE_QUERY = "(max-width: 760px)";

/**
 * Renders only one of the two technology views. Until the screen size is known (server render,
 * hydration) both are in the HTML and CSS shows the right one, so there is no layout shift and
 * it works without JS; after hydration the other view is unmounted.
 */
export function TechViews({
  desktop,
  mobile,
}: {
  desktop: React.ReactNode;
  mobile: React.ReactNode;
}) {
  const isMobile = useMediaQuery(MOBILE_QUERY, null);

  return (
    <>
      {isMobile !== true && <div className="max-[760px]:hidden">{desktop}</div>}
      {isMobile !== false && <div className="min-[761px]:hidden">{mobile}</div>}
    </>
  );
}
