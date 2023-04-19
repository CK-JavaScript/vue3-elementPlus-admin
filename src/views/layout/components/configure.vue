<template>
  <el-drawer class="vab-drawer" size="400px" :model-value="props.modelValue" :before-close="close">
    <template #header>
      <h4>配置</h4>
    </template>
    <template #default>
      <el-divider>
        <span>布局切换</span>
      </el-divider>
      <el-row :gutter="10" class="vab-row">
        <el-col :span="9" class="list-title"> 布局 </el-col>
        <el-col :span="15">
          <el-select v-model="getConfigure.menuMode" placeholder="请选择布局" @change="changeMenuMode(getConfigure.menuMode)">
            <el-option v-for="(item, index) in layoutModeEnum.key" :key="item" :label="layoutModeEnum.value[index]" :value="item" />
          </el-select>
        </el-col>
      </el-row>
      <el-divider>
        <span>主题配置</span>
      </el-divider>
      <el-row :gutter="10" class="vab-row">
        <el-col :span="9" class="list-title"> 主题色 </el-col>
        <el-col :span="15">
          <el-color-picker v-model="getConfigure.themeColor" @change="setConfigure('themeColor')" />
        </el-col>
      </el-row>
      <el-divider>
        <span>标签</span>
      </el-divider>
      <el-row :gutter="10" class="vab-row">
        <el-col :span="9" class="list-title"> 标签风格 </el-col>
        <el-col :span="15">
          <el-select v-model="getConfigure.navbarMode" placeholder="请选择布局">
            <el-option v-for="(item, index) in navbarModeEnum.key" :key="item" :label="navbarModeEnum.value[index]" :value="item" />
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="vab-row">
        <el-col :span="9" class="list-title"> 标签图标 </el-col>
        <el-col :span="15">
          <el-switch v-model="getConfigure.navbarIcon" />
        </el-col>
      </el-row>
      <el-divider>
        <span>菜单</span>
      </el-divider>
      <el-row :gutter="10" class="vab-row">
        <el-col :span="9" class="list-title"> 菜单背景 </el-col>
        <el-col :span="15">
          <el-color-picker v-if="getConfigure.menuMode == layoutModeEnum.key[0]" v-model="getConfigure.menuBGColor" @change="setConfigure('menuBGColor')" />
          <el-color-picker v-else-if="getConfigure.menuMode == layoutModeEnum.key[1]" v-model="getConfigure.columnBgColor" @change="setConfigure('columnBgColor')" />
        </el-col>
      </el-row>
      <el-row :gutter="10" class="vab-row">
        <el-col :span="9" class="list-title"> 菜单文字颜色 </el-col>
        <el-col :span="15">
          <el-color-picker v-model="getConfigure.textColor" @change="setConfigure('textColor')" />
        </el-col>
      </el-row>
      <el-row :gutter="10" class="vab-row">
        <el-col :span="9" class="list-title"> 菜单活跃文字颜色 </el-col>
        <el-col :span="15">
          <el-color-picker v-model="getConfigure.activeTextColor" @change="setConfigure('activeTextColor')" />
        </el-col>
      </el-row>
      <el-row :gutter="10" class="vab-row">
        <el-col :span="9" class="list-title">菜单的 Logo</el-col>
        <el-col :span="15">
          <el-switch v-model="getConfigure.showMenuLogo" />
        </el-col>
      </el-row>
      <el-divider>
        <span>过度</span>
      </el-divider>
      <el-row :gutter="10" class="vab-row">
        <el-col :span="9" class="list-title">
          组件切换过度
          <el-tooltip class="box-item" effect="dark" content="开启组件切换过渡时，组件只能有一个根元素。" placement="top">
            <SvgIcon name="QuestionFilled" color="#909399" style="margin-left: 5px"></SvgIcon>
          </el-tooltip>
        </el-col>
        <el-col :span="15">
          <el-switch v-model="getConfigure.componentTransition" />
        </el-col>
      </el-row>
      <el-row :gutter="10" class="vab-row">
        <el-col :span="9" class="list-title">组件过渡</el-col>
        <el-col :span="15">
          <el-select v-model="getConfigure.componentTransitionMode" placeholder="请选择过度模式">
            <el-option v-for="(item, index) in componentTransitionEnum.key" :key="item" :label="componentTransitionEnum.value[index]" :value="item" />
          </el-select>
        </el-col>
      </el-row>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button type="primary" @click="confirm">保存</el-button>
        <el-button @click="recovery">恢复默认</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
