import _hook from "@/hooks/index.js";
import { ElMessage } from "element-plus";
export default {
  mounted(el, binding) {
    if (!_hook.useDataType(binding.value, "function")) {
      ElMessage({
        message: "v-isLogin 请绑定函数",
        type: "warning",
      });
      return;
    }
    el.handle = () => {
      if (!_hook.useSessionStorage.get("token")) {
        ElMessage({
          message: "请登录后在操作",
          type: "warning",
        });
        return;
      }
      binding.value();
    };
    el.addEventListener("click", el.handle);
  },
  updated() {
    if (!_hook.useDataType(binding.value, "function")) {
      ElMessage({
        message: "v-isLogin 请绑定函数",
        type: "warning",
      });
      return;
    }
    el.removeEventListener("click", el.handler);
    el.handle = () => {
      if (!_hook.useSessionStorage.get("token")) {
        ElMessage({
          message: "请登录后在操作.",
          type: "warning",
        });
        return;
      }
      binding.value();
    };
    el.addEventListener("click", el.handle);
  },
  unmounted(el) {
    el.removeEventListener("click", el.handler);
  },
};
