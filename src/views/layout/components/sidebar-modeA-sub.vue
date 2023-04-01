<template>
  <template v-if="props.item.children">
    <el-sub-menu :class="{ 'menu-sub-modeA': configure.menuMode == layoutModeEnum.key[0], 'menu-sub-modeB': configure.menuMode == layoutModeEnum.key[1] }" v-if="!props.item.meta?.isHide" :index="props.item?.path">
      <template #title>
        <SvgIcon class="route-icon" :name="props.item?.meta?.icon"></SvgIcon>
        <span class="route-title">{{ props.item?.meta?.title || props.item?.path }}</span>
      </template>
      <sidebar-modeA-sub v-for="route in props.item?.children" :item="route" :key="route.path"></sidebar-modeA-sub>
    </el-sub-menu>
    <template v-else>
      <sidebar-modeA-sub v-for="route in props.item?.children" :item="route" :key="route.path"></sidebar-modeA-sub>
    </template>
  </template>
  <template v-else>
    <el-menu-item :class="{ 'active-menu': storeRoutes.activeRoute == props.item?.path, 'menu-modeA': configure.menuMode == layoutModeEnum.key[0], 'menu-modeB': configure.menuMode == layoutModeEnum.key[1] }" v-if="!props.item?.meta?.isHide" :index="props.item?.path">
      <SvgIcon class="route-icon" :name="props.item?.meta?.icon"></SvgIcon>
      <span class="route-title">{{ props.item?.meta?.title || props.item?.path }}</span>
    </el-menu-item>
  </template>
</template>

<script setup>
import { useRoutes } from "@/store/routes.js";
import { useConfigure } from "@/store/configure.js";

const storeRoutes = useRoutes();

// 获取配置
const storeConfigure = useConfigure();
const { configure } = storeToRefs(storeConfigure);

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

// 获取枚举值
const { layoutModeEnum } = ENUMS;
</script>

<style lang="scss">
.menu-sub-modeA {
  .el-sub-menu__title {
    &:hover {
      background-color: rgba(0, 0, 0, 0);
    }
  }
}

.menu-sub-modeB {
  .el-sub-menu__title {
    margin: 0 5px;

    color: var(--el-text-color-primary);

    &:hover {
      background-color: rgba(0, 0, 0, 0);
    }
  }

  .el-icon {
    color: var(--el-text-color-primary);
  }
}
</style>

<style lang="scss" scoped>
.menu-modeA {
  &:hover {
    color: var(--el-menu-active-color);
    background-color: var(--el-color-primary-light-3);
  }
}

.menu-modeA.active-menu {
  background-color: var(--el-color-primary-light-3);
}

.menu-modeB {
  margin: 5px;
  border-radius: 5px;

  .route-title,
  .route-icon {
    color: var(--el-text-color-primary);
  }

  &:hover {
    background-color: var(--el-color-primary-light-9);

    .route-title,
    .route-icon {
      color: var(--el-color-primary-light-3);
    }
  }
}

.menu-modeB.active-menu {
  background-color: var(--el-color-primary-light-9);

  .route-title,
  .route-icon {
    color: var(--el-color-primary-light-3);
  }
}
</style>
