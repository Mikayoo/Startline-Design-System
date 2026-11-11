import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axeViolations } from "@/test/axe";
import { AppIcon, LogoLockup, LogoMark } from "./Logo";

describe("Logo", () => {
  it("lockup is one image named Startline", () => {
    render(<LogoLockup />);
    expect(screen.getByRole("img", { name: "Startline" })).toBeInTheDocument();
  });

  it("colour mark uses unique gradients so several logos can share a page", () => {
    const { container } = render(<><LogoMark /><LogoMark /></>);
    const ids = [...container.querySelectorAll("linearGradient")].map((g) => g.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("mono and inverse marks follow the text colour token", () => {
    const { container } = render(<><LogoMark theme="mono" /><LogoMark theme="inverse" /></>);
    const [mono, inv] = container.querySelectorAll("svg");
    expect(mono!.getAttribute("class")).toContain("text-text-primary");
    expect(inv!.getAttribute("class")).toContain("text-text-inverse");
    expect(container.querySelector("path")).toHaveAttribute("fill", "currentColor");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<><LogoLockup /><AppIcon /></>);
    expect(await axeViolations(container)).toEqual([]);
  });
});
