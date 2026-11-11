import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const guidanceVariants = cva("flex w-full flex-col gap-2", {
  variants: {
    layout: {
      card: "rounded-lg border border-border-subtle p-4",
      row: "",
      tile: "h-full rounded-lg p-4",
    },
    tone: { neutral: "", info: "" },
  },
  compoundVariants: [
    { layout: ["card", "tile"], tone: "neutral", className: "bg-surface-primary" },
    { layout: ["card", "tile"], tone: "info", className: "bg-background-brand-subtle" },
  ],
  defaultVariants: { layout: "card", tone: "neutral" },
});

export interface GuidanceCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Figma `Title`. */
  title: string;
  /** Figma `Body` (+ `Show body`). */
  body?: string;
  /**
   * Figma `Layout`: `card` standalone; `row` inside a grouped list (no box);
   * `tile` compact, for a two-column grid of categories.
   * @default "card"
   */
  layout?: "card" | "row" | "tile";
  /** Figma `Tone`: `info` tints helpful tips. @default "neutral" */
  tone?: "neutral" | "info";
  /** Heading level of the title. @default "h3" */
  titleAs?: "h2" | "h3" | "h4";
}

/**
 * Guidance card — supporting information with no task action. Let text wrap; do not truncate.
 * Not a form field and not a task (use Task card when there is something to do).
 *
 * Figma: Startline / Guidance card — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=96-2007
 *
 * @example <GuidanceCard tone="info" title="Prepare for your next step" body="Keep useful details together…" />
 */
export const GuidanceCard = React.forwardRef<HTMLElement, GuidanceCardProps>(function GuidanceCard(
  { title, body, layout, tone, titleAs: Title = "h3", className, ...props },
  ref,
) {
  return (
    <section ref={ref} className={cn(guidanceVariants({ layout, tone }), className)} {...props}>
      <Title className="text-card-title text-text-primary">{title}</Title>
      {body ? <p className="text-body text-text-secondary">{body}</p> : null}
    </section>
  );
});
