<template>
  <div class="sidebar-mode-a">
    <div class="logo-case" v-if="configure.showMenuLogo">
      <img class="logo" src="../../../assets/images/logo.png" alt="logo" srcset="" />
    </div>
    <el-menu @select="goRoute" :collapse="configure.collapse" :default-active="defaultActive" style="border-right: none" class="el-menu-vertical-demo">
      <sidebar-modea-sub v-for="route in props.list" :key="route.path" :item="route" />
    </el-menu>
  </div>
</template>

<script setup>
import { useConfigure } from "@/store/configure.js";
import sidebarModeaSub from "./sidebar-modeA-sub.vue";

const props = defineProps({
  list: {
    type: Array,
    default: () => {
      return [];
    },
    required: true,
  },
  width: {
    type: String,
    required: true,
  },
});
let width = ref(props.width);

// 获取配置
const storeConfigure = useConfigure();
const { configure, defaultActive } = storeToRefs(storeConfigure);

/**
 * @description: 路由跳转
 * @param {String} index: 路由
 */
const router = useRouter();
function goRoute(index) {
  router.push(index);
}
</script>

<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: v-bind(width);
}

.sidebar-mode-a {
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
}

.logo-case {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  overflow: hidden;

  .logo {
    position: absolute;
    height: 60px;
  }
}
</style>
