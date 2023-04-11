import _hook from "@/hooks/index.js";
import { ElMessage } from "element-plus";
export default {
  mounted(el, binding, vnode, prevVnode) {
    if (!_hook.useDataType(binding.value, "function")) {
      ElMessage({
        message: "请绑定函数.",
        type: "warning",
      });
      return;
    }
    el.addEventListener("click", () => {
      if (!_hook.useSessionStorage.get("token")) {
        ElMessage({
          message: "请登录后在操作.",
          type: "warning",
        });
        return;
      }
      binding.value && binding.value();
    });
  },
};
