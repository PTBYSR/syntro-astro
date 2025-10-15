import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

export default defineConfig({
  site: "https://yoursite.com",
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Manrope",
        cssVariable: "--font-sans",
        weights: [400, 500, 600, 700],
      }
    ],
  },
  integrations: [sitemap(), tailwind(), react()],
});