import { createApp } from "vue";

import initComponents from "@/utils/components.js";

import "./style/normalize.css";
import "./style/public.css";

import router from "./router/index.js";

import pinia from "./store/store";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import App from "./App.vue";

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(ElementPlus);
app.use(initComponents);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
