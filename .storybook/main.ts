import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y", "@storybook/addon-themes"],
  framework: { name: "@storybook/react-vite", options: {} },
  core: { disableTelemetry: true },
  // Storybook reuses vite.config.ts; drop the library-only bits (type emit, lib mode).
  viteFinal: async (cfg) => {
    cfg.plugins = (cfg.plugins ?? []).flat().filter((p) => !(p && typeof p === "object" && "name" in p && p.name === "vite:dts"));
    if (cfg.build) delete cfg.build.lib;
    return cfg;
  },
};
export default config;
