"use client";

import { useEffect, useState } from "react";

/** Length of the build-up intro in LayerStack.module.css (layers land, then the labels appear). */
const INTRO_MS = 1400;

/** True once the intro has played in this page load, so client navigations back home skip it. */
let introPlayed = false;

type IntroState = "pending" | "play" | "done";

/**
 * Wrapper of the hero stack that drives its one-time "layer by layer" intro via `data-intro`:
 * pending (hidden, only with JS) → play (layers build up) → done (loop animations run).
 * The server always renders "pending"; CSS keeps the stack visible without JS or with reduced motion.
 */
export function StackIntro(props: React.ComponentProps<"div">) {
  const [state, setState] = useState<IntroState>(() => (introPlayed ? "done" : "pending"));

  // Start right after hydration, together with the hero copy's entrance.
  useEffect(() => {
    if (state !== "pending") return;
    introPlayed = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const frame = requestAnimationFrame(() => setState(reduced ? "done" : "play"));
    return () => cancelAnimationFrame(frame);
  }, [state]);

  // Hand over to the loop animations once the stack is built.
  useEffect(() => {
    if (state !== "play") return;
    const timer = window.setTimeout(() => setState("done"), INTRO_MS);
    return () => window.clearTimeout(timer);
  }, [state]);

  return <div data-intro={state} {...props} />;
}
