import { fileURLToPath, URL } from "node:url";
import { readFileSync } from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));
const externals = [...Object.keys(pkg.dependencies ?? {}), ...Object.keys(pkg.peerDependencies ?? {})];

// Library build: ESM + type definitions + one stylesheet (dist/styles.css).
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({ tsconfigPath: "./tsconfig.build.json", entryRoot: "src", exclude: ["**/*.stories.tsx", "**/*.test.tsx", "**/*.figma.ts"] }),
  ],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  publicDir: false,
  build: {
    lib: { entry: "src/index.ts", formats: ["es"], fileName: "index", cssFileName: "styles" },
    rollupOptions: {
      // Dependencies stay external so apps share one copy of React, Radix, etc.
      external: (id) => externals.some((dep) => id === dep || id.startsWith(`${dep}/`)) && !id.endsWith(".css"),
    },
    sourcemap: true,
  },
});
