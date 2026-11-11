import * as React from "react";
import { cn } from "@/lib/utils";

export interface BackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible name, e.g. "Back" or "Back to Resources". Translate it. @default "Back" */
  label?: string;
}

/**
 * Back button — 44 px round button that returns to the previous screen. Use top-start on detail
 * screens without bottom navigation. Not a general icon button. Mirrors in right-to-left layouts.
 * Figma `State=Pressed` is the CSS :active state.
 *
 * Figma: Startline / Back button — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=68-1044
 *
 * @example <BackButton onClick={() => router.back()} />
 */
export const BackButton = React.forwardRef<HTMLButtonElement, BackButtonProps>(function BackButton(
  { label = "Back", className, type, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type ?? "button"}
      aria-label={label}
      className={cn(
        "inline-flex size-control-md shrink-0 cursor-pointer items-center justify-center rounded-full bg-surface-warm text-action-primary transition-colors",
        "active:bg-background-brand-subtle outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
        "disabled:cursor-not-allowed disabled:text-text-disabled",
        className,
      )}
      {...props}
    >
      {/* Bold back chevron, exported from Figma (5 px stroke on a 24 px grid). */}
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-6 rtl:-scale-x-100">
        <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
});
