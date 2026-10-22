import type { AppPathname } from "@/i18n/routing";

export type NavKey = "projects" | "about" | "services" | "blog" | "contact";

export interface NavItem {
  key: NavKey;
  href: AppPathname;
  /** Optional in-page anchor, e.g. "services" on the home page. */
  hash?: string;
}
