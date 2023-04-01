import { defineStore } from "pinia";
import { ENUMS } from "@/utils/enums.js";

export const useConfigure = defineStore("useConfigure", {
  state: () => {
    return {
      defaultActive: "/home", // 默认选中的菜单
      configure: {
        // ---------- 主题 ----------
        themeColor: "#1890ff", // 主题色
        // ---------- 菜单 ----------
        collapse: false, // 是否收起侧边栏
        menuMode: ENUMS.layoutModeEnum.key[0], // 菜单的布局模式
        menuBGColor: "#282c34", // 菜单的背景色
        textColor: "#ffffff", // 菜单的文字颜色
        activeTextColor: "#ffffff", // 菜单的激活文字颜色
        showMenuLogo: true, // 菜单的 logo
        // ---------- 分栏 ----------
        columnBgColor: "#282c34",
        // ---------- 导航栏 ----------
        showNavbar: true,
        navbarMode: ENUMS.navbarModeEnum.key[0],
        navbarIcon: true,
        // 过度
        componentTransition: true,
        componentTransitionMode: ENUMS.componentTransitionEnum.key[0],
      },
    };
  },
  getters: {},
  actions: {
    /**
     * @description: 初始化配置
     * @param {Object} configure: 配置
     */
    initConfigure(configure) {
      const keys = Object.keys(configure);
      keys.forEach((key) => {
        this.configure[key] = configure[key];
      });
    },
    // 设置默认激活的路由
    setDefaultActive(value) {
      this.defaultActive = value;
    },
    change(key, value) {
      this.configure[key] = value;
    },
  },
});
