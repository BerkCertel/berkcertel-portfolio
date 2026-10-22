import type { NavItem } from "@/types/nav";

/** Header and mobile menu. */
export const NAV_ITEMS: NavItem[] = [
  { key: "home", href: "/" },
  { key: "projects", href: "/projects" },
  { key: "about", href: "/about" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
];

/** Footer menu: the header items plus the services page. */
export const FOOTER_NAV_ITEMS: NavItem[] = [
  { key: "home", href: "/" },
  { key: "projects", href: "/projects" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
];
