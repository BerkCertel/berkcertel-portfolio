// Shared class strings (plain module so both server and client components can import them).

/** Design focus style (2px brand outline, 3px offset) replacing shadcn's ring on primitives. */
export const FOCUS_OUTLINE_CLASS =
  "focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand focus-visible:outline-solid";

/** Shared look of all field controls: 50px, 12px radius, page background, brand focus ring. */
export const FIELD_CONTROL_CLASS = [
  "min-h-[50px] w-full rounded-xl border border-line bg-bg px-[15px] py-[13px] text-base leading-[1.4] text-ink shadow-none",
  "transition-[border-color,box-shadow] placeholder:text-subtle/70 dark:bg-bg",
  "focus-visible:border-brand focus-visible:ring-[3px] focus-visible:ring-brand/22 focus-visible:outline-none",
  "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
].join(" ");

/** Long-form text block (About intro, project write-ups); list items get brand square bullets. */
export const PROSE_CLASS = [
  "flex max-w-[62ch] flex-col gap-[18px] text-lg leading-[1.65] max-[760px]:text-[17px]",
  "[&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2.5 [&_li]:flex [&_li]:gap-3",
  "[&_li]:before:mt-3 [&_li]:before:size-1.5 [&_li]:before:flex-none [&_li]:before:rounded-[2px] [&_li]:before:bg-brand [&_li]:before:content-['']",
].join(" ");

/** Frame around the small animated visuals next to inner-page titles (V1, V3 …). */
export const VISUAL_CELL_CLASS = "rounded-[18px] border border-line bg-bg p-[22px]";
