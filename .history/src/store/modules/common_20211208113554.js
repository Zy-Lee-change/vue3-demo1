import { BASE_SERVER, ENV_BASE } from "./../../request/config";
import router from "../../router";
const state = {
  loginStatus: false,
  token: "",
};

const getters = {
  // 获取token
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
};

const mutations = {};

const actions = {
  // 登录时，保存token
  SET_TOKEN({ state }, data) {
    state.token = data;
    sessionStorage.setItem("TOKEN", data);
  },
  // 退出登录
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