import { useConfigure } from "@/store/configure.js";

// 控制组件的显示
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});
const emits = defineEmits(["update:modelValue"]);
function close() {
  emits("update:modelValue", !props.modelValue);
}

// 获取配置
const storeConfigure = useConfigure();
const { configure } = storeToRefs(storeConfigure);
const getConfigure = computed(() => {
  return configure.value;
});

// 获取枚举值
const { layoutModeEnum, navbarModeEnum, setColorEnum, componentTransitionEnum } = ENUMS;

// 切换侧边导航的布局
function changeMenuMode(mode) {
  switch (mode) {
    case layoutModeEnum.key[0]:
      _hook.useCssVar("--el-menu-bg-color", storeConfigure.configure.menuBGColor);
      break;
    case layoutModeEnum.key[1]:
      _hook.useCssVar("--el-menu-bg-color", "#ffffff");
      break;
    default:
  }
}

// 设置配置
function setConfigure(type) {
  _hook.useCssVar(setColorEnum[type], getConfigure.value[type]);
  switch (type) {
    case "themeColor":
      _hook.useCssVar("--el-menu-hover-bg-color", storeConfigure.configure.themeColor);
      [3, 5, 7, 8, 9].forEach((i) => {
        _hook.useCssVar(`--el-color-primary-light-${i}`, _hook.useLightColor(getConfigure.value[type], `0.${i}`));
      });
      break;
    case "menuBGColor":
      storeConfigure.change("columnBgColor", storeConfigure.configure.menuBGColor);
      _hook.useCssVar("--admin-column-bg-color", storeConfigure.configure.menuBGColor);
      break;
    case "columnBgColor":
      storeConfigure.change("menuBGColor", storeConfigure.configure.columnBgColor);
      break;
    case "activeTextColor":
      _hook.useCssVar("--el-menu-hover-text-color", storeConfigure.configure.activeTextColor);
      break;
    default:
  }
}

// 保存配置
function confirm() {
  _hook.useLocalStorage.set("configure", storeConfigure.configure);
  ElMessage({
    message: "配置保存成功",
    type: "success",
  });
}

// 恢复默认
function recovery() {
  _hook.useLocalStorage.remove("configure");
  storeConfigure.$reset();

  // 初始化颜色
  _hook.useCssVar("--el-color-primary", storeConfigure.configure.themeColor);
  switch (storeConfigure.configure.menuMode) {
    case layoutModeEnum.key[0]:
      _hook.useCssVar("--el-menu-bg-color", storeConfigure.configure.menuBGColor);
      break;
    case layoutModeEnum.key[1]:
      _hook.useCssVar("--el-menu-bg-color", "#ffffff");
      break;
    default:
  }
  _hook.useCssVar("--admin-column-bg-color", storeConfigure.configure.menuBGColor);
  _hook.useCssVar("--el-menu-text-color", storeConfigure.configure.textColor);
  _hook.useCssVar("--el-menu-active-color", storeConfigure.configure.activeTextColor);
  [3, 5, 7, 8, 9].forEach((i) => {
    _hook.useCssVar(`--el-color-primary-light-${i}`, _hook.useLightColor(storeConfigure.configure.themeColor, `0.${i}`));
  });

  ElMessage({
    message: "配置已恢复默认",
    type: "success",
  });
}
</script>

<style lang="scss" scoped>
.vab-row {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.list-title {
  display: flex;
  align-items: center;
  font-size: 15px;
  line-height: 1;
  color: --el-text-color-secondary;
}
</style>
