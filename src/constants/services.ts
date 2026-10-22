import { Globe, LayoutGrid, Server, Smartphone } from "lucide-react";
import type { ServiceItem } from "@/types/content";

export const SERVICES: ServiceItem[] = [
  { key: "web", icon: LayoutGrid },
  { key: "mobile", icon: Smartphone },
  { key: "backend", icon: Server },
  { key: "websites", icon: Globe },
];
