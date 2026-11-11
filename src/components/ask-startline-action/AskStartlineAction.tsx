import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon } from "../icon";

const askVariants = cva(
  [
    "inline-flex h-control-md shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap text-button text-text-brand transition-colors [&_svg]:size-4.5",
    "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
    "disabled:cursor-not-allowed disabled:text-text-disabled",
  ],
  {
    variants: {
      format: {
        compact: "rounded-full bg-background-brand-subtle px-4 hover:bg-action-secondary active:bg-action-secondary-pressed disabled:bg-surface-disabled",
        contextual: "rounded-md bg-transparent px-2 hover:bg-action-tertiary-hover active:bg-action-secondary disabled:bg-transparent",
      },
    },
    defaultVariants: { format: "compact" },
  },
);

export interface AskStartlineActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Figma `Format`: `compact` = filled pill inside cards; `contextual` = quiet text action under
   * content. @default "compact"
   */
  format?: "compact" | "contextual";
}

/**
 * Ask Startline action — opens the AI assistant with the current context. Use only where an AI
 * answer can help with that content. The label (Figma `Label`) is the children; default "Ask Startline".
 *
 * Figma: Startline / Ask Startline Action — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=94-2076
 *
 * @example <AskStartlineAction onClick={() => openAssistant({ about: resource.id })} />
 */
export const AskStartlineAction = React.forwardRef<HTMLButtonElement, AskStartlineActionProps>(function AskStartlineAction(
  { format, className, type, children = "Ask Startline", ...props },
  ref,
) {
  return (
    <button ref={ref} type={type ?? "button"} className={cn(askVariants({ format }), className)} {...props}>
      <Icon name="chat" />
      {children}
    </button>
  );
});
