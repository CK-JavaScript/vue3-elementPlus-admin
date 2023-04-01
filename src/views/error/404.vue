<template>
  <div class="empty-404">
    <img src="../../assets/images/404.png">
    <p class="tips">您访问的页面不存在</p>
    <el-button @click="goRoute">{{ countDown }}s 返回</el-button>
  </div>
</template>

<script setup>
const router = useRouter()
function goRoute() {
  router.push('/home');
}
let countDown = ref(5)
let timer = setInterval(() => {
  countDown.value--
  if (countDown.value == 0) {
    goRoute()
  }
}, 1000)
onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.empty-404 {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .tips {
    font-size: 40px;
    line-height: 100px;
  }
}
</style>