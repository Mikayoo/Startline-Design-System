import type { Decorator, Preview } from "@storybook/react-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/noto-sans-arabic/400.css";
import "@fontsource/noto-sans-arabic/600.css";
import "@fontsource/noto-sans-arabic/700.css";
import "@fontsource/noto-sans-ethiopic/400.css";
import "@fontsource/noto-sans-ethiopic/600.css";
import "@fontsource/noto-sans-ethiopic/700.css";
import "@fontsource/noto-sans-devanagari/400.css";
import "@fontsource/noto-sans-devanagari/600.css";
import "@fontsource/noto-sans-devanagari/700.css";
import "@fontsource/noto-sans-bengali/400.css";
import "@fontsource/noto-sans-bengali/600.css";
import "@fontsource/noto-sans-bengali/700.css";
import "@fontsource/noto-sans-gurmukhi/400.css";
import "@fontsource/noto-sans-gurmukhi/600.css";
import "@fontsource/noto-sans-gurmukhi/700.css";
import "../src/styles/index.css";

/** Sets <html dir> and <html lang> from the toolbar, so RTL and per-language fonts can be checked. */
const withDirectionAndLanguage: Decorator = (Story, ctx) => {
  const lang = (ctx.globals.lang as string) ?? "en";
  const rtl = ["ar", "fa", "ur"].includes(lang) || ctx.globals.dir === "rtl";
  document.documentElement.lang = lang;
  document.documentElement.dir = rtl ? "rtl" : "ltr";
  return Story();
};

const preview: Preview = {
  globalTypes: {
    dir: {
      description: "Text direction",
      toolbar: { title: "Direction", icon: "transfer", items: [{ value: "ltr", title: "Left to right" }, { value: "rtl", title: "Right to left" }], dynamicTitle: true },
    },
    lang: {
      description: "Content language (sets lang and, for ar/fa/ur, RTL)",
      toolbar: {
        title: "Language",
        icon: "globe",
        dynamicTitle: true,
        items: ["en", "vi", "ar", "fa", "ur", "zh-Hans", "zh-Hant", "ja", "ko", "am", "ti", "hi", "bn", "pa"].map((v) => ({ value: v, title: v })),
      },
    },
  },
  initialGlobals: { dir: "ltr", lang: "en" },
  parameters: {
    layout: "centered",
    controls: { expanded: true, sort: "requiredFirst" },
    a11y: { test: "error" },
    backgrounds: { disable: true },
  },
  decorators: [
    withDirectionAndLanguage,
    // Toolbar switch for the four Figma colour modes.
    withThemeByDataAttribute({
      themes: { Light: "light", Dark: "dark", "IC Light": "ic-light", "IC Dark": "ic-dark" },
      defaultTheme: "Light",
      attributeName: "data-theme",
      parentSelector: "html",
    }),
  ],
};
export default preview;
