import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    hmr: true,
    host: "127.0.0.1",
    port: "8989",
    open: true,
    https: false,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/style/root.scss";',
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      include: [/\.vue$/, /\.vue\?vue/],
      imports: [
        "vue",
        "vue-router",
        "pinia",
        {
          "@/utils/enums.js": ["ENUMS"],
          "element-plus": ["ElMessage"],
          "@/hooks/index.js": [["default", "_hook"]],
        },
      ],
      eslintrc: {
        enabled: false,
      },
    }),
  ],
});
