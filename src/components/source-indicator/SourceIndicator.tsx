import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon } from "../icon";
import type { IconName } from "../icon/icons";

const variants = cva("inline-flex w-fit shrink-0 items-center whitespace-nowrap rounded-full text-label", {
  variants: {
    kind: {
      official: "bg-status-info-subtle text-text-info",
      verified: "bg-status-success-subtle text-text-success",
      updated: "bg-background-subtle text-text-secondary",
      "ai-summary": "bg-background-brand-subtle text-text-brand",
    },
    size: { sm: "gap-1.5 px-2 py-1 [&_svg]:size-3.5", md: "gap-2 px-3 py-2 [&_svg]:size-4" },
  },
  defaultVariants: { kind: "official", size: "sm" },
});

const ICON: Record<NonNullable<SourceIndicatorProps["kind"]>, IconName> = {
  official: "check",
  verified: "check",
  updated: "calendar",
  "ai-summary": "chat",
};

export interface SourceIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Figma `Kind` — where the information comes from:
   * `official` (government or the service itself), `verified` (checked by Startline),
   * `updated` (last-updated date), `ai-summary` (written by AI — always show this on AI text).
   * @default "official"
   */
  kind?: "official" | "verified" | "updated" | "ai-summary";
  /** Figma `Size`: sm 24 px, md 32 px. @default "sm" */
  size?: "sm" | "md";
}

/**
 * Source indicator — shows where information comes from, to build trust. Place it next to facts
 * and AI answers. The label (Figma `Label`) is the children, e.g. "Official source", "Updated 3 May".
 *
 * Figma: Startline / Trust / Source Indicator — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=94-1961
 *
 * @example <SourceIndicator kind="ai-summary">AI summary</SourceIndicator>
 */
export const SourceIndicator = React.forwardRef<HTMLSpanElement, SourceIndicatorProps>(function SourceIndicator(
  { kind = "official", size, className, children, ...props },
  ref,
) {
  return (
    <span ref={ref} className={cn(variants({ kind, size }), className)} {...props}>
      <Icon name={ICON[kind]} />
      {children}
    </span>
  );
});
