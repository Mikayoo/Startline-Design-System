import * as React from "react";
import { cn } from "@/lib/utils";
import { APP_ICON, PATHMARK_GRADIENTS as G, PATHMARK_PATHS as P, PATHMARK_VIEWBOX } from "@/brand/artwork";

export type LogoTheme = "color" | "mono" | "inverse";

export interface LogoMarkProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Figma `Theme`. `color` on light or dark app surfaces (brand gradients); `mono` one-colour
   * (Text/Primary); `inverse` on brand-filled surfaces (Text/Inverse).
   * @default "color"
   */
  theme?: LogoTheme;
  /** Accessible name. Defaults to "Startline". Pass `""` when the mark sits next to the wordmark. */
  title?: string;
}

/**
 * Logo mark — the Startline pathmark symbol alone. Preserve its geometry; never recolour it
 * outside the three themes. Size with `size-*` / `h-*` classes (default 48 px).
 *
 * Figma: Startline / Logo Mark — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=93-1930
 */
export function LogoMark({ theme = "color", title = "Startline", className, ...props }: LogoMarkProps) {
  const id = React.useId().replace(/:/g, "");
  const teal = theme === "color" ? `url(#${id}-teal)` : "currentColor";
  const tealDot = theme === "color" ? `url(#${id}-tealdot)` : "currentColor";
  const sand = theme === "color" ? `url(#${id}-sand)` : "currentColor";
  return (
    <svg
      viewBox={PATHMARK_VIEWBOX}
      fill="none"
      role={title ? "img" : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      className={cn(
        "h-12 w-auto shrink-0",
        theme === "mono" && "text-text-primary",
        theme === "inverse" && "text-text-inverse",
        className,
      )}
      {...props}
    >
      {theme === "color" && (
        <defs>
          <linearGradient id={`${id}-teal`} x1={G.teal.x1.upper} x2={G.teal.x2.upper} y1="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor={G.teal.from} />
            <stop offset="1" stopColor={G.teal.to} />
          </linearGradient>
          <linearGradient id={`${id}-tealdot`} x1={G.teal.x1.dot} x2={G.teal.x2.dot} y1="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor={G.teal.from} />
            <stop offset="1" stopColor={G.teal.to} />
          </linearGradient>
          <linearGradient id={`${id}-sand`} x1={G.sand.x1} x2={G.sand.x2} y1="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor={G.sand.from} />
            <stop offset="1" stopColor={G.sand.to} />
          </linearGradient>
        </defs>
      )}
      <path d={P.upper} fill={teal} />
      <path d={P.dot} fill={tealDot} />
      <path d={P.lower} fill={sand} />
    </svg>
  );
}

export interface LogoLockupProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Figma `Layout`. `horizontal` for headers; `stacked` for splash and empty states. @default "horizontal" */
  layout?: "horizontal" | "stacked";
  /** Figma `Theme`. @default "color" */
  theme?: LogoTheme;
  /** Height of the symbol in px; the wordmark scales with it (Figma: 76 horizontal, 96 stacked). */
  markSize?: number;
}

/**
 * Logo lockup — pathmark + "Startline" wordmark (Plus Jakarta Sans Medium, −2 % tracking).
 * Proportions come from Figma and scale together via `markSize`.
 *
 * Figma: Startline / Logo Lockup — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=93-1946
 */
export function LogoLockup({ layout = "horizontal", theme = "color", markSize, className, style, ...props }: LogoLockupProps) {
  const mark = markSize ?? (layout === "stacked" ? 96 : 76);
  // Figma geometry: wordmark 44/52 px next to a 76 px mark, 20 px gap; stacked 96 px mark, 12 px gap.
  const scale = mark / (layout === "stacked" ? 96 : 76);
  return (
    <span
      role="img"
      aria-label="Startline"
      className={cn(
        "inline-flex items-center",
        layout === "stacked" ? "flex-col" : "flex-row",
        theme === "inverse" ? "text-text-inverse" : "text-text-primary",
        className,
      )}
      style={{ gap: (layout === "stacked" ? 12 : 20) * scale, ...style }}
      {...props}
    >
      <LogoMark theme={theme} title="" style={{ height: mark, width: "auto" }} className="h-auto" />
      <span
        aria-hidden
        className="font-medium whitespace-nowrap"
        style={{ fontSize: 44 * scale, lineHeight: `${52 * scale}px`, letterSpacing: "-0.02em" }}
      >
        Startline
      </span>
    </span>
  );
}

export interface AppIconProps extends React.SVGProps<SVGSVGElement> {
  /** Accessible name. @default "Startline" */
  title?: string;
}

/**
 * App icon — white pathmark on the brand teal tile, 28/128 corner radius. Fixed brand colours
 * (does not change with themes). Size with `size-*` classes (default 64 px).
 *
 * Figma: Startline / App Icon — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=93-1989
 */
export function AppIcon({ title = "Startline", className, ...props }: AppIconProps) {
  return (
    <svg viewBox={APP_ICON.viewBox} role="img" aria-label={title} className={cn("size-16 shrink-0", className)} {...props}>
      <rect width="128" height="128" rx={APP_ICON.radius} fill={APP_ICON.tile} />
      {APP_ICON.paths.map((d) => (
        <path key={d} d={d} fill={APP_ICON.mark} />
      ))}
    </svg>
  );
}
