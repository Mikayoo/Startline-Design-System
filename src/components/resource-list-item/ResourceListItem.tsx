import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Badge } from "../badge";
import { SourceIndicator } from "../source-indicator";

const itemVariants = cva("flex w-full flex-col gap-2 rounded-lg border text-start", {
  variants: {
    emphasis: {
      recommended: "border-border-brand bg-background-brand-subtle p-5",
      default: "border-border-default bg-surface-primary px-5 py-4",
    },
  },
  defaultVariants: { emphasis: "default" },
});

export interface ResourceListItemProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Figma `Provider`, e.g. "Government resource". */
  provider: string;
  /** Figma `Title`. */
  title: string;
  /** Figma `Description`. */
  description?: string;
  /** Figma `Kind`: `resource` (official information) or `service` (verified service provider). @default "resource" */
  kind?: "resource" | "service";
  /** Figma `Emphasis`: `recommended` highlights the best match (max one per list). @default "default" */
  emphasis?: "recommended" | "default";
  /** Source tag text. Defaults to English "Official source" / "Verified service" — pass translations. */
  sourceLabel?: string;
  /** Text of the recommended tag. @default "Recommended for you" */
  recommendedLabel?: string;
  /** Makes the whole item a link. */
  href?: string;
  /** Heading level of the title. @default "h3" */
  titleAs?: "h2" | "h3" | "h4";
}

/**
 * Resource list item — a service or resource (provider, title, description, source) for comparison
 * in a list. `emphasis="recommended"` highlights the best match. Put several in a `<ul>`.
 *
 * Figma: Startline / Resource List Item — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=94-2274
 *
 * @example <ResourceListItem provider="Government resource" title="Newcomer services" description="…" href="/r/1" />
 */
export const ResourceListItem = React.forwardRef<HTMLElement, ResourceListItemProps>(function ResourceListItem(
  { provider, title, description, kind = "resource", emphasis, sourceLabel, recommendedLabel = "Recommended for you", href, titleAs: Title = "h3", className, ...props },
  ref,
) {
  const content = (
    <>
      {emphasis === "recommended" ? <Badge status="info" dot={false}>{recommendedLabel}</Badge> : null}
      <p className="text-label text-text-brand">{provider}</p>
      <Title className="text-card-title text-text-primary">{title}</Title>
      {description ? <p className="text-body text-text-secondary">{description}</p> : null}
      <SourceIndicator kind={kind === "service" ? "verified" : "official"}>
        {sourceLabel ?? (kind === "service" ? "Verified service" : "Official source")}
      </SourceIndicator>
    </>
  );
  const classes = cn(itemVariants({ emphasis }), className);
  return href ? (
    <a
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={href}
      className={cn(classes, "outline-none hover:border-border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring")}
      {...props}
    >
      {content}
    </a>
  ) : (
    <article ref={ref} className={classes} {...props}>
      {content}
    </article>
  );
});
