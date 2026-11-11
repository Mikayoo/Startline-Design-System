import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axeViolations } from "@/test/axe";
import { BackButton } from "./BackButton";

describe("BackButton", () => {
  it("is a named button that fires onClick", async () => {
    const onClick = vi.fn();
    render(<BackButton label="Back to Resources" onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: "Back to Resources" }));
    expect(onClick).toHaveBeenCalled();
  });

  it("is a 44 px target that mirrors in RTL", () => {
    const { container } = render(<BackButton />);
    expect(screen.getByRole("button").className).toContain("size-control-md");
    expect(container.querySelector("svg")!.getAttribute("class")).toContain("rtl:-scale-x-100");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<BackButton />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
