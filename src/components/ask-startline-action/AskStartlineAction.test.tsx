import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axeViolations } from "@/test/axe";
import { AskStartlineAction } from "./AskStartlineAction";

describe("AskStartlineAction", () => {
  it("defaults its label and fires onClick", async () => {
    const onClick = vi.fn();
    render(<AskStartlineAction onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: "Ask Startline" }));
    expect(onClick).toHaveBeenCalled();
  });

  it("uses the quiet style for contextual format", () => {
    render(<AskStartlineAction format="contextual">Ask about this</AskStartlineAction>);
    expect(screen.getByRole("button", { name: "Ask about this" }).className).toContain("bg-transparent");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<AskStartlineAction />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
