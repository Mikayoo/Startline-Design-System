import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axeViolations } from "@/test/axe";
import { ResourceListItem } from "./ResourceListItem";

describe("ResourceListItem", () => {
  it("shows the official source for resources and the recommended tag when emphasised", () => {
    render(<ResourceListItem provider="Gov" title="Clinic" emphasis="recommended" />);
    expect(screen.getByText("Official source")).toBeInTheDocument();
    expect(screen.getByText("Recommended for you")).toBeInTheDocument();
  });

  it("uses a verified tag for services and supports translated labels", () => {
    render(<ResourceListItem provider="Org" title="Clinic" kind="service" sourceLabel="Service vérifié" />);
    expect(screen.getByText("Service vérifié")).toBeInTheDocument();
  });

  it("becomes one link when href is set", () => {
    render(<ResourceListItem provider="Gov" title="Clinic" href="/r/1" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/r/1");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ul><li><ResourceListItem provider="Gov" title="Clinic" description="d" href="#" /></li></ul>);
    expect(await axeViolations(container)).toEqual([]);
  });
});
