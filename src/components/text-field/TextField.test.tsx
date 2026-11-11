import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axeViolations } from "@/test/axe";
import { TextField } from "./TextField";

describe("TextField", () => {
  it("connects the visible label to the input", () => {
    render(<TextField label="Provider" />);
    expect(screen.getByLabelText("Provider")).toBeInTheDocument();
  });

  it("describes the input with the helper text", () => {
    render(<TextField label="Provider" helper="Check the details" />);
    expect(screen.getByLabelText("Provider")).toHaveAccessibleDescription("Check the details");
  });

  it("marks errors as invalid, announces them and replaces the helper", () => {
    render(<TextField label="Provider" helper="Hint" error="Enter a name" />);
    const input = screen.getByLabelText("Provider");
    expect(input).toBeInvalid();
    expect(input).toHaveAccessibleDescription("Enter a name");
    expect(screen.getByRole("alert")).toHaveTextContent("Enter a name");
    expect(screen.queryByText("Hint")).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<><TextField label="A" helper="h" /><TextField label="B" error="e" /></>);
    expect(await axeViolations(container)).toEqual([]);
  });
});
