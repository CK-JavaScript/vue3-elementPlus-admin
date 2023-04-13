<template>
  <div class="container">
    <el-button type="primary" @click="set">添加水印</el-button>
    <el-button type="primary" @click="remove">移除水印</el-button>
    <el-button type="primary" @click="dialogVisible = true">自定义水印</el-button>
    <el-dialog v-model="dialogVisible" title="温馨提示" width="500px">
      <el-input v-model="text" placeholder="请填写自定义水印" />
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="custom">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import watermark from "@/utils/watermark.js";

function set() {
  watermark.set();
}
function remove() {
  watermark.remove();
}

let text = ref("Vue3 ElePlus Admin");
let dialogVisible = ref(false);
function custom() {
  watermark.set(text.value);
  dialogVisible.value = false;
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
}
.dialog-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
