import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axeViolations } from "@/test/axe";
import { DocumentCard } from "./DocumentCard";

describe("DocumentCard", () => {
  it.each([
    ["required", "Required", "bg-status-warning-subtle"],
    ["recommended", "Recommended", "bg-status-info-subtle"],
    ["helpful", "Helpful", "bg-background-subtle"],
  ] as const)("%s shows the %s label with matching colour", (level, label, cls) => {
    render(<DocumentCard level={level} title="Photo ID" />);
    expect(screen.getByText(label).className).toContain(cls);
  });

  it("uses a translated level label", () => {
    render(<DocumentCard level="helpful" levelLabel="Utile" title="T" />);
    expect(screen.getByText("Utile")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<DocumentCard title="Photo ID" helper="Passport" body="Ask what they accept." />);
    expect(await axeViolations(container)).toEqual([]);
    expect(screen.getByRole("heading", { name: "Photo ID" })).toBeInTheDocument();
  });
});
