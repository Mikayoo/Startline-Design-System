import * as React from "react";
import { cn } from "@/lib/utils";
import { Switch, type SwitchProps } from "../switch";

export interface ToggleRowProps extends Omit<SwitchProps, "children"> {
  /** Figma `Label` — names the switch. */
  label: string;
  /** Optional second line under the label. */
  description?: string;
  /** Classes for the row (the Switch gets `className`). */
  rowClassName?: string;
}

/**
 * Toggle row — a labelled Switch in a list (reminders, privacy, offline). Changes apply immediately.
 * The label is connected to the switch, so tapping the text toggles it too.
 *
 * Figma: Startline / Toggle row — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=584-455
 *
 * @example <ToggleRow label="3 days before" checked={r3} onCheckedChange={setR3} />
 */
export const ToggleRow = React.forwardRef<React.ComponentRef<typeof Switch>, ToggleRowProps>(function ToggleRow(
  { label, description, rowClassName, id, ...props },
  ref,
) {
  const autoId = React.useId();
  const switchId = id ?? autoId;
  const descId = `${switchId}-desc`;
  return (
    <div className={cn("flex w-full items-center gap-3 border-b border-border-subtle py-3", rowClassName)}>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <label htmlFor={switchId} className="cursor-pointer text-body text-text-primary">{label}</label>
        {description ? <span id={descId} className="text-caption text-text-secondary">{description}</span> : null}
      </span>
      <Switch ref={ref} id={switchId} aria-describedby={description ? descId : undefined} {...props} />
    </div>
  );
});
