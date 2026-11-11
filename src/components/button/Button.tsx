import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button styles. Every value is a Startline token (Figma `Startline / Button`, node 94:2027).
 * Figma `State` (Hover / Pressed / Disabled) maps to CSS :hover / :active / :disabled.
 */
export const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-button",
    "transition-colors duration-150 cursor-pointer select-none",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-action-disabled disabled:text-text-disabled",
    "[&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: "bg-action-primary text-text-inverse hover:bg-action-primary-hover active:bg-action-primary-pressed",
        secondary: [
          "bg-action-secondary text-text-brand ring-1 ring-inset ring-border-brand",
          "hover:bg-action-secondary-hover active:bg-action-secondary-pressed disabled:ring-border-disabled",
        ],
        tertiary: "bg-transparent text-text-brand hover:bg-action-tertiary-hover active:bg-action-secondary disabled:bg-transparent",
        destructive: "bg-action-danger text-text-on-danger hover:bg-action-danger-hover active:bg-action-danger-pressed",
      },
      size: {
        md: "h-control-md px-5",
        lg: "h-control-lg px-6",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Visual emphasis (Figma `Variant`).
   * - `primary` — the one main action on a screen
   * - `secondary` — alternative actions
   * - `tertiary` — low-emphasis text action
   * - `destructive` — deletes or removes something
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "tertiary" | "destructive";
  /**
   * Height (Figma `Size`). `lg` = 52 px for main screen actions; `md` = 44 px inside cards and rows.
   * @default "md"
   */
  size?: "md" | "lg";
  /** Icon before the label (Figma `Leading icon`). Use an `Icon` or Lucide icon; sized to 20 px. */
  leadingIcon?: React.ReactNode;
  /** Icon after the label (Figma `Trailing icon`), e.g. a chevron for "continue". */
  trailingIcon?: React.ReactNode;
  /** Render the child element (e.g. a router `<Link>`) with button styles instead of a `<button>`. */
  asChild?: boolean;
}

/**
 * Button — triggers an action.
 *
 * Use `primary` once per screen for the main action, `secondary` for alternatives, `tertiary` for
 * low-emphasis actions and `destructive` for delete/remove. Use `size="lg"` for main screen actions
 * and `size="md"` inside cards and rows. For navigation to another page, prefer a link (`asChild`).
 *
 * Figma: Startline / Button — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=94-2027
 *
 * @example
 * <Button variant="primary" size="lg" trailingIcon={<Icon name="chevron-right" />}>Continue</Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, leadingIcon, trailingIcon, asChild = false, type, children, ...props },
  ref,
) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (asChild) {
    return (
      <Slot.Root ref={ref} className={classes} {...props}>
        {children}
      </Slot.Root>
    );
  }
  return (
    <button ref={ref} type={type ?? "button"} className={classes} {...props}>
      {leadingIcon ? <span aria-hidden className="contents">{leadingIcon}</span> : null}
      {children}
      {trailingIcon ? <span aria-hidden className="contents">{trailingIcon}</span> : null}
    </button>
  );
});
