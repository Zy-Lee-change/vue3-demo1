/*
 * @Author: Ken
 * @Date: 2021-07-08 12:27:03
 * @LastEditTime: 2021-07-28 15:41:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-demo1\src\utils\utils.js
 */
import generalTool from "./generalTool";
import * as echarts from "echarts";
import * as generalMethods from "./generalMethods";
export default {
  install: (Vue) => {
    Vue.config.globalProperties.$general = generalTool;
    Vue.config.globalProperties.$echarts = echarts;
    Vue.config.globalProperties.$funs = generalMethods;
  },
};
