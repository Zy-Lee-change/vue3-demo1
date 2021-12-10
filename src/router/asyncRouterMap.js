/**
 *
 * 需要通过权限获取的路由列表
 * 根据返回的code做增删处理
 *
 */
import { shallowRef } from "vue";
import form from "./form";
const Index = () => import("./../views/Index");
const Home = () => import("./../views/home/Home");

let childRouter = [];
childRouter = childRouter.concat(form);

let asyncRouterMap = [
  {
    path: "/index",
    name: "index",
    component: shallowRef(Index),
    meta: {
      code: "INDEX",
    },
    children: [
      {
        path: "",
        name: "home",
        component: shallowRef(Home),
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
      ...childRouter,
    ],
  },
];

export { asyncRouterMap };
