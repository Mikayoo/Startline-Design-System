/**
 * After `vite build`:
 *  - ship fonts as separate woff2 files (not inlined into CSS) with per-script unicode-range,
 *    so a browser only downloads a script's font when that script is on screen;
 *  - copy tokens.css so apps can use the tokens without the components.
 * Output: dist/fonts/*.woff2, dist/fonts.css, dist/tokens.css; dist/styles.css gets `@import "./fonts.css"`.
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");

/** Font package → subsets to ship. Latin always comes from Plus Jakarta Sans (the brand font). */
export const FONTS: { pkg: string; subsets: string[]; weights?: number[] }[] = [
  // 500 = logo wordmark only.
  { pkg: "plus-jakarta-sans", subsets: ["latin", "latin-ext", "vietnamese"], weights: [400, 500, 600, 700] },
  { pkg: "noto-sans-arabic", subsets: ["arabic"] },
  { pkg: "noto-sans-ethiopic", subsets: ["ethiopic"] },
  { pkg: "noto-sans-devanagari", subsets: ["devanagari"] },
  { pkg: "noto-sans-bengali", subsets: ["bengali"] },
  { pkg: "noto-sans-gurmukhi", subsets: ["gurmukhi"] },
];
export const WEIGHTS = [400, 600, 700];

mkdirSync(resolve(dist, "fonts"), { recursive: true });
let css = "/* Bundled fonts (SIL OFL 1.1): Plus Jakarta Sans + Noto Sans script families. */\n";
for (const { pkg, subsets, weights = WEIGHTS } of FONTS) {
  const base = resolve(root, "node_modules/@fontsource", pkg);
  for (const w of weights) {
    // Fontsource's <weight>.css lists one @font-face per subset with its unicode-range.
    const src = readFileSync(resolve(base, `${w}.css`), "utf8");
    for (const block of src.split("@font-face").slice(1)) {
      const file = /url\(\.\/files\/([^)]+\.woff2)\)/.exec(block)?.[1];
      const family = /font-family: '([^']+)'/.exec(block)?.[1];
      const range = /unicode-range: ([^;]+);/.exec(block)?.[1];
      const matched = subsets.find((s) => file?.includes(`-${s}-${w}-normal`));
      if (!file || !family || !matched) continue;
      copyFileSync(resolve(base, "files", file), resolve(dist, "fonts", file));
      css += `@font-face{font-family:"${family}";font-style:normal;font-display:swap;font-weight:${w};src:url(./fonts/${file}) format("woff2");${range ? `unicode-range:${range};` : ""}}\n`;
    }
  }
}
writeFileSync(resolve(dist, "fonts.css"), css);
const styles = resolve(dist, "styles.css");
writeFileSync(styles, `@import "./fonts.css";\n${readFileSync(styles, "utf8")}`);
copyFileSync(resolve(root, "src/styles/tokens.css"), resolve(dist, "tokens.css"));
console.log(`postbuild: ${css.split("\n").length - 2} @font-face rules, tokens.css written`);
