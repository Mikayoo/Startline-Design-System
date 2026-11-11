/**
 * Screen patterns from Startline App v3.1 (Home and other top-level screens).
 * They are compositions of Startline tokens and components that repeat across screens.
 * Figma: App v3.1 / 09 Home — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=605-21
 * (Not yet Figma components — see PLAN.md open items.)
 */
import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "../components/avatar";
import { Icon } from "../components/icon";
import type { IconName } from "../components/icon/icons";
import { PillButton } from "../components/pill-button";

type Heading = "h1" | "h2" | "h3";

/* ---------------------------------------------------------------- ScreenHeader */
export interface ScreenHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Small line above the title, e.g. "Good morning, Kelvin". */
  eyebrow?: string;
  /** Screen title (the page's h1). */
  title: string;
  /** Profile photo URL shown at the start. */
  avatarSrc?: string;
  /** Trailing action, usually an IconButton (notifications, search). */
  action?: React.ReactNode;
}

/** Screen header — optional photo, greeting, screen title (h1) and one action. Top of top-level screens. */
export function ScreenHeader({ eyebrow, title, avatarSrc, action, className, ...props }: ScreenHeaderProps) {
  return (
    <header className={cn("flex items-center gap-3", className)} {...props}>
      {avatarSrc ? <Avatar src={avatarSrc} size="xl" /> : null}
      <div className="flex min-w-0 flex-1 flex-col">
        {eyebrow ? <p className="text-caption text-text-secondary">{eyebrow}</p> : null}
        <h1 className="truncate text-screen-heading text-text-primary">{title}</h1>
      </div>
      {action}
    </header>
  );
}

/* ---------------------------------------------------------------- SearchBar */
export interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Called by the AI button next to the field. Omit to hide the button. */
  onAsk?: () => void;
  /** Accessible name of the AI button. @default "Ask Startline" */
  askLabel?: string;
}

/** Search bar — rounded search field plus the Ask Startline (AI) button. Give the field an `aria-label`. */
export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(function SearchBar(
  { onAsk, askLabel = "Ask Startline", className, ...props },
  ref,
) {
  return (
    <div role="search" className={cn("flex items-center gap-2.5", className)}>
      <div className="flex h-13 min-w-0 flex-1 items-center gap-2.5 rounded-full bg-surface-primary ps-4.5 pe-4 shadow-raised text-text-secondary has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-focus-ring [&_svg]:size-5">
        <Icon name="search" />
        <input
          ref={ref}
          type="search"
          className="min-w-0 flex-1 bg-transparent text-body text-text-primary outline-none placeholder:text-text-secondary [&::-webkit-search-cancel-button]:appearance-none"
          {...props}
        />
      </div>
      {onAsk ? (
        <button
          type="button"
          onClick={onAsk}
          aria-label={askLabel}
          className="flex size-13 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-action-primary text-text-inverse outline-none hover:bg-action-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring [&_svg]:size-5.5"
        >
          <Icon name="sparkle" />
        </button>
      ) : null}
    </div>
  );
});

/* ---------------------------------------------------------------- HeroCard */
export interface HeroCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Background photo URL. Decorative (the title carries the meaning). */
  image: string;
  /** Glass tag at the top, e.g. "Next step · Housing". */
  tag?: string;
  /** Hero title. */
  title: string;
  /** Progress, e.g. { current: 1, total: 3, label: "1 of 3 steps" }. */
  progress?: { current: number; total: number; label: string };
  /** Pill action label, e.g. "Continue". */
  actionLabel?: string;
  /** Pill action link. */
  actionHref?: string;
  /** Heading level. @default "h2" */
  titleAs?: Heading;
}

