import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axeViolations } from "@/test/axe";
import { ReviewRow } from "./ReviewRow";

describe("ReviewRow", () => {
  it("names the action with its question and fires it", async () => {
    const onAction = vi.fn();
    render(<ReviewRow icon="file" label="Situation" value="Refugee claimant" onAction={onAction} />);
    await userEvent.click(screen.getByRole("button", { name: "Change Situation" }));
    expect(onAction).toHaveBeenCalled();
  });
  it("has no accessibility violations", async () => {
    const { container } = render(<ReviewRow icon="file" label="City" value="Kitchener" onAction={() => {}} />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
