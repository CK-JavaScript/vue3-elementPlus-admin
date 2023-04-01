<template>
  <div class="svgIcon">
    <el-card header="SvgIcon ( 仅支持 ElementPlus Icon )">
      <SvgIcon name="ElementPlus" size="50" color="#409eff"></SvgIcon>
    </el-card>
    <el-card header="参数" style="margin-top: 20px">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="param" label="参数" />
        <el-table-column prop="explain" label="说明" />
        <el-table-column prop="type" label="类型" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
const tableData = [
  {
    param: "name",
    explain: "svg 图标名字",
    type: "String",
  },
  {
    param: "size",
    explain: "svg 大小",
    type: "String / Number",
  },
  {
    param: "color",
    explain: "svg 颜色",
    type: "String",
  },
];
</script>

<style lang="scss" scoped></style>
