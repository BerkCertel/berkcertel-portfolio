"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";

import { AppButton } from "@/components/common/AppButton";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/theme-provider";

// Icon swap is driven by the `.dark` class (not React state), so it is correct before hydration.
const ICON_BASE =
  "absolute inset-0 grid place-items-center transition-[rotate,scale,opacity] duration-450 ease-in-out-soft";

/** 44px round button; sun and moon rotate + scale into place, the button tilts on hover. */
export function ThemeToggle({ className }: { className?: string }) {
  const t = useTranslations("common");
  const { theme, toggleTheme } = useTheme();

  return (
    <AppButton
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={t("themeToggle")}
      aria-pressed={theme === "dark"}
      className={cn(
        "relative overflow-hidden duration-400 ease-out-soft hover:-rotate-20",
        className,
      )}
    >
      <span className={cn(ICON_BASE, "dark:scale-40 dark:rotate-90 dark:opacity-0")}>
        <Sun strokeWidth={1.75} aria-hidden="true" className="size-[18px]" />
      </span>
      <span
        className={cn(
          ICON_BASE,
          "scale-40 -rotate-90 opacity-0 dark:scale-100 dark:rotate-0 dark:opacity-100",
        )}
      >
        <Moon strokeWidth={1.75} aria-hidden="true" className="size-[18px]" />
      </span>
    </AppButton>
  );
}
