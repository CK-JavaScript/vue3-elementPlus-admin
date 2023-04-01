<template>
  <el-icon v-if="name" :size="size" :color="color">
    <component :is="name"></component>
  </el-icon>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
    default: "",
  },
  size: {
    type: [String, Number],
  },
  color: {
    type: String,
  },
});
</script>
