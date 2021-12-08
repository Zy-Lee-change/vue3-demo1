import { BASE_SERVER, ENV_BASE } from "./../../request/config";
import router from "../../router";
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
  SET_TOKEN({ state }, data) {
    state.token = data;
    sessionStorage.setItem("TOKEN", data);
  },
  logout() {
    /**
     * 调取退出登录的接口
     */
    state.token = null;
    sessionStorage.removeItem("Token");
    router.replace({ name: "login" });
    setTimeout(() => {
      window.location.reload();
    }, 400);
  },
};

export default { state, getters, mutations, actions };
