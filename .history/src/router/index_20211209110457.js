/*
 * @Author: your name
 * @Date: 2021-07-05 12:27:27
 * @LastEditTime: 2021-07-28 15:31:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-demo1\src\router\index.js
 */
import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/login";
// import { asyncRouterMap } from "./asyncRouterMap";
import store from "../store";

let routes = [
  {
    path: "/",
    name: "login",
    component: Login,
    meta: {
      auth: "pass",
      name: "登录页",
    },
  },
  // ...asyncRouterMap,
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
await store.dispatch("CHECK_LOGIN");
router.beforeEach((from, to, next) => {
  console.log(store.state, from, to, next);
  // 如果目标页是登录页，可直接跳转
  if (to.name === "login" || to.path === "/") {
    return next();
  }
  if (store.state.common.token) {
    if (store.state.auth.authRoute.length > 0) {
      return next();
    } else {
      store.dispatch("Operation", () => {
        return next({ ...to, replace: true });
      });
    }
  } else {
    return next({ name: "login" });
  }
});
