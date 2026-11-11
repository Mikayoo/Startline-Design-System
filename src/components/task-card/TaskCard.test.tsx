import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axeViolations } from "@/test/axe";
import { TaskCard } from "./TaskCard";

describe("TaskCard", () => {
  it("renders title as a heading, status tag and a link action", () => {
    render(<TaskCard title="Apply for a SIN" actionLabel="Start this step" actionHref="/sin" />);
    expect(screen.getByRole("heading", { level: 3, name: "Apply for a SIN" })).toBeInTheDocument();
    expect(screen.getByText("Next step")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Start this step" })).toHaveAttribute("href", "/sin");
  });

  it("uses a button action and translated status label", async () => {
    const onAction = vi.fn();
    render(<TaskCard state="complete" statusLabel="Terminé" title="T" actionLabel="Voir" onAction={onAction} />);
    expect(screen.getByText("Terminé")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Voir" }));
    expect(onAction).toHaveBeenCalled();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<TaskCard title="T" description="D" meta="M" actionLabel="Go" actionHref="#" />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
