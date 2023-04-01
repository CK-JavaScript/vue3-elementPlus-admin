import { createApp } from "vue";

import initComponents from "@/utils/components.js"; // 初始化全局组件

import "./style/normalize.css"; // 重置样式
import "./style/public.css"; // 公告样式

import router from "./router/index.js"; // 路由

import pinia from "./store/store"; // pinia

import ElementPlus from "element-plus"; // UI
import "element-plus/dist/index.css";

import * as ElementPlusIconsVue from "@element-plus/icons-vue"; // icon

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
