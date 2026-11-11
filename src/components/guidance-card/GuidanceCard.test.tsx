import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axeViolations } from "@/test/axe";
import { GuidanceCard } from "./GuidanceCard";

describe("GuidanceCard", () => {
  it.each([
    ["card", "neutral", "bg-surface-primary"],
    ["card", "info", "bg-background-brand-subtle"],
    ["tile", "info", "bg-background-brand-subtle"],
  ] as const)("%s/%s uses %s", (layout, tone, cls) => {
    const { container } = render(<GuidanceCard layout={layout} tone={tone} title="T" />);
    expect(container.firstElementChild!.className).toContain(cls);
  });

  it("row layout has no box", () => {
    const { container } = render(<GuidanceCard layout="row" title="T" />);
    expect(container.firstElementChild!.className).not.toContain("border");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<GuidanceCard title="T" body="B" />);
    expect(await axeViolations(container)).toEqual([]);
    expect(screen.getByRole("heading", { name: "T" })).toBeInTheDocument();
  });
});
