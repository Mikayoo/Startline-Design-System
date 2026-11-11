import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Badge } from "../badge";
import { Icon } from "../icon";

const cardVariants = cva("flex w-full flex-col gap-4.5 rounded-xl border p-6", {
  variants: {
    state: {
      next: "border-border-brand bg-background-brand-subtle shadow-200",
      upcoming: "border-border-default bg-surface-primary shadow-100",
      complete: "border-border-subtle bg-surface-primary shadow-100",
    },
  },
  defaultVariants: { state: "next" },
});

const BADGE = { next: "info", upcoming: "neutral", complete: "success" } as const;
const DEFAULT_STATUS = { next: "Next step", upcoming: "Upcoming", complete: "Complete" } as const;

export interface TaskCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Figma `State`: `next` = do now (highlighted), `upcoming` = later, `complete` = done. @default "next" */
  state?: "next" | "upcoming" | "complete";
  /** Figma `Title`. */
  title: string;
  /** Figma `Description` (+ `Show description`). */
  description?: string;
  /** Figma `Meta` (+ `Show meta`), e.g. "Recommended today". Shown with a calendar icon. */
  meta?: string;
  /** Figma `Action label`, e.g. "Start this step". */
  actionLabel?: string;
  /** Makes the action a link. */
  actionHref?: string;
  /** Makes the action a button. */
  onAction?: () => void;
  /** Status tag text. Defaults to English "Next step" / "Upcoming" / "Complete" — pass translations. */
  statusLabel?: string;
  /** Heading level of the title, to fit the page outline. @default "h3" */
  titleAs?: "h2" | "h3" | "h4";
}

/**
 * Task card — one next step on the user's path: status tag, title, optional description and meta,
 * and an action. Use for actionable steps; use Guidance card for information without an action.
 * Show at most one `next` card at a time.
 *
 * Figma: Startline / Task Card — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=94-2219
 *
 * @example
 * <TaskCard state="next" title="Apply for a Social Insurance Number" description="You need a SIN to work in Canada."
 *   meta="Recommended today" actionLabel="Start this step" actionHref="/steps/sin" />
 */
export const TaskCard = React.forwardRef<HTMLElement, TaskCardProps>(function TaskCard(
  { state = "next", title, description, meta, actionLabel, actionHref, onAction, statusLabel, titleAs: Title = "h3", className, ...props },
  ref,
) {
  const actionClass = cn(
    "relative flex w-full items-center justify-between text-button text-text-brand outline-none",
    "before:absolute before:-inset-x-2 before:-inset-y-2.5 hover:underline",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring [&_svg]:size-5",
  );
  const actionContent = (
    <>
      {actionLabel}
      <Icon name="chevron-right" />
    </>
  );
  return (
    <article ref={ref} className={cn(cardVariants({ state }), className)} {...props}>
      <Badge status={BADGE[state]}>{statusLabel ?? DEFAULT_STATUS[state]}</Badge>
      <div className="flex flex-col gap-2">
        <Title className="text-card-title text-text-primary">{title}</Title>
        {description ? <p className="text-body text-text-secondary">{description}</p> : null}
      </div>
      {meta ? (
        <p className="flex items-center gap-2 text-body text-text-secondary [&_svg]:size-4">
          <Icon name="calendar" />
          {meta}
        </p>
      ) : null}
      {actionLabel ? (
        <div className="pt-1">
          {actionHref ? (
            <a href={actionHref} className={actionClass}>{actionContent}</a>
          ) : (
            <button type="button" onClick={onAction} className={cn(actionClass, "cursor-pointer")}>{actionContent}</button>
          )}
        </div>
      ) : null}
    </article>
  );
});
