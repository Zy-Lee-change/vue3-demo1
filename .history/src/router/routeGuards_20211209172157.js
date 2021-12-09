import router from "./index";
import store from "../store";

store.dispatch("CHECK_LOGIN");
router.beforeEach((to, from, next) => {
  console.log(store.state, to, from);
  // 如果目标页是登录页，可直接跳转
  if (to.name === "login") {
    next();
    return;
  }
  if (store.getters.GET_TOKEN) {
    if (store.state.auth.authRoute.length > 0) {
      next();
    } else {
      store.dispatch("Operation", () => {
        next({ ...to, replace: true });
      });
    }
  } else {
    next({ name: "login" });
  }
});
