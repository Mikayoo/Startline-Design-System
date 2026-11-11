import * as React from "react";
import { cn } from "@/lib/utils";
import { DIRECTIONAL_ICONS, ICONS, resolveIcon, type IconName } from "./icons";

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, "name"> {
  /** Which Startline icon (Figma `Name`). */
  name: IconName;
  /**
   * Accessible name. Omit for decorative icons next to text (they are hidden from screen readers).
   * Set it when the icon is the only content of a control or conveys meaning on its own.
   */
  label?: string;
}

/**
 * Icon — the Startline v3.1 icon set (39 icons): 24 px outline, 1.75 px stroke at every size (like Figma), coloured by the surrounding text
 * colour (`currentColor`). Size follows `size-*` classes (default 24 px; Button sets 20 px).
 * Directional icons (chevron-right) mirror automatically in right-to-left layouts.
 *
 * Interactive icons need a 44 px target — put them inside Button or BackButton, never alone.
 * For an icon that is not in this set, use `lucide-react` with `strokeWidth={1.75}`.
 *
 * Figma: Startline / Icon — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=831-3828
 *
 * @example <Icon name="search" />            // decorative
 * @example <Icon name="bell" label="Notifications" />
 */
export const Icon = React.forwardRef<SVGSVGElement, IconProps>(function Icon(
  { name, label, className, ...props },
  ref,
) {
  const key = resolveIcon(name);
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      className={cn("size-6 shrink-0", DIRECTIONAL_ICONS.has(key) && "rtl:-scale-x-100", className)}
      {...props}
    >
      {ICONS[key].map((d) => (
        <path key={d} d={d} vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
});
