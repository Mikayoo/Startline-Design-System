import * as React from "react";
import { Slot } from "radix-ui";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon } from "../icon";

export const pillButtonVariants = cva(
  [
    "inline-flex h-control-xl shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-card-title transition-colors",
    "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-action-disabled disabled:text-text-disabled disabled:shadow-none [&_svg]:size-5",
  ],
  {
    variants: {
      variant: {
        primary: "bg-action-primary text-text-inverse shadow-action hover:bg-action-primary-hover active:bg-action-primary-pressed",
        secondary: "bg-surface-primary text-text-primary shadow-raised ring-1 ring-inset ring-border-subtle hover:bg-background-subtle",
        "on-dark": "bg-surface-primary text-text-primary hover:bg-background-subtle",
        ghost: "bg-transparent text-text-brand hover:bg-action-tertiary-hover active:bg-action-secondary disabled:bg-transparent",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

export interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Figma `Variant`: `primary` main action; `secondary` white alternative; `on-dark` white pill on
   * photos and dark cards; `ghost` text only.
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "on-dark" | "ghost";
  /** Figma `Show arrow` — trailing arrow for "continue"-style actions. Mirrors in RTL. */
  arrow?: boolean;
  /** Render the child (e.g. a router Link) with pill styles. */
  asChild?: boolean;
}

/**
 * Pill button — the main call to action on a screen (56 px, usually full width at the bottom, or on
 * a photo hero with `variant="on-dark"`). One primary pill per screen. For compact actions inside
 * cards and panels use Button.
 *
 * Figma: Startline / Pill button — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=592-550
 *
 * @example <PillButton arrow className="w-full">Continue</PillButton>
 */
export const PillButton = React.forwardRef<HTMLButtonElement, PillButtonProps>(function PillButton(
  { variant, arrow, asChild, className, type, children, ...props },
  ref,
) {
  const classes = cn(pillButtonVariants({ variant }), className);
  if (asChild) return <Slot.Root ref={ref} className={classes} {...props}>{children}</Slot.Root>;
  return (
    <button ref={ref} type={type ?? "button"} className={classes} {...props}>
      {children}
      {arrow ? <Icon name="arrow-right" /> : null}
    </button>
  );
});
