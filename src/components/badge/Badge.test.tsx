import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axeViolations } from "@/test/axe";
import { Badge } from "./Badge";

describe("Badge", () => {
  it.each([
    ["neutral", "bg-background-subtle"],
    ["info", "bg-status-info-subtle"],
    ["success", "bg-status-success-subtle"],
    ["warning", "bg-status-warning-subtle"],
    ["error", "bg-status-error-subtle"],
  ] as const)("%s uses its status token", (status, cls) => {
    render(<Badge status={status}>Label</Badge>);
    expect(screen.getByText("Label").className).toContain(cls);
  });

  it("hides the dot from assistive tech and can remove it", () => {
    const { container, rerender } = render(<Badge>Label</Badge>);
    expect(container.querySelector("[aria-hidden]")).toBeInTheDocument();
    rerender(<Badge dot={false}>Label</Badge>);
    expect(container.querySelector("[aria-hidden]")).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Badge status="warning">Expires soon</Badge>);
    expect(await axeViolations(container)).toEqual([]);
  });
});
