import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axeViolations } from "@/test/axe";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("shows up to two uppercase initials and is named for screen readers", () => {
    render(<Avatar initials="amx" name="Amina Mohamed" />);
    expect(screen.getByRole("img", { name: "Amina Mohamed" })).toHaveTextContent("AM");
  });

  it("falls back to the person icon without initials", () => {
    const { container } = render(<Avatar name="Guest" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it.each([["sm", "size-avatar-sm"], ["md", "size-avatar-md"], ["lg", "size-avatar-lg"]] as const)("size %s uses token %s", (size, cls) => {
    const { container } = render(<Avatar size={size} initials="AM" />);
    expect(container.firstElementChild!.className).toContain(cls);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<><Avatar initials="AM" name="Amina" /><Avatar type="icon" /></>);
    expect(await axeViolations(container)).toEqual([]);
  });
});
