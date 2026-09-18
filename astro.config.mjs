import { defineConfig } from "astro/config";
import sanity from "@sanity/astro";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://amaniwebsite.netlify.app",
  trailingSlash: "always",
  build: { format: "directory" },
  integrations: [
    sanity({
      projectId: "vufb5el5",
      dataset: "production",
      useCdn: false,
      studioBasePath: "/studio",
    }),
    react(),
  ],
});
