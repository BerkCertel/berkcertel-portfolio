export type Theme = "light" | "dark";

/** localStorage key for the chosen theme (shared by applyTheme and ThemeProvider). */
export const THEME_STORAGE_KEY = "theme";

/**
 * Applies the stored theme (or the OS preference) as the `.dark` class on <html> and adds `.js`
 * so JS-only entrance states can be used safely (see Reveal).
 * Must stay self-contained (no outer references): it is also serialized into THEME_SCRIPT,
 * which is why the storage key is written out literally.
 */
export function applyTheme() {
  const root = document.documentElement;
  root.classList.add("js");
  try {
    let theme = localStorage.getItem("theme");
    if (theme !== "light" && theme !== "dark") {
      theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    root.classList.toggle("dark", theme === "dark");
  } catch {
    // Storage blocked (private mode): keep the default light theme.
  }
}

/** Inline <head> script that runs applyTheme before first paint (no theme flash). */
export const THEME_SCRIPT = `(${applyTheme.toString()})()`;
