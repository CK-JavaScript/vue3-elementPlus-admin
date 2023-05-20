import isLogin from "./isLogin.js";
import throttle from "./throttle.js";
import sizeOb from "./sizeOb.js";
const initDirective = {
  install(app) {
    app.directive("isLogin", isLogin);
    app.directive("throttle", throttle);
    app.directive("sizeOb", sizeOb);
  },
};
export default initDirective;
