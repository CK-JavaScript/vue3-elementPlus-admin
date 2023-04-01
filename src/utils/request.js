import axios from "axios";
import { ElMessage } from "element-plus";
import _hook from "@/hooks/index.js";
import NProgress from "nprogress";

const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // url = base url + request url
  // withCredentials: true, // 跨域请求时发送 cookies
  timeout: 5000, // 请求超时
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    NProgress.start();
    // 在发送请求之前做些什么 token
    if (_hook.useSessionStorage.get("token")) {
      // 让每个请求携带 token
      // ['X-Token'] 是自定义标题键
      // 请根据实际情况修改
      config.headers["token"] = _hook.useSessionStorage.get("token");
    }
    return config;
  },
  (error) => {
    NProgress.done();
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    NProgress.done();
    // 对响应数据做点什么
    if (+response.status === 200) {
      if (+response.data.code === 1) {
        return response.data.data;
      } else {
        // 响应错误
      }
    }
  },
  (error) => {
    NProgress.done();
    // 对响应错误做点什么
    if (error.message.indexOf("timeout") != -1) {
      ElMessage.error("网络超时");
    } else if (error.message == "Network Error") {
      ElMessage.error("网络连接错误");
    } else {
      if (error.response.data) ElMessage.error(error.response.statusText);
      else ElMessage.error("接口路径找不到");
    }
    return Promise.reject(error);
  }
);

export default service;
