<template>
  <el-card shadow="hover" header="wangeditor 富文本编辑器">
    <Editor v-model:get-html="state.editor.htmlVal" v-model:get-text="state.editor.textVal" :disable="state.editor.disable" />
  </el-card>
</template>

<script setup>
import Editor from "@/components/editor.vue";

// 定义变量内容
const state = reactive({
  editor: {
    htmlVal: "<h1>wangeditor 富文本编辑器</h1>",
    textVal: "wangeditor 富文本编辑器",
    disable: false,
  },
});
</script>

<style lang="scss" scoped></style>
