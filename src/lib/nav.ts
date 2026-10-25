import type { AppPathname } from "@/i18n/routing";
import type { NavItem } from "@/types/nav";

/** Pathnames without dynamic segments; nav items only ever point to these. */
export type StaticPathname = Exclude<AppPathname, `${string}[${string}]${string}`>;

/** Link `href` for a nav item (typed as a static pathname for the localized Link). */
export const navHref = ({ href }: NavItem) => href as StaticPathname;

/** Whether a nav item belongs to the current internal pathname ("/" only matches itself). */
export const isNavActive = ({ href }: NavItem, pathname: string) =>
  pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
