import {
  Braces,
  Database,
  LayoutGrid,
  Lock,
  Server,
  Smartphone,
  SquareTerminal,
} from "lucide-react";
import type { TechCategory } from "@/types/tech";

/** Order and spans match the design (3-column grid on desktop). */
export const TECH_CATEGORIES: TechCategory[] = [
  {
    key: "frontend",
    icon: LayoutGrid,
    span: 2,
    items: [
      { key: "react", label: "React" },
      { key: "nextjs", label: "Next.js" },
      { key: "tailwind", label: "Tailwind CSS" },
      { key: "redux", label: "Redux" },
      { key: "zustand", label: "Zustand" },
      { key: "shadcn", label: "shadcn/ui" },
      { key: "html5", label: "HTML5" },
      { key: "css3", label: "CSS3" },
      { key: "sass", label: "Sass" },
      { key: "bootstrap", label: "Bootstrap" },
      { key: "primereact", label: "PrimeReact" },
    ],
  },
  {
    key: "languages",
    icon: Braces,
    span: 1,
    items: [
      { key: "javascript", label: "JavaScript" },
      { key: "typescript", label: "TypeScript" },
    ],
  },
  {
    key: "mobile",
    icon: Smartphone,
    span: 1,
    items: [
      { key: "react", label: "React Native" },
      { key: "expo", label: "Expo" },
      { key: "nativewind", label: "NativeWind" },
    ],
  },
  {
    key: "backend",
    icon: Server,
    span: 2,
    items: [
      { key: "node", label: "Node.js" },
      { key: "express", label: "Express.js" },
      { key: "nestjs", label: "NestJS" },
      { key: "bun", label: "Bun" },
      { key: "elysia", label: "Elysia" },
      { key: "convex", label: "Convex" },
    ],
  },
  {
    key: "database",
    icon: Database,
    span: 2,
    items: [
      { key: "postgres", label: "PostgreSQL" },
      { key: "mongodb", label: "MongoDB" },
      { key: "mysql", label: "MySQL" },
      { key: "redis", label: "Redis" },
      { key: "prisma", label: "Prisma" },
      { key: "drizzle", label: "Drizzle" },
    ],
  },
  {
    key: "auth",
    icon: Lock,
    span: 1,
    items: [
      { key: "betterauth", label: "Better Auth" },
      { key: "clerk", label: "Clerk" },
      { key: "jwt", label: "JWT" },
    ],
  },
  {
    key: "devops",
    icon: SquareTerminal,
    span: 3,
    items: [
      { key: "docker", label: "Docker" },
      { key: "turborepo", label: "Turborepo" },
      { key: "rabbitmq", label: "RabbitMQ" },
      { key: "minio", label: "MinIO" },
      { key: "git", label: "Git" },
      { key: "github", label: "GitHub" },
      { key: "postman", label: "Postman" },
      { key: "vercel", label: "Vercel" },
      { key: "figma", label: "Figma" },
    ],
  },
];

/** Service box names on the hero stack's middle layer (code names, not translated). */
export const HERO_SERVICES = ["auth", "users", "orders", "mail", "queue", "cache"];
