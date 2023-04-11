/**
 * @description: 设置 css 变量
 * @param {String} key: 要设置变量
 * @param {String} value: 设置的值
 */
export default function useCssVar(key, value) {
  document.documentElement.style.setProperty(key, value);
}
