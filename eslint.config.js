import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import storybook from "eslint-plugin-storybook";
import globals from "globals";

export default tseslint.config(
  { ignores: ["dist", "storybook-static", "node_modules", "!.storybook"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { files: ["**/*.{ts,tsx}"], languageOptions: { globals: { ...globals.browser, ...globals.node } }, plugins: { "react-hooks": reactHooks }, rules: { ...reactHooks.configs.recommended.rules } },
  ...storybook.configs["flat/recommended"],
);
