import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "../icon";
import type { IconName } from "../icon/icons";

export type Destination = "home" | "my-path" | "ask" | "resources" | "profile";

const DESTINATIONS: { id: Destination; icon: IconName; label: string; href: string }[] = [
  { id: "home", icon: "home", label: "Home", href: "/" },
  { id: "my-path", icon: "path", label: "My Path", href: "/path" },
  { id: "ask", icon: "chat", label: "Ask", href: "/ask" },
  { id: "resources", icon: "resources", label: "Resources", href: "/resources" },
  { id: "profile", icon: "profile", label: "Profile", href: "/profile" },
];

export interface BottomNavigationProps extends React.HTMLAttributes<HTMLElement> {
  /** Figma `Active` — the current destination. */
  active: Destination;
  /** Translated labels and/or real URLs per destination. Defaults: English labels, `/`, `/path`, `/ask`, `/resources`, `/profile`. */
  items?: Partial<Record<Destination, { label?: string; href?: string }>>;
  /** Link element to render (e.g. your router's `Link`). Receives `href`. @default "a" */
  linkAs?: React.ElementType;
  /** Accessible name of the navigation landmark. @default "Main" */
  label?: string;
}

/**
 * Bottom navigation — fixed tab bar for the 5 primary destinations (Home, My Path, Ask, Resources,
 * Profile). Only on top-level screens; detail screens use Back button. Keep it fixed below the
 * scrolling content. Each item is a 44 px target; the current one is marked `aria-current="page"`.
 *
 * Figma: Startline / Bottom Navigation — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=94-2406
 *
 * @example <BottomNavigation active="home" linkAs={Link} items={{ ask: { label: "Demander" } }} />
 */
export const BottomNavigation = React.forwardRef<HTMLElement, BottomNavigationProps>(function BottomNavigation(
  { active, items, linkAs: Link = "a", label = "Main", className, ...props },
  ref,
) {
  return (
    <nav
      ref={ref}
      aria-label={label}
      className={cn("w-full rounded-2xl bg-surface-primary px-3 pt-3 pb-5", className)}
      {...props}
    >
      <ul className="flex items-center justify-between">
        {DESTINATIONS.map((d) => {
          const isActive = d.id === active;
          const item = items?.[d.id];
          return (
            <li key={d.id}>
              <Link
                href={item?.href ?? d.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex h-control-md w-17 flex-col items-center justify-center gap-1 rounded-md text-navigation outline-none [&_svg]:size-6",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
                  isActive
                    ? "bg-background-brand-subtle text-navigation-foreground-active"
                    : "text-navigation-foreground-inactive hover:text-navigation-foreground-active",
                )}
              >
                <Icon name={d.icon} />
                <span>{item?.label ?? d.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
});
