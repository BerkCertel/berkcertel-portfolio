"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";

import { AppButton } from "@/components/common/AppButton";
import { AppLink } from "@/components/common/AppLink";
import { Container } from "@/components/common/Container";
import { LanguageSwitch } from "@/components/common/LanguageSwitch";
import { NAV_ITEMS } from "@/constants/navigation";
import { navHref } from "@/lib/nav";

/** Above this width the desktop nav is shown, so the menu must not stay open. */
const DESKTOP_QUERY = "(min-width: 1080px)";

/** Burger button (<1080px) + full-width panel under the header with big numbered links. */
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
      <AppButton
        ref={burgerRef}
        variant="ghost"
        size="icon"
        onClick={() => setOpenOn(open ? null : pathname)}
        aria-label={t(open ? "closeMenu" : "openMenu")}
        aria-expanded={open}
        aria-controls={panelId}
        className="hidden max-[1080px]:inline-flex"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="size-[18px]"
        >
          <path
            d={open ? "M6 6l12 12M18 6 6 18" : "M4 9h16M4 15h10"}
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
        </svg>
      </AppButton>

      {open && (
        <nav
          ref={panelRef}
          id={panelId}
          aria-label={t("mobile")}
          className="absolute inset-x-0 top-full h-[calc(100dvh-100%)] overflow-y-auto bg-bg pt-5 pb-7"
        >
          {/* Same side padding as the header row above it. */}
          <Container className="flex flex-col gap-0.5">
            {NAV_ITEMS.map((item, index) => (
              <AppLink
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
              </AppLink>
            ))}
            <div className="mt-5.5 flex animate-[rise_0.55s_var(--ease-out-soft)_0.25s_both] gap-2.5">
              <AppButton asChild>
                <AppLink href="/contact" onClick={close}>
                  {t("cta")}
                </AppLink>
              </AppButton>
              <LanguageSwitch />
            </div>
          </Container>
        </nav>
      )}
    </>
  );
}
