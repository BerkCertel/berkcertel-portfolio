"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/** Sticky "On this page" list; the heading currently being read is highlighted. */
export function TableOfContents({ headings }: { headings: { id: string; text: string }[] }) {
  const t = useTranslations("blog");
  const [activeId, setActiveId] = useState(headings[0]?.id);

  useEffect(() => {
    const elements = headings
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    // Active = the last heading that has passed the upper third of the viewport.
    let frame = 0;
    const update = () => {
      frame = 0;
      const passed = elements.filter(
        (element) => element.getBoundingClientRect().top < window.innerHeight / 3,
      );
      setActiveId((passed.at(-1) ?? elements[0])?.id);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [headings]);

  return (
    <nav
      aria-label={t("onThisPage")}
      className="sticky top-[110px] flex flex-col gap-3 self-start text-sm max-[1080px]:hidden"
    >
      <span className="eyebrow mb-1.5">{t("onThisPage")}</span>
      {headings.map(({ id, text }) => (
        <a
          key={id}
          href={`#${id}`}
          aria-current={id === activeId ? "location" : undefined}
          className={cn(
            "border-l-2 pl-3 transition-colors duration-200 hover:border-brand hover:text-ink",
            id === activeId ? "border-brand text-ink" : "border-line text-subtle",
          )}
        >
          {text}
        </a>
      ))}
    </nav>
  );
}
