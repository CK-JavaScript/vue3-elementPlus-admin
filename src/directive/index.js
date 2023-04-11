import isLogin from "./isLogin";
const initDirective = {
  install(app) {
    app.directive("isLogin", isLogin);
  },
};
export default initDirective;
