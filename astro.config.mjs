import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  buildOptions: {
    site: "https://astro-microcms-ssg-poc.example.com",
    sitemapFilter: url => url.includes("/admin/") ? false : true
  },
});
