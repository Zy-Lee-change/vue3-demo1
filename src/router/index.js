/*
 * @Author: your name
 * @Date: 2021-07-05 12:27:27
 * @LastEditTime: 2021-07-09 11:37:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-demo1\src\router\index.js
 */
import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/home/Home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      name: "首页",
    },
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/about/About.vue"),
    meta: {
      name: "关于",
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
