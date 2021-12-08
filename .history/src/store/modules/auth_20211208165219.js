import router from "../../router";
import { asyncRouterMap } from "../../router/asyncRouterMap";

const state = {
  name: "",
  menu: [],
  nav: [],
  authRoute: [],
  page: {
    INDEX: true,
    INDEX_HOME: true,
    INDEX_GANTT: true,
    INDEX_FORMS: true,
  },
};

const mutations = {};

const action = {
  Operation({ state }, cb) {
    /**
     * get the user's access, include page、 menu and nav
     * and then filter the view route list
     */
    // 筛选路由，剔除不可访问的路由
    state.authRoute = filterRoute(asyncRouterMap);
    console.log(state.authRoute);
    setTimeout(() => {
      router.addRoute(...state.authRoute);
    }, 1000);
  },
};

// 根据返回的code对路由进行分类
// 分成可访问和不可访问 pass or fail
const filterRoute = (list) => {
  let routeList = [];
  routeList = list.filter((item) => {
    if (state.page[item.meta.code]) {
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

// 剔除不可访问的路由，重置首位的path
// 有子路由，递归处理
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

export default { state, mutations, action };
