import { defineConfig } from "astro/config";

// See https://astro.build/config
export default defineConfig({
  renderers: ["@astrojs/renderer-svelte"],
  buildOptions: {
    site: "https://astro-microcms-ssg-poc.example.com",
    sitemapFilter: (url) => url.includes("/admin/") ? false : true,
  },
});
