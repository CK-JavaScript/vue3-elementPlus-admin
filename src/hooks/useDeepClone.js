/**
 * @description: 判断 arr 是否为一个数组，返回一个 bool 值
 * @param {null} arr: 要判断的值
 * @return {Boolean} 是否为数组的 Boolean 值
 */
function isArray(arr) {
  return Object.prototype.toString.call(arr) === "[object Array]";
}

/**
 * @description: 深度克隆
 * @param {Object} obj: 要克隆的对象
 * @return {Object} 克隆好的对象
 */
function deepClone(obj) {
  // 对常见的 “非” 值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== "object" && typeof obj !== "function") {
    // 原始类型直接返回
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}

export default deepClone;
