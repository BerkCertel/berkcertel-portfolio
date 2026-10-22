"use client";

import { useEffect, useRef, useState } from "react";

/**
 * True once the element has entered the viewport (never resets).
 * Triggers when its top passes the bottom 15% of the viewport (rootMargin instead of a
 * visibility ratio, so blocks taller than the screen still trigger).
 */
export function useInView<T extends Element>(rootMargin = "0px 0px -15% 0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [inView, rootMargin]);

  return [ref, inView] as const;
}
