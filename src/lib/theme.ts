export type Theme = "light" | "dark";

/** localStorage key for the chosen theme (shared by the inline script and ThemeProvider). */
export const THEME_STORAGE_KEY = "theme";

/**
 * Runs in <head> before paint: applies the stored theme (or the OS preference) as the `.dark`
 * class and adds `.js` so JS-only entrance states can be used safely (see Reveal).
 */
export const THEME_SCRIPT = `(function(){var d=document.documentElement;d.classList.add("js");try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";d.classList.toggle("dark",t==="dark")}catch(e){}})()`;
