import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "../badge";
import { Icon } from "../icon";
import type { IconName } from "../icon/icons";

type Level = "required" | "recommended" | "helpful";

const LEVEL_STATUS = { required: "warning", recommended: "info", helpful: "neutral" } as const;
const LEVEL_LABEL: Record<Level, string> = { required: "Required", recommended: "Recommended", helpful: "Helpful" };

export interface DocumentCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Figma `Title`: the document's name. */
  title: string;
  /** Figma `Helper`: where it comes from or what it's often called. */
  helper?: string;
  /** Figma `Body`: why it may help, and what to do without it. */
  body?: string;
  /** Figma `Level`. Required uses warning colours; never colour alone, the label says it. @default "recommended" */
  level?: Level;
  /** Translated label for the level badge. Defaults to the English level name. */
  levelLabel?: string;
  /** Figma `Icon` (instance swap). @default "file" */
  icon?: IconName;
  /** Heading level of the title. @default "h3" */
  titleAs?: "h2" | "h3" | "h4";
}

/**
 * Document card — one document a step may need, on "Documents you may need". Shows the name, where it
 * comes from, why it may help, what to do without it, and whether it is Required, Recommended or
 * Helpful. Read-only: documents are never required to use Startline, so pair a list of these with a
 * way to continue without them.
 *
 * Figma: Startline / Document card — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=934-318
 *
 * @example <DocumentCard level="recommended" title="Photo ID" helper="Passport or other ID, if you have one" body="If you don't have one, ask what they accept." />
 */
export const DocumentCard = React.forwardRef<HTMLElement, DocumentCardProps>(function DocumentCard(
  { title, helper, body, level = "recommended", levelLabel, icon = "file", titleAs: Title = "h3", className, ...props },
  ref,
) {
  return (
    <section
      ref={ref}
      className={cn("flex w-full flex-col gap-2 rounded-lg bg-surface-primary p-4 shadow-raised", className)}
      {...props}
    >
      <div className="flex items-center gap-3">
        <span aria-hidden className="flex size-11 shrink-0 items-center justify-center rounded-md bg-background-brand-subtle text-text-brand [&_svg]:size-5">
          <Icon name={icon} />
        </span>
        <div className="flex min-w-0 flex-col">
          <Title className="text-card-title text-text-primary">{title}</Title>
          {helper ? <p className="text-caption text-text-secondary">{helper}</p> : null}
        </div>
      </div>
      {body ? <p className="text-body text-text-secondary">{body}</p> : null}
      <Badge status={LEVEL_STATUS[level]} dot={false}>
        {levelLabel ?? LEVEL_LABEL[level]}
      </Badge>
    </section>
  );
});
