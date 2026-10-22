import type { LucideIcon } from "lucide-react";

export type ExperienceKey = "rocr" | "sunflow" | "tekera" | "cvbanko" | "softalya";

export interface ExperienceItem {
  key: ExperienceKey;
  /** Highlighted dot on the timeline. */
  current: boolean;
}

export type ServiceKey = "web" | "mobile" | "backend" | "websites";

export interface ServiceItem {
  key: ServiceKey;
  icon: LucideIcon;
  /** Tags: tech names are shown as-is, `t:` prefixed ones are translation keys under services.tags. */
  tags: string[];
}

export type ProcessKey = "discovery" | "design" | "development" | "testing" | "launch";

export interface ProcessStep {
  key: ProcessKey;
  icon: LucideIcon;
}

export type SocialKey = "github" | "linkedin" | "upwork" | "bionluk" | "instagram";

export interface SocialLink {
  key: SocialKey;
  label: string;
  href: string;
}
