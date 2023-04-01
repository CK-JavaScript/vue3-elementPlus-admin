<template>
  <div class="editor-container">
    <Toolbar :editor="editorRef" :mode="mode" />
    <Editor :mode="mode" :defaultConfig="state.editorConfig" :style="{ height }" v-model="state.editorVal" @onCreated="handleCreated" @onChange="handleChange" />
  </div>
</template>

<script setup>
// https://www.wangeditor.com/v5/for-frame.html#vue3
import "@wangeditor/editor/dist/css/style.css";
import { Toolbar, Editor } from "@wangeditor/editor-for-vue";

// 定义父组件传过来的值
const props = defineProps({
  // 是否禁用
  disable: {
    type: Boolean,
    default: () => false,
  },

  // 内容框默认 placeholder
  placeholder: {
    type: String,
    default: () => "请输入内容...",
  },

  // 模式，可选 <default|simple>，默认 default
  mode: {
    type: String,
    default: () => "default",
  },

  // 高度
  height: {
    type: String,
    default: () => "300px",
  },

  // 双向绑定，用于获取 editor.getHtml()
  getHtml: String,

  // 双向绑定，用于获取 editor.getText()
  getText: String,
});

// 定义子组件向父组件传值/事件
const emit = defineEmits(["update:getHtml", "update:getText"]);

// 定义变量内容
const editorRef = shallowRef();
const state = reactive({
  editorConfig: {
    placeholder: props.placeholder,
  },
  editorVal: props.getHtml,
});

// 编辑器回调函数
const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

// 编辑器内容改变时
const handleChange = (editor) => {
  emit("update:getHtml", editor.getHtml());
  emit("update:getText", editor.getText());
};

nextTick(() => {
  // 监听是否禁用改变
  watch(
    () => props.disable,
    (bool) => {
      const editor = editorRef.value;
      if (editor == null) return;
      bool ? editor.disable() : editor.enable();
    },
    { immediate: true }
  );
});

// 监听双向绑定值改变，用于回显
watch(
  () => props.getHtml,
  (val) => {
    state.editorVal = val;
  }
);

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>

<style lang="scss" scoped></style>
