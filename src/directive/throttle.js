import _hook from "@/hooks/index.js";
import { ElMessage } from "element-plus";
export default {
  mounted(el, binding) {
    if (!_hook.useDataType(binding?.value, "function")) {
      ElMessage({
        message: "v-throttle 请绑定函数",
        type: "warning",
      });
      return;
    }
    if (!_hook.usePureNum(binding?.arg)) {
      ElMessage({
        message: "v-throttle 指令参数仅支持传入纯数字",
        type: "warning",
      });
      return;
    }
    el.handler = () => {
      el.classList.add("is-disabled");
      el.disabled = true;
      if (el.disabled) {
        binding.value();
        setTimeout(() => {
          el.classList.remove("is-disabled");
          el.disabled = false;
        }, binding.arg);
      }
    };
    el.addEventListener("click", el.handler);
  },

  updated(el, binding) {
    if (!_hook.useDataType(binding?.value, "function")) {
      ElMessage({
        message: "v-throttle 请绑定函数",
        type: "warning",
      });
      return;
    }
    if (!_hook.usePureNum(binding?.arg)) {
      ElMessage({
        message: "v-throttle 指令参数仅支持传入纯数字",
        type: "warning",
      });
      return;
    }
    el.removeEventListener("click", el.handler);
    el.handler = () => {
      el.classList.add("is-disabled");
      el.disabled = true;
      if (el.disabled) {
        binding.value();
        setTimeout(() => {
          el.classList.remove("is-disabled");
          el.disabled = false;
        }, binding.arg);
      }
    };
    el.addEventListener("click", el.handler);
  },
  unmounted(el) {
    el.removeEventListener("click", el.handler);
  },
};
