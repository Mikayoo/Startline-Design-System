import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon } from "../icon";

const fieldVariants = cva(
  [
    "flex w-full items-center gap-2.5 rounded-md border border-border-default bg-surface-primary text-text-brand",
    "focus-within:border-border-brand focus-within:ring-1 focus-within:ring-inset focus-within:ring-border-brand",
    "has-[input:disabled]:border-border-disabled has-[input:disabled]:bg-surface-disabled",
  ],
  {
    variants: {
      size: { md: "h-control-md px-4 [&_svg]:size-5", lg: "h-control-lg px-5 [&_svg]:size-6" },
    },
    defaultVariants: { size: "md" },
  },
);

export interface SearchFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** Figma `Size`: md 44 px, lg 52 px. @default "md" */
  size?: "md" | "lg";
  /** Called by the clear button. The button (Figma `Show clear`) appears when this is set and the field has a value. */
  onClear?: () => void;
  /** Accessible name of the clear button. @default "Clear search" */
  clearLabel?: string;
  /** Classes for the outer field (the input itself gets `className`). */
  fieldClassName?: string;
}

/**
 * Search field — single-line input for searching resources or lists, with a search icon and an
 * optional clear button. Use Text field for form data entry.
 * Figma `Query` is the placeholder (Default state) or the value (Filled state).
 * Always give it an accessible name: `aria-label` or a visible `<label htmlFor>`.
 *
 * Figma: Startline / Search Field — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=94-2158
 *
 * @example <SearchField aria-label="Search resources" placeholder="Search" value={q} onChange={…} onClear={() => setQ("")} />
 */
export const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(function SearchField(
  { size, onClear, clearLabel = "Clear search", fieldClassName, className, value, defaultValue, ...props },
  ref,
) {
  const hasValue = value !== undefined ? String(value).length > 0 : undefined;
  return (
    <div className={cn(fieldVariants({ size }), fieldClassName)}>
      <Icon name="search" />
      <input
        ref={ref}
        type="search"
        value={value}
        defaultValue={defaultValue}
        className={cn(
          "min-w-0 flex-1 bg-transparent text-body text-text-primary outline-none",
          "placeholder:text-text-secondary disabled:cursor-not-allowed disabled:text-text-disabled disabled:placeholder:text-text-disabled",
          "[&::-webkit-search-cancel-button]:appearance-none",
          className,
        )}
        {...props}
      />
      {onClear && hasValue !== false ? (
        <button
          type="button"
          onClick={onClear}
          aria-label={clearLabel}
          disabled={props.disabled}
          className="relative shrink-0 rounded-full text-text-secondary outline-none after:absolute after:-inset-3 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
        >
          <Icon name="close" />
        </button>
      ) : null}
    </div>
  );
});
