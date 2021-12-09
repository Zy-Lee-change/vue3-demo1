import router from "./index";
import { onBeforeRouteUpdate } from "vue-router";
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
onBeforeRouteUpdate((to, from) => {
  //当前组件路由改变后，进行触发
  console.log(store.state, from, to);
  // 如果目标页是登录页，可直接跳转
  // if (to.name === "login" || to.path === "/") {
  //   next();
  //   return false;
  // }
  // if (store.state.common.token) {
  //   if (store.state.auth.authRoute.length > 0) {
  //     next();
  //   } else {
  //     store.dispatch("Operation", () => {
  //       next({ ...to, replace: true });
  //     });
  //   }
  // } else {
  //   next({ name: "login" });
  // }
});
