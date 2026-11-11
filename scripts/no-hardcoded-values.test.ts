/**
 * Guard: component source may only use Startline tokens.
 * Fails on raw colours (#hex, rgb(), hsl()) and arbitrary Tailwind values (p-[13px], text-[#fff]).
 * Also fails on physical left/right utilities, which break right-to-left languages.
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
  // Arbitrary *values* (p-[13px], text-[#fff], w-[calc(..)]). Arbitrary *variants* like data-[state=checked]: are fine.
  ["arbitrary Tailwind value", /-\[(?:#|-?\d|\.\d|rgb|hsl|var\(|calc\()/],
  // RTL: use start/end (ps/pe, ms/me, start-/end-, text-start, rounded-s/e, border-s/e) not left/right.
  ["physical left/right utility (not RTL-safe)", /(?<![\w-])(pl|pr|ml|mr|left|right|rounded-(?:l|r|tl|tr|bl|br)|border-(?:l|r)|scroll-(?:ml|mr|pl|pr))-[\w.[]|(?<![\w-])text-(?:left|right)\b/],
];

describe("components use tokens only", () => {
  it.each(files)("%s", (file) => {
    // Ignore comments (JSDoc often mentions "right-to-left", colours, etc.).
    const src = readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
    const problems = RULES.flatMap(([name, re]) => (re.test(src) ? [`${name}: ${src.match(re)![0]}`] : []));
    expect(problems).toEqual([]);
  });
});
