import type { Preview } from "@storybook/react-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import "@fontsource/plus-jakarta-sans/latin-400.css";
import "@fontsource/plus-jakarta-sans/latin-600.css";
import "@fontsource/plus-jakarta-sans/latin-700.css";
import "../src/styles/index.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: { expanded: true, sort: "requiredFirst" },
    a11y: { test: "error" },
    backgrounds: { disable: true },
  },
  decorators: [
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
