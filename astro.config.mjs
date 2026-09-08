// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.kaczi.cz",
  // Dočasně, jen pro náhled na GitHub Pages (běží na /kaczi-web/ podadresáři).
  // Až se web napojí na doménu kaczi.cz, smaž tenhle řádek — withBase() v
  // src/lib/site.ts pak sám vrací cesty beze změny.
  base: "/kaczi-web",
  integrations: [sitemap()],
  vite: {
    // Tailwind zatím jen pro koncept /koncept-priroda/ — viz src/styles/priroda.css.
    // Nedotýká se tokens.css ani stávajících tří směrů.
    plugins: [tailwindcss()],
  },
  build: {
    // Jeden CSS soubor místo desítek — celý web se vejde pod jeden request.
    inlineStylesheets: "auto",
  },
  compressHTML: true,
});
