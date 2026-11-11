import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "../icon";
import type { IconName } from "../icon/icons";

export interface ReviewRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Figma `Icon`. */
  icon: IconName;
  /** Figma `Label` — the question, e.g. "Situation". */
  label: string;
  /** Figma `Value` — the answer, e.g. "Refugee claimant". */
  value: string;
  /** Figma `Action label`. Translate it. @default "Change" */
  actionLabel?: string;
  /** Called by the Change action (go back to that question). */
  onAction?: () => void;
}

/**
 * Review row — one answer in a review or summary list: icon tile, label, value and a Change action
 * that returns to the question. Put rows in a `<ul>`. The action is announced as "Change Situation".
 *
 * Figma: Startline / Review row — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=593-626
 *
 * @example <ReviewRow icon="file" label="Situation" value="Refugee claimant" onAction={() => goTo("status")} />
 */
export function ReviewRow({ icon, label, value, actionLabel = "Change", onAction, className, ...props }: ReviewRowProps) {
  return (
    <div className={cn("flex w-full items-center gap-3 py-3", className)} {...props}>
      <span aria-hidden className="flex size-avatar-md shrink-0 items-center justify-center rounded-md bg-background-brand-subtle text-text-brand [&_svg]:size-5">
        <Icon name={icon} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-caption text-text-secondary">{label}</span>
        <span className="text-card-title text-text-primary">{value}</span>
      </span>
      {onAction ? (
        <button
          type="button"
          onClick={onAction}
          aria-label={`${actionLabel} ${label}`}
          className="relative shrink-0 cursor-pointer rounded-full bg-background-subtle px-3 py-1.5 text-label text-text-brand outline-none before:absolute before:-inset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
