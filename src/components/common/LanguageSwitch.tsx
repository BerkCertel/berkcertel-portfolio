"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/** TR / EN pill with a sliding ink thumb; switches language and keeps the current page. */
export function LanguageSwitch({ className }: { className?: string }) {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: typeof locale) {
    if (next === locale) return;
    startTransition(() => {
      // `pathname` is the internal template (e.g. /blog/[slug]); params fill it in.
      // @ts-expect-error -- params always match the current pathname
      router.replace({ pathname, params }, { locale: next });
    });
  }

  return (
    <div
      role="group"
      aria-label={t("language")}
      aria-busy={isPending}
      className={cn(
        "relative inline-grid h-11 grid-cols-2 rounded-full border border-line bg-surface p-1 font-mono text-xs font-semibold tracking-[0.08em] transition-colors hover:border-ink",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-ink transition-transform duration-450 ease-in-out-soft",
          locale === "en" && "translate-x-full",
        )}
      />
      {routing.locales.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            aria-pressed={active}
            onClick={() => switchTo(code)}
            className={cn(
              "relative z-10 min-w-[42px] cursor-pointer rounded-full px-2.5 uppercase transition-colors duration-350",
              active ? "text-bg" : "text-subtle hover:text-ink",
            )}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
