const ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escapes user input before it goes into an HTML email. */
export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ENTITIES[char]!);
}
