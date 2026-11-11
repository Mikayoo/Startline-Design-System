import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge about Startline's custom text-style classes so
// `text-body` and `text-text-primary` are not treated as conflicting.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["screen-heading", "section-title", "title", "card-title", "body", "button", "label", "caption", "navigation", "tab-label"] }],
    },
  },
});

/** Merge class names; later Tailwind classes win over earlier conflicting ones. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
