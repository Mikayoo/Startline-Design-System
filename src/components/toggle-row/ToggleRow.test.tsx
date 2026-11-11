import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { axeViolations } from "@/test/axe";
import { ToggleRow } from "./ToggleRow";

describe("ToggleRow", () => {
  it("names the switch with its label and toggles when the label is tapped", async () => {
    render(<ToggleRow label="3 days before" />);
    await userEvent.click(screen.getByText("3 days before"));
    expect(screen.getByRole("switch", { name: "3 days before" })).toBeChecked();
  });
  it("has no accessibility violations", async () => {
    const { container } = render(<ToggleRow label="Reminders" description="Phone notification" defaultChecked />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
