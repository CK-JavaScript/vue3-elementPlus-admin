<template>
  <router-view></router-view>
</template>

<script setup>
import { useConfigure } from "@/store/configure.js";
import { useRoutes } from "@/store/routes.js";
const storeConfigure = useConfigure();
const storeRoutes = useRoutes();
const route = useRoute();
// 获取枚举值
const { layoutModeEnum } = ENUMS;

watch(
  route,
  (newValue) => {
    const componentName = _hook.useComponentName(newValue);
    if (newValue?.meta?.isKeepAlive && componentName) {
      storeRoutes.setCachedRoute(componentName);
    }
    storeRoutes.setBreadcrumb(newValue.matched.slice(1));
    document.title = route?.meta?.title || route.path;
  },
  { deep: true }
);

onMounted(() => {
  // 初始化配置
  const configure = _hook.useLocalStorage.get("configure");
  if (configure) {
    storeConfigure.initConfigure(configure);
  }

  // 初始化颜色
  _hook.useCssVar("--el-color-primary", storeConfigure.configure.themeColor);
  switch (storeConfigure.configure.menuMode) {
    case layoutModeEnum.key[0]:
      _hook.useCssVar("--el-menu-bg-color", storeConfigure.configure.menuBGColor);
      break;
    case layoutModeEnum.key[1]:
      _hook.useCssVar("--el-menu-bg-color", "#ffffff");
      break;
    default:
  }
  _hook.useCssVar("--admin-column-bg-color", storeConfigure.configure.menuBGColor);
  _hook.useCssVar("--el-menu-text-color", storeConfigure.configure.textColor);
  _hook.useCssVar("--el-menu-active-color", storeConfigure.configure.activeTextColor);
  [3, 5, 7, 8, 9].forEach((i) => {
    _hook.useCssVar(`--el-color-primary-light-${i}`, _hook.useLightColor(storeConfigure.configure.themeColor, `0.${i}`));
  });

  // 面包屑导航
  storeRoutes.setBreadcrumb(route.matched.slice(1));
});
</script>

<style lang="scss">
// 自定义进度条颜色
#nprogress .bar {
  height: 5px !important;
  background: #37689f !important;
}
</style>
