import type { LucideIcon } from "lucide-react";

export type TechKey =
  | "javascript" | "typescript" | "react" | "nextjs" | "redux" | "zustand"
  | "tailwind" | "shadcn" | "html5" | "css3" | "sass" | "bootstrap" | "primereact"
  | "expo" | "nativewind" | "node" | "express" | "nestjs" | "bun" | "elysia" | "convex"
  | "postgres" | "mongodb" | "mysql" | "redis" | "prisma" | "drizzle"
  | "betterauth" | "clerk" | "jwt"
  | "docker" | "turborepo" | "rabbitmq" | "minio" | "git" | "github" | "postman" | "vercel" | "figma";

export interface TechIcon {
  title: string;
  /** Brand color, e.g. "#61DAFB". */
  hex: string;
  /** SVG path for a 24×24 viewBox. */
  path: string;
}

export interface TechItem {
  key: TechKey;
  /** Display label (not translated). "React Native" reuses the react icon. */
  label: string;
}

export type TechCategoryKey =
  | "frontend" | "languages" | "mobile" | "backend" | "database" | "auth" | "devops";

export interface TechCategory {
  key: TechCategoryKey;
  icon: LucideIcon;
  /** Column span on the 3-column desktop grid. */
  span: 1 | 2 | 3;
  items: TechItem[];
}
