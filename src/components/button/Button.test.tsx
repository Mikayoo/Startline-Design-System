import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axeViolations } from "@/test/axe";
import { Button } from "./Button";

describe("Button", () => {
  it("renders a type=button by default with primary/md classes", () => {
    render(<Button>Continue</Button>);
    const btn = screen.getByRole("button", { name: "Continue" });
    expect(btn).toHaveAttribute("type", "button");
    expect(btn.className).toContain("bg-action-primary");
    expect(btn.className).toContain("h-control-md");
  });

  it.each([
    ["secondary", "bg-action-secondary"],
    ["tertiary", "bg-transparent"],
    ["destructive", "bg-action-danger"],
  ] as const)("applies the %s variant", (variant, cls) => {
    render(<Button variant={variant}>Go</Button>);
    expect(screen.getByRole("button").className).toContain(cls);
  });

  it("uses Control/LG height for size lg", () => {
    render(<Button size="lg">Go</Button>);
    expect(screen.getByRole("button").className).toContain("h-control-lg");
  });

  it("calls onClick and is reachable by keyboard", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    await userEvent.tab();
    expect(screen.getByRole("button")).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire when disabled", async () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Save</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("hides decorative icons from assistive tech", () => {
    render(<Button leadingIcon={<svg data-testid="icon" />}>Search</Button>);
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
    expect(screen.getByTestId("icon").parentElement).toHaveAttribute("aria-hidden");
  });

  it("renders as the child element with asChild", () => {
    render(
      <Button asChild>
        <a href="/next">Next</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Next" });
    expect(link.className).toContain("bg-action-primary");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <>
        <Button>Continue</Button>
        <Button variant="secondary" disabled>Back</Button>
      </>,
    );
    expect(await axeViolations(container)).toEqual([]);
  });
});
