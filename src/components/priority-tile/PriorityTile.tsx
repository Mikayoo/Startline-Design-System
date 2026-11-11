import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "../icon";
import type { IconName } from "../icon/icons";

export interface PriorityTileProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  /** Figma `Icon`. */
  icon: IconName;
  /** Figma `Label`, e.g. "Housing". */
  label: string;
  /** Figma `State=Selected`. Announced as "pressed". */
  selected?: boolean;
  /** Called with the new selected state. */
  onSelectedChange?: (selected: boolean) => void;
}

/**
 * Priority tile — square selectable tile (icon + label) for picking goals or priorities, in a
 * 2-column grid. Multiple selection; announce the limit (e.g. "2 of 3 selected") near the grid.
 *
 * Figma: Startline / Priority tile — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=593-582
 *
 * @example <PriorityTile icon="home" label="Housing" selected={p.housing} onSelectedChange={(v) => set("housing", v)} />
 */
export const PriorityTile = React.forwardRef<HTMLButtonElement, PriorityTileProps>(function PriorityTile(
  { icon, label, selected = false, onSelectedChange, className, onClick, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={selected}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) onSelectedChange?.(!selected);
      }}
      className={cn(
        "group flex h-25 w-full cursor-pointer flex-col justify-between rounded-card p-4 text-start transition-colors outline-none",
        "bg-surface-primary text-text-primary shadow-raised aria-pressed:bg-action-primary aria-pressed:text-text-inverse aria-pressed:shadow-action",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    >
      <span className="flex w-full items-start justify-between">
        <span aria-hidden className="flex size-9.5 items-center justify-center rounded-md bg-background-brand-subtle text-text-brand group-aria-pressed:bg-surface-primary [&_svg]:size-5">
          <Icon name={icon} />
        </span>
        <span aria-hidden className="flex size-5.5 items-center justify-center rounded-full border-(length:--startline-border-medium) border-border-default text-action-primary group-aria-pressed:border-transparent group-aria-pressed:bg-surface-primary [&>svg]:invisible group-aria-pressed:[&>svg]:visible">
          <Icon name="check" className="size-3.5" />
        </span>
      </span>
      <span className="text-card-title">{label}</span>
    </button>
  );
});
