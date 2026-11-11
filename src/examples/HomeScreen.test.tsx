import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axeViolations } from "@/test/axe";
import { HomeScreen } from "./HomeScreen";

describe("Home example (App v3.1)", () => {
  it("has one h1, labelled landmarks and the current tab", () => {
    render(<HomeScreen />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("search")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");
  });
  it("has no accessibility violations", async () => {
    const { container } = render(<HomeScreen />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
