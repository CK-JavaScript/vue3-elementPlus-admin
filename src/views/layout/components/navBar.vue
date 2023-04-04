<template>
  <div class="navbar-case">
    <Transition name="navbar" mode="out-in">
      <navbar-mode-a v-if="configure.navbarMode == navbarModeEnum.key[0]"></navbar-mode-a>
      <navbar-mode-b v-else-if="configure.navbarMode == navbarModeEnum.key[1]"></navbar-mode-b>
      <navbar-mode-c v-else-if="configure.navbarMode == navbarModeEnum.key[2]"></navbar-mode-c>
    </Transition>
    <div class="menu">
      <el-dropdown @visible-change="changeDropdownVisible">
        <div class="flex align-center" style="gap: 0 10px">
          <SvgIcon class="menu-icon" :style="menuIconStyle" name="Menu"></SvgIcon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="item in menuItem" :key="item.title" @click="setNavList(item.type)">
              <SvgIcon :name="item.icon"></SvgIcon>
              <span>{{ item.title }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import navbarModeA from "./navbar-modeA.vue";
import navbarModeB from "./navbar-modeB.vue";
import navbarModeC from "./navbar-modeC.vue";
import { useConfigure } from "@/store/configure.js";
import { useRoutes } from "@/store/routes.js";
const storeRoutes = useRoutes();

// 获取枚举值
const { navbarModeEnum } = ENUMS;

// 获取配置
const storeConfigure = useConfigure();
const { configure } = storeToRefs(storeConfigure);

// 下拉菜单
let menuItem = [
  {
    title: "关闭其他",
    icon: "Close",
    type: "else",
  },
  {
    title: "关闭左侧",
    icon: "Back",
    type: "left",
  },
  {
    title: "关闭右侧",
    icon: "Right",
    type: "right",
  },
  {
    title: "关闭全部",
    icon: "Close",
    type: "all",
  },
];
let menuIconStyle = reactive({
  transform: `rotate(0deg)`,
  color: "",
});

/**
 * @description: 下拉菜单的显示与隐藏
 * @param {Bool} bool: true显示 false隐藏
 */
function changeDropdownVisible(bool) {
  menuIconStyle.transform = bool ? "rotate(45deg)" : "rotate(0deg)";
  menuIconStyle.color = bool ? storeConfigure.configure.themeColor : "";
}

// 设置 nav 的列表
const router = useRouter();
function setNavList(type) {
  storeRoutes.setNavList(type).then(() => {
    router.push("/");
  });
}
</script>

<style lang="scss" scoped>
// 导航栏动画
.navbar-enter-active,
.navbar-leave-active {
  transition: opacity 0.3s ease;
}

.navbar-enter-from,
.navbar-leave-to {
  opacity: 0;
}

.navbar-case {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f6f6f6;
}

.menu {
  z-index: 100;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--el-bg-color);
  width: 50px;
  height: 50px;

  .menu-icon {
    font-size: 20px;
    color: var(--el-text-color-secondary);
    transition: all 0.3s;
  }
}
</style>
