const TURKISH: Record<string, string> = { ç: "c", ğ: "g", ı: "i", İ: "i", ö: "o", ş: "s", ü: "u" };

/** URL/anchor-safe id from a heading: Turkish letters simplified, everything else dashed. */
export function slugify(text: string) {
  return text
    .replace(/[çğıİöşü]/gi, (char) => TURKISH[char] ?? TURKISH[char.toLowerCase()] ?? char)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
