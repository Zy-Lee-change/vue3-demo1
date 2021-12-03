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
};

const mutations = {};

const actions = {
  logout() {
    console.log("logout");
  },
};

export default { state, getters, mutations, actions };
