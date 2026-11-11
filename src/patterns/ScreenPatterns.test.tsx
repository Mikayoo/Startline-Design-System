import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axeViolations } from "@/test/axe";
import { CardHeader, QuickAction, ReminderCard, SectionHeader } from "./ScreenPatterns";

describe("Screen patterns", () => {
  it("CardHeader shows a heading and optional detail", () => {
    const { rerender } = render(<CardHeader icon="clock" title="How long it takes" />);
    expect(screen.getByRole("heading", { name: "How long it takes" })).toBeInTheDocument();
    expect(screen.queryByText("About 10 minutes")).not.toBeInTheDocument();
    rerender(<CardHeader icon="clock" title="How long it takes" detail="About 10 minutes" />);
    expect(screen.getByText("About 10 minutes")).toBeInTheDocument();
  });

  it("QuickAction and ReminderCard are links named by their text", () => {
    render(<><QuickAction icon="bookmark" label="Saved" href="/saved" /><ReminderCard title="1 reminder" detail="Tomorrow" href="/r" /></>);
    expect(screen.getByRole("link", { name: "Saved" })).toHaveAttribute("href", "/saved");
    expect(screen.getByRole("link", { name: /1 reminder/ })).toHaveAttribute("href", "/r");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <main>
        <SectionHeader title="Coming up" actionLabel="See all" actionHref="#" />
        <CardHeader icon="call" title="When you call 211" detail="Free" />
      </main>,
    );
    expect(await axeViolations(container)).toEqual([]);
  });
});
