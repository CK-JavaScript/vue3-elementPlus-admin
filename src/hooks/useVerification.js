import { ElMessage } from "element-plus";
import useDataType from "./useDataType.js";

/**
 * @description:是否是纯数字
 * @param {String|Number} str: 要验证的字符串或数字
 * @return {Boolean} 是或否
 */
export function usePureNum(str) {
  if (["string", "number"].includes(useDataType(str))) {
    var reg = /^\d+$/;
    return reg.test(str);
  } else {
    ElMessage({
      message: "仅支持字符串与数字",
      type: "warning",
    });
  }
}

/**
 * @description:是否是手机号
 * @param {String|Number} str: 要验证的字符串或数字
 * @return {Boolean} 是或否
 */
export function usePhoneNum(str) {
  if (["string", "number"].includes(useDataType(str))) {
    var reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    return reg.test(str);
  } else {
    ElMessage({
      message: "仅支持字符串与数字",
      type: "warning",
    });
  }
}

/**
 * @description: 是否是邮箱
 * @param {String} str: 要验证的字符串
 * @return {Boolean} 是或否
 */
export function useEmailNum(str) {
  if (["string"].includes(useDataType(str))) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(str);
  } else {
    ElMessage({
      message: "仅支持字符串",
      type: "warning",
    });
  }
}

/**
 * @description: 是否是空对象
 * @param {Object} obj: 要验证的对象
 * @return {Boolean} 是或否
 */
export function useEmptyObj(obj) {
  if (["object"].includes(useDataType(obj))) {
    return Reflect.ownKeys(obj).length === 0;
  } else {
    ElMessage({
      message: "仅支持对象",
      type: "warning",
    });
  }
}
