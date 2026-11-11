/**
 * Guard: component source may only use Startline tokens.
 * Fails on raw colours (#hex, rgb(), hsl()) and arbitrary Tailwind values (p-[13px], text-[#fff]).
 * Stories and tests are exempt (layout scaffolding only).
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const files: string[] = [];
const walk = (dir: string) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.tsx?$/.test(f) && !/\.(stories|test|figma)\.tsx?$/.test(f)) files.push(p);
  }
};
walk("src/components");

const RULES: [string, RegExp][] = [
  ["raw hex colour", /#[0-9a-fA-F]{3,8}\b/],
  ["raw rgb/hsl colour", /\b(rgb|rgba|hsl|hsla)\(/],
  ["arbitrary Tailwind value", /\b[a-z-]+-\[[^\]]+\]/],
];

describe("components use tokens only", () => {
  it.each(files)("%s", (file) => {
    const src = readFileSync(file, "utf8");
    const problems = RULES.flatMap(([name, re]) => (re.test(src) ? [`${name}: ${src.match(re)![0]}`] : []));
    expect(problems).toEqual([]);
  });
});
