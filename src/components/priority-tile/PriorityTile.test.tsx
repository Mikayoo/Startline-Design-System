import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axeViolations } from "@/test/axe";
import { PriorityTile } from "./PriorityTile";

describe("PriorityTile", () => {
  it("is a toggle button reporting the next state", async () => {
    const onSelectedChange = vi.fn();
    render(<PriorityTile icon="home" label="Housing" onSelectedChange={onSelectedChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Housing", pressed: false }));
    expect(onSelectedChange).toHaveBeenCalledWith(true);
  });
  it("has no accessibility violations", async () => {
    const { container } = render(<><PriorityTile icon="home" label="Housing" selected /><PriorityTile icon="heart" label="Health" /></>);
    expect(await axeViolations(container)).toEqual([]);
  });
});
