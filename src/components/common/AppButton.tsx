import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { Fragment } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ArrowIcon, ExternalIcon } from "./icons";
import { FOCUS_OUTLINE_CLASS } from "./styles";

const appButtonVariants = cva(
  [
    "group/btn rounded-full border border-transparent font-sans leading-none font-medium",
    "cursor-pointer transition-[background-color,border-color,color,scale,rotate] duration-250 active:scale-[0.98]",
    "focus-visible:border-transparent",
    FOCUS_OUTLINE_CLASS,
  ],
  {
    variants: {
      variant: {
        primary: "bg-ink text-bg hover:bg-brand hover:text-on-brand",
        accent: "bg-brand text-on-brand hover:bg-ink hover:text-bg",
        ghost:
          "border-line bg-transparent text-ink hover:border-ink hover:bg-transparent focus-visible:border-line",
        /** On the brand-colored CTA band. */
        inverted: "bg-on-brand text-brand hover:bg-ink hover:text-bg",
        /** Outline button on the brand-colored CTA band. */
        ghostInverted:
          "border-on-brand/45 bg-transparent text-on-brand hover:border-on-brand hover:bg-transparent focus-visible:border-on-brand/45",
      },
      size: {
        default: "h-12 gap-2.5 px-5.5 text-[15px]",
        mini: "h-[38px] gap-2 px-3.5 text-[13px]",
        icon: "size-11 shrink-0 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

const ICON_MOTION = "transition-transform duration-300 ease-out-soft";

/** Trailing icons with their hover motion: arrow nudges right, ↗ moves diagonally. */
const RIGHT_ICONS = {
  arrow: <ArrowIcon className={cn(ICON_MOTION, "group-hover/btn:translate-x-[3px]")} />,
  external: (
    <ExternalIcon
      className={cn(
        ICON_MOTION,
        "group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5",
      )}
    />
  ),
};

type AppButtonProps = Omit<React.ComponentProps<typeof Button>, "variant" | "size"> &
  VariantProps<typeof appButtonVariants> & {
    leftIcon?: React.ReactNode;
    /** "arrow" / "external" use the design's animated icons; any node is rendered as-is. */
    rightIcon?: keyof typeof RIGHT_ICONS | React.ReactNode;
  };

/**
 * Design button (pill, 48px) on top of shadcn Button.
 * With `asChild`, pass a link (AppLink) as the only child; icons are placed inside it.
 */
export function AppButton({
  variant,
  size,
  leftIcon,
  rightIcon,
  asChild,
  className,
  children,
  ...props
}: AppButtonProps) {
  const right =
    typeof rightIcon === "string" && Object.hasOwn(RIGHT_ICONS, rightIcon)
      ? RIGHT_ICONS[rightIcon as keyof typeof RIGHT_ICONS]
      : rightIcon;

  return (
    <Button
      // Plain buttons never submit a form by accident; the submit button passes type="submit".
      type={asChild ? undefined : "button"}
      asChild={asChild}
      className={cn(appButtonVariants({ variant, size }), className)}
      {...props}
    >
      {asChild ? (
        // Slottable marks where the child link's own content goes; the icons wrap around it.
        [
          <Fragment key="left">{leftIcon}</Fragment>,
          <Slot.Slottable key="content">{children}</Slot.Slottable>,
          <Fragment key="right">{right}</Fragment>,
        ]
      ) : (
        <>
          {leftIcon}
          {children}
          {right}
        </>
      )}
    </Button>
  );
}
