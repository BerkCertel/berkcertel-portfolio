import type { AppPathname } from "@/i18n/routing";

export type NavKey = "home" | "projects" | "about" | "services" | "blog" | "contact";

export interface NavItem {
  key: NavKey;
  href: AppPathname;
}
