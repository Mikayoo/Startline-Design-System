import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axeViolations } from "@/test/axe";
import { PillButton } from "./PillButton";

describe("PillButton", () => {
  it("is a 56 px primary pill with an optional decorative arrow", () => {
    const { container } = render(<PillButton arrow>Continue</PillButton>);
    const b = screen.getByRole("button", { name: "Continue" });
    expect(b.className).toContain("h-control-xl");
    expect(b.className).toContain("bg-action-primary");
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
  it("supports on-dark", () => {
    render(<PillButton variant="on-dark">Go</PillButton>);
    expect(screen.getByRole("button").className).toContain("bg-surface-primary");
  });
  it("has no accessibility violations", async () => {
    const { container } = render(<PillButton arrow>Continue</PillButton>);
    expect(await axeViolations(container)).toEqual([]);
  });
});
