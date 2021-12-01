import axios from "axios";
import { BASE_SERVER, ENV_BASE } from "./config";

axios.defaults.baseURL = BASE_SERVER;
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use((config) => {
  config.url = ENV_BASE + config.url;
  store.commit("setLoader", true);
  config.cancelToken = new CancelToken((c) => {
    removePendingAjax(config, c);
  });
  if (config.url.indexOf("/operation-log/downloadLog") !== -1) {
    setTimeout(() => {
      pendingAjax = [];
    }, 200);
  }
  return config;
});
/* 响应拦截器 */
axios.interceptors.response.use(
  (response) => {
    if (response.data.code === 70006) {
      store.dispatch("logout");
    } else if (response.data.code === 70002 || response.data.code === 500) {
      Message.error(response.data.msg);
    }
    if (
      response.data.code === 70002 ||
      response.data.code === 500 ||
      response.data.code === 200
    ) {
      setTimeout(() => {
        pendingAjax = [];
      }, 200);
    }
    setTimeout(() => {
      store.commit("setLoader", false);
    }, 300);
    return response;
  },
  (error) => {
    if (error.message !== 1) {
      setTimeout(() => {
        pendingAjax = [];
      }, 200);
    }
    console.log("-------", error.message); // for debug
    return Promise.reject(error);
  }
);