/** Hero card — the user's next step on a photo: glass tag, white title, step progress and an on-dark Pill button. One per screen. */
export function HeroCard({ image, tag, title, progress, actionLabel, actionHref, titleAs: Title = "h2", className, ...props }: HeroCardProps) {
  return (
    <section className={cn("relative isolate flex h-56 flex-col justify-between overflow-hidden rounded-2xl p-4 shadow-raised", className)} {...props}>
      <img src={image} alt="" className="absolute inset-0 -z-20 size-full object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-b from-overlay-photo-top via-overlay-photo-middle via-40% to-overlay-photo-bottom" />
      {tag ? (
        <span className="flex w-fit items-center gap-1.5 rounded-full bg-surface-glass-dark py-1.5 ps-2.5 pe-3 text-label text-text-on-media ring-1 ring-inset ring-border-glass backdrop-blur-md [&_svg]:size-3.5">
          <Icon name="sparkle" />
          {tag}
        </span>
      ) : <span />}
      <div className="flex flex-col gap-2.5">
        <Title className="text-screen-heading text-text-on-media">{title}</Title>
        <div className="flex items-center justify-between gap-3">
          {progress ? (
            <div className="flex flex-col gap-1.5">
              <p className="text-caption text-text-on-media-subtle">{progress.label}</p>
              <div className="flex gap-1" aria-hidden>
                {Array.from({ length: progress.total }, (_, i) => (
                  <span key={i} className={cn("h-1 w-6.5 rounded-full", i < progress.current ? "bg-text-on-media" : "bg-surface-glass")} />
                ))}
              </div>
            </div>
          ) : <span />}
          {actionLabel ? (
            <PillButton asChild variant="on-dark">
              <a href={actionHref}>
                {actionLabel}
                <Icon name="arrow-right" />
              </a>
            </PillButton>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- QuickAction */
export interface QuickActionProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: IconName;
  label: string;
  href: string;
}

/** Quick action — shortcut tile (icon in a circle + label). Use 3 in a row. */
export function QuickAction({ icon, label, className, ...props }: QuickActionProps) {
  return (
    <a
      className={cn(
        "flex flex-col items-center gap-2.5 rounded-card bg-surface-primary px-3 py-4 text-center shadow-raised outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
        className,
      )}
      {...props}
    >
      <span aria-hidden className="flex size-10 items-center justify-center rounded-full bg-background-brand-subtle text-text-brand [&_svg]:size-5">
        <Icon name={icon} />
      </span>
      <span className="text-label text-text-primary">{label}</span>
    </a>
  );
}

/* ---------------------------------------------------------------- SectionHeader */
export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  /** e.g. "See all". */
  actionLabel?: string;
  actionHref?: string;
  /** Heading level. @default "h2" */
  titleAs?: Heading;
}

/** Section header — section title (Section title style) and an optional "See all" link. */
export function SectionHeader({ title, actionLabel, actionHref, titleAs: Title = "h2", className, ...props }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-baseline justify-between gap-3", className)} {...props}>
      <Title className="text-section-title text-text-primary">{title}</Title>
      {actionLabel ? (
        <a href={actionHref} className="relative text-label text-text-brand outline-none before:absolute before:-inset-3 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring">
          {actionLabel}
        </a>
      ) : null}
    </div>
  );
}

/* ---------------------------------------------------------------- RecommendationCard */
export interface RecommendationCardProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "title"> {
  image: string;
  /** Topic tag, e.g. "Health". */
  topic: string;
  title: string;
  /** Where it comes from, e.g. "Ontario.ca". Shown with a check. */
  source: string;
  href: string;
}

/** Recommendation card — photo, topic tag, title and source. Use in a horizontal carousel (236 px wide). */
export function RecommendationCard({ image, topic, title, source, className, ...props }: RecommendationCardProps) {
  return (
    <a
      className={cn(
        "flex w-59 shrink-0 snap-start flex-col gap-2.5 rounded-xl bg-surface-primary p-2 shadow-raised outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
        className,
      )}
      {...props}
    >
      <img src={image} alt="" className="h-29 w-full rounded-lg object-cover" />
      <span className="flex flex-col items-start gap-1.5 px-2 pb-2">
        <span className="rounded-full bg-background-brand-subtle px-2.5 py-1 text-label text-text-brand">{topic}</span>
        <span className="text-card-title text-text-primary">{title}</span>
        <span className="flex items-center gap-1 text-caption text-text-secondary [&_svg]:size-3.5 [&_svg]:text-text-success">
          <Icon name="check" />
          {source}
        </span>
      </span>
    </a>
  );
}

/* ---------------------------------------------------------------- ReminderCard */
export interface ReminderCardProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "title"> {
  icon?: IconName;
  title: string;
  detail?: string;
  href: string;
}

/** Reminder card — deep brand card for what's coming up (e.g. "1 reminder this week"). */
export function ReminderCard({ icon = "calendar", title, detail, className, ...props }: ReminderCardProps) {
  return (
    <a
      className={cn(
        "flex flex-col gap-2.5 rounded-xl bg-linear-to-br from-surface-brand-deep-start to-surface-brand-deep-end p-5 shadow-floating outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
        className,
      )}
      {...props}
    >
      <span className="flex items-center gap-3">
        <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-glass text-text-on-media ring-1 ring-inset ring-border-glass [&_svg]:size-5">
          <Icon name={icon} />
        </span>
        <span className="text-title text-text-on-media">{title}</span>
      </span>
      {detail ? <span className="text-body text-text-on-media-subtle">{detail}</span> : null}
    </a>
  );
}

/* ---------------------------------------------------------------- EventCard */
export interface EventCardProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "title"> {
  image?: string;
  /** e.g. "Sat 31 Oct". */
  date: string;
  title: string;
  location?: string;
  href: string;
}

/** Event card — thumbnail, date tag, title and place, for "Near you" and community lists. */
export function EventCard({ image, date, title, location, className, ...props }: EventCardProps) {
  return (
    <a
      className={cn(
        "flex items-center gap-3 rounded-xl bg-surface-primary p-3 shadow-raised outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
        className,
      )}
      {...props}
    >
      {image ? <img src={image} alt="" className="size-20 shrink-0 rounded-lg object-cover" /> : null}
      <span className="flex min-w-0 flex-1 flex-col items-start gap-1.5">
        <span className="flex items-center gap-1 rounded-full bg-background-brand-subtle px-2.5 py-1 text-label text-text-brand [&_svg]:size-3.5">
          <Icon name="calendar" />
          {date}
        </span>
        <span className="text-card-title text-text-primary">{title}</span>
        {location ? (
          <span className="flex items-center gap-1 text-caption text-text-secondary [&_svg]:size-3.5">
            <Icon name="pin" />
            {location}
          </span>
        ) : null}
      </span>
    </a>
  );
}
