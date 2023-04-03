<template>
  <div class="pageHeader">
    <div class="routes-case">
      <SvgIcon class="sidebar-icon" :name="storeConfigure.configure.collapse ? 'DArrowRight' : 'DArrowLeft'" size="20" @click="changeSidebar"></SvgIcon>
      <el-breadcrumb separator="/">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item v-for="item in storeRoutes.breadcrumb" :key="item.path">{{ item?.meta?.title || item.path }}</el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div>
    <div class="info-case">
      <SvgIcon class="info-icon" name="Operation" @click="operationFunction('operation')"></SvgIcon>
      <SvgIcon class="info-icon" name="Refresh" @click="operationFunction('refresh')"></SvgIcon>
      <el-dropdown style="cursor: pointer" @visible-change="changeDropdownVisible">
        <div class="flex align-center" style="gap: 0 10px">
          <img class="info-avatar" :src="storeUser.userInfo.avatar" alt="" srcset="" />
          <p class="info-name">{{ storeUser.userInfo.username }}</p>
          <SvgIcon name="arrow-down"></SvgIcon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="logOut">推出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useConfigure } from "@/store/configure.js";
import { useUser } from "@/store/user.js";
import { useRoutes } from "@/store/routes.js";
const storeUser = useUser();
const storeRoutes = useRoutes();

// 获取配置
const storeConfigure = useConfigure();

// 侧边栏导航的收起与展开
function changeSidebar() {
  storeConfigure.change("collapse", !storeConfigure.configure.collapse);
}

// 下拉菜单
let showDropdown = ref(false);
let rotateUserIcon = ref("0deg");
function changeDropdownVisible() {
  showDropdown.value = !showDropdown.value;
  rotateUserIcon.value = showDropdown.value ? "180deg" : "0deg";
}

// info 中的按钮操作
const emits = defineEmits(["operation"]);
function operationFunction(type) {
  emits("operation", type);
}

// 退出登录
function logOut() {
  // 清除缓存 / token 等
  _hook.useSessionStorage.clear();
  // 使用 reload 时，不需要调用 resetRoute() 重置路由
  // 且刷新页面时 pinia 数据会重置
  window.location.reload();
}
</script>

<style lang="scss" scoped>
// 面包屑的动画
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s ease;
}

.breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-leave-active {
  position: absolute;
  z-index: -1;
  transition: all 0s ease;
}

.pageHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px;
  border-bottom: 1px solid #f6f6f6;
}

.routes-case {
  display: flex;
  align-items: center;
  justify-content: center;

  .sidebar-icon {
    margin-right: 10px;
    color: var(--el-text-color-secondary);
  }
}

.info-case {
  display: flex;
  align-items: center;
  gap: 0 16px;

  .info-icon {
    cursor: pointer;
    font-size: 16px;
    color: var(--el-text-color-secondary);
    transition: all 0.3s;

    &:hover {
      color: var(--el-color-primary);
      transform: scale(1.2, 1.2);
    }
  }

  .info-avatar {
    border-radius: 50%;
    width: 45px;
    height: 45px;
  }

  .info-name {
    font-size: 14px;
    color: var(--el-text-color-secondary);
  }
}
</style>
