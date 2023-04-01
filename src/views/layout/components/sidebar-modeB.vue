<template>
  <div class="sidebar-mode-b">
    <el-scrollbar class="scrollbar">
      <div class="route-list" :class="{ 'active-route-list': storeRoutes.breadcrumbKeys.includes(item.path) }" v-for="item in data.routesList" @click="goRoute(item.path)">
        <SvgIcon class="route-icon" size="16" :name="item?.meta?.icon"></SvgIcon>
        <span class="route-title">{{ item?.meta?.title || item.path }}</span>
      </div>
    </el-scrollbar>
    <div :class="['sidebar-mode-b-menu', configure.collapse ? 'sidebar-switch' : 'sidebar-open']">
      <sidebar-mode-a menu-trigger="hover" :list="data.activeRouteChildren" width="190px"></sidebar-mode-a>
    </div>
  </div>
</template>
<script setup>
import sidebarModeA from "./sidebar-modeA.vue";
import { useRoutes } from "@/store/routes.js";
import { useConfigure } from "@/store/configure.js";

// 获取配置
const storeConfigure = useConfigure();
const { configure } = storeToRefs(storeConfigure);
const route = useRoute();

// 获取路由 store
const storeRoutes = useRoutes();

const data = reactive({
  routesList: [],
  activeRouteChildren: [],
});

/**
 * @description: 过滤侧栏可显示的一级路由
 * @param {Array} routes: 路由列表
 * @return {Array} 过滤好的路由
 */
function filterRoute(routes) {
  let arr = [];
  routes.forEach((i) => {
    if (i?.meta?.isHide == false || i?.meta?.isHide == undefined) {
      arr.push(i);
    } else {
      if (i?.children?.length > 0) {
        arr = filterRoute(i.children);
      }
    }
  });
  return arr;
}

/**
 * @description: 路由跳转
 * @param {String} index: 路由
 */
const router = useRouter();
function goRoute(index) {
  router.push(index);
}

onMounted(() => {
  data.routesList = filterRoute(storeRoutes.routesList);
  data.activeRouteChildren = storeRoutes.allRoutes[route.matched[1].path].children;
  if (data.activeRouteChildren.length == 0) {
    storeConfigure.change("collapse", true);
  }
});

watch(
  () => storeRoutes.breadcrumbKeys,
  () => {
    data.activeRouteChildren = storeRoutes.allRoutes[route.matched[1].path]?.children;
    if (data?.activeRouteChildren?.length == 0) {
      storeConfigure.change("collapse", true);
    } else {
      storeConfigure.change("collapse", false);
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.sidebar-mode-b {
  display: flex;
  height: 100%;
}

.scrollbar {
  border-right: 1px solid var(--el-border-color-lighter);
}

.route-list {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 5px;
  margin: 5px;
  width: 60px;
  height: 60px;

  &:hover {
    background-color: var(--el-color-primary-light-3);

    .route-icon,
    .route-title {
      color: var(--el-menu-active-color);
    }
  }

  .route-icon,
  .route-title {
    text-align: center;
    color: var(--el-menu-text-color);
    font-size: 12px;
  }
}

.active-route-list {
  background-color: var(--el-color-primary-light-3);

  .route-icon,
  .route-title {
    color: var(--el-menu-active-color);
  }
}

.sidebar-switch {
  width: 0px;
  overflow: hidden;
  transition: width 0.3s;
}

.sidebar-open {
  width: 190px;
  overflow: hidden;
  transition: width 0.3s;
}

.sidebar-mode-b-menu {
  height: 100%;
  background-color: var(--el-color-white);
}
</style>
