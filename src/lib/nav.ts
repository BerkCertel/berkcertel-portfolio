import type { AppPathname } from "@/i18n/routing";
import type { NavItem } from "@/types/nav";

/** Pathnames without dynamic segments; nav items only ever point to these. */
type StaticPathname = Exclude<AppPathname, `${string}[${string}]${string}`>;

/** Link `href` for a nav item; items with a hash point to an in-page anchor (e.g. /#services). */
export const navHref = ({ href, hash }: NavItem) => {
  const pathname = href as StaticPathname;
  return hash ? { pathname, hash } : pathname;
};

/** Whether a nav item belongs to the current internal pathname. Anchor items never are. */
export const isNavActive = ({ href, hash }: NavItem, pathname: string) =>
  !hash && (pathname === href || pathname.startsWith(`${href}/`));
