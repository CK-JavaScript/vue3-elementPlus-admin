import { onMounted, onBeforeUnmount } from "vue";
import { ElMessage } from "element-plus";
import useDataType from "./useDataType.js";

const keys = ["Esc", "Tab", "BackSpace", "Enter", "Shift", "Ctrl", "Alt", "Up", "Down", "Left", "Right"];
const keysCode = [27, 9, 8, 13, 16, 17, 18, 38, 40, 37, 39];
let callback = "";
let keyVal = "";
function keydownFun(e) {
  if (e.keyCode == keysCode[keys.indexOf(keyVal)]) {
    callback();
  }
}
/**
 * @description: 监听键盘某些键被按下
 * @param {String} key: 要监听的键
 * @param {Function} fun: 回调函数
 */
function useKeyStroke(key, fun) {
  onMounted(() => {
    if (!keys.includes(key)) {
      ElMessage({
        message: `请输入如下支持的键 Esc、Tab、BackSpace、Enter、Shift、Ctrl、Alt、Up、Down、Left、Right`,
        type: "warning",
      });
    } else if (!fun) {
      ElMessage({
        message: "回调函数不可为空",
        type: "warning",
      });
    } else if (!["asyncFunction", "function"].includes(useDataType(fun))) {
      ElMessage({
        message: "请传入正确的回调函数",
        type: "warning",
      });
    } else {
      keyVal = key;
      callback = fun;
      window.addEventListener("keydown", keydownFun);
    }
  });
  onBeforeUnmount(() => {
    window.removeEventListener("keydown", keydownFun);
  });
}
export default useKeyStroke;
