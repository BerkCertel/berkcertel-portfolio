"use client";

import { useInView } from "@/hooks/use-in-view";

type RevealProps = React.ComponentProps<"div"> & {
  /** Stagger position (sets `--i`) when the Reveal element itself animates (`className="reveal"`). */
  index?: number;
};

/**
 * Marks a block for entrance animations: sets data-visible="true" once it is in view.
 * The animations live in globals.css (`.reveal`, `.reveal-bar`) and only run with JS
 * (`html.js`) and without reduced motion, so content is never hidden for crawlers.
 * Children stagger with `style={{ "--i": n }}`.
 */
export function Reveal({ index, style, ...props }: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-reveal=""
      data-visible={inView ? "true" : undefined}
      style={index === undefined ? style : ({ ...style, "--i": index } as React.CSSProperties)}
      {...props}
    />
  );
}
