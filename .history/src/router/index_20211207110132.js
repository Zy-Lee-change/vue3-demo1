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
import { asyncRouterMap } from "./asyncRouterMap";

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
  {
    path: "/index",
    name: "index",
    component: Index,
    meta: {
      code: "INDEX",
    },
    children: [
      {
        path: "",
        name: "home",
        component: Home,
        meta: {
          auth: "pass",
          name: "首页",
          code: "INDEX_HOME",
        },
      },
      {
        path: "gantt",
        name: "gantt",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/gantt/Gantt.vue"),
        meta: {
          auth: "pass",
          name: "Gantt Chart",
          code: "INDEX_GANTT",
        },
      },
    ],
  },
];
routes[1].children = routes[1].children.concat(form);
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
