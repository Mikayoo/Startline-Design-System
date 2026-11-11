import * as React from "react";
import { IconButton, type IconButtonProps } from "../icon-button";

export interface BackButtonProps extends Omit<IconButtonProps, "icon" | "label"> {
  /** Accessible name, e.g. "Back" or "Back to Resources". Translate it. @default "Back" */
  label?: string;
}

/**
 * Back button — Icon button with the back arrow, top-start on detail screens without bottom
 * navigation. Mirrors in right-to-left layouts. Same as `<IconButton icon="arrow-left" label="Back" />`.
 *
 * Figma: Startline / Icon button (Arrow left) — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=592-559
 *
 * @example <BackButton onClick={() => router.back()} />
 */
export const BackButton = React.forwardRef<HTMLButtonElement, BackButtonProps>(function BackButton({ label = "Back", ...props }, ref) {
  return <IconButton ref={ref} icon="arrow-left" label={label} {...props} />;
});
