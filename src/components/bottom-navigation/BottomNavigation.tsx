import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "../icon";
import type { IconName } from "../icon/icons";

export type Destination = "home" | "my-path" | "ask" | "resources" | "profile";

const DESTINATIONS: { id: Destination; icon: IconName; label: string; href: string }[] = [
  { id: "home", icon: "home", label: "Home", href: "/" },
  { id: "my-path", icon: "route", label: "My Path", href: "/path" },
  { id: "ask", icon: "speech", label: "Ask", href: "/ask" },
  { id: "resources", icon: "book", label: "Resources", href: "/resources" },
  { id: "profile", icon: "user", label: "Profile", href: "/profile" },
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
 * Bottom navigation — floating tab bar for the 5 primary destinations (Home, My Path, Ask, Resources,
 * Profile). The active tab is a filled pill. Only on top-level screens; detail screens use a back
 * Icon button. Float it 16 px above the bottom edge (`fixed inset-x-4 bottom-4`) over scrolling
 * content. The current item is marked `aria-current="page"`.
 *
 * Figma: Startline / Bottom Navigation — https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=604-1438
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
      className={cn("w-full rounded-full bg-surface-primary px-2 shadow-floating", className)}
      {...props}
    >
      <ul className="flex h-17 items-center">
        {DESTINATIONS.map((d) => {
          const isActive = d.id === active;
          const item = items?.[d.id];
          return (
            <li key={d.id} className="min-w-0 flex-1">
              <Link
                href={item?.href ?? d.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex h-13.5 w-full flex-col items-center justify-center gap-1 rounded-full text-tab-label outline-none [&_svg]:size-5.5",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
                  isActive
                    ? "bg-action-primary text-text-inverse"
                    : "text-text-secondary hover:text-text-primary",
                )}
              >
                <Icon name={d.icon} />
                <span className="max-w-full truncate px-0.5">{item?.label ?? d.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
});
