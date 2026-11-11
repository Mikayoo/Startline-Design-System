import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Chip } from "../chip";
import { Icon } from "../icon";

const panelVariants = cva("flex w-full flex-col gap-4.5 rounded-xl border p-6", {
  variants: {
    state: {
      entry: "border-border-brand bg-background-brand-subtle shadow-200",
      answer: "border-border-default bg-surface-primary shadow-100",
      escalation: "border-border-default bg-surface-primary shadow-100",
    },
  },
  defaultVariants: { state: "entry" },
});

export interface AIAssistantPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /**
   * Figma `State`:
   * - `entry` — invite a question (highlighted): heading, intro, suggested questions, Ask action.
   * - `answer` — AI answer: the question, an "AI summary" SourceIndicator, the answer, sources, actions.
   * - `escalation` — hand-off to a human when a decision depends on the person's situation.
   * @default "entry"
   */
  state?: "entry" | "answer" | "escalation";
  /** Header title. @default "Ask Startline" */
  title?: string;
  /** Header subtitle, e.g. "AI navigation assistant", "Answer with sources", "When confirmation matters". */
  subtitle?: string;
  /** Small print at the bottom, e.g. "The linked source remains authoritative." */
  footnote?: string;
  /** Panel content — compose it from Startline components (see stories). */
  children?: React.ReactNode;
}

/**
 * AI Assistant Panel — one step of an AI conversation. Separates AI guidance from source evidence
 * and human support. Rules: always label AI text with `<SourceIndicator kind="ai-summary">`, always
 * show the sources it used, and offer human help (`escalation`) when the answer depends on legal,
 * immigration or eligibility decisions. Never present AI text as official.
 *
 * Figma: Startline / AI Assistant Panel — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=94-2315
 *
 * @example
 * <AIAssistantPanel state="answer" subtitle="Answer with sources" footnote="The linked source remains authoritative.">
 *   <AIAssistantQuestion>I just arrived in Ontario. What should I do first?</AIAssistantQuestion>
 *   <SourceIndicator kind="ai-summary">AI summary · sources shown</SourceIndicator>
 *   <p className="text-body text-text-primary">…</p>
 * </AIAssistantPanel>
 */
export const AIAssistantPanel = React.forwardRef<HTMLElement, AIAssistantPanelProps>(function AIAssistantPanel(
  { state, title = "Ask Startline", subtitle, footnote, className, children, ...props },
  ref,
) {
  const headingId = React.useId();
  return (
    <section ref={ref} aria-labelledby={headingId} className={cn(panelVariants({ state }), className)} {...props}>
      <header className="flex items-center gap-3">
        <span aria-hidden className="flex size-avatar-md shrink-0 items-center justify-center rounded-md bg-action-primary text-text-inverse [&_svg]:size-5">
          <Icon name="chat" />
        </span>
        <span className="flex min-w-0 flex-col gap-0.5">
          <span id={headingId} className="text-card-title text-text-primary">{title}</span>
          {subtitle ? <span className="text-body text-text-secondary">{subtitle}</span> : null}
        </span>
      </header>
      {children}
      {footnote ? <p className="text-caption text-text-secondary">{footnote}</p> : null}
    </section>
  );
});

export interface AIAssistantQuestionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Small label above the question. Translate it. @default "You asked" */
  label?: string;
}

/** The user's question, quoted inside an `answer` panel (Figma: "You asked" box). */
export function AIAssistantQuestion({ label = "You asked", className, children, ...props }: AIAssistantQuestionProps) {
  return (
    <div className={cn("flex flex-col gap-1.5 rounded-lg bg-background-subtle p-4", className)} {...props}>
      <p className="text-label text-text-secondary">{label}</p>
      <p className="text-body text-text-primary">{children}</p>
    </div>
  );
}

export interface AIAssistantSuggestionsProps extends Omit<React.HTMLAttributes<HTMLUListElement>, "onSelect"> {
  /** Suggested questions, shown as chips (Figma: 3 small Chips stacked). */
  suggestions: string[];
  /** Called with the chosen question. */
  onSelect?: (suggestion: string) => void;
}

/** Suggested questions in an `entry` panel. */
export function AIAssistantSuggestions({ suggestions, onSelect, className, ...props }: AIAssistantSuggestionsProps) {
  return (
    <ul className={cn("flex flex-col items-start gap-2", className)} {...props}>
      {suggestions.map((s) => (
        <li key={s}>
          <Chip onClick={() => onSelect?.(s)} aria-pressed={undefined}>{s}</Chip>
        </li>
      ))}
    </ul>
  );
}
