"use client";

import { useTranslations } from "next-intl";

import { AppButton } from "@/components/common/AppButton";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

/** "Copy" mini button that shows "Copied" for a moment after copying `text`. */
export function CopyButton({ text }: { text: string }) {
  const t = useTranslations("common");
  const { copied, copy } = useCopyToClipboard();

  return (
    <AppButton variant="ghost" size="mini" onClick={() => copy(text)}>
      <span aria-live="polite">{copied ? t("copied") : t("copy")}</span>
    </AppButton>
  );
}
