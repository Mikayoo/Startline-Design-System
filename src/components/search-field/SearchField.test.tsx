import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axeViolations } from "@/test/axe";
import { SearchField } from "./SearchField";

describe("SearchField", () => {
  it("is a searchbox with its accessible name", () => {
    render(<SearchField aria-label="Search resources" />);
    expect(screen.getByRole("searchbox", { name: "Search resources" })).toBeInTheDocument();
  });

  it("shows the clear button only when there is a value and clears it", async () => {
    function Demo() {
      const [q, setQ] = React.useState("abc");
      return <SearchField aria-label="Search" value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ("")} />;
    }
    render(<Demo />);
    await userEvent.click(screen.getByRole("button", { name: "Clear search" }));
    expect(screen.getByRole("searchbox")).toHaveValue("");
    expect(screen.queryByRole("button", { name: "Clear search" })).not.toBeInTheDocument();
  });

  it("forwards typing", async () => {
    const onChange = vi.fn();
    render(<SearchField aria-label="Search" onChange={onChange} />);
    await userEvent.type(screen.getByRole("searchbox"), "food");
    expect(onChange).toHaveBeenCalledTimes(4);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<SearchField aria-label="Search" defaultValue="x" onClear={() => {}} />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
