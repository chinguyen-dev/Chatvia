import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: { alias: { "@": "/src" } },
  server: {
    host: true,
    port: 8080,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: ` 
          @import "@/assets/styles/variables.scss";
        `,
      },
    },
  },
});
