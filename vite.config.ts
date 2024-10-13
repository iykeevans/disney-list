import path from "path";
import { defineConfig } from "vite";
import type { UserConfig as VitestUserConfigInterface } from "vitest/config";
import react from "@vitejs/plugin-react";

const vitestConfig: VitestUserConfigInterface = {
  test: {
    globals: true,
    environment: "happy-dom",
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/disney-list/",
  test: vitestConfig.test,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
