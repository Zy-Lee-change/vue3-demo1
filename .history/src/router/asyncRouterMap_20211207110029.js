import Index from "../views/Index";
import Home from "../views/home/Home";
import form from "./form";

let childRouter = childRouter.concat(form);

let asyncRouterMap = [
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
      ...childRouter,
    ],
  },
];
