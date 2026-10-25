"use client";

import { useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";

import { TechIcon } from "@/components/common/TechIcon";
import { TECH_CATEGORIES } from "@/constants/tech-stack";
import { cn } from "@/lib/utils";

/** Minimum horizontal swipe on the panel that changes the category. */
const SWIPE_PX = 50;

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Mobile "Technologies": scrollable category tabs (tablist) above a 3-column grid of the selected
 * category. Arrow keys, taps and horizontal swipes on the panel change the category; nothing
 * moves on its own. Tiles fade in 35ms apart after a change (not with reduced motion).
 */
export function TechTabs() {
  const t = useTranslations("tech");
  const id = useId();
  const [active, setActive] = useState(0);
  // Tiles animate only after the visitor changes the tab, not on the first paint.
  const [changed, setChanged] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const category = TECH_CATEGORIES[active]!;
  const last = TECH_CATEGORIES.length - 1;

  function select(index: number, focus = false) {
    const next = Math.min(Math.max(index, 0), last);
    if (next === active) return;
    setActive(next);
    setChanged(true);
    if (focus) tabRefs.current[next]?.focus();
  }

  // Keep the selected tab in view by scrolling the tab strip only (never the page).
  useEffect(() => {
    const list = listRef.current;
    const tab = tabRefs.current[active];
    if (!changed || !list || !tab) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({
      left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2,
      behavior: reduced ? "auto" : "smooth",
    });
  }, [active, changed]);

  function onKeyDown(event: React.KeyboardEvent) {
    const target = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: last }[event.key];
    if (target === undefined) return;
    event.preventDefault();
    select(target, true);
  }

  function onTouchEnd(event: React.TouchEvent) {
    const start = touchStart.current;
    const touch = event.changedTouches[0];
    touchStart.current = null;
    if (!start || !touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    // Only clearly horizontal swipes; vertical ones keep scrolling the page.
    if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy)) select(active + (dx < 0 ? 1 : -1));
  }

  return (
    <div>
      <div
        ref={listRef}
        role="tablist"
        aria-label={t("tabsLabel")}
        onKeyDown={onKeyDown}
        className="-mx-5 flex snap-x snap-mandatory scroll-px-5 [scrollbar-width:none] gap-2 overflow-x-auto [mask-image:linear-gradient(90deg,transparent,black_20px,black_calc(100%-20px),transparent)] px-5 py-1.5 [&::-webkit-scrollbar]:hidden"
      >
        {TECH_CATEGORIES.map(({ key, icon: Icon, items }, index) => {
          const selected = index === active;
          return (
            <button
              key={key}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={`${id}-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(index)}
              className={cn(
                "flex h-11 flex-none snap-start items-center gap-2 rounded-full border px-3.5 text-sm font-medium whitespace-nowrap transition-colors duration-300",
                selected ? "border-ink bg-ink text-bg" : "border-line bg-surface text-ink",
              )}
            >
              <Icon className="size-4" strokeWidth={1.8} aria-hidden="true" />
              {t(`categories.${key}`)}
              <span
                className={cn("font-mono text-[11px] leading-none", !selected && "text-subtle")}
              >
                {pad(items.length)}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        tabIndex={0}
        onTouchStart={(event) => {
          const touch = event.touches[0];
          touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
        }}
        onTouchEnd={onTouchEnd}
        className="mt-4 touch-pan-y"
      >
        <p className="eyebrow mb-3">{t("count", { count: category.items.length })}</p>
        {/* Keyed by category so the tiles mount again (and fade in) after a change. */}
        <ul key={category.key} className="grid grid-cols-3 gap-2.5">
          {category.items.map((tech, i) => (
            <li
              key={tech.label}
              style={{ animationDelay: `${i * 35}ms` }}
              className={cn(
                "flex min-h-[84px] min-w-0 flex-col items-center justify-center gap-2 rounded-xl border border-line bg-bg px-1.5 py-3 text-center text-xs leading-tight font-medium",
                changed && "motion-safe:animate-[rise_0.35s_var(--ease-out-soft)_both]",
              )}
            >
              <TechIcon tech={tech.key} label={tech.label} size={26} />
              <span className="break-words">{tech.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div aria-hidden="true" className="mt-5 flex justify-center gap-1.5">
        {TECH_CATEGORIES.map(({ key }, index) => (
          <span
            key={key}
            className={cn(
              "h-1.5 rounded-full transition-colors duration-300",
              index === active ? "w-4 bg-ink" : "w-1.5 bg-line",
            )}
          />
        ))}
      </div>
    </div>
  );
}
