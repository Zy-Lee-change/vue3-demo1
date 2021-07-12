/*
 * @Author: your name
 * @Date: 2021-07-05 12:27:27
 * @LastEditTime: 2021-07-12 11:24:27
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
    path: "/gantt",
    name: "gantt",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/gantt/Gantt.vue"),
    meta: {
      name: "Gantt Chart",
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
