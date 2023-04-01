import bridge from "@/views/layout/bridge.vue"; // 中转页

/**
 * 路由参数说明
 *
 * path: !!! 路由 path 路径需完整，因为菜单中所有路由跳转均使用 path 跳转。
 *    如:
 *        父路由 path:'/home'
 *        子路由 path:'/home/page'
 *        孙路由 path:'/home/page/index'
 *    首页 path 必须为 '/home'
 *    path 路径作为菜单唯一标识不可重复, 且在没有配置 meta.title 时使用 path 作为标题.
 * meta: {
 *      title:         菜单的标题 ( 缺少 title 时会使用路由的 path 作为标题)
 *      isHide:        是否隐藏此路由
 *      isKeepAlive:   是否缓存路由
 *      roles:         当前路由权限标识，取角色管理。控制路由显示、隐藏。
 *      icon:          图标 elementUI
 * }
 */

/**
 * 定义404、401界面
 */
export const notFoundAndNoPower = [
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("@/views/error/404.vue"),
    meta: {
      title: "404",
      isHide: true,
    },
  },
  {
    path: "/401",
    name: "noPower",
    component: () => import("@/views/error/401.vue"),
    meta: {
      title: "401",
      isHide: true,
    },
  },
];

/**
 * 全屏路由页面
 * 此处的页面会占满浏览器的整个屏幕
 */
export const fullScreenRouting = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue"),
    meta: {
      title: "登录",
      isHide: true,
    },
  },
];

/**
 * 静态路由
 * 没有权限要求的基本页面
 * 所有角色都可以访问
 */
export const staticRoutes = [
  {
    path: "/",
    name: "/",
    component: () => import("@/views/layout/layout.vue"),
    redirect: "/home",
    meta: {
      isHide: true,
    },
    children: [
      {
        path: "/home",
        component: () => import("@/views/home.vue"),
        meta: {
          title: "首页",
          icon: "House",
          isKeepAlive: true,
        },
      },
      {
        path: "/about",
        component: () => import("@/views/about.vue"),
        meta: {
          title: "关于我们",
          icon: "Shop",
        },
      },
    ],
  },
];

/**
 * 异步路由
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  {
    path: "/demo",
    component: bridge,
    redirect: "/demo/demo1/demo11",
    meta: {
      title: "权限路由",
      icon: "Edit",
    },
    children: [
      {
        path: "demo1",
        component: bridge,
        meta: {
          title: "用户1路由-1",
          icon: "Edit",
          roles: ["yonghu1"],
        },
        children: [
          {
            path: "/demo/demo1/demo11",
            component: () => import("@/views/demo/demo11.vue"),
            name: "demo11",
            meta: {
              title: "用户1路由-11",
            },
          },
          {
            path: "/demo/demo1/demo12",
            component: () => import("@/views/demo/demo12.vue"),
            name: "demo12",
            meta: {
              title: "用户1路由-12",
            },
            children: [
              {
                path: "/demo/demo1/demo121",
                component: () => import("@/views/demo/demo121.vue"),
                name: "demo121",
                meta: {
                  title: "用户1路由-121",
                },
              },
              {
                path: "/demo/demo1/demo122",
                component: () => import("@/views/demo/demo122.vue"),
                name: "demo122",
                meta: {
                  title: "用户1路由-122",
                },
              },
            ],
          },
          {
            path: "/demo/demo1/demo13",
            component: () => import("@/views/demo/demo13.vue"),
            name: "demo13",
            meta: {
              title: "用户1路由-13",
            },
          },
        ],
      },
      {
        path: "/demo/demo2",
        component: bridge,
        meta: {
          title: "用户2路由-2",
          icon: "Edit",
          roles: ["yonghu2"],
        },
        children: [
          {
            path: "/demo/demo2/demo21",
            component: () => import("@/views/demo/demo21.vue"),
            meta: {
              title: "用户2路由-21",
              icon: "Edit",
            },
          },
          {
            path: "/demo/demo2/demo22",
            component: () => import("@/views/demo/demo22.vue"),
            meta: {
              title: "用户2路由-22",
              icon: "Edit",
            },
          },
          {
            path: "/demo/demo2/demo23",
            component: () => import("@/views/demo/demo23.vue"),
            meta: {
              title: "用户2路由-23",
              icon: "Edit",
            },
          },
        ],
      },
    ],
  },
  {
    path: "/makes",
    component: bridge,
    redirect: "/makes/svgIcon",
    meta: {
      title: "组件封装",
      icon: "Edit",
    },
    children: [
      {
        path: "/makes/svgIcon",
        component: () => import("@/views/makes/svgIcon.vue"),
        meta: {
          title: "SvgIcon",
        },
      },
    ],
  },
  {
    path: "/tools",
    component: bridge,
    redirect: "/tools/editor",
    meta: {
      title: "工具",
      icon: "Flag",
    },
    children: [
      {
        path: "/tools/editor",
        component: () => import("@/views/tools/editor.vue"),
        meta: {
          title: "编辑器",
          icon: "Edit",
        },
      },
    ],
  },
];
