import { defineStore } from "pinia";
import { useConfigure } from "./configure.js";

export const useRoutes = defineStore("useRoutes", {
  state: () => {
    return {
      routesList: [],
      allRoutes: {},
      breadcrumb: [],
      breadcrumbKeys: [],
      navList: new Map(),
      activeRoute: "",
      cachedRoute: [],
    };
  },
  actions: {
    /**
     * @description: 设置路由列表
     * @param {Array} routes: 路由列表
     */
    setRoutesList(routes) {
      this.routesList = routes;
    },
    /**
     * @description: 设置当前的所有路由
     * @param {Array} routes: 所有路由
     */
    setAllRoutes(routes) {
      routes.forEach((i) => {
        this.allRoutes[i.path] = i;
      });
    },
    /**
     * @description: 设置需要缓存的路由
     * @param {String} name: 要缓存的路由组件名称
     */
    setCachedRoute(name) {
      if (!this.cachedRoute.includes(name)) {
        this.cachedRoute.push(name);
      }
    },
    /**
     * @description: 设置面包屑
     * @param {Array} matched: 相配的路由
     */
    setBreadcrumb(matched) {
      this.breadcrumb = matched;
      this.breadcrumbKeys = [];
      matched.forEach((i) => {
        this.breadcrumbKeys.push(i.path);
      });
    },
    /**
     * @description: 设置导航栏
     * @param {String} route: 路由
     */
    setNavbar(route) {
      if (this.allRoutes[route]) {
        this.navList.set(route, this.allRoutes[route]);
        this.activeRoute = route;
        useConfigure().setDefaultActive(route);
      }
    },
    /**
     * @description: 设置 navList 的列表
     * @param {String} type: 操作类型
     */
    setNavList(type) {
      return new Promise((resolve) => {
        const navListKeys = [...this.navList].slice(1);
        switch (type) {
          case "else":
            for (let i = 0; i < navListKeys.length; i++) {
              if (navListKeys[i][0] !== this.activeRoute) {
                this.navList.delete(navListKeys[i][0]);
              }
            }
            break;
          case "left":
            for (let i = 0; i < navListKeys.length; i++) {
              if (navListKeys[i][0] == this.activeRoute) return;
              this.navList.delete(navListKeys[i][0]);
            }
            break;
          case "right":
            for (let i = navListKeys.length - 1; i >= 0; i--) {
              if (navListKeys[i][0] == this.activeRoute) return;
              this.navList.delete(navListKeys[i][0]);
            }
            break;
          case "all":
            for (let i = 0; i < navListKeys.length; i++) {
              this.navList.delete(navListKeys[i][0]);
            }
            resolve();
            break;
        }
      });
    },
    /**
     * @description: 移除 navbar 中的某一项
     * @param {String} route: 要移除的路由项
     */
    deleteNavItem(route) {
      return new Promise((resolve) => {
        if (route == this.activeRoute) {
          let navList = [...this.navList],
            length = navList.length,
            r = "";
          for (let i = 0; i < length; i++) {
            if (navList[i][0] == route) {
              if (i == length - 1) {
                r = navList[i - 1];
              } else if (i < length - 1) {
                r = navList[i + 1];
              }
              this.navList.delete(route);
              resolve(r);
              return;
            }
          }
        } else {
          this.navList.delete(route);
        }
      });
    },
  },
});
