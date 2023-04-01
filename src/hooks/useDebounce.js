/**
 * @description: 函数防抖
 * @param {Function} fn: 函数
 * @param {Number} time: 时间
 * @return {Function} 处理后的函数
 */
function useDebounce(fn, time = 1000) {
  let timeLock = null;
  return function (...args) {
    clearTimeout(timeLock);
    timeLock = setTimeout(() => {
      fn(...args);
    }, time);
  };
}
export default useDebounce;
