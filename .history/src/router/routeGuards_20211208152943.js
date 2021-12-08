import router from ".";
import store from "../store";

store.dispatch("CHECK_LOGIN");
router.beforeEach((from, to, next) => {
  console.log(store.state);
  // 如果目标页是登录页，可直接跳转
  if (to.name === "login") {
    next();
    return false;
  }
  if (store.state.common.token) {
    if (store.state.auth.authRoute.length > 0) {
      next();
    } else {
    }
  } else {
    next({ name: "login" });
  }
});
