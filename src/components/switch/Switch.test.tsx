import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axeViolations } from "@/test/axe";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("toggles with click and keyboard", async () => {
    const onChange = vi.fn();
    render(<Switch aria-label="Reminders" onCheckedChange={onChange} />);
    const sw = screen.getByRole("switch", { name: "Reminders" });
    await userEvent.click(sw);
    expect(sw).toBeChecked();
    sw.focus();
    await userEvent.keyboard(" ");
    expect(sw).not.toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("does not toggle when disabled", async () => {
    render(<Switch aria-label="Reminders" disabled />);
    await userEvent.click(screen.getByRole("switch"));
    expect(screen.getByRole("switch")).not.toBeChecked();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Switch aria-label="Reminders" defaultChecked />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
