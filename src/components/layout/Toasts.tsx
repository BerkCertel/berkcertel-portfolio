"use client";

import { Toaster } from "@/components/ui/sonner";
import { useTheme } from "@/providers/theme-provider";

/** App-wide toast outlet (sonner), following the site theme. */
export function Toasts() {
  const { theme } = useTheme();
  return <Toaster theme={theme} position="bottom-center" />;
}
