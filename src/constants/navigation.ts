import type { NavItem } from "@/types/nav";

export const SERVICES_ANCHOR = "services";

export const NAV_ITEMS: NavItem[] = [
  { key: "projects", href: "/projects" },
  { key: "about", href: "/about" },
  { key: "services", href: "/", hash: SERVICES_ANCHOR },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
];
