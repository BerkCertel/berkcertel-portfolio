"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";

import { LanguageSwitch } from "@/components/common/LanguageSwitch";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/constants/navigation";
import { Link } from "@/i18n/navigation";
import { navHref } from "@/lib/nav";

/** Above this width the desktop nav is shown, so the menu must not stay open. */
const DESKTOP_QUERY = "(min-width: 901px)";

/** Burger button (≤900px) + full-width panel under the header with big numbered links. */
export function MobileMenu() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  // The menu is open only on the page it was opened on, so any navigation
  // (links, logo, browser back/forward) closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const burgerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const panelId = useId();

  const close = () => setOpenOn(null);

  useEffect(() => {
    if (!open) return;

    // Lock page scroll, hide the page behind the panel from focus / AT, focus the first link.
    const background = document.querySelectorAll<HTMLElement>("#main, body > footer");
    document.body.style.overflow = "hidden";
    background.forEach((element) => (element.inert = true));
    panelRef.current?.querySelector("a")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenOn(null);
      burgerRef.current?.focus();
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onBreakpoint = () => desktop.matches && setOpenOn(null);

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.body.style.overflow = "";
      background.forEach((element) => (element.inert = false));
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  return (
    <>
      <button
        ref={burgerRef}
        type="button"
        onClick={() => setOpenOn(open ? null : pathname)}
        aria-label={t(open ? "closeMenu" : "openMenu")}
        aria-expanded={open}
        aria-controls={panelId}
        className="hidden size-11 cursor-pointer place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink max-[900px]:grid"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d={open ? "M6 6l12 12M18 6 6 18" : "M4 9h16M4 15h10"}
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open && (
        <nav
          ref={panelRef}
          id={panelId}
          aria-label={t("mobile")}
          className="absolute inset-x-0 top-full flex max-h-[calc(100dvh-100%)] flex-col gap-0.5 overflow-y-auto border-b border-line bg-bg px-5 pt-5 pb-7"
        >
          {NAV_ITEMS.map((item, index) => (
            <Link
              key={item.key}
              href={navHref(item)}
              onClick={close}
              style={{ animationDelay: `${index * 0.05}s` }}
              className="flex animate-[rise_0.55s_var(--ease-out-soft)_both] items-baseline justify-between font-display text-[44px] leading-[1.15] font-bold tracking-[-0.045em] text-ink"
            >
              {t(item.key)}
              <span
                aria-hidden="true"
                className="font-mono text-xs font-medium tracking-[0.06em] text-subtle"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </Link>
          ))}
          <div className="mt-5.5 flex animate-[rise_0.55s_var(--ease-out-soft)_0.25s_both] gap-2.5">
            {/* TODO(step 03): switch to AppButton */}
            <Button
              asChild
              className="h-12 rounded-full px-5.5 text-[15px] hover:bg-brand hover:text-on-brand"
            >
              <Link href="/contact" onClick={close}>
                {t("cta")}
              </Link>
            </Button>
            <LanguageSwitch />
          </div>
        </nav>
      )}
    </>
  );
}
