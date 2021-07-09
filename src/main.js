/*
 * @Author: Ken
 * @Date: 2021-07-05 12:27:27
 * @LastEditTime: 2021-07-09 13:01:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Editr
 * @FilePath: \vue3-demo1\src\main.js
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/style/reset.css";
import "./assets/style/common.css";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

import utils from "./utils/utils";

const app = createApp(App);

app.use(store).use(router).use(utils).use(ElementPlus).mount("#app");
