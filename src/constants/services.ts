import { Globe, LayoutGrid, Server, Smartphone } from "lucide-react";
import type { ServiceItem } from "@/types/content";

export const SERVICES: ServiceItem[] = [
  { key: "web", icon: LayoutGrid, tags: ["Next.js", "TypeScript", "PostgreSQL"] },
  { key: "mobile", icon: Smartphone, tags: ["React Native", "Expo"] },
  { key: "backend", icon: Server, tags: ["Node.js", "Bun", "Docker"] },
  { key: "websites", icon: Globe, tags: ["t:seo", "t:multilingual"] },
];
