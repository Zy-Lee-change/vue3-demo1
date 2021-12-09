/*
 * @Author: Ken
 * @Date: 2021-07-05 12:27:27
 * @LastEditTime: 2021-07-12 10:56:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Editr
 * @FilePath: \vue3-demo1\src\main.js
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/style/reset.css";
import "./assets/style/common.scss";
import ElementPlus from "element-plus";
// import zhLocale from "element-plus/lib/locale/lang/zh-cn";
import "element-plus/lib/theme-chalk/index.css";

// import "./router/routeGuards";
import utils from "./utils/utils";

const app = createApp(App);

app.use(store).use(router).use(utils).use(ElementPlus).mount("#app");
