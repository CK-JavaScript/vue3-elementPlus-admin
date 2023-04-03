import request from "@/utils/request.js";
export function login(data) {
  return request({
    method: "post",
    url: "/api/login",
    data,
  });
}

export function getUserInfo() {
  return request({
    method: "get",
    url: "/api/userInfo",
  });
}
