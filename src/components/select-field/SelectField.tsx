import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "../icon";

export interface SelectFieldProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  /** Figma `Label` — small text above the value. */
  label: string;
  /** The choices. */
  options: { value: string; label: string }[];
  /** Called with the chosen value. */
  onValueChange?: (value: string) => void;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  /** Shown when nothing is chosen yet. */
  placeholder?: string;
}

/**
 * Select field — a tappable field showing a small label and the chosen value (Figma `Value`); opens
 * the device's native list of options (best on phones and with screen readers). 64 px tall.
 * Use Text field for typed answers.
 *
 * Figma: Startline / Select field — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=593-620
 *
 * @example <SelectField label="Province or territory" value={p} onValueChange={setP} options={provinces} />
 */
export const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(function SelectField(
  { label, options, onValueChange, onChange, placeholder, className, value, defaultValue, disabled, id, ...props },
  ref,
) {
  const autoId = React.useId();
  const selectId = id ?? autoId;
  const [inner, setInner] = React.useState(defaultValue as string | undefined);
  const current = (value as string | undefined) ?? inner;
  const shown = options.find((o) => o.value === current)?.label ?? placeholder ?? "";
  return (
    <div
      className={cn(
        "relative flex h-16 w-full items-center gap-3 rounded-lg bg-surface-primary ps-4.5 pe-4 shadow-raised",
        "has-[select:focus-visible]:outline-2 has-[select:focus-visible]:outline-offset-2 has-[select:focus-visible]:outline-focus-ring",
        disabled && "bg-surface-disabled",
        className,
      )}
    >
      <span aria-hidden className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-caption text-text-secondary">{label}</span>
        <span className={cn("truncate text-card-title", disabled ? "text-text-disabled" : current ? "text-text-primary" : "text-text-secondary")}>{shown}</span>
      </span>
      <Icon name="chevron-down" className="size-5 text-text-secondary" />
      <select
        ref={ref}
        id={selectId}
        aria-label={label}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={(e) => {
          setInner(e.target.value);
          onChange?.(e);
          onValueChange?.(e.target.value);
        }}
        className="absolute inset-0 cursor-pointer appearance-none opacity-0 disabled:cursor-not-allowed"
        {...props}
      >
        {placeholder ? <option value="" disabled>{placeholder}</option> : null}
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
});
