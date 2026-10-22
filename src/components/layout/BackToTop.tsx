"use client";

import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { AppButton } from "@/components/common/AppButton";
import { cn } from "@/lib/utils";

/** Shown after scrolling this many viewport heights down. */
const SHOW_AFTER = 1.5;

/**
 * Fixed round "back to top" button: fades and slides in after 1.5 viewports, scrolls smoothly
 * to the top (instantly with reduced motion), and hides while the mobile menu is open.
 */
export function BackToTop() {
  const t = useTranslations("common");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY > window.innerHeight * SHOW_AFTER);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  function scrollToTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" });
  }

  return (
    <AppButton
      variant="ghost"
      size="icon"
      onClick={scrollToTop}
      aria-label={t("scrollTop")}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "group/top fixed right-6 bottom-6 z-[60] size-12 bg-surface/88 shadow-[0_10px_24px_-14px_color-mix(in_srgb,var(--c-deep)_35%,transparent)] backdrop-blur-[10px] hover:bg-surface/88 max-[760px]:right-4 max-[760px]:bottom-4 max-[760px]:size-11",
        "transition-[opacity,translate,border-color] duration-300 [html[data-menu-open]_&]:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp
        className="size-[18px] transition-transform duration-300 ease-out-soft group-hover/top:-translate-y-0.5"
        strokeWidth={2}
        aria-hidden="true"
      />
    </AppButton>
  );
}
