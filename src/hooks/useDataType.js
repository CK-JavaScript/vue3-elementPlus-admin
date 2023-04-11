/**
 * @description: 检测数据类型 ( 当只传了 data 时判断 data 的类型, 返回 data 的类型. 当传了 data 和 type 时, 判断 data 和 type 是否是同一类型, 返回布尔值 )
 * @param {Any} data: 数据
 * @param {Type} type: 类型: 可选择, 如果传了 type 会返回一个布尔值表示 data 是否与 type 类型相等
 * @return {String} 数据类型 / 布尔值
 */
function useDataType(data, type = "") {
  if (type === "") {
    switch (Object.prototype.toString.call(data)) {
      case "[object String]":
        return "string";
      case "[object Number]":
        return "number";
      case "[object Boolean]":
        return "boolean";
      case "[object Null]":
        return "null";
      case "[object Undefined]":
        return "undefined";
      case "[object Array]":
        return "array";
      case "[object Function]":
        return "function";
      case "[object AsyncFunction]":
        return "asyncFunction";
      case "[object Object]":
        return "object";
      case "[object Symbol]":
        return "symbol";
      default:
        return "未知类型";
    }
  } else {
    switch (Object.prototype.toString.call(data)) {
      case "[object String]":
        return type === "string";
      case "[object Number]":
        return type === "number";
      case "[object Boolean]":
        return type === "boolean";
      case "[object Null]":
        return type === "null";
      case "[object Undefined]":
        return type === "undefined";
      case "[object Array]":
        return type === "array";
      case "[object Function]":
        return type === "function";
      case "[object AsyncFunction]":
        return type === "asyncFunction";
      case "[object Object]":
        return type === "object";
      case "[object Symbol]":
        return type === "symbol";
      default:
        return false;
    }
  }
}
export default useDataType;
