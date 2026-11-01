import type { ExperienceItem } from "@/types/content";

/** Newest first. Texts live in messages/*.json under experience.items.<key>. */
export const EXPERIENCE: ExperienceItem[] = [
  { key: "rocr", current: false },
  { key: "sunflow", current: true },
  { key: "tekera", current: false },
  { key: "cvbanko", current: false },
  { key: "softalya", current: false },
];
