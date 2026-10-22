import type { Project, ProjectFilter } from "@/types/project";

const GITHUB = "https://github.com/BerkCertel";

/** Visible chips per project row; the rest collapse into "+N". */
export const PROJECT_VISIBLE_TECH = 4;

export const PROJECT_FILTERS: ProjectFilter[] = ["all", "web", "mobile", "fullstack", "startup"];

export const PROJECTS: Project[] = [
  {
    key: "sunflow",
    name: "Sunflow",
    kind: "startup",
    filters: ["startup", "web"],
    live: true,
    tech: [
      { key: "nextjs", label: "Next.js" },
      { key: "node", label: "Node.js" },
      { key: "typescript", label: "TypeScript" },
      { key: "postgres", label: "PostgreSQL" },
    ],
    // Private repository: no GitHub link on purpose.
    links: [{ type: "site", href: "https://sunflowapp.com" }],
  },
  {
    key: "michat",
    name: "miChat",
    kind: "fullstack",
    filters: ["fullstack", "web"],
    tech: [
      { key: "nextjs", label: "Next.js" },
      { key: "bun", label: "Bun" },
      { key: "elysia", label: "Elysia" },
      { key: "rabbitmq", label: "RabbitMQ" },
      { key: "redis", label: "Redis" },
      { key: "postgres", label: "PostgreSQL" },
      { key: "drizzle", label: "Drizzle" },
      { key: "betterauth", label: "Better Auth" },
      { key: "turborepo", label: "Turborepo" },
    ],
    links: [
      { type: "details", href: "/projects/michat" },
      { type: "github", href: `${GITHUB}/miChat-app` },
    ],
  },
  {
    key: "spotlight",
    name: "Spotlight",
    kind: "mobile",
    filters: ["mobile"],
    tech: [
      { key: "react", label: "React Native" },
      { key: "expo", label: "Expo" },
      { key: "convex", label: "Convex" },
      { key: "clerk", label: "Clerk" },
      { key: "nativewind", label: "NativeWind" },
    ],
    links: [{ type: "github", href: `${GITHUB}/spotlight-app-react-native-expo` }],
  },
  {
    key: "note",
    name: "Note App",
    kind: "web",
    filters: ["web"],
    tech: [
      { key: "nextjs", label: "Next.js" },
      { key: "typescript", label: "TypeScript" },
      { key: "betterauth", label: "Better Auth" },
      { key: "drizzle", label: "Drizzle" },
      { key: "postgres", label: "PostgreSQL" },
    ],
    links: [
      { type: "demo", href: "https://noteforgeapp.netlify.app" },
      { type: "github", href: `${GITHUB}/note-app` },
    ],
  },
  {
    key: "expense",
    name: "Expense Tracker",
    kind: "web",
    filters: ["web"],
    tech: [
      { key: "react", label: "React" },
      { key: "redux", label: "Redux" },
      { key: "node", label: "Node.js" },
      { key: "express", label: "Express.js" },
      { key: "mongodb", label: "MongoDB" },
    ],
    links: [
      { type: "demo", href: "https://expense-tracker-ten-chi-84.vercel.app" },
      { type: "github", href: `${GITHUB}/expense-tracker` },
    ],
  },
];
