import Cookies from "js-cookie";
/**
 * window.sessionStorage 浏览器临时缓存
 * @method set 设置临时缓存
 * @method get 获取临时缓存
 * @method remove 移除临时缓存
 * @method clear 移除全部临时缓存
 */
export const useSessionStorage = {
  set(key, value) {
    if (key === "token") return Cookies.set(key, value);
    window.sessionStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    if (key === "token") return Cookies.get(key);
    let json = window.sessionStorage.getItem(key);
    return JSON.parse(json);
  },
  remove(key) {
    if (key === "token") return Cookies.remove(key);
    window.sessionStorage.removeItem(key);
  },
  clear() {
    Cookies.remove("token");
    window.sessionStorage.clear();
  },
};

/**
 * window.localStorage 浏览器永久缓存
 * @method set 设置永久缓存
 * @method get 获取永久缓存
 * @method remove 移除永久缓存
 * @method clear 移除全部永久缓存
 */
export const useLocalStorage = {
  set(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    let json = window.localStorage.getItem(key);
    return JSON.parse(json);
  },
  remove(key) {
    window.localStorage.removeItem(key);
  },
  clear() {
    window.localStorage.clear();
  },
};
