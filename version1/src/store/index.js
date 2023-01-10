import { createStore } from "vuex";

import common from "./modules/common";
import auth from "./modules/auth";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    common,
    auth,
  },
});
