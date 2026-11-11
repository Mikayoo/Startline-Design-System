import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axeViolations } from "@/test/axe";
import { SourceIndicator } from "./SourceIndicator";

describe("SourceIndicator", () => {
  it("shows the label with a decorative icon", () => {
    const { container } = render(<SourceIndicator kind="ai-summary">AI summary</SourceIndicator>);
    expect(screen.getByText("AI summary").className).toContain("bg-background-brand-subtle");
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<SourceIndicator kind="updated">Updated 3 May</SourceIndicator>);
    expect(await axeViolations(container)).toEqual([]);
  });
});
