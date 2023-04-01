// 样式相关
import useCssVar from "./useCssVar.js";
import { useHexToRgb, useRgbToHex, useDarkColor, useLightColor } from "./useConvertColor.js";
// 组件相关
import useComponentName from "./useComponentName.js";
// 工具相关
import useDeepClone from "./useDeepClone.js";
import useDebounce from "./useDebounce.js";
import useThrottle from "./useThrottle.js";
import useKeyStroke from "./useKeyStroke.js";
import useDataType from "./useDataType.js";
import { useSessionStorage, useLocalStorage } from "./useStorage.js";
import { useRepairZero, useDateFormat } from "./useDateFormat.js";
import { usePureNum, usePhoneNum, useEmailNum, useEmptyObj } from "./useVerification.js";

export default {
  useCssVar,
  useHexToRgb,
  useRgbToHex,
  useDarkColor,
  useLightColor,
  useComponentName,
  useDeepClone,
  useDebounce,
  useThrottle,
  useKeyStroke,
  useDataType,
  useSessionStorage,
  useLocalStorage,
  useRepairZero,
  useDateFormat,
  usePureNum,
  usePhoneNum,
  useEmailNum,
  useEmptyObj,
};
