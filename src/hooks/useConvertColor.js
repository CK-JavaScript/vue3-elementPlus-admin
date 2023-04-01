import { ElMessage } from "element-plus";

/**
 * 颜色转换函数
 * @method useHexToRgb: hex 颜色转 rgb 颜色
 * @method useRgbToHex: rgb 颜色转 Hex 颜色
 * @method useDarkColor: 加深颜色值
 * @method useLightColor: 变浅颜色值
 */

/**
 * @description: hex 颜色转 rgb 颜色
 * @param {String} str: str 颜色值字符串
 * @return {String} hex 值
 */
function useHexToRgb(str) {
  let hexs = "";
  let reg = /^\#?[0-9A-Fa-f]{6}$/;
  if (!reg.test(str)) {
    ElMessage.warning("输入错误的hex");
    return "";
  }
  str = str.replace("#", "");
  hexs = str.match(/../g);
  for (let i = 0; i < 3; i++) hexs[i] = parseInt(hexs[i], 16);
  return hexs;
}

/**
 * @description: rgb 颜色转 Hex 颜色
 * @param {String} r: 代表红色
 * @param {String} g: 代表绿色
 * @param {String} b: 代表蓝色
 * @return {String} Hex 颜色值
 */
function useRgbToHex(r, g, b) {
  let reg = /^\d{1,3}$/;
  if (!reg.test(r) || !reg.test(g) || !reg.test(b)) {
    ElMessage.warning("输入错误的rgb颜色值");
    return "";
  }
  let hexs = [r.toString(16), g.toString(16), b.toString(16)];
  for (let i = 0; i < 3; i++) if (hexs[i].length == 1) hexs[i] = `0${hexs[i]}`;
  return `#${hexs.join("")}`;
}

/**
 * @description: 加深颜色值
 * @param {String} color: 颜色值字符串
 * @param {String} level: level 加深的程度，限0-1之间
 * @return {String} 加深后的颜色
 */
function useDarkColor(color, level) {
  let reg = /^\#?[0-9A-Fa-f]{6}$/;
  if (!reg.test(color)) {
    ElMessage.warning("输入错误的hex颜色值");
    return "";
  }
  let rgb = useHexToRgb(color);
  for (let i = 0; i < 3; i++) rgb[i] = Math.floor(rgb[i] * (1 - level));
  return useRgbToHex(rgb[0], rgb[1], rgb[2]);
}

/**
 * @description: 变浅颜色值
 * @param {String} color: 颜色值字符串
 * @param {String} level: level 变浅的程度，限 0-1 之间
 * @return {String} 变浅后的颜色
 */
function useLightColor(color, level) {
  let reg = /^\#?[0-9A-Fa-f]{6}$/;
  if (!reg.test(color)) {
    ElMessage.warning("输入错误的hex颜色值");
    return "";
  }
  let rgb = useHexToRgb(color);
  for (let i = 0; i < 3; i++) rgb[i] = Math.floor((255 - rgb[i]) * level + rgb[i]);
  return useRgbToHex(rgb[0], rgb[1], rgb[2]);
}

export { useHexToRgb, useRgbToHex, useDarkColor, useLightColor };
