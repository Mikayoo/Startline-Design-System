import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axeViolations } from "@/test/axe";
import { PlanCard } from "./PlanCard";

describe("PlanCard", () => {
  it("is one link with step tag, title and meta", () => {
    render(<PlanCard step="Step 2" topic="Legal" title="Get legal help" time="30 min" location="Kitchener" href="/s/2" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/s/2");
    expect(link).toHaveTextContent("Step 2");
    expect(link).toHaveTextContent("Kitchener");
  });
  it("next state shows the status label and highlight", () => {
    render(<PlanCard state="next" title="Find housing" href="#" />);
    expect(screen.getByText("Start here")).toBeInTheDocument();
    expect(screen.getByRole("link").className).toContain("border-action-primary");
  });
  it("has no accessibility violations", async () => {
    const { container } = render(<PlanCard title="T" step="Step 1" time="5 min" href="#" />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
