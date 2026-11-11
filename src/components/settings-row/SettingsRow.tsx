import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "../icon";

export interface SettingsRowProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  /** Figma `Label`, e.g. "Language". */
  label: string;
  /** Figma `Value` — the current setting, e.g. "English". */
  value?: string;
  /** Makes the row a link to the detail screen (otherwise a button with `onClick`). */
  href?: string;
}

/**
 * Settings row — a row in a settings list with label, current value and chevron; opens a detail
 * screen. Figma `State`: Pressed is the CSS :active state; Disabled → `disabled`.
 * Group rows in a list; for instant on/off use a Switch with its own label instead.
 *
 * Figma: Startline / Settings row — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=96-2023
 *
 * @example <SettingsRow label="Language" value="English" href="/settings/language" />
 */
export const SettingsRow = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, SettingsRowProps>(function SettingsRow(
  { label, value, href, className, disabled, ...props },
  ref,
) {
  const classes = cn(
    "flex w-full items-center gap-3 rounded-md bg-surface-primary p-4 text-start outline-none transition-colors",
    "active:bg-background-brand-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
    "[&>svg]:size-5 [&>svg]:text-text-brand",
    disabled ? "cursor-not-allowed" : "cursor-pointer",
    className,
  );
  // Spoken as "Language, English" (a pause between label and value).
  const name = value ? `${label}, ${value}` : label;
  const content = (
    <>
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className={cn("text-label", disabled ? "text-text-disabled" : "text-text-primary")}>{label}</span>
        {value ? <span className="text-body text-text-secondary">{value}</span> : null}
      </span>
      <Icon name="chevron-right" />
    </>
  );
  if (href && !disabled) {
    return (
      <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} aria-label={name} className={classes}>
        {content}
      </a>
    );
  }
  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} type="button" aria-label={name} disabled={disabled} className={classes} {...props}>
      {content}
    </button>
  );
});
