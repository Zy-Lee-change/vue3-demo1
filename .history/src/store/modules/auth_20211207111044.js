import router from "../../router";
import { asyncRouterMap } from "../../router/asyncRouterMap";
const state = {
  name: "",
  menu: [],
  nav: [],
  page: {
    INDEX: true,
    INDEX_HOME: true,
    INDEX_GANTT: true,
    INDEX_FORMS: true,
  },
};
const mutations = {
  Operation(state) {
    console.log(state, router);
    /**
     * get the user's access, include page、 menu and nav
     * and then filter the view route list
     */
  },
};
function filterRoute(list, auth) {}

export default { state, mutations };
