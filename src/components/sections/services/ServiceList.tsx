import { useTranslations } from "next-intl";

import { ArrowIcon } from "@/components/common/icons";
import { SERVICES } from "@/constants/services";

/**
 * S1: numbered service rows. Hover or keyboard focus: a brand line grows across the top, the
 * number turns brand, the point chips open below the text and the arrow turns ink and tilts.
 * On touch devices (no hover) the points are always open.
 */
export function ServiceList() {
  const t = useTranslations("services.items");

  return (
    <ol>
      {SERVICES.map(({ key }, i) => (
        <li
          key={key}
          // Focusable so keyboard users get the same expanded state as on hover.
          tabIndex={0}
          className="group relative grid grid-cols-[90px_minmax(0,1fr)_56px] items-start gap-6 border-b border-line px-2 py-[30px] outline-offset-0 before:absolute before:-top-px before:left-0 before:h-0.5 before:w-0 before:bg-brand before:transition-[width] before:duration-550 before:ease-out-soft first:border-t hover:before:w-full focus-visible:before:w-full max-[760px]:grid-cols-[44px_minmax(0,1fr)_44px] max-[760px]:gap-4"
        >
          {/* Decorative number: the <ol> already gives the order to assistive tech. */}
          <span
            aria-hidden="true"
            className="font-display text-[44px] leading-none font-bold tracking-[-0.04em] text-line transition-colors duration-300 group-hover:text-brand group-focus-visible:text-brand max-[760px]:text-[30px]"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h2 className="font-display text-[30px] leading-[1.05] font-bold tracking-[-0.04em] max-[760px]:text-2xl">
              {t(`${key}.title`)}
            </h2>
            <p className="mt-2 max-w-[60ch] text-subtle">{t(`${key}.description`)}</p>
            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-450 ease-out-soft group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
              <div className="overflow-hidden">
                <ul className="flex flex-wrap gap-2 pt-3.5">
                  {(t.raw(`${key}.points`) as string[]).map((point) => (
                    <li
                      key={point}
                      className="rounded-full border border-line bg-surface px-3 py-1.5 text-[13.5px]"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <span
            aria-hidden="true"
            className="grid size-[52px] place-items-center rounded-full border border-line transition-all duration-350 ease-out-soft group-hover:-rotate-45 group-hover:bg-ink group-hover:text-bg group-focus-visible:-rotate-45 group-focus-visible:bg-ink group-focus-visible:text-bg max-[760px]:size-11"
          >
            <ArrowIcon />
          </span>
        </li>
      ))}
    </ol>
  );
}
