import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axeViolations } from "@/test/axe";
import { AIAssistantPanel, AIAssistantQuestion, AIAssistantSuggestions } from "./AIAssistantPanel";

describe("AIAssistantPanel", () => {
  it("is a region named by its title", () => {
    render(<AIAssistantPanel subtitle="AI navigation assistant">content</AIAssistantPanel>);
    expect(screen.getByRole("region", { name: "Ask Startline" })).toBeInTheDocument();
  });

  it.each([
    ["entry", "bg-background-brand-subtle"],
    ["answer", "bg-surface-primary"],
    ["escalation", "bg-surface-primary"],
  ] as const)("%s state uses %s", (state, cls) => {
    render(<AIAssistantPanel state={state} />);
    expect(screen.getByRole("region").className).toContain(cls);
  });

  it("suggestions report the chosen question", async () => {
    const onSelect = vi.fn();
    render(<AIAssistantSuggestions suggestions={["What first?", "Benefits?"]} onSelect={onSelect} />);
    await userEvent.click(screen.getByRole("button", { name: "Benefits?" }));
    expect(onSelect).toHaveBeenCalledWith("Benefits?");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <AIAssistantPanel state="answer" footnote="f">
        <AIAssistantQuestion>Q?</AIAssistantQuestion>
        <AIAssistantSuggestions suggestions={["A"]} />
      </AIAssistantPanel>,
    );
    expect(await axeViolations(container)).toEqual([]);
  });
});
