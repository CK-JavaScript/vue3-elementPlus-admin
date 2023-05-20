<template>
  <div class="container">
    <textarea v-size-ob="ob" cols="30" rows="10"></textarea>
  </div>
</template>

<script setup>
function ob(size) {
  console.log('🎨 size >>> ', size)
}
</script>

<style lang="scss" scoped>
</style>
