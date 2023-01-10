import { createRouter, createWebHashHistory } from "vue-router";
const HomeView = () =>
  import(/* webpackChunkName: "about" */ "../views/HomeView.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
