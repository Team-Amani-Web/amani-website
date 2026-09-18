import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://team-amani.netlify.app",
  trailingSlash: "always",
  build: { format: "directory" },
});
