import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon } from "../icon";

const avatarVariants = cva(
  "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-action-secondary text-text-brand select-none",
  {
    variants: {
      size: {
        sm: "size-avatar-sm text-label [&_svg]:size-4",
        md: "size-avatar-md text-label [&_svg]:size-5",
        lg: "size-avatar-lg text-button [&_svg]:size-6",
        xl: "size-control-md text-button [&_svg]:size-6",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Up to 2 letters shown in the circle (Figma `Initials`). */
  initials?: string;
  /**
   * Figma `Type`. `initials` shows the letters; `icon` shows a generic person icon.
   * @default "initials" when `initials` is set, otherwise "icon"
   */
  type?: "initials" | "icon";
  /** Figma `Size`: sm 32 px, md 40 px, lg 48 px; xl 44 px is the v3.1 screen-header photo. @default "md" */
  size?: "sm" | "md" | "lg" | "xl";
  /** The person's full name, read by screen readers. Omit only when the name is shown next to the avatar. */
  name?: string;
  /** Photo URL (v3.1). Shown instead of initials/icon. */
  src?: string;
}

/**
 * Avatar — represents a person with their initials or a generic icon.
 *
 * Figma: Startline / Avatar — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=93-2040
 *
 * @example <Avatar initials="AM" name="Amina Mohamed" size="lg" />
 */
export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { initials, type, size, name, src, className, ...props },
  ref,
) {
  const kind = type ?? (initials ? "initials" : "icon");
  return (
    <span
      ref={ref}
      role={name ? "img" : undefined}
      aria-label={name}
      aria-hidden={name ? undefined : true}
      className={cn(avatarVariants({ size }), className)}
      {...props}
    >
      {src ? (
        <img src={src} alt="" className="size-full object-cover" />
      ) : kind === "initials" ? (
        <span aria-hidden>{initials?.slice(0, 2).toUpperCase()}</span>
      ) : (
        <Icon name="profile" />
      )}
    </span>
  );
});
