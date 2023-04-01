import { ElMessage } from "element-plus";
import useDataType from "./useDataType.js";
import { usePureNum } from "./useVerification";

/**
 * @description: 获得时间格式的枚举
 * @return {*}
 */
function getFormatEnum(newDate) {
  return {
    key: ["YYYY", "YY", "mm", "dd", "HH", "MM", "ss", "m", "d", "H", "M", "s"],
    value: {
      YYYY: newDate.getFullYear(),
      YY: newDate.getYear(),
      mm: useRepairZero(newDate.getMonth() - 1),
      m: newDate.getMonth() - 1,
      dd: useRepairZero(newDate.getDate()),
      d: newDate.getDate(),
      HH: useRepairZero(newDate.getHours()),
      H: newDate.getHours(),
      MM: useRepairZero(newDate.getMinutes()),
      M: newDate.getMinutes(),
      ss: useRepairZero(newDate.getSeconds()),
      s: newDate.getSeconds(),
    },
  };
}

/**
 * @description: 补零
 * @param {Number} number: 当前数
 * @return {Number} 补零后的数
 */
export function useRepairZero(number) {
  return number >= 10 ? number : `0${number}`;
}

/**
 * @description: 该函数必须传入第一个参数，第二个参数是可选的，函数返回一个格式化好的时间。
 * @param {String} date: 任何合法的时间格式、秒或毫秒的时间戳
 * @param {String} format: 时间格式，可选。默认为YYYY-mm-dd，年为"YYYY"，月为"mm"，日为"dd"，时为"hh"，分为"MM"，秒为"ss"，格式可以自由搭配，如： YYYY:mm:dd，YYYY-mm-dd，YYYY年mm月dd日，YYYY年mm月dd日 hh时MM分ss秒，YYYY/mm/dd/，MM:ss等组合
 * @return {String} 格式好的日期
 */
export function useDateFormat(date, format) {
  let newDate = "",
    time = format || "YYYY-mm-dd";
  if (["string", "number"].includes(useDataType(date)) && usePureNum(date) && date.toString().length !== 13) {
    newDate = new Date(date * 1000);
  } else {
    newDate = new Date(date);
  }
  const formatEnum = getFormatEnum(newDate);
  formatEnum.key.forEach((i) => {
    time = time.replace(i, formatEnum.value[i]);
  });
  return time;
}
