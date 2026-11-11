import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon } from "../icon";
import type { IconName } from "../icon/icons";

const iconButtonVariants = cva(
  [
    "relative inline-flex size-control-md shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors [&_svg]:size-5",
    "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
    "disabled:cursor-not-allowed disabled:text-text-disabled",
  ],
  {
    variants: {
      variant: {
        light: "bg-surface-primary text-text-primary shadow-raised hover:bg-background-subtle active:bg-background-brand-subtle",
        glass: "bg-surface-glass text-text-on-media ring-1 ring-inset ring-border-glass backdrop-blur-md hover:bg-surface-glass",
      },
    },
    defaultVariants: { variant: "light" },
  },
);

export interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Figma `Icon` (instance swap) — any Startline icon name. */
  icon: IconName;
  /** Accessible name, e.g. "Back", "Notifications". Required — the button has no visible text. */
  label: string;
  /** Figma `Variant`: `light` on the warm background; `glass` on photos. @default "light" */
  variant?: "light" | "glass";
  /** Small amber dot for unread items (e.g. notifications). Add the count to `label`. */
  dot?: boolean;
}

/**
 * Icon button — round 44 px button with a single icon (back, notifications, search, more).
 *
 * Figma: Startline / Icon button — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=592-559
 *
 * @example <IconButton icon="bell" label="Notifications, 1 unread" dot />
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, label, variant, dot, className, type, ...props },
  ref,
) {
  return (
    <button ref={ref} type={type ?? "button"} aria-label={label} className={cn(iconButtonVariants({ variant }), className)} {...props}>
      <Icon name={icon} />
      {dot ? <span aria-hidden className="absolute end-2 top-2 size-2.5 rounded-full bg-accent-amber ring-2 ring-surface-primary" /> : null}
    </button>
  );
});
