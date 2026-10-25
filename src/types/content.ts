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
  href: `https://${string}`;
}

/** One section of a legal page (privacy notice, cookie policy) in messages. */
export interface LegalSection {
  title: string;
  body: string[];
  /** Optional bullet list after the paragraphs. */
  list?: string[];
}
