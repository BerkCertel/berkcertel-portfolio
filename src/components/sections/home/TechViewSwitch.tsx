"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";

import { cn } from "@/lib/utils";

export const TECH_VIEWS = ["flow", "grid"] as const;
export type TechView = (typeof TECH_VIEWS)[number];

const NUDGE = "animate-[nudge_1.6s_ease-in-out_infinite]";

/** Three lines; when active the outer and middle lines slide in opposite directions. */
function LanesIcon({ active }: { active: boolean }) {
  const a = cn(active && NUDGE);
  const b = cn(active && `${NUDGE} [animation-direction:reverse]`);
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="stroke-current [stroke-width:2] [stroke-linecap:round]"
    >
      <line className={a} x1="3" y1="6" x2="15" y2="6" />
      <line className={b} x1="8" y1="12" x2="21" y2="12" />
      <line className={a} x1="3" y1="18" x2="15" y2="18" />
    </svg>
  );
}

/** 2×2 squares; the first one fills when active. */
function GridIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="fill-none stroke-current [stroke-width:2]"
    >
      <rect x="3" y="3" width="7" height="7" rx="1.5" className={cn(active && "fill-current")} />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

const ICONS = { flow: LanesIcon, grid: GridIcon };

interface TechViewSwitchProps {
  value: TechView;
  onChange: (view: TechView) => void;
  className?: string;
}

/**
 * Icon-only radio pill (same family as the TR/EN switch) with a sliding ink thumb.
 * Each option has an aria-label and a tooltip on hover/focus; arrow keys toggle.
 */
export function TechViewSwitch({ value, onChange, className }: TechViewSwitchProps) {
  const t = useTranslations("tech.view");
  const buttons = useRef<Record<TechView, HTMLButtonElement | null>>({ flow: null, grid: null });

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const next = value === "flow" ? "grid" : "flow";
    onChange(next);
    buttons.current[next]?.focus();
  }

  return (
    <div
      role="radiogroup"
      aria-label={t("label")}
      onKeyDown={onKeyDown}
      className={cn(
        "relative inline-grid h-[46px] flex-none grid-cols-2 rounded-full border border-line bg-surface p-1",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-ink transition-transform duration-450 ease-in-out-soft",
          value === "grid" && "translate-x-full",
        )}
      />
      {TECH_VIEWS.map((view) => {
        const active = view === value;
        const Icon = ICONS[view];
        return (
          <button
            key={view}
            ref={(node) => {
              buttons.current[view] = node;
            }}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={t(view)}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(view)}
            className={cn(
              "group relative z-10 grid w-[46px] cursor-pointer place-items-center rounded-full transition-colors duration-300 focus-visible:outline-offset-2",
              active ? "text-bg" : "text-subtle hover:text-ink",
            )}
          >
            <Icon active={active} />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 translate-y-1 rounded-[7px] bg-ink px-[9px] py-[7px] font-mono text-[11.5px] leading-none font-medium whitespace-nowrap text-bg opacity-0 transition-[opacity,translate] duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
            >
              {t(view)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
