import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva("inline-flex w-fit shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full text-label", {
  variants: {
    status: {
      neutral: "bg-background-subtle text-text-secondary",
      info: "bg-status-info-subtle text-text-info",
      success: "bg-status-success-subtle text-text-success",
      warning: "bg-status-warning-subtle text-text-warning",
      error: "bg-status-error-subtle text-text-error",
    },
    size: { sm: "px-2 py-1", md: "px-3 py-2" },
  },
  defaultVariants: { status: "neutral", size: "sm" },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Figma `Status`. @default "neutral" */
  status?: "neutral" | "info" | "success" | "warning" | "error";
  /** Figma `Size`: sm 24 px, md 32 px. @default "sm" */
  size?: "sm" | "md";
  /** Figma `Show dot`. @default true */
  dot?: boolean;
}

/**
 * Badge — short, read-only status label (Neutral, Info, Success, Warning, Error) with an optional
 * dot. Always pair colour with a meaningful word. Use Chip for filters, Source indicator for provenance.
 *
 * Figma: Startline / Badge — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=94-1930
 *
 * @example <Badge status="success">Approved</Badge>
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { status, size, dot = true, className, children, ...props },
  ref,
) {
  return (
    <span ref={ref} className={cn(badgeVariants({ status, size }), className)} {...props}>
      {dot ? <span aria-hidden className={cn("shrink-0 rounded-full bg-current", size === "md" ? "size-2" : "size-1.5")} /> : null}
      {children}
    </span>
  );
});
