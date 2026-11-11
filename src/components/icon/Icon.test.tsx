import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Icon } from "./Icon";
import { ICON_NAMES } from "./icons";

describe("Icon", () => {
  it("has the 38 v3.1 Figma icons plus close", () => expect(ICON_NAMES).toHaveLength(39));

  it("keeps old names as aliases", () => {
    const { container } = render(<Icon name="profile" />);
    expect(container.querySelectorAll("path")).toHaveLength(2);
  });

  it("is decorative (hidden) without a label", () => {
    const { container } = render(<Icon name="search" />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("is announced with a label", () => {
    render(<Icon name="bell" label="Notifications" />);
    expect(screen.getByRole("img", { name: "Notifications" })).toBeInTheDocument();
  });

  it("uses currentColor and mirrors directional icons in RTL", () => {
    const { container } = render(<Icon name="chevron-right" />);
    const svg = container.querySelector("svg")!;
    expect(svg).toHaveAttribute("stroke", "currentColor");
    expect(svg.getAttribute("class")).toContain("rtl:-scale-x-100");
  });
});
