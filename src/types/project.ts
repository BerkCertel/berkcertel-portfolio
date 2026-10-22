import type { TechItem } from "@/types/tech";

export type ProjectKey = "sunflow" | "michat" | "spotlight" | "note" | "expense";
export type ProjectKind = "startup" | "fullstack" | "mobile" | "web";
export type ProjectFilter = "all" | "web" | "mobile" | "fullstack" | "startup";
export type ProjectLinkType = "site" | "demo" | "github" | "details";

export interface ProjectLink {
  type: ProjectLinkType;
  /** External URL, or an internal pathname for "details". */
  href: string;
}

export interface Project {
  key: ProjectKey;
  name: string;
  kind: ProjectKind;
  /** Filters this project appears under (besides "all"). */
  filters: Exclude<ProjectFilter, "all">[];
  tech: TechItem[];
  links: ProjectLink[];
  /** Shows the green "live" badge (Sunflow). */
  live?: boolean;
}
