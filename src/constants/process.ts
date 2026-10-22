import { Check, Code, PenLine, Rocket, Search } from "lucide-react";
import type { ProcessStep } from "@/types/content";

export const PROCESS_STEPS: ProcessStep[] = [
  { key: "discovery", icon: Search },
  { key: "design", icon: PenLine },
  { key: "development", icon: Code },
  { key: "testing", icon: Check },
  { key: "launch", icon: Rocket },
];

/** Seconds between steps in the entrance animation (cards, then arrows). */
export const PROCESS_STAGGER = 0.6;
