/**
 * @description: 检测数据类型
 * @param {Any} data: 数据
 * @return {String} 数据类型
 */
function useDataType(data) {
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
}
export default useDataType;
