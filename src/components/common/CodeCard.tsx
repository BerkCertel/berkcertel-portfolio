import { CODE_CARD_FILE, CODE_CARD_LINES, type CodeToken } from "@/constants/code-card";
import { TECH_ICONS } from "@/constants/tech-icons";
import { cn } from "@/lib/utils";

import { Reveal } from "./Reveal";

const TOKEN_CLASS: Record<CodeToken["t"], string | undefined> = {
  kw: "text-code-kw",
  key: "text-code-key",
  str: "text-code-str",
  punc: "text-code-punc",
  plain: undefined,
};

/**
 * Decorative `berk.ts` editor window: numbered, syntax-colored lines that rise in one by one,
 * ending with a blinking caret. aria-hidden: the same facts are on the page as text.
 */
export function CodeCard({ className }: { className?: string }) {
  return (
    <Reveal
      aria-hidden="true"
      className={cn(
        "self-start overflow-hidden rounded-[22px] border border-deep-line bg-code-bg shadow-[0_40px_70px_-40px_color-mix(in_srgb,var(--c-deep)_55%,transparent)]",
        className,
      )}
    >
      <div className="flex items-center gap-[7px] border-b border-deep-line px-4 py-3.5">
        {[0, 1, 2].map((dot) => (
          <i key={dot} className="size-2.5 rounded-full bg-deep-line" />
        ))}
        <span className="ml-2.5 flex items-center gap-[7px] rounded-[7px] bg-on-deep/8 px-2.5 py-1.5 font-mono text-xs leading-none font-medium text-on-deep">
          <b
            className="rounded-[3px] px-[3px] py-0.5 font-mono text-[9px] leading-none font-bold text-white"
            style={{ background: TECH_ICONS.typescript?.hex }}
          >
            TS
          </b>
          {CODE_CARD_FILE}
        </span>
      </div>
      <div className="overflow-x-auto pt-5 pb-6 font-mono text-[13.5px] leading-[1.9] text-on-deep max-[760px]:text-[11.5px]">
        {CODE_CARD_LINES.map((tokens, line) => (
          <div
            key={line}
            className="reveal flex whitespace-pre"
            style={
              {
                "--i": line,
                "--reveal-delay": "0.3s",
                "--reveal-step": "0.1s",
                "--reveal-duration": "0.45s",
              } as React.CSSProperties
            }
          >
            <span className="w-11 flex-none pr-4 text-right text-code-line-no select-none max-[760px]:w-8 max-[760px]:pr-2.5">
              {line + 1}
            </span>
            <span>
              {tokens.map((token, i) => (
                <span key={i} className={TOKEN_CLASS[token.t]}>
                  {token.v}
                </span>
              ))}
              {line === CODE_CARD_LINES.length - 1 && (
                <span className="ml-1 inline-block h-4 w-2 animate-blink bg-sun align-[-3px]" />
              )}
            </span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
