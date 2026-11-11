import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "../icon";

export interface ChoiceCardProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  /** Main text (Figma `Label`). */
  label: string;
  /** Supporting text under the label (Figma `Helper` + `Show helper`). */
  helper?: string;
  /**
   * Figma `Selection`. `single` = pick one (radio — give all cards in a group the same `name`);
   * `multiple` = pick several (checkbox).
   * @default "single"
   */
  selection?: "single" | "multiple";
  /** Called with the new checked state (Figma `State=Selected`). */
  onCheckedChange?: (checked: boolean) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

/**
 * Choice card — a large tappable option with label and optional helper, for onboarding and
 * questionnaires. `single` behaves as a radio button, `multiple` as a checkbox (native inputs, so
 * keyboard and screen readers work). Wrap a group in `<fieldset>` with a `<legend>` question.
 * Use Switch for instant settings.
 *
 * Figma: Startline / Choice card — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=68-1043
 *
 * @example
 * <fieldset><legend>What do you need help with first?</legend>
 *   <ChoiceCard name="priority" value="housing" label="Housing" helper="Find a place to live" />
 *   <ChoiceCard name="priority" value="health" label="Health" />
 * </fieldset>
 */
export const ChoiceCard = React.forwardRef<HTMLInputElement, ChoiceCardProps>(function ChoiceCard(
  { label, helper, selection = "single", onCheckedChange, onChange, className, disabled, ...props },
  ref,
) {
  const single = selection === "single";
  return (
    <label
      className={cn(
        "group flex w-full cursor-pointer items-center gap-3 rounded-lg border border-border-subtle bg-surface-primary p-4 text-text-brand",
        "has-[input:checked]:border-(length:--startline-border-medium) has-[input:checked]:border-action-primary has-[input:checked]:bg-background-brand-subtle",
        "has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-focus-ring",
        disabled && "cursor-not-allowed bg-surface-disabled text-text-disabled",
        className,
      )}
    >
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-button">{label}</span>
        {helper ? <span className="text-body">{helper}</span> : null}
      </span>
      <input
        ref={ref}
        type={single ? "radio" : "checkbox"}
        disabled={disabled}
        className="peer sr-only"
        onChange={(e) => {
          onChange?.(e);
          onCheckedChange?.(e.target.checked);
        }}
        {...props}
      />
      <span
        aria-hidden
        // Checkbox corner is fixed 5 px brand geometry in Figma (not a token).
        style={single ? undefined : { borderRadius: 5 }}
        className={cn(
          "flex size-5 shrink-0 items-center justify-center border-(length:--startline-border-medium) border-text-brand text-text-inverse",
          single && "rounded-full",
          "peer-checked:border-action-primary peer-checked:bg-action-primary",
          "[&>*]:invisible peer-checked:[&>*]:visible",
        )}
      >
        {single ? <span className="size-2 rounded-full bg-text-inverse" /> : <Icon name="check" className="size-3.5" />}
      </span>
    </label>
  );
});
