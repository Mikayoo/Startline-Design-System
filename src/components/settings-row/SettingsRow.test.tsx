import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axeViolations } from "@/test/axe";
import { SettingsRow } from "./SettingsRow";

describe("SettingsRow", () => {
  it("is a link named by label and value", () => {
    render(<SettingsRow label="Language" value="English" href="/lang" />);
    expect(screen.getByRole("link", { name: "Language, English" })).toHaveAttribute("href", "/lang");
  });

  it("is a button without href and can be disabled", async () => {
    const onClick = vi.fn();
    const { rerender } = render(<SettingsRow label="Language" onClick={onClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
    rerender(<SettingsRow label="Language" onClick={onClick} disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<SettingsRow label="Language" value="English" href="#" />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
