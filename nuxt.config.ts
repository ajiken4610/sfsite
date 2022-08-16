import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  builder: "webpack",
  modules: [
    [
      "@kevinmarrec/nuxt-pwa",
      {
        icon: { source: "public/icon.png" },
        meta: {
          name: "Salesio Festa",
          theme_color: "#000088",
          lang: "ja",
          mobileAppIOS: true,
        },
        manifest: {
          name: "Salesio Festa 2022",
          short_name: "SF2022",
          description: "サレ祭2022年度",
        },
        workbox: {
          enabled: true,
        },
      },
    ],
  ],
});
