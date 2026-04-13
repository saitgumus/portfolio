import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: "https://saitgumus.com",
  output: "static",
  integrations: [tailwind({ applyBaseStyles: false }), sitemap()],
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(rootDir, "src"),
      },
    },
  },
});
