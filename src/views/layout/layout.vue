<template>
  <div class="layout-view">
    <div class="sidebar">
      <!-- 侧边栏的布局模式 -->
      <sidebar-mode-a v-if="getConfigure.menuMode == layoutModeEnum.key[0]" :list="storeRoutes.routesList" width="260px"></sidebar-mode-a>
      <sidebar-mode-b v-else-if="getConfigure.menuMode == layoutModeEnum.key[1]"></sidebar-mode-b>
    </div>
    <div class="main-case">
      <div class="header">
        <page-header @operation="operation"></page-header>
        <navbar v-if="getConfigure.showNavbar"></navbar>
      </div>
      <div class="appMain">
        <main class="main">
          <router-view v-slot="{ Component }" v-if="isRefreshRoute">
            <transition :name="getConfigure.componentTransitionMode" mode="out-in" v-if="getConfigure.componentTransition">
              <keep-alive :include="storeRoutes.cachedRoute">
                <component :is="Component" />
              </keep-alive>
            </transition>
            <keep-alive v-else :include="storeRoutes.cachedRoute">
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </main>
      </div>
    </div>
    <c-configure v-model="bools.showConfigure"></c-configure>
  </div>
</template>

<script setup>
import sidebarModeA from "./components/sidebar-modeA.vue";
import sidebarModeB from "./components/sidebar-modeB.vue";
import pageHeader from "./components/pageHeader.vue";
import navbar from "./components/navbar.vue";
import cConfigure from "./components/configure.vue";
import { useConfigure } from "@/store/configure.js";
import { useRoutes } from "@/store/routes.js";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
const storeRoutes = useRoutes();

// 获取枚举值
const { layoutModeEnum } = ENUMS;

// 获取配置
const storeConfigure = useConfigure();
const { configure } = storeToRefs(storeConfigure);
const getConfigure = computed(() => {
  return configure.value;
});

// 控制操作的布尔值
const bools = reactive({
  showConfigure: false,
});

// 页头的操作
function operation(type) {
  switch (type) {
    case "operation":
      bools.showConfigure = true;
      break;
    case "refresh":
      reload();
      break;
  }
}

// 局部组件刷新
const isRefreshRoute = ref(true);
function reload() {
  NProgress.start();
  isRefreshRoute.value = false;
  nextTick(() => {
    isRefreshRoute.value = true;
    NProgress.done();
  });
}
</script>

<style>
.vab-drawer .el-drawer__header {
  margin-bottom: 0;
}

.el-icon .el-sub-menu__icon-arrow {
  color: var(--el-text-color-primary);
}
</style>

<style lang="scss" scoped>
// 页面切换的动画 模式 A
.mainA-enter-active,
.mainA-leave-active {
  transition: all 0.5s ease;
}
.mainA-enter-from,
.mainA-leave-active {
  opacity: 0;
  transform: translateY(100px);
}
.mainA-leave-active {
  position: absolute;
  z-index: -1;
  transition: all 0s ease;
}
// 页面切换的动画 模式 B
.mainB-enter-active,
.mainB-leave-active {
  transition: all 0.5s ease;
}
.mainB-enter-from,
.mainB-leave-active {
  opacity: 0;
  transform: translateX(100px);
}
.mainB-leave-active {
  position: absolute;
  z-index: -1;
  transition: all 0s ease;
}

.layout-view {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  display: flex;
}

.sidebar {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--admin-column-bg-color);

  .logo-case {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80px;
    overflow: hidden;

    .logo {
      position: absolute;
      height: 80px;
    }
  }
}

.main-case {
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  .header {
    z-index: 2;
    position: relative;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  }

  .appMain {
    flex-grow: 1;
    z-index: 1;
    padding: 15px;
    background-color: #f6f8f9;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 8px;
      background-color: #f1f1f1;
      border-radius: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #dfdfdf;
      border-radius: 8px;
    }
  }

  .main {
    position: relative;
    box-sizing: border-box;
    padding: 15px;
    width: 100%;
    min-height: 100%;
    background-color: var(--el-bg-color);
    box-shadow: 0 0px 4px rgba(0, 21, 41, 0.08);
  }
}
</style>
