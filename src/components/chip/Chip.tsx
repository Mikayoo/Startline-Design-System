import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const chipVariants = cva(
  [
    "relative inline-flex w-fit shrink-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-full transition-colors",
    "bg-background-brand-subtle text-text-brand ring-1 ring-inset ring-border-brand",
    "aria-pressed:bg-action-primary aria-pressed:text-text-inverse aria-pressed:ring-0",
    "disabled:cursor-not-allowed disabled:bg-surface-disabled disabled:text-text-disabled disabled:ring-0",
    "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
  ],
  {
    variants: {
      size: {
        // SM is 36 px tall in Figma; the ::before extends the touch target to 44 px.
        sm: "h-control-sm px-3 text-label before:absolute before:inset-x-0 before:-inset-y-1 [&_svg]:size-4",
        md: "h-control-md px-4 text-button [&_svg]:size-5",
      },
    },
    defaultVariants: { size: "sm" },
  },
);

export interface ChipProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  /** Figma `State=Selected` — the filter is on. Announced as "pressed". */
  selected?: boolean;
  /** Called with the new selected state when the chip is clicked. */
  onSelectedChange?: (selected: boolean) => void;
  /** Figma `Size`: sm 36 px (44 px touch area), md 44 px. @default "sm" */
  size?: "sm" | "md";
  /** Figma `Show leading icon` — usually `<Icon name="check" />` on selected chips. */
  leadingIcon?: React.ReactNode;
}

/**
 * Chip — a selectable filter. Selected = filter on; Disabled = unavailable (not the same as
 * unselected). Use in a row above lists. Use Badge for read-only status.
 *
 * Figma: Startline / Chip — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=94-2004
 *
 * @example <Chip selected={f.housing} onSelectedChange={(on) => setF({ ...f, housing: on })}>Housing</Chip>
 */
export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  { selected = false, onSelectedChange, size, leadingIcon, className, onClick, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={selected}
      className={cn(chipVariants({ size }), className)}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) onSelectedChange?.(!selected);
      }}
      {...props}
    >
      {leadingIcon ? <span aria-hidden className="contents">{leadingIcon}</span> : null}
      {children}
    </button>
  );
});
