<template>
  <div class="navBar-list-mode-a">
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
.navBar-list-mode-a {
  flex-grow: 1;
  display: flex;
  align-items: flex-end;
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
  bottom: -0.2em;
  color: var(--el-text-color-primary);
}

.list-title {
  padding: 0 5px;
  font-size: 14px;
  color: var(--el-text-color-primary);
}

.list-close {
  font-size: 14px;
  transform: scale(0, 0);
  transition: all 0.3s;
  bottom: -0.18em;
  color: var(--el-text-color-primary);
}

.list {

  position: relative;
  cursor: pointer;
  flex-shrink: 0;
  text-align: center;
  overflow: visible;
  line-height: 16px;
  font-size: 16px;
  padding: 0 10px;
  display: inline-block;
  height: 35px;
  line-height: 35px;
  transition: all .3s cubic-bezier(.645, .045, .355, 1) !important;

  &:hover {
    padding: 0 20px;

    &::after {
      z-index: -1;
      content: '  ';
      position: absolute;
      left: -10px;
      right: -10px;
      height: 100%;
      background-color: var(--el-color-info-light-7);
      -webkit-mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
      mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
      -webkit-mask-size: 100% 100%;
      mask-size: 100% 100%;
    }

    .list-close {
      transform: scale(1, 1);

      &:hover {
        background-color: var(--el-text-color-primary);
        color: #fff;
        border-radius: 50%;
      }
    }
  }
}

.list-active {
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
  overflow: visible;
  color: var(--el-color-primary);
  padding: 0 20px;
  display: inline-block;
  height: 35px;
  line-height: 35px;

  &::before {
    z-index: -1;
    content: '  ';
    position: absolute;
    left: -10px;
    right: -10px;
    height: 100%;
    background-color: var(--el-color-primary-light-9);
    -webkit-mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
    mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
  }

  .list-icon,
  .list-title,
  .list-close {
    color: inherit;
    transform: scale(1, 1);
  }

  .list-close {
    &:hover {
      background-color: var(--el-color-primary);
      color: #fff;
      border-radius: 50%;
    }
  }
}
</style>
