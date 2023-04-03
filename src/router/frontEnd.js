import router from "./index.js";
import { staticRoutes, asyncRoutes } from "@/router/routes.js";
import { useRoutes } from "@/store/routes.js";
import { useUser } from "@/store/user.js";

/**
 * @description: 初始化路由
 * @param {Array} roles: 用户权限
 */
export async function initFrontEndRoutes() {
  const storeUser = useUser();

  // 触发初始化用户信息
  await storeUser.setUserInfo();
  const roles = storeUser.userInfo.roles; // 权限
  // if (roles?.length <= 0) {}; 无权限时的处理

  let addRoutes;
  if (roles.includes("admin")) {
    // 管理员权限包含所有的路由权限
    addRoutes = asyncRoutes || [];
  } else {
    addRoutes = filterAsyncRoutes(asyncRoutes, roles);
  }
  setAddRoute(addRoutes);
  const storeRoutes = useRoutes();
  storeRoutes.setRoutesList([...staticRoutes[0].children, ...addRoutes]);
  storeRoutes.setAllRoutes(router.getRoutes());
}

/**
 * @description: 通过递归过滤异步路由表
 * @param {Array} routes: 异步路由
 * @param {Array} roles: 用户的所有权限
 * @return {Array} 符合权限的异步路由
 */
function filterAsyncRoutes(routes, roles) {
  const res = [];
  routes.forEach((route) => {
    if (hasPermission(route, roles)) {
      if (route.children) {
        route.children = filterAsyncRoutes(route.children, roles);
      }
      res.push(route);
    }
  });
  return res;
}
/**
 * @description: 判断路由 `meta.roles` 中是否包含当前登录用户权限字段
 * @param {Array} route: 路由
 * @param {Array} roles: 用户的所有权限
 * @return {Boolean} 是否有权限
 */
function hasPermission(route, roles) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

/**
 * @description: 添加动态路由
 * @param {Array} addRoutes: 要添加的路由列表
 */
function setAddRoute(addRoutes) {
  addRoutes.forEach((route) => {
    // 添加嵌套路由
    router.addRoute("/", route);
  });
}

/**
 * @description: 重置路由
 * @param {Array} roles: 用户权限
 */
export function resetFrontEndRoute(roles) {
  // 获取用户可以访问的权限路由后
  const routes = filterAsyncRoutes(asyncRoutes, roles);
  // 通过重新添加路由来覆盖
  setAddRoute(routes);
}
