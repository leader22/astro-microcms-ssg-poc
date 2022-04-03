import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [
    svelte(),
    sitemap({
      filter(url) {
        return url.includes("/admin/") ? false : true;
      },
    }),
  ],
  site: "https://astro-microcms-ssg-poc.example.com",
});
