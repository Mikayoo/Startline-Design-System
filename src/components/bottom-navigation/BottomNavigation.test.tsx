import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axeViolations } from "@/test/axe";
import { BottomNavigation } from "./BottomNavigation";

describe("BottomNavigation", () => {
  it("is a named nav landmark with 5 links and marks the current one", () => {
    render(<BottomNavigation active="resources" />);
    const nav = screen.getByRole("navigation", { name: "Main" });
    expect(within(nav).getAllByRole("link")).toHaveLength(5);
    expect(screen.getByRole("link", { name: "Resources" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current");
  });

  it("accepts translated labels and real hrefs", () => {
    render(<BottomNavigation active="home" items={{ home: { label: "Accueil", href: "/fr" } }} />);
    expect(screen.getByRole("link", { name: "Accueil" })).toHaveAttribute("href", "/fr");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<BottomNavigation active="home" />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
