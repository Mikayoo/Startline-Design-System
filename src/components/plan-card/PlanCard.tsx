import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "../icon";

export interface PlanCardProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "title"> {
  /** Figma `State`: `next` outlines the step to start now (show at most one). @default "default" */
  state?: "default" | "next";
  /** Figma `Step`, e.g. "Step 2". Shown in the tag when not `next`. */
  step?: string;
  /** Figma `Status label` — tag text in the `next` state. @default "Start here" */
  statusLabel?: string;
  /** Figma `Topic`, e.g. "Housing". */
  topic?: string;
  /** Figma `Title`. */
  title: string;
  /** Figma `Time`, e.g. "About 20 min". */
  time?: string;
  /** Figma `Location`, e.g. "Kitchener". */
  location?: string;
  /** Thumbnail image URL (84 px square). */
  image?: string;
  /** Thumbnail alt text; leave empty when the image is decorative. @default "" */
  imageAlt?: string;
  /** Where the card goes — the whole card is one link. */
  href: string;
}

/**
 * Plan card — a compact step in the user's plan: thumbnail, step tag, topic, title, time and
 * location. The whole card is a link to the step. `state="next"` highlights the step to start now.
 * Use Task card when the step needs a visible action button.
 *
 * Figma: Startline / Plan card — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=593-619
 *
 * @example <PlanCard state="next" topic="Housing" title="Find a safe place to stay" time="About 20 min" location="Kitchener" image={img} href="/steps/housing" />
 */
export const PlanCard = React.forwardRef<HTMLAnchorElement, PlanCardProps>(function PlanCard(
  { state = "default", step, statusLabel = "Start here", topic, title, time, location, image, imageAlt = "", href, className, ...props },
  ref,
) {
  const next = state === "next";
  return (
    <a
      ref={ref}
      href={href}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl border-(length:--startline-border-medium) bg-surface-primary py-3 ps-3 pe-4 shadow-raised outline-none",
        next ? "border-action-primary" : "border-transparent",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
        className,
      )}
      {...props}
    >
      {image ? <img src={image} alt={imageAlt} className="size-21 shrink-0 rounded-lg object-cover" /> : null}
      <span className="flex min-w-0 flex-1 flex-col gap-1.5">
        <span className="flex items-center gap-1.5">
          {next || step ? (
            <span className={cn("rounded-full px-2 py-1 text-label", next ? "bg-action-primary text-text-inverse" : "bg-background-brand-subtle text-text-brand")}>
              {next ? statusLabel : step}
            </span>
          ) : null}
          {topic ? <span className="text-label text-text-secondary">{topic}</span> : null}
        </span>
        <span className="text-card-title text-text-primary">{title}</span>
        {time || location ? (
          <span className="flex flex-wrap items-center gap-1 text-caption text-text-secondary [&_svg]:size-3.5">
            {time ? <><Icon name="clock" />{time}</> : null}
            {time && location ? <span aria-hidden>·</span> : null}
            {location ? <><Icon name="pin" />{location}</> : null}
          </span>
        ) : null}
      </span>
    </a>
  );
});
