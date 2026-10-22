"use client";

import { useEffect, useRef } from "react";

import styles from "./Experience.module.css";

export interface TimelineItem {
  key: string;
  period: string;
  role: string;
  company: string;
  description: string;
}

/** The fill starts growing when the top of the timeline reaches 65% of the viewport height. */
const START = 0.65;
/** Rail inset (top + bottom) so the line runs between the first and last dot. */
const RAIL_INSET = 20;

/**
 * Vertical timeline whose brand-blue fill grows with the page scroll; items the fill has passed
 * light up. Passive scroll listener + requestAnimationFrame; reduced motion shows it all filled.
 */
export function ExperienceTimeline({ items }: { items: TimelineItem[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const fill = fillRef.current;
    if (!list || !fill) return;

    const rows = [...list.querySelectorAll<HTMLElement>("[data-item]")];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = list.getBoundingClientRect();
      const length = rect.height - RAIL_INSET;
      const raw = (window.innerHeight * START - rect.top) / length;
      const progress = reducedMotion ? 1 : Math.min(1, Math.max(0, raw));
      const filled = progress * length;

      fill.style.height = `${filled}px`;
      rows.forEach((row) => row.toggleAttribute("data-lit", row.offsetTop + 10 <= filled + 2));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div ref={listRef} className={styles.list}>
      <span aria-hidden="true" className={styles.rail} />
      <span ref={fillRef} aria-hidden="true" className={styles.fill} />
      <ol>
        {items.map((item) => (
          <li key={item.key} data-item="" className={styles.item}>
            <span aria-hidden="true" className={styles.dot} />
            <span className={styles.when}>{item.period}</span>
            <h3 className={styles.title}>
              {item.role} <span>· {item.company}</span>
            </h3>
            <p className={styles.text}>{item.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
