import axios from "axios";
import { BASE_SERVER, ENV_BASE } from "./config";
import store from "./../store/index";
// axios基础配置
axios.defaults.baseURL = BASE_SERVER;
axios.defaults.headers.post["Content-Type"] = "application/json";

// 请求拦截器
axios.interceptors.request.use((config) => {
  config.url = ENV_BASE + config.url;
  return config;
});

/* 响应拦截器 */
axios.interceptors.response.use(
  (response) => {
    if (response.data.code === 70006) {
      store.dispatch("");
    }
    return response;
  },
  (error) => {
    console.log("-------", error.message); // for debug
    return Promise.reject(error);
  }
);
