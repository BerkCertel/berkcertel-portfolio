import fs from "node:fs";
import path from "node:path";

/** Every public page in both languages (localized URLs). */
export const PAGES = {
  tr: [
    "/",
    "/hakkimda",
    "/projeler",
    "/projeler/michat",
    "/hizmetler",
    "/blog",
    "/iletisim",
    "/gizlilik",
    "/cerez-politikasi",
  ],
  en: [
    "/en",
    "/en/about",
    "/en/projects",
    "/en/projects/michat",
    "/en/services",
    "/en/blog",
    "/en/contact",
    "/en/privacy",
    "/en/cookie-policy",
  ],
} as const;

/** Today in Turkey ("YYYY-MM-DD"), the time zone posts are published in. */
const today = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Istanbul" }).format(new Date());

/** Slugs of the Turkish posts, split into published and scheduled by their `date`. */
export function turkishPosts() {
  const dir = path.join(process.cwd(), "content", "blog", "tr");
  const posts = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const source = fs.readFileSync(path.join(dir, file), "utf8");
      return {
        slug: file.replace(/\.mdx$/, ""),
        date: source.match(/date: "([\d-]+)"/)?.[1] ?? "",
      };
    });
  return {
    published: posts.filter((post) => post.date <= today()).map((post) => post.slug),
    scheduled: posts.filter((post) => post.date > today()).map((post) => post.slug),
  };
}
