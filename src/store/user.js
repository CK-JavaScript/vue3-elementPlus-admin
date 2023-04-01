import { defineStore } from "pinia";
import _hook from "@/hooks/index.js";
import { login } from "@/api/user.js";

export const useUser = defineStore("useUser", {
  state: () => {
    return {
      userinfo: _hook.useSessionStorage.get("userinfo") || {},
      token: _hook.useSessionStorage.get("token") || "",
    };
  },
  getters: {},
  actions: {
    /**
     * @description: 用户登录
     * @param {*} param: 登录的参数
     */
    userlogin(param) {
      return login(param).then((res) => {
        this.userinfo = res.userInfo;
        _hook.useSessionStorage.set("token", this.userinfo.token);
        _hook.useSessionStorage.set("userinfo", this.userinfo);
        return this.userinfo;
      });
    },
  },
});
