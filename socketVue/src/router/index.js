import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import C1 from "../views/center/C1";
import C2 from "../views/center/C2";
import C3 from "../views/center/C3";
import left from "./left";
import R1 from "../views/right/R1";

Vue.use(VueRouter);

let routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/c1",
    name: "c1",
    component: C1,
    meta: {
      pId: "c",
    },
  },
  {
    path: "/c2",
    name: "c2",
    component: C2,
    meta: {
      pId: "c",
    },
  },
  {
    path: "/c3",
    name: "c3",
    component: C3,
    meta: {
      pId: "c",
    },
  },
  {
    path: "/r1",
    name: "r1",
    component: R1,
  },
];

routes = routes.concat(left);

const router = new VueRouter({
  routes,
});

export default router;
