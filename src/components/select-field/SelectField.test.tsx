import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axeViolations } from "@/test/axe";
import { SelectField } from "./SelectField";

const opts = [{ value: "on", label: "Ontario" }, { value: "qc", label: "Québec" }];
describe("SelectField", () => {
  it("is a named native select that shows and reports the choice", async () => {
    const onValueChange = vi.fn();
    render(<SelectField label="Province" options={opts} defaultValue="on" onValueChange={onValueChange} />);
    const select = screen.getByRole("combobox", { name: "Province" });
    await userEvent.selectOptions(select, "qc");
    expect(onValueChange).toHaveBeenCalledWith("qc");
    expect(screen.getByText("Québec", { selector: "span" })).toBeInTheDocument();
  });
  it("has no accessibility violations", async () => {
    const { container } = render(<SelectField label="Province" options={opts} defaultValue="on" />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
