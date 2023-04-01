<template>
  <div class="navBar-list-mode-b">
    <div :class="[storeRoutes.activeRoute == item[0] ? 'list-active' : 'list']" @click="goRoute(item[0])"
      v-for="item in storeRoutes.navList">
      <SvgIcon class="list-icon" v-if="storeConfigure.configure.navbarIcon" :name="item[1]?.meta?.icon"></SvgIcon>
      <span class="list-title">{{ item[1]?.meta?.title || item[0] }}</span>
      <SvgIcon class="list-close" name="Close" v-if="item[0] !== '/home'" @click.stop="closeNavbarItem(item[0])">
      </SvgIcon>
    </div>
  </div>
</template>

<script setup>


import { useRoutes } from '@/store/routes.js'
import { useConfigure } from '@/store/configure.js'

const storeRoutes = useRoutes()
const storeConfigure = useConfigure()

const router = useRouter()

/**
 * @description: 路由跳转
 * @param {String} route: 要跳转的路由
 */
function goRoute(route) {
  router.push(route)
}

/**
 * @description: 关闭导航的某一项
 * @param {String} route: 要关闭的当前项
 */
function closeNavbarItem(route) {
  storeRoutes.deleteNavItem(route).then(res => {
    goRoute(res[0])
  })
}
</script>

<style lang="scss" scoped>
.navBar-list-mode-b {
  flex-grow: 1;
  display: flex;
  align-items: center;
  gap: 0 5px;
  padding: 0 30px;
  height: 50px;
  overflow: hidden;

  &:hover {
    overflow: overlay;
    overflow-y: hidden;

    &::-webkit-scrollbar {
      height: 6px;
      background-color: #f1f1f1;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #ccc;
      border-radius: 4px;
    }
  }
}

.list-icon {
  font-size: 16px;
  line-height: 1;
  color: var(--el-text-color-primary);
  bottom: 0.05em;
}

.list-title {
  padding: 0 5px;
  font-size: 14px;
  line-height: 1;
  color: var(--el-text-color-primary);
}

.list-close {
  font-size: 0px;
  transform: scale(0, 0);
  transition: all 0.3s;
  color: var(--el-text-color-primary);
}

.list {
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 35px;
  padding: 0 10px;
  border: 1px solid var(--el-color-info-light-7);

  &:hover {
    background-color: var(--el-color-info-light-7);

    .list-icon,
    .list-title,
    .list-close {
      color: inherit;
    }

    .list-close {
      font-size: 14px;
      transform: scale(1, 1);
    }
  }

  .list-close {
    &:hover {
      background-color: var(--el-text-color-primary);
      color: #fff;
      border-radius: 50%;
    }
  }
}

.list-active {
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--el-color-primary);
  height: 35px;
  padding: 0 10px;
  border: 1px solid var(--el-color-primary);
  background-color: var(--el-color-primary-light-9);

  .list-icon,
  .list-title,
  .list-close {
    color: inherit;
    transform: scale(1, 1);
  }

  .list-close {
    font-size: 14px;

    &:hover {
      background-color: var(--el-color-primary);
      color: #fff;
      border-radius: 50%;
    }
  }

}
</style>
