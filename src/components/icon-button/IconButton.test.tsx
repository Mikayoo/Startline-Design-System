import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axeViolations } from "@/test/axe";
import { IconButton } from "./IconButton";

describe("IconButton", () => {
  it("is named by its label and 44 px", () => {
    render(<IconButton icon="bell" label="Notifications" />);
    expect(screen.getByRole("button", { name: "Notifications" }).className).toContain("size-control-md");
  });
  it("mirrors directional icons in RTL", () => {
    const { container } = render(<IconButton icon="arrow-left" label="Back" />);
    expect(container.querySelector("svg")!.getAttribute("class")).toContain("rtl:-scale-x-100");
  });
  it("has no accessibility violations", async () => {
    const { container } = render(<IconButton icon="bell" label="Notifications" dot />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
