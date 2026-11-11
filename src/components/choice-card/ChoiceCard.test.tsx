import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axeViolations } from "@/test/axe";
import { ChoiceCard } from "./ChoiceCard";

describe("ChoiceCard", () => {
  it("radio cards behave as a radio group", async () => {
    render(<><ChoiceCard name="p" value="a" title="Housing" /><ChoiceCard name="p" value="b" title="Health" /></>);
    await userEvent.click(screen.getByText("Housing"));
    expect(screen.getByRole("radio", { name: "Housing" })).toBeChecked();
    await userEvent.click(screen.getByText("Health"));
    expect(screen.getByRole("radio", { name: "Housing" })).not.toBeChecked();
  });
  it("check cards behave as checkboxes and report changes", async () => {
    const onCheckedChange = vi.fn();
    render(<ChoiceCard control="check" icon="users" title="Legal" onCheckedChange={onCheckedChange} />);
    await userEvent.click(screen.getByText("Legal"));
    expect(screen.getByRole("checkbox", { name: "Legal" })).toBeChecked();
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });
  it("is keyboard operable", async () => {
    render(<ChoiceCard control="check" title="Legal" />);
    await userEvent.tab();
    await userEvent.keyboard(" ");
    expect(screen.getByRole("checkbox")).toBeChecked();
  });
  it("has no accessibility violations", async () => {
    const { container } = render(<fieldset><legend>Q</legend><ChoiceCard name="p" icon="shield" title="A" helper="h" /><ChoiceCard control="check" title="B" /></fieldset>);
    expect(await axeViolations(container)).toEqual([]);
  });
});
