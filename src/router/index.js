import { createRouter, createWebHistory } from "vue-router";
import { notFoundAndNoPower, fullScreenRouting, staticRoutes } from "./routes.js";
import { initFrontEndRoutes } from "./frontEnd.js";
import _hook from "@/hooks/index.js";
import { useRoutes } from "@/store/routes.js";
import { useUser } from "@/store/user.js";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const router = createRouter({
  history: createWebHistory(),
  routes: [...notFoundAndNoPower, ...fullScreenRouting, ...staticRoutes],
});

NProgress.configure({ showSpinner: false });
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const token = _hook.useSessionStorage.get("token");
  if (to.path === "/login" && !token) {
    next();
    NProgress.done();
  } else {
    if (!token) {
      next("/login");
      _hook.useSessionStorage.clear();
    } else if (token && to.path === "/login") {
      next("/home");
      NProgress.done();
    } else {
      const storeRoutes = useRoutes();
      if (storeRoutes.routesList.length === 0) {
        const storeUser = useUser();
        const roles = storeUser.userinfo.roles; // 权限
        await initFrontEndRoutes(roles); // 初始化前端路由
        storeRoutes.setNavbar("/home"); // 每次初始化时都添加首页
        next({ path: to.path, query: to.query });
        NProgress.done();
      } else {
        storeRoutes.setNavbar(to.path);
        next();
        NProgress.done();
      }
    }
  }
});

router.afterEach((to, from, next) => {
  NProgress.done();
});

export default router;
