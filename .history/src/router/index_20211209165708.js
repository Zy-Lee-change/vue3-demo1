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
  }
});
