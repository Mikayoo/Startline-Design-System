import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "../icon";
import type { IconName } from "../icon/icons";

export interface ChoiceCardProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "title"> {
  /** Figma `Title` — the answer. */
  title: string;
  /** Figma `Helper` (+ `Show helper`) — one line of explanation. */
  helper?: string;
  /** Figma `Icon` — shown in the tile at the start. */
  icon?: IconName;
  /**
   * Figma `Control`: `radio` = pick one (give every card in the group the same `name`);
   * `check` = pick several.
   * @default "radio"
   */
  control?: "radio" | "check";
  /** Called with the new checked state (Figma `State=Selected`). */
  onCheckedChange?: (checked: boolean) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

/**
 * Choice card — a selectable answer with icon tile, title and optional helper, for onboarding
 * questions. Native radio/checkbox underneath, so keyboard and screen readers work. Wrap a group in
 * `<fieldset>` with the question as `<legend>`. Use Toggle row for settings.
 *
 * Figma: Startline / Choice card — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=592-599
 *
 * @example
 * <fieldset><legend>What is your situation?</legend>
 *   <ChoiceCard name="status" value="claimant" icon="shield" title="Refugee claimant" helper="Waiting for a decision" />
 * </fieldset>
 */
export const ChoiceCard = React.forwardRef<HTMLInputElement, ChoiceCardProps>(function ChoiceCard(
  { title, helper, icon, control = "radio", onCheckedChange, onChange, className, disabled, ...props },
  ref,
) {
  const radio = control === "radio";
  return (
    <label
      className={cn(
        "group flex w-full cursor-pointer items-center gap-3 rounded-card border-(length:--startline-border-medium) border-transparent bg-surface-primary py-4 ps-4 pe-4.5 shadow-raised",
        "has-[input:checked]:border-action-primary has-[input:checked]:bg-background-brand-subtle",
        "has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-focus-ring",
        disabled && "cursor-not-allowed opacity-60",
        className,
      )}
    >
      {icon ? (
        <span aria-hidden className="flex size-control-md shrink-0 items-center justify-center rounded-md bg-background-brand-subtle text-text-brand group-has-[input:checked]:bg-surface-primary [&_svg]:size-5.5">
          <Icon name={icon} />
        </span>
      ) : null}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-card-title text-text-primary">{title}</span>
        {helper ? <span className="text-body text-text-secondary">{helper}</span> : null}
      </span>
      <input
        ref={ref}
        type={radio ? "radio" : "checkbox"}
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
        className={cn(
          "flex size-6 shrink-0 items-center justify-center border-(length:--startline-border-medium) border-border-default text-text-inverse",
          radio ? "rounded-full" : "rounded-sm",
          "peer-checked:border-action-primary peer-checked:bg-action-primary [&>*]:invisible peer-checked:[&>*]:visible",
        )}
      >
        {radio ? <span className="size-2.25 rounded-full bg-text-inverse" /> : <Icon name="check" className="size-4" />}
      </span>
    </label>
  );
});
