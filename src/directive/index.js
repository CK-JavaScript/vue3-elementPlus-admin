import isLogin from "./isLogin.js";
import throttle from "./throttle.js";
const initDirective = {
  install(app) {
    app.directive("isLogin", isLogin);
    app.directive("throttle", throttle);
  },
};
export default initDirective;
