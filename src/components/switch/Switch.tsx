import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

export type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>;

/**
 * Switch — turns a setting on or off immediately, without a Save button. Use for preferences;
 * use Choice card for questions. Give it a name with a `<label htmlFor>` or `aria-label`
 * (inside a Settings row the row label does this). 44×26 px; touch area extended to 46 px tall.
 *
 * Figma `Checked` → `checked` / `defaultChecked`; `State=Disabled` → `disabled`.
 *
 * Figma: Startline / Switch — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=95-1984
 *
 * @example <Switch aria-label="Appointment reminders" checked={on} onCheckedChange={setOn} />
 */
export const Switch = React.forwardRef<React.ComponentRef<typeof SwitchPrimitive.Root>, SwitchProps>(function Switch(
  { className, ...props },
  ref,
) {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      className={cn(
        "relative inline-flex h-6.5 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.75 transition-colors",
        "bg-border-default data-[state=checked]:bg-action-primary",
        "disabled:cursor-not-allowed disabled:bg-action-disabled data-[state=checked]:disabled:bg-action-disabled",
        "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
        "before:absolute before:inset-x-0 before:-inset-y-2.5",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block size-5 rounded-full bg-surface-primary transition-transform",
          "data-[state=checked]:translate-x-4.5 rtl:data-[state=checked]:-translate-x-4.5",
        )}
      />
    </SwitchPrimitive.Root>
  );
});
