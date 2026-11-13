import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Persistent visible label above the field (Figma `Label`). Required — never rely on placeholder alone. */
  label: string;
  /** Helper text under the field (Figma `Helper` + `Show helper`). */
  helper?: string;
  /**
   * Error message (Figma `State=Error`). When set, the field turns red, the message replaces the
   * helper and is announced to screen readers. Explain how to fix it, not just what is wrong.
   */
  error?: string;
  /** Classes for the outer wrapper (the input itself gets `className`). */
  fieldClassName?: string;
}

/**
 * Text field — persistent label, editable value and optional helper. The error state explains how
 * to recover. 52 px control. Do not use Guidance card as a form field.
 * Figma `Value` is the placeholder (Default state) or the value (Filled state).
 *
 * Figma: Startline / Text field — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=95-1959
 *
 * @example <TextField label="Provider or contact" placeholder="Enter a name" helper="Check the details before saving" />
 */
export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, helper, error, id, fieldClassName, className, disabled, ...props },
  ref,
) {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  const messageId = `${inputId}-message`;
  const message = error ?? helper;
  return (
    <div className={cn("flex w-full flex-col gap-2", fieldClassName)}>
      <label htmlFor={inputId} className="text-label text-text-primary">
        {label}
      </label>
      <div
        className={cn(
          "flex rounded-md border border-border-default bg-surface-primary p-4",
          "focus-within:border-focus-ring focus-within:ring-1 focus-within:ring-inset focus-within:ring-focus-ring",
          error && "border-text-error focus-within:border-text-error focus-within:ring-text-error",
          disabled && "border-border-disabled bg-surface-disabled",
        )}
      >
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          className={cn(
            "min-w-0 flex-1 bg-transparent text-body text-text-primary outline-none placeholder:text-text-secondary",
            "disabled:cursor-not-allowed disabled:text-text-disabled disabled:placeholder:text-text-disabled",
            className,
          )}
          {...props}
        />
      </div>
      {message ? (
        <p id={messageId} role={error ? "alert" : undefined} className={cn("text-caption", error ? "text-text-error" : "text-text-secondary")}>
          {message}
        </p>
      ) : null}
    </div>
  );
});
