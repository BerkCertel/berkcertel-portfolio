"use client";

import { useEffect, useState } from "react";

/** Copies text to the clipboard; `copied` stays true for `resetAfter` ms (for "Copied" labels). */
export function useCopyToClipboard(resetAfter = 2000) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), resetAfter);
    return () => window.clearTimeout(timer);
  }, [copied, resetAfter]);

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // Clipboard blocked (permissions / insecure context): leave the label unchanged.
    }
  }

  return { copied, copy };
}
