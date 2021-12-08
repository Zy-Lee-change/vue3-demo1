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
    // 筛选路由，分成可访问和不可访问
    let newRoute = filterRoute(asyncRouterMap);
    console.log(newRoute);
  },
};

const filterRoute = (list) => {
  let routeList = [];
  routeList = list.filter((item) => {
    if (state.page[item.meta.code]) {
      console.log(item);
      item.meta.auth = "pass";
    } else {
      item.meta.auth = "fail";
    }
    if (Object.prototype.hasOwnProperty.call(item, "children")) {
      filterRoute(item.children);
    }
    return item;
  });

  const routeResult = failRemove(routeList);
  return routeResult;
};

const failRemove = (list) => {
  let routeList = [];
  list.map((item) => {
    if (item.meta.auth === "pass") {
      routeList.push({
        path: item.path,
        name: item.name,
        component: item.component,
        meta: item.meta,
      });

      if (
        Object.prototype.hasOwnProperty.call(item, "children") &&
        item.children.length > 0
      ) {
        routeList[routeList.length - 1].children = failRemove(item.children);
        routeList[routeList.length - 1].children[0].path = "";
      }
    }
  });

  return routeList;
};

export default { state, mutations };
