import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  { ...viteConfig, plugins: (viteConfig.plugins ?? []).flat().filter((p) => !(p && typeof p === "object" && "name" in p && p.name === "vite:dts")) },
  defineConfig({
    test: { environment: "jsdom", globals: true, setupFiles: ["src/test/setup.ts"], include: ["src/**/*.test.{ts,tsx}", "scripts/**/*.test.ts"], css: false, passWithNoTests: true },
  }),
);
