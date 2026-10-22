/**
 * Lines of the `berk.ts` code card (About section). Rendered with syntax colors:
 * kw = keyword, key = object key, str = string, punc = punctuation, plain = default.
 */
export type CodeToken = { t: "kw" | "key" | "str" | "punc" | "plain"; v: string };

const s = (v: string): CodeToken => ({ t: "str", v: `"${v}"` });
const p = (v: string): CodeToken => ({ t: "punc", v });
const k = (v: string): CodeToken => ({ t: "key", v });
const list = (...items: string[]): CodeToken[] =>
  [p("["), ...items.flatMap((x, i) => (i ? [p(", "), s(x)] : [s(x)])), p("],")];

export const CODE_CARD_FILE = "berk.ts";

export const CODE_CARD_LINES: CodeToken[][] = [
  [{ t: "kw", v: "const" }, { t: "plain", v: " berk " }, p("= {")],
  [{ t: "plain", v: "  " }, k("name"), p(": "), s("Mehmet Berk Certel"), p(",")],
  [{ t: "plain", v: "  " }, k("role"), p(": "), s("Full-Stack Developer"), p(",")],
  [{ t: "plain", v: "  " }, k("stack"), p(": "), ...list("Next.js", "React Native", "Node.js")],
  [{ t: "plain", v: "  " }, k("language"), p(": "), s("TypeScript"), p(",")],
  [{ t: "plain", v: "  " }, k("databases"), p(": "), ...list("PostgreSQL", "MongoDB", "MySQL")],
  [{ t: "plain", v: "  " }, k("orm"), p(": "), ...list("Drizzle", "Prisma")],
  [{ t: "plain", v: "  " }, k("auth"), p(": "), ...list("Better Auth", "Clerk", "JWT")],
  [p("};")],
];
