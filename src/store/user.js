import { defineStore } from "pinia";
import _hook from "@/hooks/index.js";
import { login, getUserInfo } from "@/api/user.js";

export const useUser = defineStore("useUser", {
  state: () => {
    return {
      userInfo: {},
      token: _hook.useSessionStorage.get("token") || "",
    };
  },
  getters: {},
  actions: {
    // 设置用户信息
    async setUserInfo() {
      if (_hook.useSessionStorage.get("userInfo")) {
        this.userInfo = _hook.useSessionStorage.get("userInfo");
      } else {
        this.userInfo = await this.getUserInfo();
      }
    },
    /**
     * @description: 用户登录
     * @param {*} param: 登录的参数
     */
    userlogin(param) {
      return login(param).then((res) => {
        this.userInfo = res.userInfo;
        _hook.useSessionStorage.set("token", this.userInfo.token);
        _hook.useSessionStorage.set("userInfo", this.userInfo);
        return this.userInfo;
      });
    },
    /**
     * @description: 获取用户信息
     */
    getUserInfo() {
      return getUserInfo().then((res) => {
        return res.userInfo;
      });
    },
  },
});
