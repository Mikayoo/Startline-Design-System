import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axeViolations } from "@/test/axe";
import { Chip } from "./Chip";

describe("Chip", () => {
  it("is a toggle button that reports the next state", async () => {
    const onSelectedChange = vi.fn();
    render(<Chip onSelectedChange={onSelectedChange}>Housing</Chip>);
    const chip = screen.getByRole("button", { name: "Housing", pressed: false });
    await userEvent.click(chip);
    expect(onSelectedChange).toHaveBeenCalledWith(true);
  });

  it("announces selected state", () => {
    render(<Chip selected>Housing</Chip>);
    expect(screen.getByRole("button", { pressed: true })).toBeInTheDocument();
  });

  it("does nothing when disabled", async () => {
    const onSelectedChange = vi.fn();
    render(<Chip disabled onSelectedChange={onSelectedChange}>Housing</Chip>);
    await userEvent.click(screen.getByRole("button"));
    expect(onSelectedChange).not.toHaveBeenCalled();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<><Chip>A</Chip><Chip selected>B</Chip></>);
    expect(await axeViolations(container)).toEqual([]);
  });
});
