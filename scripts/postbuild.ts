/**
 * After `vite build`: ship the font as separate woff2 files (instead of inlining them into CSS),
 * and copy tokens.css so apps can use the tokens without the components.
 *   dist/fonts/*.woff2, dist/fonts.css, dist/tokens.css; dist/styles.css gets `@import "./fonts.css"`.
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const files = resolve(root, "node_modules/@fontsource/plus-jakarta-sans/files");

export const WEIGHTS = [400, 600, 700] as const;
export const RANGES = {
  latin:
    "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD",
  "latin-ext":
    "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF",
} as const;

mkdirSync(resolve(dist, "fonts"), { recursive: true });
let css = "/* Plus Jakarta Sans (OFL-1.1), bundled with @startline/ui. */\n";
for (const w of WEIGHTS) {
  for (const [subset, range] of Object.entries(RANGES)) {
    const file = `plus-jakarta-sans-${subset}-${w}-normal.woff2`;
    copyFileSync(resolve(files, file), resolve(dist, "fonts", file));
    css += `@font-face{font-family:"Plus Jakarta Sans";font-style:normal;font-display:swap;font-weight:${w};src:url(./fonts/${file}) format("woff2");unicode-range:${range};}\n`;
  }
}
writeFileSync(resolve(dist, "fonts.css"), css);
const styles = resolve(dist, "styles.css");
writeFileSync(styles, `@import "./fonts.css";\n${readFileSync(styles, "utf8")}`);
copyFileSync(resolve(root, "src/styles/tokens.css"), resolve(dist, "tokens.css"));
console.log("postbuild: fonts, fonts.css, tokens.css written");
