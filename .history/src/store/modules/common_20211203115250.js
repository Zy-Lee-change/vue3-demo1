import { BASE_SERVER, ENV_BASE } from "../../request/config";
const state = {
  loginStatus: false,
  token: "",
  // 获取权限路由列表
  routeList: [],
  // 获取操作权限
  operateList: {},
};

const getters = {
  GET_TOKEN: (state) => {
    return state.token;
  },
  // 获取axios配置
  GET_AJAXCONFIG: (state) => (url) => {
    let result = {
      header: null,
      url: null,
      server: null,
    };
    if (url) {
      result.url = BASE_SERVER + ENV_BASE + url;
    }
    result.header = {
      Authorization: state.token,
    };
    result.server = BASE_SERVER;
    return result;
  },
  getLoader: (state) => {
    return state.requestLoader;
  },
  getSetting: (state) => {
    return state.pageSetting;
  },
};

const mutations = {};

const actions = {
  logout() {
    console.log("logout");
  },
};

export default { state, getters, mutations, actions };
