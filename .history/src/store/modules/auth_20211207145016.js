import router from "../../router";
import { asyncRouterMap } from "../../router/asyncRouterMap";
const state = {
  name: "",
  menu: [],
  nav: [],
  page: {
    INDEX: true,
    INDEX_HOME: true,
    INDEX_GANTT: false,
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
    let newRoute = filterRoute(asyncRouterMap);
    console.log(newRoute);
  },
};
let routeList = [];
const filterRoute = (list) => {
  routeList = list.filter((item) => {
    if (state.page[item.meta.code]) {
      console.log(item);
      if (Object.prototype.hasOwnProperty.call(item, "children")) {
        filterRoute(item.children);
      }
      return item;
    }
  });
  return routeList;
};

export default { state, mutations };
