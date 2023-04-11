/**
 * @description: 函数节流
 * @param {Function} fn: 函数
 * @param {Number} time: 节流时间
 * @return {Function} 节流的函数
 */
function useThrottle(fn, time = 1000) {
  let flag = true;
  return function (...args) {
    if (flag) {
      flag = false;
      fn(...args);
      setTimeout(() => {
        flag = true;
      }, +time);
    }
  };
}
export default useThrottle;
